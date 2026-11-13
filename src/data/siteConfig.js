// ─────────────────────────────────────────────────────────────────────────────
// ONE PLACE TO PERSONALISE THE WHOLE WEBSITE
// Change the text, photo paths, local music paths, and external links below.
// Photo files belong in public/assets/images/gallery/ (or another public folder).
// Local tracks belong in public/assets/music/.
// ─────────────────────────────────────────────────────────────────────────────

export const siteConfig = {
  recipientName: 'Meita',
  homeTitle: 'Hai, Meita Cantikku ♡',
  homeSubtitle: 'Welcome to my little world, made just for you.',
  bouquetTitle: 'For you, my pretty girl ♡',
  bouquetMessage:
    'Kalau bunga bisa mewakili perasaanku, mungkin seluruh taman ingin aku berikan untukmu.',
  openingStages: [
    {
      title: 'Hai, Meita cantikku ♡',
      message: 'Aku punya sesuatu yang spesial untuk kamu...',
      flavor: 'first',
    },
    {
      title: 'Ehh, kok NO? ><',
      message: 'Yakin nih nggak mau lihat kejutan kecil dariku?',
      flavor: 'second',
    },
    {
      title: 'Pleaseee, pretty girl ♡',
      message: 'Aku udah menyiapkan sesuatu yang lucu buat kamu...',
      flavor: 'third',
    },
    {
      title: 'Last chance, my pretty girl!',
      message: 'Masa masih mau pilih NO? Aku bikinnya khusus buat kamu loh ><',
      flavor: 'fourth',
    },
  ],
  letter: {
    title: 'To My Pretty Girl ♡',
    body: `Hai, Meita cantikku.

Aku cuma ingin kamu tahu, kehadiranmu adalah salah satu hal indah yang aku syukuri.

Terima kasih sudah hadir dan menjadi bagian dari hari-hariku.

Aku mungkin bukan seseorang yang sempurna, tapi aku ingin terus belajar menjadi seseorang yang bisa membuatmu merasa dicintai, dihargai, dan bahagia.

Aku ingin terus menciptakan banyak kenangan indah bersamamu.

Jangan lupa, kamu adalah seseorang yang sangat berharga.

Aku sayang kamu, wanita cantikku.`,
    signature: 'With love, ♡',
  },
  surprise: {
    title: "You're My Favorite Person ♡",
    subtitle: 'Di antara banyaknya hal indah di dunia, aku bersyukur bisa mengenalmu.',
    message: `Terima kasih sudah menjadi bagian dari cerita kecilku.

Semoga aku bisa terus membuatmu tersenyum, Meita cantikku.

I love you. ♡`,
    couplePhoto: '/assets/images/surprise/kamu-kangen-aku-yaa.jpg',
    couplePhotoAlt: 'Kamu kangen aku yaa?',
  },
};

