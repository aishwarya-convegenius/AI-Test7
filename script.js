/* ==========================================================================
   Swift AI Academy — slide engine
   Shared by every activity (build.sh puts it at the top of each script.js).
   - Shows one slide at a time; the page itself never scrolls.
   - Scales each slide (through the root font size) until it fits the screen.
   - Owns the footer: progress dashes, Back, and the one amber primary button.
   Activity code talks to it through the global `Deck` object.
   ========================================================================== */
(function (window, document) {
  'use strict';

  var ICONS = {
    'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
    'arrow-left': '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    'arrow-down': '<path d="M12 5v14M6 13l6 6 6-6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    alert: '<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-5M12 8h.01"/>',
    warn: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    open: '<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>',
    brief: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>',
    pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    stop: '<circle cx="12" cy="12" r="9"/><path d="M8 12h8"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    bot: '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 4v4M9 13h.01M15 13h.01"/>',
    mega: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    split: '<path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M12 22v-8.3a4 4 0 0 0-1.2-2.9L3 3"/><path d="m15 9 6-6"/>',
    question: '<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
    id: '<rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="12" r="2"/><path d="M14 10h4M14 14h4"/>',
    phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    heart: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"/>',
    folder: '<path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
    tagi: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    table: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
    scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/>',
    flag: '<path d="M4 22V4a1 1 0 0 1 1-1h11l-2 4 2 4H5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
    'check-sq': '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
    up: '<path d="m18 15-6-6-6 6"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    sort: '<path d="M3 6h18M6 12h12M10 18h4"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
    flask: '<path d="M9 3h6M10 3v6l-5.5 9.5A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-3.3L14 9V3"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>'
  };

  function ic(name) {
    return '<span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24">' + (ICONS[name] || '') + '</svg></span>';
  }

  // Turn every <span data-i="name"></span> into an inline icon.
  function hydrate(root) {
    var els = (root || document).querySelectorAll('[data-i]:not([data-ready])');
    for (var k = 0; k < els.length; k++) {
      var el = els[k];
      el.classList.add('ic');
      el.setAttribute('aria-hidden', 'true');
      el.setAttribute('data-ready', '');
      el.innerHTML = '<svg viewBox="0 0 24 24">' + (ICONS[el.getAttribute('data-i')] || '') + '</svg>';
    }
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function debounce(fn, ms) {
    var t;
    return function () { clearTimeout(t); t = setTimeout(fn, ms); };
  }

  function toast(msg) {
    var t = document.getElementById('toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'toast';
      t.className = 'toast';
      t.setAttribute('role', 'status');
      t.setAttribute('aria-live', 'polite');
      document.body.appendChild(t);
    }
    t.innerHTML = ic('check') + '<span>' + esc(msg) + '</span>';
    t.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(function () { t.classList.remove('show'); }, 1800);
  }

  // Copy text, with a fallback for browsers without the Clipboard API.
  function copyText(text, done) {
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.top = '0';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) { /* clipboard unavailable */ }
      document.body.removeChild(ta);
      if (done) done();
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { if (done) done(); }, fallback);
    } else {
      fallback();
    }
  }

  // Nothing is saved or sent anywhere, so learners keep their work as a file.
  function download(filename, text) {
    var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  var Deck = {
    slides: [],
    index: -1,
    hooks: {},

    init: function (hooks) {
      var self = this;
      this.hooks = hooks || {};
      this.app = document.querySelector('.app');
      this.slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
      this.primaryBtn = document.getElementById('primary');
      this.backBtn = document.getElementById('back');
      this.progress = document.getElementById('progress');
      this.lastWidth = window.innerWidth;
      this.slides.forEach(function (s) { s.setAttribute('aria-hidden', 'true'); });
      hydrate(document);

      this.primaryBtn.addEventListener('click', function () { self.primary(); });
      this.backBtn.addEventListener('click', function () { self.back(); });
      document.addEventListener('click', function (e) {
        var t = e.target.closest ? e.target.closest('[data-go]') : null;
        if (t) self.go(t.getAttribute('data-go'));
      });
      window.addEventListener('resize', debounce(function () { self.onResize(); }, 120));
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function () { self.fit(); });
      }
      this.go(0, true);
    },

    find: function (target) {
      if (typeof target === 'number') return target;
      for (var k = 0; k < this.slides.length; k++) {
        if (this.slides[k].id === target) return k;
      }
      return -1;
    },

    current: function () { return this.slides[this.index]; },

    hook: function () {
      var s = this.current();
      return s ? this.hooks[s.id] : null;
    },

    go: function (target, first) {
      var i = this.find(target);
      if (i < 0 || i >= this.slides.length) return;
      var prev = this.current();
      var prevHook = this.hook();
      if (prev && prevHook && prevHook.leave) prevHook.leave(this, prev);
      if (prev) {
        prev.classList.remove('show');
        prev.setAttribute('aria-hidden', 'true');
      }

      this.index = i;
      var s = this.current();
      this.setPrimary(s.getAttribute('data-next') || 'Continue', {
        hidden: s.getAttribute('data-primary') === 'off',
        icon: s.getAttribute('data-icon') || 'arrow-right'
      });
      this.setBack(i > 0 && s.getAttribute('data-back') !== 'off');
      this.drawDashes();

      var h = this.hook();
      if (h && h.enter) h.enter(this, s);
      hydrate(s);
      this.fit();
      s.classList.add('show');
      s.removeAttribute('aria-hidden');

      if (!first) {
        var head = s.querySelector('h1, h2');
        if (head) {
          head.setAttribute('tabindex', '-1');
          try { head.focus({ preventScroll: true }); } catch (e) { head.focus(); }
        }
      }
    },

    next: function () { this.go(this.index + 1); },

    back: function () {
      var h = this.hook();
      if (h && h.back && h.back(this) === false) return;
      var to = this.current().getAttribute('data-back-to');
      this.go(to ? this.find(to) : this.index - 1);
    },

    primary: function () {
      if (this.primaryBtn.disabled || this.primaryBtn.hidden) return;
      var h = this.hook();
      if (h && h.primary && h.primary(this) === false) return;
      this.next();
    },

    setPrimary: function (label, opts) {
      opts = opts || {};
      var b = this.primaryBtn;
      var iconName = opts.icon === undefined ? 'arrow-right' : opts.icon;
      b.hidden = !!opts.hidden;
      b.disabled = !!opts.disabled;
      b.innerHTML = '<span>' + esc(label) + '</span>' + (iconName ? ic(iconName) : '');
    },

    enablePrimary: function (on) { this.primaryBtn.disabled = !on; },

    setBack: function (show) { this.backBtn.hidden = !show; },

    drawDashes: function () {
      var html = '<div class="dashes" aria-hidden="true">';
      for (var k = 0; k < this.slides.length; k++) {
        html += '<i class="' + (k < this.index ? 'done' : (k === this.index ? 'cur' : '')) + '"></i>';
      }
      html += '</div><span class="count">' + (this.index + 1) + ' / ' + this.slides.length + '</span>';
      this.progress.innerHTML = html;
      this.progress.setAttribute('aria-label', 'Screen ' + (this.index + 1) + ' of ' + this.slides.length);
    },

    // Replace the dashes with custom progress (used by the quiz screens).
    setProgress: function (html, label) {
      this.progress.innerHTML = html;
      if (label) this.progress.setAttribute('aria-label', label);
    },

    overflows: function (card) {
      return card.scrollHeight > card.clientHeight + 1 ||
        card.scrollWidth > card.clientWidth + 1 ||
        this.app.scrollHeight > this.app.clientHeight + 1;
    },

    // Shrink the whole frame a little at a time until the slide fits.
    // Only on very small screens does the card itself get a scrollbar.
    fit: function () {
      var s = this.current();
      if (!s) return;
      var card = s.querySelector('.card') || s.firstElementChild;
      if (!card) return;
      var root = document.documentElement;
      var w = window.innerWidth;
      var h = window.innerHeight;
      var size = w <= 760 ? 15 : Math.max(13, Math.min(17, h / 50));
      var guard = 0;
      card.classList.remove('scroll');
      root.style.fontSize = size + 'px';
      while (this.overflows(card) && size > 12 && guard++ < 30) {
        size -= 0.5;
        root.style.fontSize = size + 'px';
      }
      if (this.overflows(card)) card.classList.add('scroll');
    },

    onResize: function () {
      var a = document.activeElement;
      var typing = a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName);
      // A phone keyboard opening changes only the height: do not rescale mid-typing.
      if (typing && window.innerWidth === this.lastWidth) return;
      this.lastWidth = window.innerWidth;
      this.fit();
    }
  };

  window.Deck = Deck;
  window.SAA = {
    ic: ic,
    esc: esc,
    hydrate: hydrate,
    shuffle: shuffle,
    toast: toast,
    copyText: copyText,
    download: download
  };
})(window, document);
/* ==========================================================================
   Section Check: Framing and Refining (AAI-E-MC1-S02-EVAL01)
   20 questions, 70% to pass, unlimited tries, a reason after every answer.
   Each try shuffles the questions and the answer options. Nothing is saved
   or sent anywhere unless the learner downloads their own results.
   ========================================================================== */
