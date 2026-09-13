import hero from "../assets/hero.jpg";
import g1 from "../assets/gallery-1.jpg";
import g2 from "../assets/gallery-2.jpg";
import g3 from "../assets/gallery-3.jpg";
import g4 from "../assets/gallery-4.jpg";
import g5 from "../assets/gallery-5.jpg";
import g6 from "../assets/gallery-6.jpg";

/* ─────────────────────────────────────────────
   ✏️  عدّل من هنا
   ───────────────────────────────────────────── */
export const config = {
  /** كلمة السر اللي بتفتح الموقع */
  password: "1582006",
  /** اسم حبيبتك (سيبها "حبيبتي" أو اكتب اسمها) */
  herName: "حبيبتي",
  /** تاريخ الميلاد: 15 / 8 / 2006 */
  birthDay: 15,
  birthMonth: 8, // أغسطس
  birthYear: 2006,
  /** توقيعك في آخر الرسالة */
  signature: "من قلب بيحبك أكتر ما تتخيلي",
};

export const birthDate = new Date(
  config.birthYear,
  config.birthMonth - 1,
  config.birthDay,
);

/* ─────────────────────────────────────────────
   🎵  الأغنية اللي بتشتغل أول ما تدخل الباسورد
   ───────────────────────────────────────────── */
export const music = {
  title: "إنتي الحياة",
  artist: "محمد الشرنوبي",
  /**
   * ID فيديو يوتيوب (الجزء اللي بعد v= في اللينك).
   * أول فيديو شغال هيتشغل، والباقي احتياطي لو الأول اتقفل.
   */
  youtubeIds: [
    "a0DP6iV1F3g", // Sharnouby - Enti El Hayah | Official Lyric Video
    "VK_wZm-dP6w", // Enty El Hayah (من مسلسل إيجار قديم) - Auto-generated
    "BSkC3On2QkQ", // نسخة احتياطية
  ],
};

export const heroImage = hero;

export const heroLines = {
  script: "Happy Birthday, My Love",
  title: "كل سنة وانتي حبيبتي",
  subtitle: "في اليوم ده اتولد أحلى قلب شافته الدنيا",
  date: "15 · 08 · 2006",
};

export const photos = [
  {
    src: g1,
    caption: "وردة عن كل يوم حبيتك فيه",
    sub: "A rose for every day I've loved you",
    tall: true,
  },
  {
    src: g2,
    caption: "إيدي في إيدك لحد آخر غروب",
    sub: "My hand in yours until the last sunset",
    tall: false,
  },
  {
    src: g3,
    caption: "أحلى شمعة في أحلى عيد ميلاد",
    sub: "The sweetest candle on the sweetest day",
    tall: true,
  },
  {
    src: g4,
    caption: "قلبي بيطير ليكي",
    sub: "My heart flies to you",
    tall: true,
  },
  {
    src: g5,
    caption: "انتي قمري كل ليلة",
    sub: "You are my moon every night",
    tall: true,
  },
  {
    src: g6,
    caption: "قهوتنا الصبح… أحلى عادة",
    sub: "Our morning coffee... the sweetest habit",
    tall: false,
  },
];

export const loveLetter = {
  greeting: "لأغلى إنسانة في حياتي…",
  paragraphs: [
    "يوم 15 أغسطس مكانش يوم عادي… ده اليوم اللي اتولدتي فيه انتي، واتولد معاكي كل الجمال اللي أعرفه.",
    "من يوم ما دخلتي حياتي وأنا بشوف الدنيا بعيون تانية؛ الصبح بقى أدفى، والليل بقى أهدى، وقلبي بقى عارف يعني إيه يدق عشان حد.",
    "انتي مش مجرد حبيبة… انتي البيت اللي برجع له، والضحكة اللي عمري ما هزهق منها، والأمنية اللي اتحققت قبل ما أطلبها.",
    "في عيد ميلادك معنديش هدية تليق بيكي، بس بهديكي قلبي كله، ووعد إني هفضل جنبك كل سنة جاية، وكل يوم، وكل لحظة.",
    "كل سنة وانتي الحب… كل سنة وانتي الحياة… كل سنة وانتي ليّا.",
  ],
  closing: "بحبك أكتر من امبارح وأقل من بكرة",
};

export const reasons = [
  {
    icon: "🌅",
    title: "ضحكتك",
    text: "ضحكتك هي شمسي اللي عمرها ما بتغيب، بتطلع في وشي فتنوّر يومي كله.",
  },
  {
    icon: "💓",
    title: "قلبك الطيب",
    text: "قلبك اللي واسع للكل، ومع كده لاقي ليّا فيه أحلى مكان.",
  },
  {
    icon: "🌙",
    title: "هدوءك",
    text: "جنبك كل حاجة بتهدى، كإن الدنيا كلها بتسكت عشان تسمع صوتك.",
  },
  {
    icon: "✨",
    title: "طريقتك في الحب",
    text: "معاكي اتعلمت إن الحب مش كلمة بتتقال، ده حياة بتتعاش بكل تفاصيلها.",
  },
  {
    icon: "🌹",
    title: "جمالك",
    text: "جمالك مش في ملامحك بس، ده في روحك اللي بتخلي كل حاجة حواليكي أحلى.",
  },
  {
    icon: "🏡",
    title: "انتي بيتي",
    text: "في أي مكان انتي فيه يبقى هو بيتي، ووجودك في حياتي أحلى هدية خدتها في عمري.",
  },
];

export const wishes = [
  { icon: "🎂", text: "بتمنالك سنة مليانة فرح وحب ونجاح" },
  { icon: "🌸", text: "وإن كل أحلامك الصغيرة والكبيرة تتحقق" },
  { icon: "💫", text: "وإن قلبك يفضل مبسوط زي ما بتبسطي قلبي" },
  { icon: "🕊️", text: "وربنا يحفظك ويحميكي من كل شر" },
  { icon: "🌍", text: "وإننا نلف الدنيا سوا، إيد في إيد" },
  { icon: "♾️", text: "وإن العيد ده يبقى واحد من ميت عيد نحتفل بيهم سوا" },
];

export const shortQuotes = [
  "انتي نبض قلبي وسر سعادتي",
  "كل يوم معاكي عيد",
  "وجودك في حياتي أحلى هدية",
  "يا قمري، كل سنة وانتي نور عيني",
  "انتي حكايتي الحلوة اللي نفسي ما تخلصش أبداً",
  "من 15 أغسطس 2006 والدنيا أحلى",
];

export const finalMessage = {
  big: "بحبك",
  line1: "بكل الحب اللي في قلبي، وبكل السنين اللي في عمري",
  line2: "كل سنة وانتي حبيبتي… وكل سنة وإحنا سوا",
};