// Soundtrack pilihan khusus untuk Meita. Semua suara dimainkan melalui official
// YouTube embed sesudah pengunjung menekan Play, jadi tidak ada lagu yang diunduh.
export const musicPlaylist = [
  { id: 'dari-mata', title: 'Dari Mata', artist: 'Jaz', youtubeId: 'jieBCHsHg3A', youtube: 'https://www.youtube.com/watch?v=jieBCHsHg3A', spotify: 'https://open.spotify.com/search/Jaz%20Dari%20Mata', reason: 'Lembut, hangat, dan terasa seperti memandang seseorang yang spesial.', accent: '#dc8ca2' },
  { id: 'kasmaran', title: 'Kasmaran', artist: 'Jaz', youtubeId: '4q24Qpn52CA', youtube: 'https://www.youtube.com/watch?v=4q24Qpn52CA', spotify: 'https://open.spotify.com/search/Jaz%20Kasmaran', reason: 'Rasa jatuh cinta yang manis dan playful untuk taman kecil ini.', accent: '#b685a1' },
  { id: 'pandangan-pertama', title: 'Pandangan Pertama', artist: 'RAN', youtubeId: 'yytLnDAN1MY', youtube: 'https://www.youtube.com/watch?v=yytLnDAN1MY', spotify: 'https://open.spotify.com/search/RAN%20Pandangan%20Pertama', reason: 'Ceria dan berkilau seperti awal cerita yang tidak terlupakan.', accent: '#96a7bd' },
  { id: 'siapkah-kau', title: "Siapkah Kau 'Tuk Jatuh Cinta Lagi", artist: 'HIVI!', youtubeId: 'kX1O93X77d4', youtube: 'https://www.youtube.com/watch?v=kX1O93X77d4', spotify: 'https://open.spotify.com/search/HIVI%20Siapkah%20Kau%20Tuk%20Jatuh%20Cinta%20Lagi', reason: 'Indie pop romantis yang ringan dan penuh harapan.', accent: '#9eb4a3' },
  { id: 'cinta-luar-biasa', title: 'Cinta Luar Biasa', artist: 'Andmesh', youtubeId: 'FcOctsNXyjk', youtube: 'https://www.youtube.com/watch?v=FcOctsNXyjk', spotify: 'https://open.spotify.com/search/Andmesh%20Cinta%20Luar%20Biasa', reason: 'Balada penuh perasaan untuk sebuah cinta yang besar.', accent: '#dc8ca2' },
  { id: 'berdua-bersama', title: 'Berdua Bersama', artist: 'Jaz', youtubeId: 'W_iXvVEis1Q', youtube: 'https://www.youtube.com/watch?v=W_iXvVEis1Q', spotify: 'https://open.spotify.com/search/Jaz%20Berdua%20Bersama', reason: 'Hangat, dekat, dan cocok untuk momen berdua.', accent: '#b685a1' },
  { id: 'jatuh-suka', title: 'Jatuh Suka', artist: 'Tulus', youtubeId: 'NRGDT2UUlsk', youtube: 'https://www.youtube.com/watch?v=NRGDT2UUlsk', spotify: 'https://open.spotify.com/search/Tulus%20Jatuh%20Suka', reason: 'Ceria dan tulus untuk rasa suka yang tumbuh pelan.', accent: '#96a7bd' },
  { id: 'teman-hidup', title: 'Teman Hidup', artist: 'Tulus', youtubeId: 'dt4Ueda_h6Y', youtube: 'https://www.youtube.com/watch?v=dt4Ueda_h6Y', spotify: 'https://open.spotify.com/search/Tulus%20Teman%20Hidup', reason: 'Lirik hangat tentang ingin berjalan bersama selamanya.', accent: '#9eb4a3' },
  { id: 'janji-suci', title: 'Janji Suci', artist: 'Yovie & Nuno', youtubeId: 'hQ-wYw4hP84', youtube: 'https://www.youtube.com/watch?v=hQ-wYw4hP84', spotify: 'https://open.spotify.com/search/Yovie%20Nuno%20Janji%20Suci', reason: 'Klasik, tulus, dan penuh janji baik.', accent: '#dc8ca2' },
  { id: 'lebih-indah', title: 'Lebih Indah', artist: 'Adera', youtubeId: 'OqsM5kQYjTc', youtube: 'https://www.youtube.com/watch?v=OqsM5kQYjTc', spotify: 'https://open.spotify.com/search/Adera%20Lebih%20Indah', reason: 'Menggambarkan hari yang terasa lebih indah saat bersamanya.', accent: '#b685a1' },
  { id: 'bentuk-cinta', title: 'Bentuk Cinta', artist: 'Eclat Story', youtubeId: 'c-qWdKMHjI0', youtube: 'https://www.youtube.com/watch?v=c-qWdKMHjI0', spotify: 'https://open.spotify.com/search/Eclat%20Bentuk%20Cinta', reason: 'Aesthetic dan lembut untuk surat cinta modern.', accent: '#96a7bd' },
  { id: 'hari-bersamanya', title: 'Hari Bersamanya', artist: 'Sheila On 7', youtubeId: '32M1DDVwqeY', youtube: 'https://www.youtube.com/watch?v=32M1DDVwqeY', spotify: 'https://open.spotify.com/search/Sheila%20On%207%20Hari%20Bersamanya', reason: 'Nostalgic, ringan, dan menyenangkan seperti hari bersama dia.', accent: '#9eb4a3' },
  { id: 'cintanya-aku', title: 'Cintanya Aku', artist: 'Tiara Andini & Arsy Widianto', youtubeId: 'sfuq3y_zuGw', youtube: 'https://www.youtube.com/watch?v=sfuq3y_zuGw', spotify: 'https://open.spotify.com/search/Tiara%20Andini%20Arsy%20Widianto%20Cintanya%20Aku', reason: 'Duet penuh rasa yang terasa personal dan romantis.', accent: '#dc8ca2' },
  { id: 'teman-bahagia', title: 'Teman Bahagia', artist: 'Jaz', youtubeId: '1XTLb0_6JDs', youtube: 'https://www.youtube.com/watch?v=1XTLb0_6JDs', spotify: 'https://open.spotify.com/search/Jaz%20Teman%20Bahagia', reason: 'Manis dan penuh harapan untuk membuat Meita tersenyum.', accent: '#b685a1' },
  { id: 'dia', title: 'Dia', artist: 'Anji', youtubeId: 'jjYpd6X41VA', youtube: 'https://www.youtube.com/watch?v=jjYpd6X41VA', spotify: 'https://open.spotify.com/search/Anji%20Dia', reason: 'Lagu cinta yang sederhana, dekat, dan penuh kagum.', accent: '#96a7bd' },
  { id: 'akad', title: 'Akad', artist: 'Payung Teduh', youtubeId: 'viW0M5R2BLo', youtube: 'https://www.youtube.com/watch?v=viW0M5R2BLo', spotify: 'https://open.spotify.com/search/Payung%20Teduh%20Akad', reason: 'Hangat dan ikonik untuk momen cinta yang serius.', accent: '#9eb4a3' },
  { id: 'sempurna', title: 'Sempurna', artist: 'Andra and The Backbone', youtubeId: 'jStNaVCW838', youtube: 'https://www.youtube.com/watch?v=jStNaVCW838', spotify: 'https://open.spotify.com/search/Andra%20and%20The%20Backbone%20Sempurna', reason: 'Penuh pengakuan sayang untuk seseorang yang istimewa.', accent: '#dc8ca2' },
  { id: 'melukis-senja', title: 'Melukis Senja', artist: 'Budi Doremi', youtubeId: 'qZIQAk-BUEc', youtube: 'https://www.youtube.com/watch?v=qZIQAk-BUEc', spotify: 'https://open.spotify.com/search/Budi%20Doremi%20Melukis%20Senja', reason: 'Lembut dan menenangkan seperti senja di halaman surprise.', accent: '#b685a1' },
  { id: 'nyaman', title: 'Nyaman', artist: 'Andmesh', youtubeId: 'R608Rce03Ho', youtube: 'https://www.youtube.com/watch?v=R608Rce03Ho', spotify: 'https://open.spotify.com/search/Andmesh%20Nyaman', reason: 'Hangat dan sederhana untuk rasa pulang pada seseorang.', accent: '#96a7bd' },
  { id: 'menghujam-jantungku', title: 'Menghujam Jantungku', artist: 'Tompi', youtubeId: '1ETOeAqKhQk', youtube: 'https://www.youtube.com/watch?v=1ETOeAqKhQk', spotify: 'https://open.spotify.com/search/Tompi%20Menghujam%20Jantungku', reason: 'Nuansa jazz-soul yang dalam dan romantis.', accent: '#9eb4a3' },
];

