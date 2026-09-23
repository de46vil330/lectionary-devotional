# The Daily Word

A daily devotional page grounded in LCMS's own lectionary and the Lutheran Confessions (Book of Concord). Live at [dailywordsofgrace.com](https://dailywordsofgrace.com).

The featured verse card and teaching switch by day: Monday–Saturday they're drawn from a historic Lutheran daily lectionary; on Sunday they switch to the actual LCMS Three-Year Series reading used in church that day. A separate "Today's Daily Reading" tile always shows the day's 1613-lectionary citations as reference, regardless of weekday.

## Sources

- Sunday readings: LCMS Three-Year Series (Series A), per the [LCMS Commission on Worship's Church Year Calendar](https://resources.lcms.org/worship-planning/series-a-and-one-year-series-lectionaries-and-summaries/)
- Daily readings: *Abiding in the Word*, the daily lectionary of *Cantica Sacra* (Magdeburg, 1613), translated by Matthew Carver and published by LCMS. Saved in `sources/abiding-in-the-word-1613-daily-lectionary.pdf`. LCMS states reproduction for individual/church/school use does not require permission. See `daily-lectionary.js`.
- Confessional citations: [Book of Concord](https://bookofconcord.org/) (public-domain Triglotta translation). A pre-verified subset lives in `citations-library.json` for the automated reflection generator to choose from (see below) — every entry in it was individually checked against bookofconcord.org before being added.

Every source used on this site was chosen because its reuse terms are unambiguous. An earlier version of the daily-reading feature used the modern LSB Daily Lectionary (*Lutheran Service Book*, Concordia Publishing House) instead — that was removed, since republishing that hymnal's entire compiled reading schedule (rather than citing a single day) was judged too large a reproduction of CPH's editorial work to risk without their explicit permission, which this project isn't seeking.

## Data files

- `daily-lectionary.js` — the 1613 lectionary's OT/NT citation table plus the Easter/Trinity-Sunday date math (`todaysReading()`). Loaded by both the browser and the Node automation script.
- `daily-reflections.json` — hand-written or auto-generated daily teachings, keyed by `MM-DD`.
- `sunday-content.json` — hand-written Sunday teachings, keyed by `YYYY-MM-DD`. Never auto-generated.
- `citations-library.json` — the pre-verified confessional excerpts the generator picks from.

## Daily automation

A GitHub Actions workflow (`.github/workflows/daily-reflection.yml`) runs nightly (07:00 UTC / ~3 AM Eastern) and generates **tomorrow's** weekday reflection automatically via the Claude API, so it's ready before anyone wakes up. It never touches Sunday content, and it never overwrites a date that's already been written by hand.

**How it stays accurate without a human reviewing each night's output:** the model is never asked to write or recall a confessional citation from memory. It's given `citations-library.json` — a small set of Book of Concord excerpts a person has already checked against bookofconcord.org — and asked only to pick the id of whichever one best fits that day's reading. The script then pulls the exact quote, source, and URL from that file by id, so the published citation is always exactly what was pre-verified, never something the model generated. If the model's response is malformed, references an unknown citation id, or is missing a required field, the script aborts and writes nothing rather than publish a guess. Bible verse quotes (a single short line from the day's actual reading) are still model-generated text, same as the hand-written entries so far.

**Setup required (not yet done):**
1. Create an API key at [console.anthropic.com](https://console.anthropic.com)
2. In this repo's Settings → Secrets and variables → Actions, add a new repository secret named `ANTHROPIC_API_KEY` with that key as the value
3. That's it — the workflow will pick it up on its next scheduled run, or can be triggered manually from the Actions tab (`workflow_dispatch`)

To expand the citation library, add a new entry to `citations-library.json` with `id`, `quote`, `cite`, `url`, and `themes` — verify the quote against bookofconcord.org first.

## Status

Currently a static page (`index.html`), hosted for free via GitHub Pages with a custom domain through Namecheap.

**Daily lectionary coverage:** "The Time of the Church" only — the weeks counted forward from Holy Trinity Sunday through the week before Advent (`daily-lectionary.js` computes Trinity Sunday's date each year via a standard Easter-date algorithm). Advent, Christmas, Epiphany, Pre-Lent, and Lent/Easter season aren't built yet — those involve trickier variable-length-season logic and aren't needed until later in the year.

Six weeks in the original 1613 source read from the Apocrypha (Tobit, Judith, and four weeks of 1–2 Maccabees), which Lutherans don't treat as canonical Scripture. Those weeks' evening readings are replaced with a straight sequential Psalm reading instead (Psalm 1, 2, 3...); the Judith week's Sunday uses the original table's own canonical alternate (1 Kings 17) rather than a Psalm.

**Next steps:**

- Add the `ANTHROPIC_API_KEY` secret so the automation can actually run
- Build Advent through Easter season (movable-date logic gets more involved there — variable Sunday counts before Septuagesima and before Advent)
- Automate Sunday content too, if desired (currently intentionally hand-written only)
- Add narrated audio once a text-to-speech provider (e.g. ElevenLabs) is connected
- Add short-form companion posts for Instagram/TikTok that link back here
