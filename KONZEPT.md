# Konzept: WaniKani-artige Lern-App für Mandarin (traditionelle Schriftzeichen)

Stand: 2026-06-17 · Ziel: erst MVP (Web-App) zur Eigennutzung, später skalierbar.

---

## 1. Vision

Eine Lern-App, die das didaktische Prinzip von **WaniKani** (Japanisch-Kanji)
auf **Mandarin mit traditionellen Schriftzeichen** überträgt:

- Schriftzeichen werden **nicht isoliert**, sondern in einer Pyramide gelernt:
  **Bausteine → Zeichen → Vokabeln**.
- Lernen über **Mnemonics** (Eselsbrücken) + **SRS** (Spaced Repetition).
- Aussprache wahlweise als **Pinyin** oder **Bopomofo (注音)** anzeigbar/abfragbar.

---

## 2. WaniKani genau analysiert

### 2.1 Die 3-Ebenen-Pyramide
| Ebene | Was | Anzahl (WK) | Wird abgefragt auf |
|------|-----|------------|--------------------|
| Radikale | erfundene Bausteine mit Namen | ~480 | Bedeutung (Name) |
| Kanji | aus Radikalen zusammengesetzt | ~2000 | Bedeutung **und** Lesung |
| Vokabeln | echte Wörter aus Kanji | ~6000 | Bedeutung **und** Lesung |

