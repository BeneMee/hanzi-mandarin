/* Seed-Daten für den Prototyp – Level 1.
 * Baustein-Logik: Komponenten -> Hanzi -> Vokabeln.
 * Aussprache als Pinyin (Tonzahl + Tonzeichen) und Bopomofo gespeichert. */
window.DATA = {
  level: 1,

  // ---- Ebene 1: Komponenten (funktional: semantisch/phonetisch) ----
  components: [
    { id: "c_ren", glyph: "人", name: "person", meaning: "person",
      mnemonic: "A little stick <b>person</b> standing on two legs." },
    { id: "c_ri", glyph: "日", name: "sun", meaning: "sun / day",
      mnemonic: "A box with a line through it — a picture of the <b>sun</b>." },
    { id: "c_yue", glyph: "月", name: "moon", meaning: "moon / month",
      mnemonic: "A crescent <b>moon</b> tilted on its side." },
    { id: "c_mu", glyph: "木", name: "tree", meaning: "tree / wood",
      mnemonic: "A <b>tree</b> with branches reaching up and roots reaching down." },
    { id: "c_da", glyph: "大", name: "big", meaning: "big",
      mnemonic: "A <b>person</b> stretching their arms out wide to show how <b>big</b> something is." },
    { id: "c_nv", glyph: "女", name: "woman", meaning: "woman",
      mnemonic: "A <b>woman</b> with crossed legs, sitting gracefully." },
    { id: "c_zi", glyph: "子", name: "child", meaning: "child",
      mnemonic: "A baby — a <b>child</b> swaddled with its arms wrapped up." },
    { id: "c_yi", glyph: "一", name: "ground", meaning: "one / ground",
      mnemonic: "A single horizontal line: the <b>ground</b>." }
  ],

  // ---- Ebene 2: Hanzi (Einzelzeichen, traditionell) ----
  hanzi: [
    { id: "h_ren", character: "人", meaning: "person",
      reading: { pinyinNum: "ren2", pinyinMark: "rén", zhuyin: "ㄖㄣˊ" },
      componentIds: ["c_ren"], strokeCount: 2,
      meaningMnemonic: "This is just the <b>person</b> component standing on its own. It means <b>person</b>.",
      readingMnemonic: "Picture a <b>person</b> you know named <b>Ren</b> (rén)." },

    { id: "h_mu", character: "木", meaning: "tree",
      reading: { pinyinNum: "mu4", pinyinMark: "mù", zhuyin: "ㄇㄨˋ" },
      componentIds: ["c_mu"], strokeCount: 4,
      meaningMnemonic: "The <b>tree</b> component on its own. It means <b>tree</b>.",
      readingMnemonic: "A cow (<b>moo</b>, mù) is chewing the bark off a tree." },

    { id: "h_da", character: "大", meaning: "big",
      reading: { pinyinNum: "da4", pinyinMark: "dà", zhuyin: "ㄉㄚˋ" },
      componentIds: ["c_da"], strokeCount: 3,
      meaningMnemonic: "The <b>big</b> component on its own. It means <b>big</b>.",
      readingMnemonic: "Your <b>dad</b> (dà) is the biggest person you know." },

    { id: "h_tian", character: "天", meaning: "sky / day",
      reading: { pinyinNum: "tian1", pinyinMark: "tiān", zhuyin: "ㄊㄧㄢ" },
      componentIds: ["c_yi", "c_da"], strokeCount: 4,
      meaningMnemonic: "<b>One</b> (一) line above the <b>big</b> (大) person — what's bigger than a person and above everything? The <b>sky</b>.",
      readingMnemonic: "Up in the <b>sky</b> you see <b>ten</b> (tiān) suns." },

    { id: "h_ming", character: "明", meaning: "bright",
      reading: { pinyinNum: "ming2", pinyinMark: "míng", zhuyin: "ㄇㄧㄥˊ" },
      componentIds: ["c_ri", "c_yue"], strokeCount: 8,
      meaningMnemonic: "The <b>sun</b> (日) and the <b>moon</b> (月) together — the two brightest things — make everything <b>bright</b>.",
      readingMnemonic: "A friend named <b>Ming</b> (míng) glows so brightly you can read by him." },

    { id: "h_lin", character: "林", meaning: "woods",
      reading: { pinyinNum: "lin2", pinyinMark: "lín", zhuyin: "ㄌㄧㄣˊ" },
      componentIds: ["c_mu", "c_mu"], strokeCount: 8,
      meaningMnemonic: "Two <b>trees</b> (木木) standing side by side make a small <b>woods</b>.",
      readingMnemonic: "You <b>lean</b> (lín) against a tree at the edge of the woods." },

    { id: "h_xiu", character: "休", meaning: "rest",
      reading: { pinyinNum: "xiu1", pinyinMark: "xiū", zhuyin: "ㄒㄧㄡ" },
      componentIds: ["c_ren", "c_mu"], strokeCount: 6,
      meaningMnemonic: "A <b>person</b> (亻) leaning against a <b>tree</b> (木) to take a <b>rest</b>.",
      readingMnemonic: "You take a rest and let out a relieved <b>shyo~</b> (xiū)." },

    { id: "h_hao", character: "好", meaning: "good",
      reading: { pinyinNum: "hao3", pinyinMark: "hǎo", zhuyin: "ㄏㄠˇ" },
      componentIds: ["c_nv", "c_zi"], strokeCount: 6,
      meaningMnemonic: "A <b>woman</b> (女) with her <b>child</b> (子) — everything is <b>good</b>.",
      readingMnemonic: "A dog says <b>howw</b> (hǎo)? No — it says everything is good." }
  ],

  // ---- Ebene 3: Vokabeln (Wörter aus 1+ Hanzi) ----
  vocab: [
    { id: "v_daren", word: "大人", meaning: "adult",
      reading: { pinyinNum: "da4ren2", pinyinMark: "dà rén", zhuyin: "ㄉㄚˋ ㄖㄣˊ" },
      hanziIds: ["h_da", "h_ren"],
      note: "Literally a “big person”. That's an <b>adult</b>." },

    { id: "v_haoren", word: "好人", meaning: "good person",
      reading: { pinyinNum: "hao3ren2", pinyinMark: "hǎo rén", zhuyin: "ㄏㄠˇ ㄖㄣˊ" },
      hanziIds: ["h_hao", "h_ren"],
      note: "“Good” + “person” = a <b>good person</b>." },

    { id: "v_mingtian", word: "明天", meaning: "tomorrow",
      reading: { pinyinNum: "ming2tian1", pinyinMark: "míng tiān", zhuyin: "ㄇㄧㄥˊ ㄊㄧㄢ" },
      hanziIds: ["h_ming", "h_tian"],
      note: "The “bright” day that follows this one is <b>tomorrow</b>." },

    { id: "v_tiantian", word: "天天", meaning: "every day",
      reading: { pinyinNum: "tian1tian1", pinyinMark: "tiān tiān", zhuyin: "ㄊㄧㄢ ㄊㄧㄢ" },
      hanziIds: ["h_tian", "h_tian"],
      note: "Day after day after day — <b>every day</b>." }
  ]
};
