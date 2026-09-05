/* =============================================================================
   Editable content
   =============================================================================

   YOUTUBE_VIDEOS — the videos shown in the "Video" section, newest first.

   GitHub Pages is a static host and this repository is public, so a YouTube
   Data API key cannot live here safely, and YouTube's RSS feed refuses direct
   browser requests (no CORS header). So the list is maintained by hand.

   To refresh it, open the channel feed in a browser:

       https://www.youtube.com/feeds/videos.xml?channel_id=UC7saRgGNZRBoydGa_uxOC8A

   and copy the newest `<yt:videoId>`, `<title>` and `<published>` values into
   the top of the array. Or grab the id straight from a watch URL:

       https://www.youtube.com/watch?v=_68UFdngtMQ
                                       ^^^^^^^^^^^  <- this is the id

   The section shows the first 3 on phones and all of them from `sm` up.
   Thumbnails come from YouTube's image CDN; the player iframe is only created
   once a visitor actually clicks play, so this stays fast no matter how long
   the list gets.
============================================================================= */

const YOUTUBE_VIDEOS = [
  { id: '_68UFdngtMQ', title: 'MaGMML 3 - Tier W ( Perfect Run )', date: '2026-09-01' },
  { id: 'aWumPZvlRac', title: 'MaGMML 3 - Tier 15 ( Perfect Run )', date: '2026-08-25' },
  { id: 'a52m3i3ZcpM', title: 'MaGMML 3 - Tier 14 ( Perfect Run )', date: '2026-08-18' },
  { id: 'h8QJ1osSeLs', title: 'MaGMML 3 - Tier 13 ( Perfect Run )', date: '2026-08-11' },
  { id: '2PgUCOw8uYc', title: 'MaGMML 3 - Tier 12 ( Perfect Run )', date: '2026-08-04' },
  { id: '9OjvA1mt7xs', title: 'MaGMML 3 - Tier 11 ( Perfect Run )', date: '2026-07-27' },
];

const YOUTUBE_CHANNEL = 'https://www.youtube.com/@huntthepast';