(function () {
  'use strict';
  var ic = SAA.ic, esc = SAA.esc;

  var ITEMS = [
    { id: 'Q01', concept: 'crtf', lane: 'ITI',
      stem: 'A trainee asks AI: “You are a workshop teacher. Write a safety reminder. Format it as 3 points for the noticeboard.” What is missing?',
      options: ['Context', 'Role', 'Task', 'Format'], correct: 0,
      why: 'Context says who it is for, and why you need it.' },
    { id: 'Q02', concept: 'crtf', lane: 'Campus',
      stem: '“For our group project due Friday, write a reminder message. Format it as one short message.” What is missing?',
      options: ['Context', 'Role', 'Task', 'Format'], correct: 1,
      why: 'Role says who the AI should act as.' },
    { id: 'Q03', concept: 'crtf', lane: 'ITI',
      stem: 'Which request is missing the Format?',
      options: [
        'You are a lab assistant. For students before the practical, write a short safety note. Format it as 3 points.',
        'You are a lab assistant. For students before the practical, write a short safety note.',
        'You are a teacher. For new students, write a notice. Format it as one paragraph.',
        'You are a facilitator. For the batch, write a reminder. Format it as an email.'
      ], correct: 1,
      why: 'Format says how the answer should look. This request never says it.' },
    { id: 'Q04', concept: 'crtf', lane: 'Campus',
      stem: 'A classmate’s request never said who the AI should act as. The answer is confusing. What should they do next?',
      options: ['Add a role', 'Add a format', 'Delete the request', 'Ask the AI to check itself'], correct: 0,
      why: 'The missing part is Role, so add a role.' },
    { id: 'Q05', concept: 'crtf', lane: 'General',
      stem: 'What does “Format” mean in a request?',
      options: ['Who the AI should act as', 'How the answer should look', 'What you want the AI to make', 'Why you need it'], correct: 1,
      why: 'Format is how the finished answer should look.' },
    { id: 'Q06', concept: 'move', lane: 'ITI',
      stem: 'The AI’s answer covered 3 safety topics. You only needed 1. Which move fixes this?',
      options: ['Narrow', 'Expand', 'Change register', 'Combine'], correct: 0,
      why: 'Narrow fixes an answer that covers too much.' },
    { id: 'Q07', concept: 'move', lane: 'Campus',
      stem: 'The AI’s answer used words that are too hard for first-year students. Which move fixes this?',
      options: ['Narrow', 'Expand', 'Change register', 'Combine'], correct: 2,
      why: 'Change register fixes the wrong tone or reading level.' },
    { id: 'Q08', concept: 'move', lane: 'ITI',
      stem: 'The AI’s answer was too short and missed useful details. Which move fixes this?',
      options: ['Narrow', 'Expand', 'Change register', 'Check it'], correct: 1,
      why: 'Expand adds the detail you need.' },
    { id: 'Q09', concept: 'move', lane: 'Campus',
      stem: 'You have two drafts. Each one has some good parts. Which move helps?',
      options: ['Narrow', 'Expand', 'Check it', 'Combine'], correct: 3,
      why: 'Combine joins the best parts of two drafts.' },
    { id: 'Q10', concept: 'move', lane: 'ITI',
      stem: 'The AI’s answer mentions a fine amount. You never gave it that amount. What should you do next?',
      options: ['Ask “What might be wrong here?”', 'Ask for more detail', 'Combine two drafts', 'Use it as it is'], correct: 0,
      why: 'AI should not make up a fine, a rule or a date. Always check it.' },
    { id: 'Q11', concept: 'move', lane: 'Campus',
      stem: 'The AI replies: “Sure! Also, the last date for late submission is Monday, with a 10% penalty.” What is wrong with this reply?',
      options: ['It is too short', 'It added a date and a penalty you never gave it', 'It used a role', 'It is in the wrong format'], correct: 1,
      why: 'AI must not make up dates or penalties.' },
    { id: 'Q12', concept: 'move', lane: 'ITI',
      stem: 'You asked AI for a safety notice. It is too long, and the tone is too formal. What is the best order to fix both?',
      options: ['Narrow it first, then change the register', 'Change the register first, then narrow it', 'Combine it, then check it', 'Only change the register'], correct: 0,
      why: 'Fix what it covers first. Then you can see what tone still needs fixing.' },
    { id: 'Q13', concept: 'stop', lane: 'ITI',
      stem: 'You have refined an answer twice. Now only one date needs fixing. What should you do?',
      options: ['Ask the AI again', 'Fix it yourself', 'Start over completely', 'Combine two drafts'], correct: 1,
      why: 'Stop refining when fixing it yourself is faster.' },
    { id: 'Q14', concept: 'stop', lane: 'Campus',
      stem: 'The AI’s reply looks polished and sure. What should you always do before you use it?',
      options: ['Check it for made-up details', 'Make it longer', 'Change the tone', 'Combine it with another draft'], correct: 0,
      why: 'An answer can sound sure and still be wrong. Always check before you use it.' },
    { id: 'Q15', concept: 'stop', lane: 'ITI',
      stem: 'A trainee puts the AI’s safety notice on the noticeboard without reading it first. What did they skip?',
      options: ['Checking it before use', 'Narrowing it', 'Adding a role', 'Changing the register'], correct: 0,
      why: 'Always check an answer before you use it.' },
    { id: 'Q16', concept: 'crtf', lane: 'Campus',
      stem: '“Write a notice.” How many of the 4 parts (role, context, task, format) does this request have?',
      options: ['0', '1', '2', '4'], correct: 1,
      why: 'It only gives a task. The other 3 parts are missing.' },
    { id: 'Q17', concept: 'crtf', lane: 'ITI',
      stem: 'Your request has a role, a task and a format, but no context. What should you add?',
      options: ['Who it is for, and why', 'How it should look', 'What to make', 'Who to act as'], correct: 0,
      why: 'Context is who it is for, and why you need it.' },
    { id: 'Q18', concept: 'move', lane: 'General',
      stem: 'Which move uses the words “Only tell me about ___”?',
      options: ['Narrow', 'Expand', 'Combine', 'Check it'], correct: 0,
      why: 'Those words narrow a request.' },
    { id: 'Q19', concept: 'move', lane: 'Campus',
      stem: 'A class rep’s message covers homework, an event and a holiday, all at once. It is too much to take in. Which move helps most?',
      options: ['Narrow', 'Expand', 'Change register', 'Check it'], correct: 0,
      why: 'Narrow it down to one topic at a time.' },
    { id: 'Q20', concept: 'stop', lane: 'ITI',
      stem: 'Refining a 4th time would take longer than rewriting the last line yourself. What is the smart move?',
      options: ['Refine a 5th time', 'Stop and fix it yourself', 'Ask for a completely new draft', 'Combine 3 drafts'], correct: 1,
      why: 'If fixing it yourself is faster, just fix it.' }
  ];
  var PASS_PERCENT = 70;
  var NEEDED = Math.ceil(ITEMS.length * PASS_PERCENT / 100);

  var quiz = [], cur = 0, answers = [], picked = -1, checked = false;
  var qcard = document.getElementById('qcard');

  // One attempt: questions shuffled, and each question's options shuffled.
  function buildAttempt() {
    return SAA.shuffle(ITEMS).map(function (item) {
      var order = SAA.shuffle(item.options.map(function (_, i) { return i; }));
      return {
        id: item.id, lane: item.lane, stem: item.stem, why: item.why,
        options: order.map(function (i) { return item.options[i]; }),
        correct: order.indexOf(item.correct)
      };
    });
  }

  function startQuiz() {
    quiz = buildAttempt();
    cur = 0;
    answers = [];
    Deck.go('quiz');
  }

  function drawProgress() {
    var pct = Math.round(cur / quiz.length * 100);
    Deck.setProgress(
      '<div class="qprog"><div class="bar"><i style="width:' + pct + '%"></i></div>' +
      '<span>Question ' + (cur + 1) + ' of ' + quiz.length + '</span></div>',
      'Question ' + (cur + 1) + ' of ' + quiz.length);
  }

  function renderQuestion() {
    var it = quiz[cur];
    picked = -1;
    checked = false;
    qcard.innerHTML =
      '<div class="q-meta"><span class="q-kicker">Quick check</span><span class="tag">' + esc(it.lane) + '</span></div>' +
      '<div class="quiz-grid"><div class="quiz-main">' +
      '<h2 class="q-stem" id="qstem" tabindex="-1">' + esc(it.stem) + '</h2>' +
      '<div class="opts" role="radiogroup" aria-labelledby="qstem">' +
      it.options.map(function (o, i) {
        return '<button type="button" class="opt" role="radio" aria-checked="false" data-opt="' + i + '"><span class="radio"></span><span>' + esc(o) + '</span></button>';
      }).join('') + '</div></div>' +
      '<div class="quiz-side" id="side"><div class="hint">' + ic('info') + '<span>Choose an answer, then press <strong>Check answer</strong>. You will see why here.</span></div></div></div>';
    qcard.querySelectorAll('.opt').forEach(function (b) {
      b.addEventListener('click', function () {
        if (checked) return;
        picked = parseInt(b.getAttribute('data-opt'), 10);
        qcard.querySelectorAll('.opt').forEach(function (x) { x.setAttribute('aria-checked', String(x === b)); });
        Deck.enablePrimary(true);
      });
    });
    Deck.setPrimary('Check answer', { disabled: true, icon: 'check' });
    drawProgress();
    Deck.fit();
    var stem = document.getElementById('qstem');
    try { stem.focus({ preventScroll: true }); } catch (e) { stem.focus(); }
  }

  function checkAnswer() {
    var it = quiz[cur];
    var ok = picked === it.correct;
    checked = true;
    qcard.querySelectorAll('.opt').forEach(function (b, i) {
      b.disabled = true;
      b.setAttribute('aria-checked', 'false');
      var radio = b.querySelector('.radio');
      if (i === it.correct) { b.classList.add('right'); radio.innerHTML = ic('check'); }
      else if (i === picked) { b.classList.add('wrong'); radio.innerHTML = ic('x'); }
      else b.classList.add('muted');
    });
    document.getElementById('side').innerHTML = ok
      ? '<div class="fb ok" role="status">' + ic('check') + '<div class="fb-body"><span class="fb-title">Correct</span><span>' + esc(it.why) + '</span></div></div>'
      : '<div class="fb no" role="status">' + ic('alert') + '<div class="fb-body"><span class="fb-title">Not quite. The answer is “' + esc(it.options[it.correct]) + '”.</span><span>' + esc(it.why) + '</span></div></div>';
    answers.push({
      n: cur + 1, id: it.id, lane: it.lane, stem: it.stem, why: it.why,
      chosen: it.options[picked], right: it.options[it.correct], ok: ok
    });
    Deck.setPrimary(cur === quiz.length - 1 ? 'See my result' : 'Next question');
    Deck.fit();
  }

  function score() {
    var right = answers.filter(function (a) { return a.ok; }).length;
    var pct = answers.length ? Math.round(right / answers.length * 100) : 0;
    return { right: right, pct: pct, passed: pct >= PASS_PERCENT };
  }

  function drawResult() {
    var s = score();
    var C = 2 * Math.PI * 80;
    document.getElementById('ring').innerHTML =
      '<svg viewBox="0 0 190 190" aria-hidden="true"><circle class="track" cx="95" cy="95" r="80"/>' +
      '<circle class="arc" id="arc" cx="95" cy="95" r="80" stroke="' + (s.passed ? 'var(--ok)' : 'var(--blue)') + '" stroke-dasharray="' + C + '" stroke-dashoffset="' + C + '"/></svg>' +
      '<div class="v"><strong>' + s.pct + '%</strong><span>' + s.right + ' of ' + answers.length + ' correct</span></div>';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        var arc = document.getElementById('arc');
        if (arc) arc.style.strokeDashoffset = C * (1 - s.pct / 100);
      });
    });
    document.getElementById('res-kicker').textContent = 'Section check result';
    document.getElementById('res-title').textContent = s.passed ? 'You passed' : 'Not yet';
    var status = document.getElementById('res-status');
    status.className = 'status' + (s.passed ? ' ok' : '');
    status.textContent = s.right + ' of ' + answers.length + ' correct. You need ' + NEEDED + ' to pass.';
    document.getElementById('res-msg').textContent = s.passed
      ? 'Well done. You can frame a request, refine it, and know when to stop.'
      : 'Look at the questions you missed, then try again. The order will change.';
  }

  function drawReview() {
    if (!answers.length) return;
    var grid = document.getElementById('qgrid');
    grid.innerHTML = answers.map(function (a, i) {
      return '<button type="button" class="qdot ' + (a.ok ? 'ok' : 'no') + '" aria-pressed="false" data-q="' + i + '" aria-label="Question ' + a.n + ', ' + (a.ok ? 'correct' : 'not quite') + '">' + a.n + '</button>';
    }).join('');
    var firstWrong = 0;
    for (var k = 0; k < answers.length; k++) { if (!answers[k].ok) { firstWrong = k; break; } }
    showDetail(firstWrong);
  }

  function showDetail(i) {
    var a = answers[i];
    document.querySelectorAll('#qgrid .qdot').forEach(function (d) {
      d.setAttribute('aria-pressed', String(parseInt(d.getAttribute('data-q'), 10) === i));
    });
    document.getElementById('detail').innerHTML =
      '<div class="row"><span class="tag ' + (a.ok ? 'ok' : 'bad') + '">Question ' + a.n + '</span><span class="tag">' + esc(a.lane) + '</span></div>' +
      '<p class="d-stem">' + esc(a.stem) + '</p>' +
      '<div class="d-line ' + (a.ok ? 'ok' : 'no') + '">' + ic(a.ok ? 'check' : 'x') + '<span>Your answer: ' + esc(a.chosen) + '</span></div>' +
      (a.ok ? '' : '<div class="d-line ok">' + ic('check') + '<span>Correct answer: ' + esc(a.right) + '</span></div>') +
      '<p class="d-why">' + esc(a.why) + '</p>';
    Deck.fit();
  }

  document.getElementById('qgrid').addEventListener('click', function (e) {
    var d = e.target.closest('[data-q]');
    if (d) showDetail(parseInt(d.getAttribute('data-q'), 10));
  });

  function saveResults() {
    var s = score();
    var lines = [
      'Section Check: Framing and Refining (AAI-E-MC1-S02-EVAL01)',
      'Swift AI Academy',
      '',
      'Score: ' + s.pct + '% (' + s.right + ' of ' + answers.length + ' correct)',
      'Result: ' + (s.passed ? 'Passed' : 'Not yet. Try again.'),
      ''
    ];
    answers.forEach(function (a) {
      lines.push(a.n + '. ' + a.stem);
      lines.push('   Your answer: ' + a.chosen + (a.ok ? ' (correct)' : '  |  Correct answer: ' + a.right));
      lines.push('');
    });
    SAA.download('section-check-framing-and-refining-results.txt', lines.join('\n'));
    SAA.toast('Your results are downloaded');
  }

  document.querySelectorAll('[data-retry]').forEach(function (b) { b.addEventListener('click', startQuiz); });
  document.querySelectorAll('[data-save]').forEach(function (b) { b.addEventListener('click', saveResults); });

  Deck.init({
    how: {
      primary: function () { startQuiz(); return false; }
    },
    quiz: {
      enter: function () { if (!quiz.length) quiz = buildAttempt(); renderQuestion(); },
      primary: function () {
        if (!checked) { checkAnswer(); return false; }
        if (cur < quiz.length - 1) { cur++; renderQuestion(); return false; }
        // last question: fall through to the result slide
      }
    },
    result: { enter: drawResult },
    review: {
      enter: drawReview,
      primary: function () { startQuiz(); return false; }
    }
  });
})();