**Gating-Logik:** Radikale schalten Kanji frei (Kanji erscheinen erst als
„Lesson", wenn alle enthaltenen Radikale auf Stufe *Guru* sind). Kanji schalten
Vokabeln frei. Das hält den Lernstoff immer „verankert".

### 2.2 Mnemonics
- Jedes Kanji bekommt **zwei Geschichten**:
  - **Bedeutungs-Mnemonic**: verknüpft die enthaltenen Radikal-*Namen* → Bedeutung.
  - **Lesungs-Mnemonic**: verknüpft das Zeichen mit seiner Aussprache.
- Die erfundenen Radikal-Namen sind die „Vokabeln" dieser Geschichten.

### 2.3 SRS (Spaced Repetition System) — exakt
9 Stufen, mit wachsenden Intervallen (aktuelles WK-System):

| Stufe | Name | Intervall bis nächstem Review |
|------|------|------------------------------|
| 1 | Apprentice I | 4 h |
| 2 | Apprentice II | 8 h |
| 3 | Apprentice III | ~1 Tag (23 h) |
| 4 | Apprentice IV | ~2 Tage (47 h) |
| 5 | Guru I | 1 Woche |
| 6 | Guru II | 2 Wochen |
| 7 | Master | 1 Monat |
| 8 | Enlightened | 4 Monate |
| 9 | Burned | gelernt – verschwindet |

- **Richtig** → +1 Stufe.
- **Falsch** → Rückstufung: `neue_Stufe = aktuelle_Stufe − (Fehleranzahl × Straffaktor)`,
  Straffaktor = **2** ab Guru (Stufe ≥ 5), sonst **1**. Minimum = Stufe 1.
- Ein Item gilt im Review erst als erledigt, wenn **beide** Aspekte (Bedeutung
  *und* Lesung, falls vorhanden) richtig beantwortet sind.

### 2.4 Level & Fortschritt
- 60 Level. Jedes Level liefert ein Set Radikale → Kanji → Vokabeln.
- **Level-Up:** wenn ~90 % der Kanji des Levels mindestens *Guru* erreicht haben.

### 2.5 Lessons vs. Reviews
- **Lessons**: neuen Stoff kennenlernen (Mnemonic lesen), startet auf Stufe 1.
- **Reviews**: zeitgesteuerte Abfrage fälliger Items.

### 2.6 Antwort-Prüfung
- **Bedeutung**: Freitext mit Fuzzy-Toleranz (Levenshtein), Synonyme erlaubt,
  eigene Synonyme hinzufügbar.
- **Lesung**: in Kana getippt, **exakt** geprüft. Bei „falschem Antworttyp"
  (z. B. Bedeutung statt Lesung) → „shake" statt Wertung.

---

## 3. Übertragung auf Mandarin (traditionell)

### 3.1 Mapping der Ebenen
| WaniKani | Diese App | Quelle |
|----------|-----------|--------|
| Radikale | **Komponenten** (semantisch + **phonetisch**) | Make-Me-a-Hanzi / IDS / Unihan |
| Kanji | **Hanzi** (Einzelzeichen, traditionell) | CC-CEDICT / Unihan |
| Vokabeln | **Vokabeln** (Wörter aus 1+ Hanzi) | CC-CEDICT |

### 3.2 Wichtige Unterschiede zum Japanischen
- **Eine Aussprache pro Zeichen** (meist) statt on-/kun-Lesungen → einfacher.
  Ausnahmen: 多音字 (Mehrfachlesungen, z. B. 行 xíng/háng) gesondert behandeln.
- **Töne** sind Pflichtbestandteil der Lesung (4 Töne + neutral).
- **Kein Kana** → Eingabe über **Pinyin** oder **Bopomofo**.
- **Phonetischer Vorteil:** ~80 % der Zeichen sind Phono-Semantik-Komposita.
  Die Komponenten-Ebene kann – anders als WaniKani – **echte Aussprache-Hinweise**
  geben (z. B. 青 qīng als Lautträger in 清 qīng, 請 qǐng, 情 qíng). Das ist ein
  didaktischer Mehrwert gegenüber dem Original.

### 3.3 Standard: Taiwan vs. Festland
Da **traditionell + Bopomofo** → Ausrichtung an **Taiwan-Standard (Guoyu, MOE)**
empfohlen. Einige Zeichen unterscheiden sich in Ton/Lesung zwischen Taiwan und
Festland (z. B. 法 fǎ/fà, 期 qí/qī). → **Entscheidung nötig** (siehe §8).

---

## 4. Datenmodell

### Component (≈ Radikal)
```
id, glyph, name (mnemonischer Name, DE),
type: "semantic" | "phonetic" | "form",
meaning, soundHint (falls phonetisch), mnemonic, level
```

### Hanzi (≈ Kanji)
```
id, character (traditionell), simplifiedVariant?,
meanings: [string], pinyin (kanonisch, mit Ton), zhuyin (abgeleitet),
readings_extra: [ {pinyin, zhuyin, context} ]  // für 多音字
componentIds: [Component.id],
meaningMnemonic, readingMnemonic,
strokeCount, frequencyRank, level
```

### Vocab (≈ Vokabel)
```
id, word (1+ Hanzi), pinyin, zhuyin, meanings: [string],
hanziIds: [Hanzi.id], partOfSpeech,
audioUrl?, exampleSentences: [{zh, de}], contextMnemonic, level
```

### SrsState (pro Nutzer × Item)
```
userId, itemId, itemType: "component"|"hanzi"|"vocab",
srsStage (0–9), nextReviewAt, lastReviewedAt,
meaningCorrect, meaningIncorrect, readingCorrect, readingIncorrect
```

### ReviewLog (für Statistik & Leech-Erkennung)
```
userId, itemId, aspect: "meaning"|"reading", correct, timestamp
```

### Level
```
number, componentIds, hanziIds, vocabIds
```

### User-Settings
```
phoneticDisplay: "pinyin" | "zhuyin" | "both",
inputMode: "pinyin_numbers" | "pinyin_marks" | "zhuyin",
toneStrict: boolean
```

---

## 5. Datenquellen

| Bedarf | Quelle | Lizenz (prüfen) | Inhalt |
|--------|--------|-----------------|--------|
| Zeichen + Bedeutung + Pinyin | **CC-CEDICT** | CC BY-SA 3.0 | trad+simp, Pinyin (Tonzahlen), engl. Defs |
| Zeichen-Metadaten | **Unihan** (Unicode) | Unicode (permissiv) | Radikal/Strich, Frequenz, Varianten, kMandarin |
| Komponenten-Zerlegung | **Make Me a Hanzi** / **CHISE IDS** | MIT + Arphic | Dekomposition (IDS), Radikal, Strichdaten |
| Strichreihenfolge (Animation) | **Hanzi Writer** (JS) | MIT | Stroke-Order-Animationen, nutzt MMAH-Daten |
| Bopomofo (注音) | **abgeleitet aus Pinyin** (pypinyin / Mapping) | – | deterministische 1:1-Umwandlung |
| Taiwan-Standard-Lesung + Defs | **MOE-Wörterbuch / moedict (g0v)** | CC (prüfen) | Guoyu-Zhuyin, Taiwan-Aussprache |
| Lernreihenfolge / Leveling | **TOCFL**-Wortlisten (Taiwan) bzw. Frequenzlisten | prüfen | Niveau-Stufung für traditionell |
| Audio | Web Speech API (zh-TW) fürs MVP; später Cloud-TTS / Forvo | – | Aussprache-Wiedergabe |

**Pinyin ↔ Bopomofo:** Wir speichern **Pinyin als kanonische Form** und erzeugen
Bopomofo deterministisch daraus (Tabelle/Lib). So genügt eine Datenbasis für beide
Anzeige-/Eingabemodi.

**Lizenz-Hinweis:** CC-CEDICT ist *ShareAlike* — bei einem späteren Produkt
bedenken. Für reine Eigennutzung unkritisch.

---

## 6. Antwort-Prüfung (Mandarin-spezifisch)

- **Bedeutung:** Freitext, Fuzzy-Toleranz + Synonymliste (Sprache: DE oder EN — §8).
- **Lesung – drei Eingabemodi (Nutzer wählt):**
  - `pinyin_numbers`: `ma3` → normalisiert zu `mǎ`
  - `pinyin_marks`: `mǎ` direkt
  - `zhuyin`: `ㄇㄚˇ`
- **Normalisierung:** Eingabe → kanonische Form (Pinyin mit Ton) → Vergleich.
- **toneStrict:** wenn an, muss der Ton stimmen (didaktisch empfohlen). Wenn aus,
  zählt Silbe ohne Ton als „fast richtig" (shake).

---

## 7. MVP-Scope (nächster Schritt)

Minimal, lauffähig, Eigennutzung:
1. Lokale Datenbasis (z. B. 1 Level = ~10 Komponenten, ~20 Hanzi, ~30 Vokabeln)
   aus CC-CEDICT + Make-Me-a-Hanzi vorab generiert (Seed-Skript).
2. **Lessons**-Flow (Item + Mnemonic anzeigen).
3. **Reviews**-Flow mit SRS (Stufen + Intervalle aus §2.3).
4. Eingabeprüfung Pinyin/Bopomofo (§6).
5. Persistenz lokal (IndexedDB / SQLite) — kein Login nötig fürs MVP.
6. Strichreihenfolge via Hanzi Writer (nice-to-have).

Tech-Vorschlag fürs MVP (offen): Web-App, z. B. React/Vite + lokale DB. Single-user.

---

## 8. Entscheidungen

### Bereits entschieden (2026-06-17)
- ✅ **Mnemonics-Sprache: Englisch** (wie WaniKani). Bedeutungen & Geschichten EN;
  passt zu CC-CEDICT als Quelle und skaliert besser.
- ✅ **Komponenten-System: funktional** (semantische + phonetische Komponenten aus
  echter Zerlegung). Nutzt den Aussprache-Vorteil des Chinesischen.
- ✅ **Lernreihenfolge: Baustein-Logik** (erst Komponenten → darauf aufbauende
  Hanzi → Vokabeln), wie WaniKani.

### Noch offen
1. **Aussprache-Standard:** Taiwan (MOE) vs. Festland — Tonunterschiede.
   (Vorläufig Taiwan, da traditionell + Bopomofo.)
2. **Mehrfachlesungen (多音字):** als ein Item mit mehreren Lesungen oder getrennt?
