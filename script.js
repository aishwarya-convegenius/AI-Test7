// Section Check — a 20-item mastery quiz. 70% to pass, unlimited
// attempts, an explanation shown after every answer. Each attempt
// reshuffles item order and option order, so repeat attempts don't
// present the same sequence. Nothing here is saved or sent anywhere
// until the learner downloads their own results.

var ITEMS = [
  { id: 'Q01', concept: 'crtf', format: 'Scenario', lane: 'ITI',
    stem: 'A trainee asks AI: "You are a workshop instructor. Write a safety reminder. Format it as 3 points for the noticeboard." What is missing?',
    options: ['Context', 'Role', 'Task', 'Format'], correctIndex: 0,
    explanation: 'Context tells the AI who this is for, and why.' },

  { id: 'Q02', concept: 'crtf', format: 'Scenario', lane: 'Campus',
    stem: "“For the group's project due Friday (practice date), write a reminder message. Format it as one short message.” What is missing?",
    options: ['Context', 'Role', 'Task', 'Format'], correctIndex: 1,
    explanation: 'Role tells the AI who to act as.' },

  { id: 'Q03', concept: 'crtf', format: 'Error spotting', lane: 'ITI',
    stem: 'Which request below is missing the Format?',
    options: [
      'You are a lab assistant. For students before the practical, write a short safety note. Format it as 3 points.',
      'You are a lab assistant. For students before the practical, write a short safety note.',
      'You are a teacher. For new students, write a notice. Format it as one paragraph.',
      'You are a facilitator. For the batch, write a reminder. Format it as an email.'
    ], correctIndex: 1,
    explanation: 'Format tells the AI how the output should look — this request never says.' },

  { id: 'Q04', concept: 'crtf', format: 'Next-best-action', lane: 'Campus',
    stem: "A classmate's AI answer is confusing because the request never said who the AI should act as. What should they do next?",
    options: ['Add a role', 'Add a format', 'Delete the request', "Ask AI to check itself"], correctIndex: 0,
    explanation: 'The missing part here is Role, so that is what to add.' },

  { id: 'Q05', concept: 'crtf', format: 'Recall', lane: 'General',
    stem: "What does “Format” mean in a request?",
    options: ['Who the AI should act as', 'How the output should look', 'What you want made', 'Why you need it'], correctIndex: 1,
    explanation: 'Format is about how the finished answer should look.' },

  { id: 'Q06', concept: 'move', format: 'Scenario', lane: 'ITI',
    stem: 'An AI answer covered 3 unrelated safety topics when only 1 was needed. Which move fixes this?',
    options: ['Narrow', 'Expand', 'Change register', 'Combine'], correctIndex: 0,
    explanation: 'Narrow fixes an answer that covers too much.' },

  { id: 'Q07', concept: 'move', format: 'Scenario', lane: 'Campus',
    stem: 'An AI answer used words too difficult for first-year students. Which move fixes this?',
    options: ['Narrow', 'Expand', 'Change register', 'Combine'], correctIndex: 2,
    explanation: 'Change register fixes the wrong tone or reading level.' },

  { id: 'Q08', concept: 'move', format: 'Scenario', lane: 'ITI',
    stem: 'An AI answer was too short and skipped useful detail. Which move fixes this?',
    options: ['Narrow', 'Expand', 'Change register', 'Check it'], correctIndex: 1,
    explanation: 'Expand fixes an answer that skips detail you need.' },

  { id: 'Q09', concept: 'move', format: 'Scenario', lane: 'Campus',
    stem: 'You have two drafts, and each has good parts. Which move fixes this?',
    options: ['Narrow', 'Expand', 'Check it', 'Combine'], correctIndex: 3,
    explanation: 'Combine brings the best parts of two drafts together.' },

  { id: 'Q10', concept: 'move', format: 'Next-best-action', lane: 'ITI',
    stem: 'An AI answer states a fine amount that nobody asked for. What should you do next?',
    options: ['Ask "What might be wrong here?"', 'Ask for more detail', 'Combine two drafts', 'Just use it'], correctIndex: 0,
    explanation: 'AI should never invent a fine, rule or date you did not give it — always check.' },

  { id: 'Q11', concept: 'move', format: 'Error spotting', lane: 'Campus',
    stem: 'Read this AI reply: "Sure! Also, the last date for late submission is Monday, with a 10% penalty." What is wrong with this reply?',
    options: ["It's too short", 'It added a date and penalty nobody gave it', 'It used a role', "It's the wrong format"], correctIndex: 1,
    explanation: 'AI must not invent missing dates or penalties.' },

  { id: 'Q12', concept: 'move', format: 'Ordering', lane: 'ITI',
    stem: "You asked AI for a safety notice. It's too long, and the tone is too formal. What's the best order to fix both?",
    options: [
      'Narrow it first, then change the register',
      'Change the register first, then narrow it',
      'Combine it, then check it',
      'Only change the register'
    ], correctIndex: 0,
    explanation: 'Fix what it covers first — narrowing can change what still needs a tone fix.' },

  { id: 'Q13', concept: 'stop', format: 'Scenario', lane: 'ITI',
    stem: "You've refined an answer twice, and now just need to fix one date. What should you do?",
    options: ['Ask AI again', 'Fix it yourself', 'Start over completely', 'Combine two drafts'], correctIndex: 1,
    explanation: 'Stop refining once fixing it yourself is faster.' },

  { id: 'Q14', concept: 'stop', format: 'Next-best-action', lane: 'Campus',
    stem: "AI's reply looks polished and confident. What should you always do before using it?",
    options: ['Check it for made-up details', 'Make it longer', 'Change the tone', 'Combine with another draft'], correctIndex: 0,
    explanation: 'A confident-sounding answer can still be wrong — always check before you use it.' },

  { id: 'Q15', concept: 'stop', format: 'Error spotting', lane: 'ITI',
    stem: 'A trainee copies AI\'s safety notice straight to the noticeboard without reading it first. What did they skip?',
    options: ['Checking it before use', 'Narrowing it', 'Adding a role', 'Changing register'], correctIndex: 0,
    explanation: 'Always check an answer before you use it.' },

  { id: 'Q16', concept: 'crtf', format: 'Scenario', lane: 'Campus',
    stem: "“Write a notice.” How many of the 4 parts (context, role, task, format) does this request state?",
    options: ['0', '1', '2', '4'], correctIndex: 1,
    explanation: 'It only hints at a task — the other 3 parts are missing.' },

  { id: 'Q17', concept: 'crtf', format: 'Next-best-action', lane: 'ITI',
    stem: 'Your request has role, task and format, but not context. What should you add?',
    options: ["Who it's for, and why", 'How it should look', 'What to make', 'Who to act as'], correctIndex: 0,
    explanation: 'Context is who this is for, and why you need it.' },

  { id: 'Q18', concept: 'move', format: 'Recall', lane: 'General',
    stem: 'Which move uses the phrase "Only tell me about ___"?',
    options: ['Narrow', 'Expand', 'Combine', 'Check it'], correctIndex: 0,
    explanation: 'That phrase is how you Narrow a request.' },

  { id: 'Q19', concept: 'move', format: 'Scenario', lane: 'Campus',
    stem: "A class rep's message covers homework, an event and a holiday notice all in one message. It's overwhelming. Which move helps most?",
    options: ['Narrow', 'Expand', 'Change register', 'Check it'], correctIndex: 0,
    explanation: 'Narrow it down to one topic at a time.' },

  { id: 'Q20', concept: 'stop', format: 'Scenario', lane: 'ITI',
    stem: 'Refining a 4th time would take longer than just rewriting the last line yourself. What is the smart move?',
    options: ['Refine a 5th time', 'Stop and fix it yourself', 'Ask for a completely new draft', 'Combine 3 drafts'], correctIndex: 1,
    explanation: 'If fixing it yourself is faster, just fix it.' }
];

