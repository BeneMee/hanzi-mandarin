/* Level 2 — HSK 2 based, traditional characters. */
window.DATA2 = {
  level: 2,

  components: [
    { id: "c2_kou", glyph: "口", name: "mouth", meaning: "mouth",
      mnemonic: "A square box — an open <b>mouth</b>." },
    { id: "c2_shan", glyph: "山", name: "mountain", meaning: "mountain",
      mnemonic: "Three peaks, the middle one tallest — a <b>mountain</b> range." },
    { id: "c2_shui", glyph: "氵", name: "water", meaning: "water",
      mnemonic: "Three drops of <b>water</b> dripping down the left side." },
    { id: "c2_huo", glyph: "火", name: "fire", meaning: "fire",
      mnemonic: "Flames shooting up with sparks flying sideways — <b>fire</b>." },
    { id: "c2_xin", glyph: "忄", name: "heart", meaning: "heart / feeling",
      mnemonic: "A <b>heart</b> on the left: two drops of blood and a stroke." },
    { id: "c2_shou", glyph: "扌", name: "hand", meaning: "hand",
      mnemonic: "A <b>hand</b> reaching out — three fingers and a palm stroke." },
    { id: "c2_mu2", glyph: "目", name: "eye", meaning: "eye",
      mnemonic: "A vertical rectangle with two lines inside — an <b>eye</b> on its side." },
    { id: "c2_li", glyph: "力", name: "strength", meaning: "strength / power",
      mnemonic: "A flexed arm muscle — <b>strength</b>." }
  ],

  hanzi: [
    { id: "h2_kou", character: "口", meaning: "mouth / opening",
      reading: { pinyinNum: "kou3", pinyinMark: "kǒu", zhuyin: "ㄎㄡˇ" },
      componentIds: ["c2_kou"], strokeCount: 3,
      meaningMnemonic: "The <b>mouth</b> component standing alone — it means <b>mouth</b>.",
      readingMnemonic: "Open your <b>mouth</b> and shout 'Ko!' (kǒu) — 3rd tone, rising then falling." },

    { id: "h2_shan", character: "山", meaning: "mountain",
      reading: { pinyinNum: "shan1", pinyinMark: "shān", zhuyin: "ㄕㄢ" },
      componentIds: ["c2_shan"], strokeCount: 3,
      meaningMnemonic: "Three peaks — a <b>mountain</b>.",
      readingMnemonic: "A <b>shan</b>ty town is built at the foot of the <b>mountain</b>." },

    { id: "h2_shui", character: "水", meaning: "water",
      reading: { pinyinNum: "shui3", pinyinMark: "shuǐ", zhuyin: "ㄕㄨㄟˇ" },
      componentIds: ["c2_shui"], strokeCount: 4,
      meaningMnemonic: "The full form of the <b>water</b> radical — it means <b>water</b>.",
      readingMnemonic: "You '<b>shway</b>' (shuǐ) through the water when you swim." },

    { id: "h2_huo", character: "火", meaning: "fire",
      reading: { pinyinNum: "huo3", pinyinMark: "huǒ", zhuyin: "ㄏㄨㄛˇ" },
      componentIds: ["c2_huo"], strokeCount: 4,
      meaningMnemonic: "The full form of the <b>fire</b> radical — it means <b>fire</b>.",
      readingMnemonic: "The <b>fire</b> makes you gasp '<b>Whoa!</b>' (huǒ)." },

    { id: "h2_bai", character: "白", meaning: "white",
      reading: { pinyinNum: "bai2", pinyinMark: "bái", zhuyin: "ㄅㄞˊ" },
      componentIds: ["c_ri"], strokeCount: 5,
      meaningMnemonic: "The <b>sun</b> (日) with a small ray of light on top — the blinding <b>white</b> light of the sun.",
      readingMnemonic: "You '<b>buy</b>' (bái) a <b>white</b> dress on sale." },

    { id: "h2_nan", character: "男", meaning: "male",
      reading: { pinyinNum: "nan2", pinyinMark: "nán", zhuyin: "ㄋㄢˊ" },
      componentIds: ["c2_li"], strokeCount: 7,
      meaningMnemonic: "A field (田) plus <b>strength</b> (力) — the stereotypical <b>male</b> who works the fields with brute force.",
      readingMnemonic: "The <b>man</b> says '<b>Nah!</b>' (nán) when asked to do the dishes." },

    { id: "h2_duo", character: "多", meaning: "many / much",
      reading: { pinyinNum: "duo1", pinyinMark: "duō", zhuyin: "ㄉㄨㄛ" },
      componentIds: [], strokeCount: 6,
      meaningMnemonic: "Two 'evening' (夕) shapes stacked — so <b>many</b> evenings have passed.",
      readingMnemonic: "A '<b>duo</b>' (duō) means two — and <b>many</b> duos is a lot." },

    { id: "h2_zao", character: "早", meaning: "early / morning",
      reading: { pinyinNum: "zao3", pinyinMark: "zǎo", zhuyin: "ㄗㄠˇ" },
      componentIds: ["c_ri"], strokeCount: 6,
      meaningMnemonic: "The <b>sun</b> (日) just rising above the horizon (十) — it's <b>early morning</b>.",
      readingMnemonic: "'<b>Zǎo!</b>' is how Chinese people say good morning — it means <b>early</b>." },

    { id: "h2_chang", character: "長", meaning: "long",
      reading: { pinyinNum: "chang2", pinyinMark: "cháng", zhuyin: "ㄔㄤˊ" },
      componentIds: [], strokeCount: 8,
      meaningMnemonic: "Long flowing hair stretching all the way down — it is <b>long</b>.",
      readingMnemonic: "A '<b>chang</b>e' (cháng) of plans always takes a <b>long</b> time." },

    { id: "h2_lai", character: "來", meaning: "to come",
      reading: { pinyinNum: "lai2", pinyinMark: "lái", zhuyin: "ㄌㄞˊ" },
      componentIds: ["c_mu"], strokeCount: 8,
      meaningMnemonic: "A <b>tree</b> (木) with people approaching from both sides — everyone <b>comes</b> to the tree.",
      readingMnemonic: "You '<b>lie</b>' (lái) in wait for someone to <b>come</b>." }
  ],

  vocab: [
    { id: "v2_renkou", word: "人口", meaning: "population",
      reading: { pinyinNum: "ren2kou3", pinyinMark: "rén kǒu", zhuyin: "ㄖㄣˊ ㄎㄡˇ" },
      hanziIds: ["h_ren", "h2_kou"],
      note: "Literally 'person mouths' — count the <b>mouths</b> to feed and you have the <b>population</b>." },

    { id: "v2_shanshui", word: "山水", meaning: "landscape / scenery",
      reading: { pinyinNum: "shan1shui3", pinyinMark: "shān shuǐ", zhuyin: "ㄕㄢ ㄕㄨㄟˇ" },
      hanziIds: ["h2_shan", "h2_shui"],
      note: "<b>Mountains</b> and <b>water</b> — the classical Chinese image of beautiful natural <b>scenery</b>." },

    { id: "v2_nanren", word: "男人", meaning: "man",
      reading: { pinyinNum: "nan2ren2", pinyinMark: "nán rén", zhuyin: "ㄋㄢˊ ㄖㄣˊ" },
      hanziIds: ["h2_nan", "h_ren"],
      note: "<b>Male</b> + <b>person</b> = a <b>man</b>." },

    { id: "v2_baitian", word: "白天", meaning: "daytime",
      reading: { pinyinNum: "bai2tian1", pinyinMark: "bái tiān", zhuyin: "ㄅㄞˊ ㄊㄧㄢ" },
      hanziIds: ["h2_bai", "h_tian"],
      note: "The <b>white</b> bright <b>sky</b> of the day — <b>daytime</b>." },

    { id: "v2_dashui", word: "大水", meaning: "flood",
      reading: { pinyinNum: "da4shui3", pinyinMark: "dà shuǐ", zhuyin: "ㄉㄚˋ ㄕㄨㄟˇ" },
      hanziIds: ["h_da", "h2_shui"],
      note: "<b>Big water</b> — a <b>flood</b>." },

    { id: "v2_haoduo", word: "好多", meaning: "so many / a lot",
      reading: { pinyinNum: "hao3duo1", pinyinMark: "hǎo duō", zhuyin: "ㄏㄠˇ ㄉㄨㄛ" },
      hanziIds: ["h_hao", "h2_duo"],
      note: "Literally 'good many' — used colloquially to mean <b>so many</b> or <b>a lot</b>." },

    { id: "v2_dahuo", word: "大火", meaning: "big fire / blaze",
      reading: { pinyinNum: "da4huo3", pinyinMark: "dà huǒ", zhuyin: "ㄉㄚˋ ㄏㄨㄛˇ" },
      hanziIds: ["h_da", "h2_huo"],
      note: "A <b>big fire</b> — also used figuratively for a huge hit or sensation." },

    { id: "v2_mingbai", word: "明白", meaning: "to understand / clear",
      reading: { pinyinNum: "ming2bai2", pinyinMark: "míng bái", zhuyin: "ㄇㄧㄥˊ ㄅㄞˊ" },
      hanziIds: ["h_ming", "h2_bai"],
      note: "<b>Bright</b> and <b>white</b>/clear — when something is illuminated and clear to you, you <b>understand</b> it." }
  ]
};
