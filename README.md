# The Daily Word

A daily devotional page grounded in LCMS's own lectionary and the Lutheran Confessions (Book of Concord). Live at [dailywordsofgrace.com](https://dailywordsofgrace.com).

Each entry pairs a verse from the current week's appointed Sunday readings with a short teaching that retells or reflects on the passage, and — where it fits — a supporting citation from the Augsburg Confession, Luther's Small or Large Catechism, or another confessional document. A separate section shows a genuinely different Scripture reading every day, sourced from the LSB Daily Lectionary.

## Sources

- Sunday readings: LCMS Three-Year Series (Series A), per the [LCMS Commission on Worship's Church Year Calendar](https://resources.lcms.org/worship-planning/series-a-and-one-year-series-lectionaries-and-summaries/)
- Daily readings: the LSB Daily Lectionary (*Lutheran Service Book*, pp. 299–304, Concordia Publishing House) — citations only transcribed, no CPH commentary reproduced. See `daily-lectionary.js`.
- Confessional citations: [Book of Concord](https://bookofconcord.org/) (public-domain Triglotta translation)

## Status

Currently a static, hand-updated page (`index.html`). Hosted for free via GitHub Pages, with a custom domain through Namecheap.

**Daily lectionary data:** only September and October are transcribed so far (`daily-lectionary.js`). A handful of entries are flagged in that file as needing a spot-check against the physical book. November–August still need transcribing.

**Next steps:**

- Finish transcribing the LSB Daily Lectionary for the remaining months
- Automate daily/weekly regeneration (a scheduled job that recalculates the current Sunday reading automatically)
- Add narrated audio once a text-to-speech provider (e.g. ElevenLabs) is connected
- Add short-form companion posts for Instagram/TikTok that link back here
- Possible future feature: a historical daily lectionary from 1613 Magdeburg (*Cantica Sacra*), translated and published by LCMS as "Abiding in the Word." Saved in `sources/abiding-in-the-word-1613-daily-lectionary.pdf` for reference — movable-Sunday-based rather than fixed-date, so it would need an Easter-date calculation to place correctly each year. Not yet built.
