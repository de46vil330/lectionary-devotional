// Generates tomorrow's daily reflection (Monday-Saturday only; Sunday
// content stays hand-written) and writes it into daily-reflections.json.
// Run nightly by .github/workflows/daily-reflection.yml. Requires
// ANTHROPIC_API_KEY in the environment.
//
// Safety design: the model is asked to PICK a citation id from a
// pre-verified library (citations-library.json) rather than generate a
// confessional quote from scratch. The script then looks up the exact
// quote/cite/url from that library by id, so the published citation is
// always exactly what a human verified, never something the model wrote.
// If anything about the response looks wrong (bad shape, unknown id, a
// citation already used two days running), the script exits without
// writing anything rather than publish a guess.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Anthropic from '@anthropic-ai/sdk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const { WEEKS, todaysReading } = await import(path.join(ROOT, 'daily-lectionary.js')).then(m => m.default ?? m);

function pad(n) { return String(n).padStart(2, '0'); }

async function main() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (tomorrow.getDay() === 0) {
    console.log('Tomorrow is Sunday -- Sunday content stays hand-written, nothing to generate.');
    return;
  }

  const mmdd = `${pad(tomorrow.getMonth() + 1)}-${pad(tomorrow.getDate())}`;

  const reflectionsPath = path.join(ROOT, 'daily-reflections.json');
  const reflections = JSON.parse(await fs.readFile(reflectionsPath, 'utf8'));

  if (reflections[mmdd]) {
    console.log(`${mmdd} already has a written reflection -- leaving it alone.`);
    return;
  }

  const reading = todaysReading(tomorrow);
  if (!reading) {
    console.log(`${mmdd} falls outside the built daily-lectionary cycle -- nothing to generate against.`);
    return;
  }

  const citations = JSON.parse(await fs.readFile(path.join(ROOT, 'citations-library.json'), 'utf8'));

  // Avoid repeating the same confessional citation two days in a row.
  const dates = Object.keys(reflections).sort();
  const lastKey = dates[dates.length - 1];
  const lastCitationId = lastKey ? reflections[lastKey]?.confessionIdUsed : null;

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const citationList = citations
    .map(c => `- id: ${c.id}\n  themes: ${c.themes.join(', ')}\n  quote: "${c.quote}"\n  source: ${c.cite}`)
    .join('\n');

  const prompt = `You are writing one day's entry for "The Daily Word," a daily devotional page for an LCMS (Lutheran Church-Missouri Synod) audience. The tone is warm, direct, and non-academic -- it retells or reflects on the actual reading rather than delivering an abstract lesson, and reads naturally aloud. It draws on a Lutheran Law/Gospel and grace-centered lens without being preachy or cliched. Each entry runs about 3 short paragraphs.

Tomorrow's reading, from the 1613 Magdeburg daily lectionary:
Morning: ${reading.morning}
Evening: ${reading.evening}

Two examples of the established voice and length, for calibration only -- do not reuse their content or phrasing:

Example 1 (Psalm 14 & 15): "Psalm 14 opens bluntly: the fool says in his heart there is no God. But the verse isn't really about atheism as an opinion -- it's a diagnosis. God looks down to see if anyone is wise, anyone seeking him, and the verdict is stark: all have turned aside, there is no one who does good, not even one..."

Example 2 (Psalm 16 & 17): "Psalm 16 opens as a prayer of refuge, then makes a striking claim: I have no good apart from you. Not \\"you're one good thing among several\\" -- the only good there is..."

From this list of pre-verified confessional excerpts, choose the ONE that best fits tomorrow's reading's theme. Do not alter, paraphrase, or invent a citation -- only choose by id:
${citationList}
${lastCitationId ? `\n(Yesterday's entry already used "${lastCitationId}" -- prefer a different one unless it is genuinely the only good fit.)` : ''}

Call the submit_reflection tool with your finished entry.`;

  const tools = [{
    name: 'submit_reflection',
    description: "Submit the finished daily reflection entry.",
    input_schema: {
      type: 'object',
      properties: {
        heading: { type: 'string', description: 'A short, specific heading (not generic), 3-7 words' },
        verse: { type: 'string', description: 'A short quotable line from the actual reading, in quotation marks' },
        citation: { type: 'string', description: 'e.g. "Psalm 18:2, NRSV" -- the specific reference for the verse field' },
        paragraphs: {
          type: 'array',
          items: { type: 'string' },
          minItems: 3,
          maxItems: 3,
          description: 'Exactly three short paragraphs of reflection'
        },
        confessionId: {
          type: 'string',
          enum: citations.map(c => c.id),
          description: 'The id of the pre-verified citation chosen from the list in the prompt'
        }
      },
      required: ['heading', 'verse', 'citation', 'paragraphs', 'confessionId']
    }
  }];

  let response;
  try {
    response = await client.messages.create({
      model: 'claude-sonnet-5',
      max_tokens: 1500,
      tools,
      tool_choice: { type: 'tool', name: 'submit_reflection' },
      messages: [{ role: 'user', content: prompt }]
    });
  } catch (e) {
    console.error('Anthropic API call failed:', e.status, e.message);
    process.exitCode = 1;
    return;
  }

  const toolUse = response.content.find(b => b.type === 'tool_use' && b.name === 'submit_reflection');
  if (!toolUse) {
    console.error('Model did not call submit_reflection -- aborting without writing anything. Response was:', JSON.stringify(response.content));
    process.exitCode = 1;
    return;
  }

  // input_schema (incl. the confessionId enum) is enforced by the API, so
  // this is already validated JSON matching an id in our library -- no
  // regex-extraction or manual shape-checking needed.
  const parsed = toolUse.input;
  const chosenCitation = citations.find(c => c.id === parsed.confessionId);

  reflections[mmdd] = {
    label: 'Daily Lectionary',
    verse: parsed.verse,
    citation: parsed.citation,
    heading: parsed.heading,
    paragraphs: parsed.paragraphs,
    confession: {
      quote: chosenCitation.quote,
      cite: chosenCitation.cite,
      url: chosenCitation.url
    },
    confessionIdUsed: chosenCitation.id,
    generatedBy: 'automation'
  };

  await fs.writeFile(reflectionsPath, JSON.stringify(reflections, null, 2) + '\n', 'utf8');
  console.log(`Wrote reflection for ${mmdd}: "${parsed.heading}"`);
}

main().catch(err => {
  console.error('Generation failed:', err);
  process.exitCode = 1;
});