var PASS_PERCENT = 70;

document.addEventListener('DOMContentLoaded', function () {
  var card = document.getElementById('quiz-card');
  var progressTrack = document.getElementById('progress-track');
  var progressFill = document.getElementById('progress-fill');
  var progressLabel = document.getElementById('progress-label');

  var quizItems = [];
  var current = 0;
  var answers = []; // { itemId, stem, chosenLabel, correctLabel, isCorrect }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // Build one shuffled attempt: item order shuffled, and each item's
  // option order shuffled independently (correctIndex remapped).
  function buildAttempt() {
    var order = shuffle(ITEMS);
    return order.map(function (item) {
      var indices = shuffle(item.options.map(function (_, i) { return i; }));
      var options = indices.map(function (i) { return item.options[i]; });
      var correctIndex = indices.indexOf(item.correctIndex);
      return {
        id: item.id, concept: item.concept, format: item.format, lane: item.lane,
        stem: item.stem, options: options, correctIndex: correctIndex, explanation: item.explanation
      };
    });
  }

  function updateProgress(show) {
    progressTrack.hidden = !show;
    progressLabel.hidden = !show;
    if (!show) return;
    var pct = Math.round((current / quizItems.length) * 100);
    progressFill.style.width = pct + '%';
    progressLabel.textContent = 'Question ' + (current + 1) + ' of ' + quizItems.length;
  }

  function renderIntro() {
    updateProgress(false);
    card.innerHTML = '';

    var h2 = document.createElement('h2');
    h2.style.margin = '0 0 8px';
    h2.style.fontSize = '17px';
    h2.textContent = 'Before you begin';
    card.appendChild(h2);

    var p = document.createElement('p');
    p.style.fontSize = '13.5px';
    p.style.margin = '0 0 4px';
    p.textContent = '20 questions on framing a request, the five refinement moves, and knowing when to stop.';
    card.appendChild(p);

    var flow = document.createElement('div');
    flow.className = 'intro-flow';
    [
      'You need 70% (14 of 20) to pass.',
      'You can try as many times as you need.',
      "You'll see an explanation after every answer.",
      'Each attempt shuffles the questions and options.'
    ].forEach(function (text) {
      var row = document.createElement('div');
      row.className = 'intro-row';
      row.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg><span>' + text + '</span>';
      flow.appendChild(row);
    });
    card.appendChild(flow);

    var actions = document.createElement('div');
    actions.className = 'q-actions';
    var startBtn = document.createElement('button');
    startBtn.type = 'button';
    startBtn.className = 'btn-primary';
    startBtn.textContent = 'Start the check';
    startBtn.addEventListener('click', startQuiz);
    actions.appendChild(startBtn);
    card.appendChild(actions);
  }

  function startQuiz() {
    quizItems = buildAttempt();
    current = 0;
    answers = [];
    updateProgress(true);
    renderQuestion();
  }

  function renderQuestion() {
    updateProgress(true);
    var item = quizItems[current];
    card.innerHTML = '';

    var tagRow = document.createElement('div');
    var formatTag = document.createElement('span');
    formatTag.className = 'format-tag';
    formatTag.textContent = item.format;
    tagRow.appendChild(formatTag);
    var laneTag = document.createElement('span');
    laneTag.className = 'lane-tag';
    laneTag.textContent = item.lane;
    tagRow.appendChild(laneTag);
    card.appendChild(tagRow);

    var stem = document.createElement('p');
    stem.className = 'q-stem';
    stem.textContent = item.stem;
    card.appendChild(stem);

    var optionsWrap = document.createElement('div');
    optionsWrap.className = 'q-options';
    var buttons = [];
    item.options.forEach(function (label, idx) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'q-option';
      btn.textContent = label;
      btn.addEventListener('click', function () { handlePick(idx, buttons, item); });
      buttons.push(btn);
      optionsWrap.appendChild(btn);
    });
    card.appendChild(optionsWrap);

    var feedback = document.createElement('div');
    feedback.className = 'q-feedback';
    feedback.hidden = true;
    feedback.id = 'q-feedback';
    card.appendChild(feedback);

    var actions = document.createElement('div');
    actions.className = 'q-actions';
    actions.id = 'q-actions';
    card.appendChild(actions);
  }

  function handlePick(idx, buttons, item) {
    var isCorrect = idx === item.correctIndex;
    buttons.forEach(function (b, i) {
      b.disabled = true;
      if (i === item.correctIndex) b.classList.add('correct');
      if (i === idx && !isCorrect) b.classList.add('incorrect');
      if (i === idx) b.classList.add('selected');
    });

    var feedback = document.getElementById('q-feedback');
    feedback.hidden = false;
    feedback.className = 'q-feedback ' + (isCorrect ? 'correct' : 'incorrect');
    feedback.textContent = (isCorrect ? 'Correct! ' : 'Not quite — the answer is "' + item.options[item.correctIndex] + '". ') + item.explanation;

    answers.push({
      id: item.id,
      stem: item.stem,
      chosenLabel: item.options[idx],
      correctLabel: item.options[item.correctIndex],
      isCorrect: isCorrect
    });

    var actions = document.getElementById('q-actions');
    var nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'btn-next';
    nextBtn.textContent = current < quizItems.length - 1 ? 'Next' : 'See my results';
    nextBtn.addEventListener('click', function () {
      current++;
      if (current < quizItems.length) {
        renderQuestion();
      } else {
        renderResults();
      }
    });
    actions.appendChild(nextBtn);
  }

  function renderResults() {
    updateProgress(false);
    card.innerHTML = '';

    var correctCount = answers.filter(function (a) { return a.isCorrect; }).length;
    var pct = Math.round((correctCount / answers.length) * 100);
    var passed = pct >= PASS_PERCENT;

    var hero = document.createElement('div');
    hero.className = 'score-hero';
    hero.innerHTML =
      '<p class="score-number">' + pct + '%</p>' +
      '<p style="margin:2px 0 0;font-size:13px;color:var(--muted);">' + correctCount + ' of ' + answers.length + ' correct</p>' +
      '<span class="score-status ' + (passed ? 'pass' : 'fail') + '">' + (passed ? 'Passed' : 'Not yet — try again') + '</span>';
    card.appendChild(hero);

    var reviewHeading = document.createElement('p');
    reviewHeading.style.cssText = 'font-weight:700;font-size:13.5px;margin:6px 0 4px;';
    reviewHeading.textContent = 'Review your answers';
    card.appendChild(reviewHeading);

    var list = document.createElement('ul');
    list.className = 'review-list';
    answers.forEach(function (a, i) {
      var li = document.createElement('li');
      li.className = 'review-item ' + (a.isCorrect ? 'right' : 'wrong');
      var q = document.createElement('p');
      q.className = 'rq';
      q.textContent = (i + 1) + '. ' + a.stem;
      var ans = document.createElement('p');
      ans.className = 'ra';
      ans.textContent = a.isCorrect ? 'Your answer: ' + a.chosenLabel : 'Your answer: ' + a.chosenLabel + '  •  Correct: ' + a.correctLabel;
      li.appendChild(q);
      li.appendChild(ans);
      list.appendChild(li);
    });
    card.appendChild(list);

    var stopRule = document.createElement('div');
    stopRule.className = 'stop-rule';
    stopRule.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9A6B00" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg><div><span class="label">Reminder</span><p>This check does not save your work. Download your results, or show your facilitator, before you close this tab.</p></div>';
    card.appendChild(stopRule);

    var actions = document.createElement('div');
    actions.className = 'result-actions';

    var downloadBtn = document.createElement('button');
    downloadBtn.type = 'button';
    downloadBtn.className = 'btn-secondary';
    downloadBtn.textContent = 'Download my results';
    downloadBtn.addEventListener('click', function () { downloadResults(pct, passed); });
    actions.appendChild(downloadBtn);

    var retryBtn = document.createElement('button');
    retryBtn.type = 'button';
    retryBtn.className = 'btn-primary';
    retryBtn.textContent = passed ? 'Try again' : 'Try again now';
    retryBtn.addEventListener('click', startQuiz);
    actions.appendChild(retryBtn);

    card.appendChild(actions);
  }

  function downloadResults(pct, passed) {
    var lines = [
      'Section Check — Framing and Refining — my results',
      '',
      'Score: ' + pct + '% (' + answers.filter(function (a) { return a.isCorrect; }).length + ' of ' + answers.length + ')',
      'Status: ' + (passed ? 'Passed' : 'Not yet — try again'),
      ''
    ];
    answers.forEach(function (a, i) {
      lines.push((i + 1) + '. ' + a.stem);
      lines.push('Your answer: ' + a.chosenLabel + (a.isCorrect ? ' (correct)' : ' — correct answer: ' + a.correctLabel));
      lines.push('');
    });
    var blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'section-check-results.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  renderIntro();
});
