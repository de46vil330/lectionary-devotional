// LSB (Lutheran Service Book) Daily Lectionary, "The Time of the Church" (fixed calendar dates).
// Transcribed from Lutheran Service Book, pp. 299-304 (Concordia Publishing House).
// Source citations only -- no CPH commentary or prose reproduced.
// Currently covers September-October. Optional/parallel readings (printed in italic
// in LSB, e.g. the Ezra reading alongside Nehemiah) are omitted for simplicity.
//
// NOTE: transcribed from a photograph of the printed page. Spot-check against the
// physical book before treating this as final -- entries marked "verify" below are
// the ones the transcriber was least certain of.
var DAILY_LECTIONARY = {
  "09-01": { ot: "1 Kings 18:1–19",              nt: "Eph. 1:1–23" },
  "09-02": { ot: "1 Kings 18:20–40",              nt: "Eph. 2:1–22" },
  "09-03": { ot: "1 Kings 19:1–21",               nt: "Eph. 3:1–21" },
  "09-04": { ot: "2 Kings 2:1–18",                nt: "Eph. 4:1–24" },
  "09-05": { ot: "2 Kings 2:19–25; 4:1–7",    nt: "Eph. 4:25—5:14" },
  "09-06": { ot: "2 Kings 4:8–22, 32–37",     nt: "Eph. 5:15–33" },
  "09-07": { ot: "2 Kings 4:38–53",               nt: "Eph. 6:1–24" },
  "09-08": { ot: "2 Kings 5:9–27",                nt: "Phil. 1:1–20" },
  "09-09": { ot: "2 Kings 6:1–23",                nt: "Phil. 1:21—2:11" },
  "09-10": { ot: "2 Kings 9:1–13; 10:18–29",  nt: "Phil. 2:12–30" },
  "09-11": { ot: "2 Chron. 29:1–24",              nt: "Phil. 3:1–21" },
  "09-12": { ot: "2 Chron. 31:1–21",              nt: "Phil. 4:1–23" },
  "09-13": { ot: "2 Chron. 32:1–22",              nt: "Col. 1:1–23" },
  "09-14": { ot: "2 Chron. 33:1–25",              nt: "Col. 1:24—2:7" },
  "09-15": { ot: "2 Chron. 34:1–8, 11, 14–33", nt: "Col. 2:8–23" },
  "09-16": { ot: "2 Chron. 35:1–7, 16–25",    nt: "Col. 3:1–25" },
  "09-17": { ot: "2 Chron. 36:1–23",              nt: "Col. 4:1–18" },
  "09-18": { ot: "Neh. 1:1—2:10",                 nt: "1 Tim. 1:1–20" },
  "09-19": { ot: "Neh. 2:11–20; 4:1–23",      nt: "1 Tim. 1:21—2:15" },
  "09-20": { ot: "Neh. 4:7–23",                   nt: "1 Tim. 3:1–16" },
  "09-21": { ot: "Neh. 5:1–16; 6:1–9, 15–16", nt: "1 Tim. 4:1–16" },
  "09-22": { ot: "Neh. 7:1–4; 8:1–18",        nt: "1 Tim. 5:1–25" },
  "09-23": { ot: "Neh. 9:1–21",                   nt: "1 Tim. 5:17—6:2" },
  "09-24": { ot: "Neh. 9:22–38",                  nt: "1 Tim. 6:3–21" },
  "09-25": { ot: "Mal. 1:1–14",                   nt: "Matt. 3:1–17" },
  "09-26": { ot: "Mal. 2:1—3:5",                  nt: "Matt. 4:1–11" },
  "09-27": { ot: "Mal. 3:6—4:6",                  nt: "Matt. 4:12–25" },
  "09-28": { ot: "Deut. 1:1–18",                  nt: "Matt. 5:1–20" },
  "09-29": { ot: "Deut. 1:19–36",                 nt: "Matt. 5:21–48" },
  "09-30": { ot: "Deut. 1:37—2:15",               nt: "Matt. 6:1–15" },

  "10-01": { ot: "Deut. 2:16–37",                 nt: "Matt. 6:16–34" },
  "10-02": { ot: "Deut. 3:1–29",                  nt: "Matt. 7:1–12" },
  "10-03": { ot: "Deut. 4:1–20",                  nt: "Matt. 7:13–29" },
  "10-04": { ot: "Deut. 4:21–40",                 nt: "Matt. 8:1–17" },
  "10-05": { ot: "Deut. 5:1–21",                  nt: "Matt. 8:18–34" },
  "10-06": { ot: "Deut. 5:22—6:9",                nt: "Matt. 9:1–17" },
  "10-07": { ot: "Deut. 6:10–25",                 nt: "Matt. 9:18–38" },
  "10-08": { ot: "Deut. 7:1–19",                  nt: "Matt. 10:1–23" },
  "10-09": { ot: "Deut. 8:1–20",                  nt: "Matt. 10:24–42" },
  "10-10": { ot: "Deut. 9:1–22",                  nt: "Matt. 11:1–19" },
  "10-11": { ot: "Deut. 9:23—10:22",              nt: "Matt. 11:20–30" },
  "10-12": { ot: "Deut. 11:1–25",                 nt: "Matt. 12:1–21" },
  "10-13": { ot: "Deut. 11:26—12:12",             nt: "Matt. 12:22–37" },
  "10-14": { ot: "Deut. 12:13–32",                nt: "Matt. 12:38–50" },
  "10-15": { ot: "Deut. 13:1–18",                 nt: "Matt. 13:1–23" },
  "10-16": { ot: "Deut. 14:1–2, 22–29",      nt: "Matt. 13:24–43" }, // verify
  "10-17": { ot: "Deut. 15:19–16:22",             nt: "Matt. 13:44–58" }, // verify
  "10-18": { ot: "Deut. 17:1–20",                 nt: "Matt. 14:1–21" },
  "10-19": { ot: "Deut. 18:1–22",                 nt: "Matt. 14:22–36" },
  "10-20": { ot: "Deut. 19:1–20",                 nt: "Matt. 15:1–20" },
  "10-21": { ot: "Deut. 20:1–20",                 nt: "Matt. 15:21–39" },
  "10-22": { ot: "Deut. 21:1–23",                 nt: "Matt. 16:1–12" },
  "10-23": { ot: "Deut. 24:10–25:19",             nt: "Matt. 16:13–28" }, // verify
  "10-24": { ot: "Deut. 25:17–26:19",             nt: "Matt. 17:1–13" }, // verify
  "10-25": { ot: "Deut. 27:1–26",                 nt: "Matt. 17:14–27" },
  "10-26": { ot: "Deut. 28:1–22",                 nt: "Matt. 18:1–20" },
  "10-27": { ot: "Deut. 29:1–29",                 nt: "Matt. 18:21–35" },
  "10-28": { ot: "Deut. 30:1–20",                 nt: "Matt. 19:1–15" },
  "10-29": { ot: "Deut. 31:1–29",                 nt: "Matt. 19:16–30" },
  "10-30": { ot: "Deut. 31:30—32:27",             nt: "Matt. 20:1–16" },
  "10-31": { ot: "Deut. 32:28–52",                nt: "Matt. 20:17–34" }
};
