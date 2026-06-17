# 漢字 Mandarin

Eine Lern-App für **Mandarin mit traditionellen Schriftzeichen**, im Stil von
[WaniKani](https://www.wanikani.com/) — Schriftzeichen werden in einer Pyramide
gelernt (**Komponenten → Hanzi → Vokabeln**) mit Mnemonics und einem
Spaced-Repetition-System (SRS).

> Früher Prototyp zur Eigennutzung. Aussprache wahlweise als **Pinyin** oder
> **Bopomofo (注音)**.

## Live ausprobieren
👉 Siehe GitHub-Pages-Link in den Repo-Einstellungen (Settings → Pages).

## Lokal starten
Kein Build nötig — einfach `prototype/index.html` im Browser öffnen.

## Struktur
- `prototype/` — der lauffähige Prototyp (HTML/CSS/JS, Vanilla)
  - `index.html`, `styles.css`, `app.js` — App
  - `data.js` — Lerninhalte (Level 1)
- `KONZEPT.md` — Konzept, Datenmodell und Datenquellen

## Funktionen (Prototyp)
- Dashboard mit Komponenten / Hanzi / Vokabeln (WaniKani-Farbschema)
- Lessons in Batches à 8, danach ein Pflicht-Quiz: jedes Item einmal komplett
  richtig → erst dann wandert es ins SRS (Apprentice I)
- Gating: Items müssen *Guru* erreichen, um neue Hanzi/Vokabeln freizuschalten
- Lessons-Flow mit Mnemonics und Strichreihenfolge ([Hanzi Writer](https://hanziwriter.org/))
- Reviews mit SRS (9 Stufen) — Bedeutung und Lesung getrennt
- Einstellungen: Pinyin/Bopomofo, Eingabemodus, Ton-Strenge, Gating, Demo-Tempo
- Fortschritt lokal gespeichert (localStorage)
