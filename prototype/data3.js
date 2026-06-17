/* Level 3 — HSK 3 based, traditional characters. */
window.DATA3 = {
  level: 3,

  components: [
    { id: "c3_yan", glyph: "訁", name: "speech", meaning: "speech / words",
      mnemonic: "The <b>speech</b> radical — a mouth with lines of <b>words</b> flowing from it." },
    { id: "c3_men", glyph: "門", name: "gate", meaning: "gate / door",
      mnemonic: "Two wooden panels side by side — a traditional <b>gate</b>." },
    { id: "c3_she", glyph: "舌", name: "tongue", meaning: "tongue",
      mnemonic: "A mouth (口) with something sticking out — a <b>tongue</b>." },
    { id: "c3_tu", glyph: "土", name: "earth", meaning: "earth / soil",
      mnemonic: "A cross on a base — a mound of <b>earth</b> or soil." },
    { id: "c3_xiang", glyph: "相", name: "mutual", meaning: "mutual / appearance",
      mnemonic: "An <b>eye</b> (目) looking at a <b>tree</b> (木) — gazing at something, seeing its appearance." },
    { id: "c3_wang", glyph: "亡", name: "gone", meaning: "gone / lost",
      mnemonic: "A person (人) walking under a roof and disappearing — <b>gone</b>." }
  ],

  hanzi: [
    { id: "h3_wen", character: "問", meaning: "to ask / question",
      reading: { pinyinNum: "wen4", pinyinMark: "wèn", zhuyin: "ㄨㄣˋ" },
      componentIds: ["c3_men", "c2_kou"], strokeCount: 11,
      meaningMnemonic: "A <b>mouth</b> (口) inside a <b>gate</b> (門) — calling out from behind the gate to <b>ask</b> who's there.",
      readingMnemonic: "You <b>wen</b>t up to the gate to <b>ask</b> who was there." },

    { id: "h3_jian", character: "間", meaning: "between / space / room",
      reading: { pinyinNum: "jian1", pinyinMark: "jiān", zhuyin: "ㄐㄧㄢ" },
      componentIds: ["c3_men", "c_ri"], strokeCount: 12,
      meaningMnemonic: "The <b>sun</b> (日) shining through the crack <b>between</b> the <b>gate</b> (門) doors.",
      readingMnemonic: "The <b>gene</b>ral stands in the <b>space between</b> the gates." },

    { id: "h3_shuo", character: "說", meaning: "to speak / to say",
      reading: { pinyinNum: "shuo1", pinyinMark: "shuō", zhuyin: "ㄕㄨㄛ" },
      componentIds: ["c3_yan"], strokeCount: 14,
      meaningMnemonic: "The <b>speech</b> (訁) radical on the left — this whole character is about <b>speaking</b>.",
      readingMnemonic: "You '<b>shwoh</b>' (shuō) as you exhale while <b>speaking</b>." },

    { id: "h3_hua", character: "話", meaning: "speech / words",
      reading: { pinyinNum: "hua4", pinyinMark: "huà", zhuyin: "ㄏㄨㄚˋ" },
      componentIds: ["c3_yan", "c3_she"], strokeCount: 13,
      meaningMnemonic: "<b>Speech</b> (訁) plus <b>tongue</b> (舌) — <b>words</b> that come from your tongue.",
      readingMnemonic: "The <b>wha</b>t (huà) is he saying? <b>Words</b> come out." },

    { id: "h3_huo", character: "活", meaning: "to live / alive / lively",
      reading: { pinyinNum: "huo2", pinyinMark: "huó", zhuyin: "ㄏㄨㄛˊ" },
      componentIds: ["c2_shui", "c3_she"], strokeCount: 9,
      meaningMnemonic: "<b>Water</b> (氵) and a <b>tongue</b> (舌) — water keeps the tongue wet, keeps you <b>alive</b>.",
      readingMnemonic: "'<b>Huo</b>!' you exclaim — you're <b>alive</b>! (same sound as 火 fire, 2nd tone here)" },

    { id: "h3_kuai", character: "快", meaning: "fast / quick",
      reading: { pinyinNum: "kuai4", pinyinMark: "kuài", zhuyin: "ㄎㄨㄞˋ" },
      componentIds: ["c2_xin"], strokeCount: 7,
      meaningMnemonic: "The <b>heart</b> (忄) beating — when your heart races, everything is <b>fast</b>.",
      readingMnemonic: "A <b>kite</b> (kuài) flies <b>fast</b> through the sky." },

    { id: "h3_xiang", character: "想", meaning: "to think / to want",
      reading: { pinyinNum: "xiang3", pinyinMark: "xiǎng", zhuyin: "ㄒㄧㄤˇ" },
      componentIds: ["c3_xiang", "c2_xin"], strokeCount: 13,
      meaningMnemonic: "<b>Mutual/appearance</b> (相) above the <b>heart</b> (心) — you see someone and your heart <b>thinks</b> of them and <b>wants</b> them.",
      readingMnemonic: "You '<b>shyang</b>' (xiǎng) — a sheep (<b>shyang</b>) is what you <b>think</b> of when counting." },

    { id: "h3_mang", character: "忙", meaning: "busy",
      reading: { pinyinNum: "mang2", pinyinMark: "máng", zhuyin: "ㄇㄤˊ" },
      componentIds: ["c2_xin", "c3_wang"], strokeCount: 6,
      meaningMnemonic: "Your <b>heart</b> (忄) is <b>gone</b>/lost (亡) — when you're so <b>busy</b> you've lost your mind.",
      readingMnemonic: "A <b>mango</b> (máng) farmer is always <b>busy</b> during harvest." },

    { id: "h3_yu", character: "語", meaning: "language / to speak",
      reading: { pinyinNum: "yu3", pinyinMark: "yǔ", zhuyin: "ㄩˇ" },
      componentIds: ["c3_yan"], strokeCount: 14,
      meaningMnemonic: "The <b>speech</b> (訁) radical on the left — all about <b>language</b>.",
      readingMnemonic: "You say '<b>Yu</b>!' (yǔ) when someone speaks a <b>language</b> you don't understand." },

    { id: "h3_di", character: "地", meaning: "earth / ground / place",
      reading: { pinyinNum: "di4", pinyinMark: "dì", zhuyin: "ㄉㄧˋ" },
      componentIds: ["c3_tu"], strokeCount: 6,
      meaningMnemonic: "<b>Earth</b> (土) on the left — this character means the <b>ground</b> or a <b>place</b>.",
      readingMnemonic: "You '<b>dee</b>' (dì) underground — digging into the <b>earth</b>." }
  ],

  vocab: [
    { id: "v3_shuoming", word: "說明", meaning: "to explain / explanation",
      reading: { pinyinNum: "shuo1ming2", pinyinMark: "shuō míng", zhuyin: "ㄕㄨㄛ ㄇㄧㄥˊ" },
      hanziIds: ["h3_shuo", "h_ming"],
      note: "<b>Say</b> something to make it <b>bright</b>/clear — to <b>explain</b>." },

    { id: "v3_shuohua", word: "說話", meaning: "to speak / to talk",
      reading: { pinyinNum: "shuo1hua4", pinyinMark: "shuō huà", zhuyin: "ㄕㄨㄛ ㄏㄨㄚˋ" },
      hanziIds: ["h3_shuo", "h3_hua"],
      note: "<b>Speak</b> + <b>words</b> — to <b>talk</b>." },

    { id: "v3_wenhao", word: "問好", meaning: "to say hello / to send greetings",
      reading: { pinyinNum: "wen4hao3", pinyinMark: "wèn hǎo", zhuyin: "ㄨㄣˋ ㄏㄠˇ" },
      hanziIds: ["h3_wen", "h_hao"],
      note: "<b>Ask</b> after someone's wellbeing — to <b>say hello</b> or send your regards." },

    { id: "v3_kuailai", word: "快來", meaning: "come quickly",
      reading: { pinyinNum: "kuai4lai2", pinyinMark: "kuài lái", zhuyin: "ㄎㄨㄞˋ ㄌㄞˊ" },
      hanziIds: ["h3_kuai", "h2_lai"],
      note: "<b>Fast</b> + <b>come</b> — <b>come quickly</b>!" },

    { id: "v3_kuaihuo", word: "快活", meaning: "cheerful / carefree",
      reading: { pinyinNum: "kuai4huo2", pinyinMark: "kuài huó", zhuyin: "ㄎㄨㄞˋ ㄏㄨㄛˊ" },
      hanziIds: ["h3_kuai", "h3_huo"],
      note: "<b>Quick</b> and <b>lively</b> — someone who is <b>cheerful</b> and carefree." },

    { id: "v3_duohua", word: "多話", meaning: "talkative / long-winded",
      reading: { pinyinNum: "duo1hua4", pinyinMark: "duō huà", zhuyin: "ㄉㄨㄛ ㄏㄨㄚˋ" },
      hanziIds: ["h2_duo", "h3_hua"],
      note: "<b>Many words</b> — a <b>talkative</b> person." },

    { id: "v3_dadi", word: "大地", meaning: "the earth / mother earth",
      reading: { pinyinNum: "da4di4", pinyinMark: "dà dì", zhuyin: "ㄉㄚˋ ㄉㄧˋ" },
      hanziIds: ["h_da", "h3_di"],
      note: "The <b>great earth</b> — used poetically for the land or mother earth." },

    { id: "v3_xianglai", word: "想來", meaning: "presumably / it seems",
      reading: { pinyinNum: "xiang3lai2", pinyinMark: "xiǎng lái", zhuyin: "ㄒㄧㄤˇ ㄌㄞˊ" },
      hanziIds: ["h3_xiang", "h2_lai"],
      note: "<b>Thinking</b> it <b>comes</b> to be — <b>presumably</b> or 'it seems that…'." }
  ]
};
