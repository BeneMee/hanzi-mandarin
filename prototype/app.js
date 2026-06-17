/* Prototyp-Logik: SRS, Lessons, Reviews, Einstellungen.
 * Vanilla JS, Persistenz via localStorage. */
(function () {
  "use strict";

  // ---------------------------------------------------------------- Daten
  const D = window.DATA;
  const ALL = [
    ...D.components.map(x => ({ ...x, type: "component" })),
    ...D.hanzi.map(x => ({ ...x, type: "hanzi" })),
    ...D.vocab.map(x => ({ ...x, type: "vocab" }))
  ];
  const byId = Object.fromEntries(ALL.map(i => [i.id, i]));
  const displayGlyph = i => i.glyph || i.character || i.word;

  // ---------------------------------------------------------------- SRS-Modell
  // Stufen 1..9. Intervall = Zeit bis zum nächsten Review AUF dieser Stufe.
  const STAGE_NAME = { 1:"Appr. I",2:"Appr. II",3:"Appr. III",4:"Appr. IV",5:"Guru I",6:"Guru II",7:"Master",8:"Enlightened",9:"Burned" };
  const GURU = 5;
  const HOUR = 3600e3, DAY = 24*HOUR;
  const REAL = { 1:4*HOUR, 2:8*HOUR, 3:23*HOUR, 4:47*HOUR, 5:7*DAY, 6:14*DAY, 7:30*DAY, 8:120*DAY };
  const DEMO = { 1:5e3, 2:10e3, 3:15e3, 4:20e3, 5:30e3, 6:45e3, 7:60e3, 8:90e3 };
  const intervalFor = stage => (state.settings.demo ? DEMO : REAL)[stage] || 0;

  // ---------------------------------------------------------------- State
  const SKEY = "mandarin_proto_v1";
  const defaults = () => ({
    srs: {},          // itemId -> { stage, nextReview }
    settings: {
      display: "both",          // pinyin | zhuyin | both
      input: "pinyin_marks",    // pinyin_marks | pinyin_numbers | zhuyin
      toneStrict: true,
      gating: false,            // WaniKani-Freischaltung respektieren?
      demo: true                // kurze Intervalle zum Ausprobieren
    }
  });
  let state = load();
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(SKEY));
      if (s && s.srs && s.settings) return { ...defaults(), ...s, settings: { ...defaults().settings, ...s.settings } };
    } catch (e) {}
    return defaults();
  }
  function save() { localStorage.setItem(SKEY, JSON.stringify(state)); }

  // ---------------------------------------------------------------- Gating
  function prereqIds(item) {
    if (item.type === "hanzi") return item.componentIds || [];
    if (item.type === "vocab") return item.hanziIds || [];
    return [];
  }
  function isUnlocked(item) {
    if (!state.settings.gating) return true;
    return prereqIds(item).every(id => (state.srs[id]?.stage || 0) >= GURU);
  }
  const isLearned = item => !!state.srs[item.id];
  const availableLessons = () => ALL.filter(i => !isLearned(i) && isUnlocked(i));
  const dueReviews = () => ALL.filter(i => {
    const s = state.srs[i.id];
    return s && s.stage >= 1 && s.stage < 9 && s.nextReview <= Date.now();
  });

  function aspectsOf(item) {
    return item.type === "component" ? ["meaning"] : ["meaning", "reading"];
  }

  // ---------------------------------------------------------------- Antwort-Prüfung
  const DIA = { "ā":"a","á":"a","ǎ":"a","à":"a","ē":"e","é":"e","ě":"e","è":"e",
    "ī":"i","í":"i","ǐ":"i","ì":"i","ō":"o","ó":"o","ǒ":"o","ò":"o",
    "ū":"u","ú":"u","ǔ":"u","ù":"u","ǖ":"ü","ǘ":"ü","ǚ":"ü","ǜ":"ü","ü":"u" };
  const ZHTONE = /[ˊˇˋ˙]/g;
  function stripPinyinTones(s) { return s.replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]/g, c => DIA[c] || c).replace(/[0-9]/g, ""); }
  const noSpace = s => s.replace(/\s+/g, "");
  const norm = s => (s || "").trim().toLowerCase();

  function checkReading(input, reading) {
    const i = noSpace(norm(input));
    if (!i) return "bad";
    const forms = [reading.pinyinNum, reading.pinyinMark, reading.zhuyin].map(f => noSpace(norm(f)));
    if (forms.includes(i)) return "ok";                       // exakt (Ton korrekt)
    if (!state.settings.toneStrict) {                         // Ton ignorieren -> "fast"
      const iBase = stripPinyinTones(i).replace(ZHTONE, "");
      const ok = [reading.pinyinNum, reading.pinyinMark].some(f => stripPinyinTones(noSpace(norm(f))) === iBase)
              || noSpace(norm(reading.zhuyin)).replace(ZHTONE, "") === iBase;
      if (ok) return "ok";
    } else {                                                  // streng -> Silbe ok, Ton falsch = "almost"
      const iBase = stripPinyinTones(i).replace(ZHTONE, "");
      const almost = [reading.pinyinNum, reading.pinyinMark].some(f => stripPinyinTones(noSpace(norm(f))) === iBase)
                  || noSpace(norm(reading.zhuyin)).replace(ZHTONE, "") === iBase;
      if (almost) return "almost";
    }
    return "bad";
  }
  function lev(a, b) {
    const m = a.length, n = b.length, d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
    for (let j = 0; j <= n; j++) d[0][j] = j;
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++)
      d[i][j] = Math.min(d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1] + (a[i-1] === b[j-1] ? 0 : 1));
    return d[m][n];
  }
  function checkMeaning(input, item) {
    const i = norm(input);
    if (!i) return "bad";
    const accepted = (item.meaning || "").split(/[\/,]/).map(norm).filter(Boolean);
    for (const a of accepted) {
      if (i === a) return "ok";
      const tol = a.length > 5 ? 2 : a.length > 3 ? 1 : 0;
      if (lev(i, a) <= tol) return "ok";
    }
    return "bad";
  }

  // ---------------------------------------------------------------- Aussprache anzeigen
  function readingDisplay(reading) {
    const d = state.settings.display;
    if (d === "pinyin") return reading.pinyinMark;
    if (d === "zhuyin") return reading.zhuyin;
    return `${reading.pinyinMark} &nbsp;·&nbsp; ${reading.zhuyin}`;
  }

  // ================================================================ RENDER
  const app = document.getElementById("app");
  const elLessons = document.getElementById("countLessons");
  const elReviews = document.getElementById("countReviews");
  let session = null; // aktive Lern-/Review-Session

  function refreshCounts() {
    elLessons.textContent = availableLessons().length;
    elReviews.textContent = dueReviews().length;
  }

  function setNav(name) {
    document.querySelectorAll("header nav button").forEach(b => b.classList.toggle("active", b.dataset.go === name));
  }

  function renderDashboard() {
    session = null; setNav("dashboard"); refreshCounts();
    const lessons = availableLessons().length, reviews = dueReviews().length;
    const gurued = D.hanzi.filter(h => (state.srs[h.id]?.stage || 0) >= GURU).length;
    const pct = Math.round(gurued / D.hanzi.length * 100);

    app.innerHTML = `
      <div class="card">
        <h2>Level ${D.level}</h2>
        <div class="muted" style="margin-bottom:8px">${gurued}/${D.hanzi.length} Hanzi auf Guru+ (${pct}%)</div>
        <div class="bar"><i style="width:${pct}%"></i></div>
      </div>
      <div class="card">
        <button class="bigbtn lessons" data-go="lessons" ${lessons ? "" : "disabled"}>
          Lessons starten — ${lessons} verfügbar</button>
        <button class="bigbtn reviews" data-go="reviews" ${reviews ? "" : "disabled"}>
          Reviews starten — ${reviews} fällig</button>
      </div>
      <div class="card">
        <div class="legend">
          <span><i class="dot component"></i> Komponente</span>
          <span><i class="dot hanzi"></i> Hanzi</span>
          <span><i class="dot vocab"></i> Vokabel</span>
        </div>
        ${grid(D.components.map(x=>({...x,type:"component"})), "Komponenten")}
        ${grid(D.hanzi.map(x=>({...x,type:"hanzi"})), "Hanzi")}
        ${grid(D.vocab.map(x=>({...x,type:"vocab"})), "Vokabeln")}
      </div>`;
  }

  function grid(items, title) {
    return `<h3 style="color:var(--muted);font-size:13px;text-transform:uppercase;letter-spacing:.5px;margin:14px 0 8px">${title}</h3>
      <div class="grid">${items.map(tileHtml).join("")}</div>`;
  }
  function tileHtml(item) {
    const s = state.srs[item.id];
    const locked = !isUnlocked(item) && !s;
    const cls = locked ? `${item.type} locked` : item.type;
    const sub = item.type === "vocab" ? item.meaning
              : item.type === "hanzi" ? (item.reading?.pinyinMark || item.meaning)
              : item.name;
    const stage = s ? `<span class="stage">${STAGE_NAME[s.stage].replace(/[^IVa-z0-9]/g,"").slice(0,3) || s.stage}</span>` : "";
    return `<div class="tile ${cls}" title="${item.meaning || item.name}">
      ${stage}<div class="glyph">${locked ? "🔒" : displayGlyph(item)}</div>
      <span class="sub">${locked ? "" : sub}</span></div>`;
  }

  // ---------------------------------------------------------------- Lessons
  function startLessons() {
    const items = availableLessons();
    if (!items.length) return renderDashboard();
    session = { mode: "lesson", items, idx: 0 };
    renderLesson();
  }
  function renderLesson() {
    setNav("lessons");
    const { items, idx } = session;
    const item = items[idx];
    app.innerHTML = `
      <div class="study">
        <div class="progressline">Lesson ${idx + 1} / ${items.length}</div>
        <div class="bighead ${item.type}">
          <div class="type">${typeLabel(item.type)}</div>
          <div class="glyph">${displayGlyph(item)}</div>
        </div>
        <div class="studybody">${lessonBody(item)}</div>
        <div class="controls">
          <button class="btn-ghost" id="prev" ${idx ? "" : "disabled"}>Zurück</button>
          <button class="btn-primary" id="next">${idx === items.length - 1 ? "Fertig — lernen" : "Weiter"}</button>
        </div>
      </div>`;
    document.getElementById("next").onclick = () => {
      if (idx === items.length - 1) {
        items.forEach(it => { if (!state.srs[it.id]) state.srs[it.id] = { stage: 1, nextReview: Date.now() + intervalFor(1) }; });
        save(); renderDashboard();
      } else { session.idx++; renderLesson(); }
    };
    const prev = document.getElementById("prev");
    if (prev && idx) prev.onclick = () => { session.idx--; renderLesson(); };
    mountStrokes(item);
  }
  function lessonBody(item) {
    if (item.type === "component") {
      return `<h3>Name / Meaning</h3><p class="answer">${item.name}</p>
        ${strokeBlock(item)}
        <h3>Mnemonic</h3><p>${item.mnemonic}</p>`;
    }
    if (item.type === "hanzi") {
      return `<h3>Meaning</h3><p class="answer">${item.meaning}</p>
        <h3>Reading</h3><p class="reading-line">${readingDisplay(item.reading)}</p>
        <h3>Components</h3><div class="comp-row">${compChips(item.componentIds)}</div>
        ${strokeBlock(item)}
        <h3>Meaning mnemonic</h3><p>${item.meaningMnemonic}</p>
        <h3>Reading mnemonic</h3><p>${item.readingMnemonic}</p>`;
    }
    return `<h3>Meaning</h3><p class="answer">${item.meaning}</p>
      <h3>Reading</h3><p class="reading-line">${readingDisplay(item.reading)}</p>
      <h3>Built from</h3><div class="comp-row">${compChips(item.hanziIds, true)}</div>
      <h3>Notes</h3><p>${item.note}</p>`;
  }
  function compChips(ids, hanzi) {
    return ids.map(id => {
      const c = byId[id];
      return `<span class="comp-chip ${hanzi ? "hanzi" : ""}">${displayGlyph(c)} <b>${c.name || c.meaning}</b></span>`;
    }).join("");
  }
  function strokeBlock(item) {
    const ch = item.character || item.glyph;
    if (!ch || ch.length !== 1) return "";
    return `<div id="strokeArea" data-char="${ch}"></div>
      <button class="linklike" id="animBtn">▶ Strichreihenfolge abspielen</button>`;
  }
  function mountStrokes(item) {
    const area = document.getElementById("strokeArea");
    if (!area || typeof HanziWriter === "undefined") return;
    try {
      const w = HanziWriter.create(area, area.dataset.char, {
        width: 110, height: 110, padding: 5, showOutline: true,
        strokeColor: "#1b1b1f", delayBetweenStrokes: 180
      });
      const b = document.getElementById("animBtn");
      if (b) b.onclick = () => w.animateCharacter();
    } catch (e) { /* offline / nicht verfügbar -> still */ }
  }

  // ---------------------------------------------------------------- Reviews
  function startReviews() {
    const due = dueReviews();
    if (!due.length) return renderDashboard();
    const queue = [];
    due.forEach(item => aspectsOf(item).forEach(aspect => queue.push({ item, aspect })));
    shuffle(queue);
    session = { mode: "review", queue, pos: 0, total: queue.length,
      result: {}, // itemId -> { wrong: bool, remaining: Set }
      done: 0 };
    due.forEach(item => session.result[item.id] = { wrong: false, remaining: new Set(aspectsOf(item)) });
    renderReview();
  }
  function renderReview() {
    setNav("reviews");
    const q = session.queue[session.pos];
    if (!q) return finishReview();
    const { item, aspect } = q;
    const ask = aspect === "meaning" ? "Bedeutung (meaning)" : `Lesung — ${inputModeLabel()}`;
    app.innerHTML = `
      <div class="study">
        <div class="progressline">${session.done} / ${session.total} erledigt · noch ${session.queue.length - session.pos} in der Queue</div>
        <div class="bighead ${item.type}">
          <div class="type">${typeLabel(item.type)} · ${aspect === "meaning" ? "Meaning" : "Reading"}</div>
          <div class="glyph">${displayGlyph(item)}</div>
        </div>
        <div class="prompt-type">${ask}</div>
        <div class="ansrow"><input id="ans" autocomplete="off" autocapitalize="off" spellcheck="false"
           placeholder="${aspect === "meaning" ? "english meaning…" : readingPlaceholder()}"></div>
        <div class="hint" id="hint"></div>
      </div>`;
    const input = document.getElementById("ans");
    input.focus();
    input.onkeydown = e => { if (e.key === "Enter") submitAnswer(); };
  }
  function submitAnswer() {
    const q = session.queue[session.pos];
    const input = document.getElementById("ans");
    const hint = document.getElementById("hint");
    const val = input.value;
    const res = q.aspect === "meaning" ? checkMeaning(val, q.item) : checkReading(val, q.item.reading);

    if (res === "almost") {
      input.className = "almost";
      hint.className = "hint almost";
      hint.textContent = "Fast! Achte auf den Ton. (Enter zum erneut Versuchen)";
      input.onkeydown = e => { if (e.key === "Enter") retryCard(); };
      return;
    }
    const correct = res === "ok";
    input.className = correct ? "ok" : "bad";
    hint.className = correct ? "hint" : "hint bad";
    const r = q.item.reading;
    const correctAns = q.aspect === "meaning" ? q.item.meaning : (r ? `${r.pinyinMark} (${r.zhuyin})` : "");
    hint.innerHTML = correct ? "✓ richtig — Enter für weiter" : `✗ richtig wäre: <b>${correctAns}</b> — Enter für weiter`;

    if (!correct) session.result[q.item.id].wrong = true;

    input.onkeydown = e => { if (e.key === "Enter") {
      if (correct) {
        session.result[q.item.id].remaining.delete(q.aspect);
        session.done++;
        advanceQueue();
      } else {
        // falsch -> Karte hinten wieder einreihen, bis richtig
        session.queue.push(q);
        advanceQueue();
      }
    }};
  }
  function retryCard() { renderReview(); } // gleiche Karte erneut
  function advanceQueue() {
    session.pos++;
    // erledigte Items abschließen (SRS aktualisieren), sobald keine Aspekte mehr offen
    Object.entries(session.result).forEach(([id, r]) => {
      if (!r.closed && r.remaining.size === 0) { r.closed = true; applySrs(id, r.wrong); }
    });
    renderReview();
  }
  function applySrs(id, wrong) {
    const s = state.srs[id];
    if (!s) return;
    if (wrong) {
      const factor = s.stage >= GURU ? 2 : 1;
      s.stage = Math.max(1, s.stage - factor);
    } else {
      s.stage = Math.min(9, s.stage + 1);
    }
    s.nextReview = s.stage >= 9 ? Infinity : Date.now() + intervalFor(s.stage);
    save();
  }
  function finishReview() {
    const items = Object.keys(session.result).length;
    const wrong = Object.values(session.result).filter(r => r.wrong).length;
    const acc = Math.round((items - wrong) / items * 100);
    app.innerHTML = `
      <div class="card" style="text-align:center">
        <h2>Review abgeschlossen 🎉</h2>
        <p class="muted">${items} Items · ${acc}% korrekt beim ersten Versuch</p>
        <button class="btn-primary" style="padding:12px 22px;border-radius:10px;border:0;color:#fff" id="back">Zum Dashboard</button>
      </div>`;
    document.getElementById("back").onclick = renderDashboard;
    refreshCounts();
  }

  // ---------------------------------------------------------------- Helpers
  function typeLabel(t) { return { component: "Komponente", hanzi: "Hanzi", vocab: "Vokabel" }[t]; }
  function inputModeLabel() { return { pinyin_marks: "Pinyin mit Tonzeichen", pinyin_numbers: "Pinyin mit Tonzahl", zhuyin: "Bopomofo" }[state.settings.input]; }
  function readingPlaceholder() { return { pinyin_marks: "z. B. míng", pinyin_numbers: "z. B. ming2", zhuyin: "z. B. ㄇㄧㄥˊ" }[state.settings.input]; }
  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } }

  // ---------------------------------------------------------------- Einstellungen
  function openSettings() {
    const s = state.settings;
    const sel = (val, opts) => opts.map(([v, l]) => `<option value="${v}" ${v === val ? "selected" : ""}>${l}</option>`).join("");
    const drawer = document.createElement("div");
    drawer.innerHTML = `
      <div class="drawer-bg" id="dbg"></div>
      <div class="drawer">
        <h2>Einstellungen</h2>
        <div class="field"><label class="lab">Aussprache anzeigen</label>
          <select id="setDisplay">${sel(s.display, [["pinyin","Pinyin (mǎ)"],["zhuyin","Bopomofo (ㄇㄚˇ)"],["both","Beides"]])}</select></div>
        <div class="field"><label class="lab">Eingabe bei Reviews</label>
          <select id="setInput">${sel(s.input, [["pinyin_marks","Pinyin mit Tonzeichen (mǎ)"],["pinyin_numbers","Pinyin mit Tonzahl (ma3)"],["zhuyin","Bopomofo (ㄇㄚˇ)"]])}</select>
          <small>Tonzeichen-Eingabe ist umständlich zu tippen — Tonzahl ist fürs Üben am praktischsten.</small></div>
        <div class="field"><label class="row"><input type="checkbox" id="setTone" ${s.toneStrict ? "checked" : ""}> Töne müssen stimmen</label>
          <small>Aus = Silbe ohne Ton zählt als richtig.</small></div>
        <div class="field"><label class="row"><input type="checkbox" id="setGate" ${s.gating ? "checked" : ""}> Freischaltung wie WaniKani</label>
          <small>An = Hanzi/Vokabeln erst lernbar, wenn ihre Bausteine Guru sind.</small></div>
        <div class="field"><label class="row"><input type="checkbox" id="setDemo" ${s.demo ? "checked" : ""}> Demo-Tempo (kurze Intervalle)</label>
          <small>An = Reviews kommen in Sekunden statt Stunden zum Ausprobieren.</small></div>
        <button class="danger" id="reset">Fortschritt zurücksetzen</button>
      </div>`;
    document.body.appendChild(drawer);
    const close = () => { drawer.remove(); refreshCounts(); if (!session) renderDashboard(); };
    drawer.querySelector("#dbg").onclick = close;
    const bind = (sel2, key, isCheck) => {
      const el = drawer.querySelector(sel2);
      el.onchange = () => { state.settings[key] = isCheck ? el.checked : el.value; save(); };
    };
    bind("#setDisplay", "display"); bind("#setInput", "input");
    bind("#setTone", "toneStrict", true); bind("#setGate", "gating", true); bind("#setDemo", "demo", true);
    drawer.querySelector("#reset").onclick = () => {
      if (confirm("Wirklich allen Lernfortschritt löschen?")) { state = defaults(); save(); close(); renderDashboard(); }
    };
  }

  // ---------------------------------------------------------------- Routing
  document.querySelector("header nav").onclick = e => {
    const go = e.target.dataset.go; if (!go) return;
    if (go === "dashboard") renderDashboard();
    if (go === "lessons") startLessons();
    if (go === "reviews") startReviews();
  };
  document.getElementById("app").addEventListener("click", e => {
    const go = e.target.closest("[data-go]")?.dataset.go;
    if (go === "lessons") startLessons();
    if (go === "reviews") startReviews();
  });
  document.getElementById("gear").onclick = openSettings;

  // Enter-Ablauf läuft über das Eingabefeld (input.onkeydown in renderReview/submitAnswer).

  renderDashboard();
})();
