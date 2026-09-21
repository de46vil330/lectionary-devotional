// Daily readings: "Abiding in the Word," the daily lectionary of Cantica Sacra
// (Magdeburg, 1613), translated by Matthew Carver and published by LCMS
// (2013). LCMS states reproduction for individual/church/school use does not
// require permission.
//
// This currently covers only "The Time of the Church" -- the weeks counted
// forward from Holy Trinity Sunday through the week before Advent. Advent,
// Christmas, Epiphany, Pre-Lent, Lent, and Easter season are not yet built
// (they involve trickier variable-length-season logic and are lower priority
// while we're in Trinity season).
//
// Six weeks that read from the Apocrypha in the original (Tobit, Judith,
// and four weeks of 1-2 Maccabees) have their Old-Testament-slot reading
// replaced with a straight sequential Psalm reading instead, since the
// Apocrypha isn't part of the Lutheran canon. Substituted days are marked
// `sub: true`. Sunday Gospel readings are left as originally appointed
// throughout (those are already canonical New Testament).
//
// Each day is [morning, evening] -- matching the original table's own
// "Morning / Evening" columns, rather than relabeling them Old/New
// Testament, since a few transitional weeks (e.g. right after Trinity
// Sunday) read straight through Acts in both columns.

function computeEaster(year) {
  // Meeus/Jones/Butcher Gregorian algorithm.
  var a = year % 19;
  var b = Math.floor(year / 100);
  var c = year % 100;
  var d = Math.floor(b / 4);
  var e = b % 4;
  var f = Math.floor((b + 8) / 25);
  var g = Math.floor((b - f + 1) / 3);
  var h = (19 * a + b - d - g + 15) % 30;
  var i = Math.floor(c / 4);
  var k = c % 4;
  var l = (32 + 2 * e + 2 * i - h - k) % 7;
  var m = Math.floor((a + 11 * h + 22 * l) / 451);
  var month = Math.floor((h + l - 7 * m + 114) / 31);
  var day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function addDays(date, days) {
  var d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function trinitySunday(year) {
  return addDays(computeEaster(year), 56);
}

var WEEKS = [
  // Trinity Sunday + its week (Mon-Sat continue straight through Acts)
  [["John 3:1–15", "Rom. 11:1–36 (Athanasian Creed also appointed)"],
   ["Acts 17", "Acts 18"], ["Acts 19", "Acts 20"], ["Acts 21", "Acts 22"],
   ["Acts 23", "Acts 24"], ["Acts 25", "Acts 26"], ["Acts 27", "Acts 28"]],
  // I. Sunday after Holy Trinity
  [["Luke 16:19–32", "1 Sam. 1"], ["1 Sam. 2:1–11", "1 Sam. 2:12–fin."],
   ["1 Sam. 3", "1 Sam. 4"], ["1 Sam. 5", "1 Sam. 6"], ["1 Sam. 7", "1 Sam. 8"],
   ["1 Sam. 9:1–13", "1 Sam. 9:14–fin."], ["1 Sam. 10:1–16", "1 Sam. 10:17–fin."]],
  // II.
  [["Luke 14:16–24", "1 Sam. 11"], ["1 Sam. 12:1–15", "1 Sam. 12:16–fin."],
   ["1 Sam. 13", "1 Sam. 14:1–23"], ["1 Sam. 14:24–fin.", "1 Sam. 15:1–15"],
   ["1 Sam. 15:16–fin.", "1 Sam. 16"], ["1 Sam. 17:1–21", "1 Sam. 17:22–37"],
   ["1 Sam. 17:38–fin.", "1 Sam. 18"]],
  // III.
  [["Luke 15:1–10", "1 Sam. 19"], ["1 Sam. 20:1–23", "1 Sam. 20:24–fin."],
   ["1 Sam. 21", "1 Sam. 22"], ["1 Sam. 23:1–18", "1 Sam. 23:19–fin."],
   ["1 Sam. 24", "1 Sam. 25:1–13"], ["1 Sam. 25:14–35", "1 Sam. 25:36–fin."],
   ["1 Sam. 26", "1 Sam. 27"]],
  // IV.
  [["Luke 6:36–43", "1 Sam. 28"], ["1 Sam. 29", "1 Sam. 30:1–21"],
   ["1 Sam. 30:22–fin.", "1 Sam. 31"], ["2 Sam. 1:1–16", "2 Sam. 1:17–fin."],
   ["2 Sam. 2:1–17", "2 Sam. 2:18–fin."], ["2 Sam. 3:1–19", "2 Sam. 3:20–fin."],
   ["2 Sam. 4", "2 Sam. 5"]],
  // V.
  [["Luke 5:1–12", "2 Sam. 6"], ["2 Sam. 7:1–16", "2 Sam. 7:17–fin."],
   ["2 Sam. 8", "2 Sam. 9"], ["2 Sam. 10", "2 Sam. 11"],
   ["2 Sam. 12:1–12", "2 Sam. 12:13–fin."], ["2 Sam. 13:1–22", "2 Sam. 13:23–fin."],
   ["2 Sam. 14:1–20", "2 Sam. 14:21–fin."]],
  // VI.
  [["Matt. 5:21–28", "2 Sam. 15:1–18"], ["2 Sam. 15:19–fin.", "2 Sam. 16:1–13"],
   ["2 Sam. 16:14–fin.", "2 Sam. 17:1–14"], ["2 Sam. 17:15–fin.", "2 Sam. 18:1–18"],
   ["2 Sam. 18:19–fin.", "2 Sam. 19:1–23"], ["2 Sam. 19:24–fin.", "2 Sam. 20"],
   ["2 Sam. 21:1–14", "2 Sam. 21:15–fin."]],
  // VII.
  [["Mark 8:1–10", "2 Sam. 22:28–fin."], ["2 Sam. 23:1–23", "2 Sam. 24:1–12"],
   ["2 Sam. 24:13–fin.", "1 Kings 1:1–31"], ["1 Kings 1:32–fin.", "1 Kings 2:1–18"],
   ["1 Kings 2:19–fin.", "1 Kings 3"], ["1 Kings 4", "1 Kings 5"],
   ["1 Kings 8:1–21", "1 Kings 8:22–54"]],
  // VIII.
  [["Matt. 7:15–22", "1 Kings 8:54–fin."], ["1 Kings 9", "1 Kings 10:1–17"],
   ["1 Kings 10:18–fin.", "1 Kings 11:1–25"], ["1 Kings 11:26–fin.", "1 Kings 12:1–19"],
   ["1 Kings 12:20–fin.", "1 Kings 13:1–10"], ["1 Kings 13:11–fin.", "1 Kings 14:1–20"],
   ["1 Kings 14:21–fin.", "1 Kings 15"]],
  // IX.
  [["Luke 16:1–9", "Prov. 1"], ["Prov. 2", "Prov. 3"], ["Prov. 4", "Prov. 5"],
   ["Prov. 6", "Prov. 7"], ["Prov. 8", "Prov. 9"], ["Prov. 10", "Prov. 11"], ["Prov. 12", "Prov. 13"]],
  // X.
  [["Luke 19:41–48", "Prov. 14"], ["Prov. 15", "Prov. 16"], ["Prov. 17", "Prov. 18"],
   ["Prov. 19", "Prov. 20"], ["Prov. 21", "Prov. 22"], ["Prov. 23", "Prov. 24"], ["Prov. 25", "Prov. 26"]],
  // XI.
  [["Luke 18:9–14", "Prov. 27"], ["Prov. 28", "Prov. 29"], ["Prov. 30", "Prov. 31"],
   ["Eccl. 1", "Eccl. 2"], ["Eccl. 3", "Eccl. 4"], ["Eccl. 5", "Eccl. 6"], ["Eccl. 7", "Eccl. 8"]],
  // XII.
  [["Mark 5:31–37", "Eccl. 9"], ["Eccl. 10", "Eccl. 11"], ["Eccl. 12", "Song of S. 1"],
   ["Song of S. 2", "Song of S. 3"], ["Song of S. 4", "Song of S. 5"], ["Song of S. 6", "Song of S. 7"],
   ["Song of S. 8", "Job 1:1–12"]],
  // XIII.
  [["Luke 10:23–37", "Job 1:13–fin."], ["Job 2", "Job 3"], ["Job 4", "Job 5"],
   ["Job 6", "Job 7"], ["Job 8", "Job 9"], ["Job 10", "Job 11"], ["Job 12", "Job 13"]],
  // XIV.
  [["Luke 17:11–19", "Job 14"], ["Job 15", "Job 16"], ["Job 17", "Job 18"],
   ["Job 19", "Job 20"], ["Job 21", "Job 22"], ["Job 23", "Job 24"], ["Job 25–26", "Job 27"]],
  // XV. -- originally Tobit; substituted with Psalms 1-13
  [["Matt. 6:24–33", "Psalm 1", true], ["Psalm 2", "Psalm 3", true], ["Psalm 4", "Psalm 5", true],
   ["Psalm 6", "Psalm 7", true], ["Psalm 8", "Psalm 9", true], ["Psalm 10", "Psalm 11", true],
   ["Psalm 12", "Psalm 13", true]],
  // XVI. -- originally Judith; Sunday uses the original's own canonical alternate
  // (1 Kings 17), weekdays substituted with Psalms 14-26
  [["Luke 7:11–18", "1 Kings 17"], ["Psalm 14", "Psalm 15", true], ["Psalm 16", "Psalm 17", true],
   ["Psalm 18", "Psalm 19", true], ["Psalm 20", "Psalm 21", true], ["Psalm 22", "Psalm 23", true],
   ["Psalm 24", "Psalm 25", true]],
  // XVII. (Esther -- canonical, no substitution needed)
  [["Luke 14:1–11", "Esther 1"], ["Esther 2:1–11", "Esther 2:12–fin."],
   ["Esther 3", "Esther 4"], ["Esther 5", "Esther 6"], ["Esther 7", "Esther 8:1–8"],
   ["Esther 8:9–fin.", "Esther 9:1–19"], ["Esther 9:20–fin.", "Esther 10"]],
  // XVIII. -- originally 1 Maccabees; substituted with Psalms 26-39
  [["Matt. 22:34–fin.", "Psalm 26", true], ["Psalm 27", "Psalm 28", true], ["Psalm 29", "Psalm 30", true],
   ["Psalm 31", "Psalm 32", true], ["Psalm 33", "Psalm 34", true], ["Psalm 35", "Psalm 36", true],
   ["Psalm 37", "Psalm 38", true]],
  // XIX. -- originally 1 Maccabees; substituted with Psalms 39-52
  [["Matt. 9:1–8", "Psalm 39", true], ["Psalm 40", "Psalm 41", true], ["Psalm 42", "Psalm 43", true],
   ["Psalm 44", "Psalm 45", true], ["Psalm 46", "Psalm 47", true], ["Psalm 48", "Psalm 49", true],
   ["Psalm 50", "Psalm 51", true]],
  // XX. -- originally 1 Maccabees; substituted with Psalms 52-65
  [["Matt. 22:1–14", "Psalm 52", true], ["Psalm 53", "Psalm 54", true], ["Psalm 55", "Psalm 56", true],
   ["Psalm 57", "Psalm 58", true], ["Psalm 59", "Psalm 60", true], ["Psalm 61", "Psalm 62", true],
   ["Psalm 63", "Psalm 64", true]],
  // XXI. -- originally 2 Maccabees; substituted with Psalms 65-78
  [["John 4:46–fin.", "Psalm 65", true], ["Psalm 66", "Psalm 67", true], ["Psalm 68", "Psalm 69", true],
   ["Psalm 70", "Psalm 71", true], ["Psalm 72", "Psalm 73", true], ["Psalm 74", "Psalm 75", true],
   ["Psalm 76", "Psalm 77", true]],
  // XXII. (Ezekiel resumes -- canonical)
  [["Matt. 23:18–35", "Ezek. 1"], ["Ezek. 2", "Ezek. 3"], ["Ezek. 4", "Ezek. 5"],
   ["Ezek. 6", "Ezek. 7"], ["Ezek. 8", "Ezek. 9"], ["Ezek. 11", "Ezek. 12"], ["Ezek. 13", "Ezek. 14"]],
  // XXIII.
  [["Matt. 22:15–21", "Ezek. 15"], ["Ezek. 16:1–22", "Ezek. 16:23–43"],
   ["Ezek. 16:44–fin.", "Ezek. 17"], ["Ezek. 18", "Ezek. 19"],
   ["Ezek. 20:1–26", "Ezek. 20:27–fin."], ["Ezek. 21:1–18", "Ezek. 21:18–fin."],
   ["Ezek. 22", "Ezek. 23:1–24"]],
  // XXIV.
  [["Matt. 9:18–22", "Ezek. 23:25–fin."], ["Ezek. 24", "Ezek. 25"], ["Ezek. 26", "Ezek. 27"],
   ["Ezek. 28", "Ezek. 29"], ["Ezek. 30", "Ezek. 31"], ["Ezek. 32", "Ezek. 33:1–20"],
   ["Ezek. 33:21–fin.", "Ezek. 34:1–16"]],
  // XXV.
  [["Matt. 24:15–28", "Ezek. 34:17–fin."], ["Ezek. 35", "Ezek. 36:1–15"],
   ["Ezek. 36:16–fin.", "Ezek. 37"], ["Ezek. 38", "Ezek. 39"], ["Dan. 1", "Dan. 2:1–23"],
   ["Dan. 2:24–fin.", "Dan. 3"], ["Dan. 4", "Dan. 5"]],
  // XXVI.
  [["Matt. 25:31–46", "Dan. 6"], ["Dan. 7", "Dan. 8"], ["Dan. 9", "Dan. 10"],
   ["Dan. 11", "Dan. 12"], ["Hos. 1", "Hos. 2"], ["Hos. 3", "Hos. 4"], ["Hos. 5", "Hos. 6"]],
  // Last Sunday before Advent
  [["Matt. 24:37–fin.", "Hos. 7"], ["Hos. 8", "Hos. 9"], ["Hos. 10", "Hos. 11"],
   ["Hos. 12", "Hos. 13"], ["Hos. 14", "Joel 1"], ["Joel 2:1–22", "Joel 2:23–fin."],
   ["Joel 4", null]]
];

var DAILY = WEEKS.reduce(function (acc, week) { return acc.concat(week); }, []);

function todaysReading(date) {
  date = date || new Date();
  var year = date.getFullYear();
  var trinity = trinitySunday(year);
  // If we're before this year's Trinity Sunday, we're still finishing last
  // year's cycle (not yet built), so anchor to last year's Trinity instead.
  if (date < trinity) trinity = trinitySunday(year - 1);
  var offset = Math.floor((date - trinity) / 86400000);
  if (offset < 0 || offset >= DAILY.length) return null;
  var entry = DAILY[offset];
  return { morning: entry[0], evening: entry[1], substituted: !!entry[2] };
}

// Hand-written daily reflections, keyed by "MM-DD" for the current year.
// Only dates listed here get a daily-written teaching; other days fall back
// to that week's Sunday teaching until more days are written. Written to
// match that day's actual reading from todaysReading() above.
var DAILY_REFLECTIONS = {
  "09-21": {
    heading: "Who may dwell on the holy hill?",
    paragraphs: [
      "Psalm 14 opens bluntly: the fool says in his heart there is no God. But the verse isn't really about atheism as an opinion — it's a diagnosis. God looks down to see if anyone is wise, anyone seeking him, and the verdict is stark: all have turned aside, there is no one who does good, not even one. It isn't a psalm about bad people out there somewhere. It's a psalm about the human condition, full stop.",
      "Psalm 15 asks the natural follow-up question: LORD, who may dwell in your tent? Who may live on your holy mountain? And it answers with a list — walk blamelessly, speak truth, don't slander a neighbor, keep your word even when it costs you. Read back to back, the two psalms set an impossible bar right next to a diagnosis that says no one clears it.",
      "That tension isn't a flaw in the psalms — it's the point. The Law draws the shape of a righteous life precisely so we stop pretending we can climb it under our own strength. What Psalm 15 demands, only grace can supply."
    ],
    confession: {
      quote: "Also they teach that since the fall of Adam all men begotten in the natural way are born with sin, that is, without the fear of God, without trust in God, and with concupiscence…",
      cite: "Augsburg Confession, Article II — Of Original Sin",
      url: "https://bookofconcord.org/augsburg-confession/original-sin/"
    }
  }
};
