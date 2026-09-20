# The Daily Word

A daily devotional page grounded in LCMS's own lectionary and the Lutheran Confessions (Book of Concord). Live at [dailywordsofgrace.com](https://dailywordsofgrace.com).

Each entry pairs a verse from the current week's appointed Sunday readings with a short teaching that retells or reflects on the passage, and — where it fits — a supporting citation from the Augsburg Confession, Luther's Small or Large Catechism, or another confessional document. A separate section shows the day's actual reading from a historic Lutheran daily lectionary, independent of the weekly Sunday cycle.

## Sources

- Sunday readings: LCMS Three-Year Series (Series A), per the [LCMS Commission on Worship's Church Year Calendar](https://resources.lcms.org/worship-planning/series-a-and-one-year-series-lectionaries-and-summaries/)
- Daily readings: *Abiding in the Word*, the daily lectionary of *Cantica Sacra* (Magdeburg, 1613), translated by Matthew Carver and published by LCMS. Saved in `sources/abiding-in-the-word-1613-daily-lectionary.pdf`. LCMS states reproduction for individual/church/school use does not require permission. See `daily-lectionary.js`.
- Confessional citations: [Book of Concord](https://bookofconcord.org/) (public-domain Triglotta translation)

Every source used on this site was chosen because its reuse terms are unambiguous. An earlier version of the daily-reading feature used the modern LSB Daily Lectionary (*Lutheran Service Book*, Concordia Publishing House) instead — that was removed, since republishing that hymnal's entire compiled reading schedule (rather than citing a single day) was judged too large a reproduction of CPH's editorial work to risk without their explicit permission, which this project isn't seeking.

## Status

Currently a static, hand-updated page (`index.html`) for the Sunday content. Hosted for free via GitHub Pages, with a custom domain through Namecheap.

**Daily reading feature:** live, covering "The Time of the Church" — the weeks counted forward from Holy Trinity Sunday through the week before Advent (`daily-lectionary.js` computes Trinity Sunday's date each year via a standard Easter-date algorithm, then looks up the correct day). Advent, Christmas, Epiphany, Pre-Lent, and Lent/Easter season aren't built yet — those involve trickier variable-length-season logic and aren't needed until later in the year.

Six weeks in the original 1613 source read from the Apocrypha (Tobit, Judith, and four weeks of 1–2 Maccabees), which Lutherans don't treat as canonical Scripture. Those weeks' evening readings are replaced with a straight sequential Psalm reading instead (Psalm 1, 2, 3...); the Judith week's Sunday uses the original table's own canonical alternate (1 Kings 17) rather than a Psalm. These substitutions are marked `sub: true` in the data and labeled on the page.

**Next steps:**

- Build Advent through Easter season (movable-date logic gets more involved there — variable Sunday counts before Septuagesima and before Advent)
- Automate daily/weekly regeneration of the Sunday content (a scheduled job that recalculates the current Sunday reading automatically)
- Add narrated audio once a text-to-speech provider (e.g. ElevenLabs) is connected
- Add short-form companion posts for Instagram/TikTok that link back here
