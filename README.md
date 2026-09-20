# The Daily Word

A daily devotional page grounded in LCMS's own lectionary and the Lutheran Confessions (Book of Concord). Live at [dailywordsofgrace.com](https://dailywordsofgrace.com).

Each entry pairs a verse from the current week's appointed Sunday readings with a short teaching that retells or reflects on the passage, and — where it fits — a supporting citation from the Augsburg Confession, Luther's Small or Large Catechism, or another confessional document.

## Sources

- Sunday readings: LCMS Three-Year Series (Series A), per the [LCMS Commission on Worship's Church Year Calendar](https://resources.lcms.org/worship-planning/series-a-and-one-year-series-lectionaries-and-summaries/)
- Confessional citations: [Book of Concord](https://bookofconcord.org/) (public-domain Triglotta translation)

Every source used on this site is chosen because its reuse terms are unambiguous — see the note on the daily-reading source below for why the modern LSB Daily Lectionary was dropped in favor of a historical one.

## Status

Currently a static, hand-updated page (`index.html`). Hosted for free via GitHub Pages, with a custom domain through Namecheap.

**Daily reading feature:** not currently live. An earlier version sourced this from the modern LSB Daily Lectionary (*Lutheran Service Book*, pp. 299–304, Concordia Publishing House), transcribed from photos of the book. That was removed: CPH's hymnal doesn't carry an explicit permission to republish its full compiled reading schedule the way our other sources do, and publishing the *entire year's* schedule (rather than citing a single day) was judged too large a reproduction of their editorial work to risk without asking — which isn't a path this project wants to take.

The planned replacement is a historical daily lectionary from 1613 Magdeburg (*Cantica Sacra*), translated and published by LCMS as "Abiding in the Word," saved in `sources/abiding-in-the-word-1613-daily-lectionary.pdf`. LCMS states outright that "reproduction for individual, church or school use does not require permission," which makes it a clean source. The tradeoff: it's dated relative to movable feasts (Sundays after Holy Trinity, after Epiphany, etc.) rather than fixed calendar dates, so it needs an Easter-date calculation to place correctly each year — more implementation work than the simple fixed-date lookup the LSB version would have allowed. It also includes some readings from the Apocrypha, which Lutherans don't treat as canonical Scripture; how to handle those specific days is still an open question.

**Next steps:**

- Build the movable-date (Easter/Trinity-relative) lookup logic and transcribe the 1613 lectionary into it
- Decide how to handle the Apocrypha readings in that source (label clearly as historical/non-canonical, substitute, or skip)
- Automate daily/weekly regeneration (a scheduled job that recalculates the current Sunday reading automatically)
- Add narrated audio once a text-to-speech provider (e.g. ElevenLabs) is connected
- Add short-form companion posts for Instagram/TikTok that link back here
