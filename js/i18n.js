/* =============================================================================
   Translations

   Indonesian is the default. Every translatable node in index.html carries a
   `data-i18n="key"` attribute (or `data-i18n-html` when the string contains
   markup, `data-i18n-aria` for aria-labels), and both languages are stored
   here rather than read back from the DOM — that way switching back and forth
   is lossless.

   Adding a string: pick a key, add it to BOTH `id` and `en`, then put
   `data-i18n="your.key"` on the element.
============================================================================= */

const I18N = {
  id: {
    'meta.lang': 'id',
    'meta.dateLocale': 'id-ID',

    'a11y.skip': 'Lompat ke konten',
    'a11y.home': 'Hunt The Past — beranda',
    'a11y.openMenu': 'Buka menu',
    'a11y.closeMenu': 'Tutup menu',
    'a11y.language': 'Pilih bahasa',
    'a11y.motion': 'Kurangi animasi',
    'a11y.playVideo': 'Putar video: ',

    'nav.home': 'Home',
    'nav.video': 'Video',
    'nav.website': 'Website',
    'nav.games': 'Games',
    'nav.links': 'Links',
    'nav.linksLong': 'Situs Lain',

    'header.cta': 'Main Game Saya',

    'side.menu': 'Menu',
    'side.settings': 'Pengaturan',
    'side.follow': 'Ikuti Saya',

    'hero.eyebrow': 'Game Developer & Web Developer',
    'hero.lead': 'Selamat datang di rumah dari semua yang saya buat. Di sini ada game hasil gamejam, website yang saya kerjakan, video, dan tulisan seputar game development. Silakan lihat-lihat.',
    'hero.ctaGames': 'Lihat Games',
    'hero.ctaVideo': 'Tonton Video',
    'hero.jumpTo': 'Loncat ke',
    'hero.sticker': '9+ Tahun Bikin Game',

    'video.title': 'Video Terbaru',
    'video.lead': 'Channel game saya. Isinya video gameplay dan playthrough, plus sesekali devlog dari game yang sedang saya kerjakan.',
    'video.cta': 'Buka Channel',
    'video.empty': 'Belum ada video yang terdaftar.',
    'video.emptyLink': 'Buka channel YouTube',

    'web.eyebrow': 'Web Development',
    'web.title': 'Website yang Saya Kerjakan',
    'web.lead': 'Kumpulan website yang saya kerjakan — dari company profile dan toko online sampai landing page produk.',
    'web.groupDomain': 'Dengan Domain',
    'web.groupLab': 'Vercel & Subdomain',
    'work.xavierluv': 'Portofolio digital designer & creative director asal Yogyakarta.',
    'work.nozaracy': 'Company profile dan portofolio brand Nozaracy.',
    'work.alatpotongayam': 'Landing page produk mesin potong ayam.',
    'work.torrisilegal': 'Firma hukum keluarga di Australia — perceraian, pengasuhan anak, serta wills & estates.',
    'work.aftertakepost': 'Profil rumah post-production untuk series, film, dan video komersial.',
    'work.chilldmeats': 'Toko online daging premium Australia dengan pengiriman ke rumah.',
    'work.serviskulkasjogja': 'Layanan servis kulkas, mesin cuci, dan freezer di Yogyakarta.',
    'work.aghalondon': 'Toko online brand skincare pria premium asal London.',
    'work.hawaiideepsea': 'Charter memancing laut dalam di Hawaii.',
    'work.kotabaru': 'Website paket wisata dan tur.',
    'work.screenstella': 'Jasa desain screenshot App Store untuk aplikasi mobile.',
    'work.apollo': 'Website klinik gigi.',
    'work.testingground': 'Sandbox pribadi untuk uji coba komponen dan layout.',
    'work.musiclanding': 'Landing page rilis musik.',
    'work.rexai': 'Landing page produk AI pendamping rapat.',
    'work.sliceon': 'Draft landing page platform investasi.',
    'work.villabizzi': 'Toko online hasil pertanian.',
    'work.fraone': 'Landing page layanan keuangan.',
    'work.forlich': 'Website layanan kesehatan mental.',
    'work.magmml3': 'Arsip Make a Good Mega Man Level 3 — game yang saya mainkan di channel YouTube.',

    'games.eyebrow': 'Game Development',
    'games.title': 'Games',
    'games.lead': 'Kumpulan game yang saya buat, kebanyakan dari gamejam di itch.io. Semuanya bisa dimainkan gratis.',
    'games.cta': 'Semua Game',

    'links.eyebrow': 'Elsewhere',
    'links.title': 'Situs Saya yang Lain',
    'links.lead': 'Tempat lain di internet tempat saya menulis, menyimpan kode, dan merilis game.',
    'links.blog.desc': 'Tulisan seputar game development. Jarang di-update, tapi arsipnya masih ada.',
    'links.github.desc': 'Source code website dan beberapa eksperimen kecil lainnya.',
    'links.itch.desc': 'Halaman rilis semua game saya. Gratis dan bisa langsung dimainkan di browser.',
    'links.yt.desc': 'Video gameplay, playthrough, dan sesekali devlog.',
    'links.gamejolt.desc': 'Profil Game Jolt saya, tempat beberapa game saya juga dirilis.',
    'links.yt.cta': 'Buka channel',

    'footer.blurb': 'Halo, saya <span class="font-semibold text-cream">Amarta Sanca Lazuardi</span>. Saya membuat game sejak SD sampai sekarang, dan bekerja sebagai full stack developer sambil terus belajar web design.',
    'footer.pages': 'Halaman',
    'footer.contact': 'Kontak',
    'footer.copyright': 'Hunt The Past. Dibuat oleh Amarta Sanca Lazuardi.',
    'footer.top': 'Kembali ke atas',
  },

  en: {
    'meta.lang': 'en',
    'meta.dateLocale': 'en-GB',

    'a11y.skip': 'Skip to content',
    'a11y.home': 'Hunt The Past — home',
    'a11y.openMenu': 'Open menu',
    'a11y.closeMenu': 'Close menu',
    'a11y.language': 'Choose language',
    'a11y.motion': 'Reduce animation',
    'a11y.playVideo': 'Play video: ',

    'nav.home': 'Home',
    'nav.video': 'Videos',
    'nav.website': 'Websites',
    'nav.games': 'Games',
    'nav.links': 'Links',
    'nav.linksLong': 'Other Sites',

    'header.cta': 'Play My Games',

    'side.menu': 'Menu',
    'side.settings': 'Settings',
    'side.follow': 'Follow Me',

    'hero.eyebrow': 'Game Developer & Web Developer',
    'hero.lead': 'Welcome to the home of everything I make. Games from game jams, websites I have built, videos, and writing about game development. Have a look around.',
    'hero.ctaGames': 'Browse Games',
    'hero.ctaVideo': 'Watch Videos',
    'hero.jumpTo': 'Jump to',
    'hero.sticker': '9+ Years Making Games',

    'video.title': 'Latest Videos',
    'video.lead': 'My gaming channel. Mostly gameplay and playthroughs, plus the occasional devlog about the games I am working on.',
    'video.cta': 'Open Channel',
    'video.empty': 'No videos listed yet.',
    'video.emptyLink': 'Open the YouTube channel',

    'web.eyebrow': 'Web Development',
    'web.title': 'Websites I Have Built',
    'web.lead': 'The websites I have worked on — from company profiles and online shops to product landing pages.',
    'web.groupDomain': 'Custom Domain',
    'web.groupLab': 'Vercel & Subdomain',
    'work.xavierluv': 'Portfolio for a digital designer and creative director based in Yogyakarta.',
    'work.nozaracy': 'Brand profile and portfolio site for Nozaracy.',
    'work.alatpotongayam': 'Product landing page for a chicken cutting machine.',
    'work.torrisilegal': 'Australian family law firm covering divorce, parenting arrangements, and wills & estates.',
    'work.aftertakepost': 'Profile site for a post-production house working on series, films, and commercials.',
    'work.chilldmeats': 'Online shop for premium Australian meat with home delivery.',
    'work.serviskulkasjogja': 'Fridge, washing machine and freezer repair service in Yogyakarta.',
    'work.aghalondon': 'Online store for a premium London-based mens skincare brand.',
    'work.hawaiideepsea': 'Deep sea fishing charters in Hawaii.',
    'work.kotabaru': 'Travel and tour package site.',
    'work.screenstella': 'App Store screenshot design service for mobile apps.',
    'work.apollo': 'Dental clinic website.',
    'work.testingground': 'Personal sandbox for trying out components and layouts.',
    'work.musiclanding': 'Landing page for a music release.',
    'work.rexai': 'Landing page for an AI meeting assistant.',
    'work.sliceon': 'Draft landing page for an investment platform.',
    'work.villabizzi': 'Online shop for farm produce.',
    'work.fraone': 'Landing page for a finance service.',
    'work.forlich': 'Mental health service website.',
    'work.magmml3': 'Archive for Make a Good Mega Man Level 3 — the game I play on my YouTube channel.',

    'games.eyebrow': 'Game Development',
    'games.title': 'Games',
    'games.lead': 'Games I have made, mostly from game jams on itch.io. All of them are free to play.',
    'games.cta': 'All Games',

    'links.eyebrow': 'Elsewhere',
    'links.title': 'My Other Sites',
    'links.lead': 'The other places online where I write, keep my code, and release games.',
    'links.blog.desc': 'Writing about game development. Rarely updated, but the archive is still there.',
    'links.github.desc': 'Source code for my sites and a few small experiments.',
    'links.itch.desc': 'The release page for all my games. Free and playable right in the browser.',
    'links.yt.desc': 'Gameplay, playthroughs, and the occasional devlog.',
    'links.gamejolt.desc': 'My Game Jolt profile, where some of my games are released too.',
    'links.yt.cta': 'Open channel',

    'footer.blurb': 'Hi, I am <span class="font-semibold text-cream">Amarta Sanca Lazuardi</span>. I have been making games since primary school, and I work as a full stack developer while I keep learning web design.',
    'footer.pages': 'Pages',
    'footer.contact': 'Contact',
    'footer.copyright': 'Hunt The Past. Built by Amarta Sanca Lazuardi.',
    'footer.top': 'Back to top',
  },
};