// The same curated list is shown below the player with direct official links.
export const musicRecommendations = musicPlaylist;

// Photos supplied for this world. Their complete composition is preserved in both
// thumbnails and the lightbox; only the surrounding scrapbook frame is pixel-art.
export const galleryItems = [
  { id: 1, src: '/assets/images/gallery/01-glasses-quiet.jpg', caption: 'My favorite human ♡', rotation: -3, tone: 'rose', aspectRatio: '941 / 416' },
  { id: 2, src: '/assets/images/gallery/02-glasses-happy.jpg', caption: 'A little piece of happiness.', rotation: 2, tone: 'sky', aspectRatio: '941 / 414' },
  { id: 3, src: '/assets/images/gallery/03-glasses-soft.jpg', caption: 'You make my world prettier.', rotation: -1, tone: 'peach', aspectRatio: '941 / 414' },
  { id: 4, src: '/assets/images/gallery/04-glasses-playful.jpg', caption: 'My favorite person.', rotation: 3, tone: 'sage', aspectRatio: '941 / 416' },
  { id: 5, src: '/assets/images/gallery/01-green-glasses-smile.jpg', caption: 'That pretty little smile.', rotation: -2, tone: 'lilac', aspectRatio: '941 / 416' },
  { id: 6, src: '/assets/images/gallery/02-green-glasses-thinking.jpg', caption: 'A little moment, a big feeling.', rotation: 1, tone: 'rose', aspectRatio: '941 / 414' },
  { id: 7, src: '/assets/images/gallery/03-green-glasses-kiss.jpg', caption: 'My sweetest memory.', rotation: -3, tone: 'sky', aspectRatio: '941 / 414' },
  { id: 8, src: '/assets/images/gallery/04-green-glasses-pout.jpg', caption: 'Forever my favorite view.', rotation: 2, tone: 'peach', aspectRatio: '941 / 416' },
  { id: 9, src: '/assets/images/gallery/09-black-hijab-close.jpg', caption: 'Soft eyes, warm heart.', rotation: -2, tone: 'lilac', aspectRatio: '1235 / 719' },
  { id: 10, src: '/assets/images/gallery/10-pink-hijab-reflect.jpg', caption: 'Thinking of something sweet.', rotation: 2, tone: 'sage', aspectRatio: '1240 / 716' },
  { id: 11, src: '/assets/images/gallery/11-pink-hijab-close.jpg', caption: 'A cute little side glance.', rotation: -1, tone: 'rose', aspectRatio: '1220 / 716' },
  { id: 12, src: '/assets/images/gallery/12-night-soft-smile.jpg', caption: 'A soft smile for the night.', rotation: 2, tone: 'sky', aspectRatio: '1276 / 720' },
  { id: 13, src: '/assets/images/gallery/13-night-portrait.jpg', caption: 'Even the night looks prettier.', rotation: -2, tone: 'lilac', aspectRatio: '576 / 1280' },
  { id: 14, src: '/assets/images/gallery/14-pink-hijab-peace.jpg', caption: 'My favorite peace sign ♡', rotation: 3, tone: 'peach', aspectRatio: '1240 / 716' },
];
