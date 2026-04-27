
class Answer {
  constructor(text, value) {
    this.text = text;
    this.value = value; 
  }
}

class Question {
  constructor(text, answers) {
    this.text = text;
    this.answers = answers;
  }
  getPoints(selectedIndex) {
    return this.answers[selectedIndex].value;
  }
  getCorrectIndex() {
    for (let i = 0; i < this.answers.length; i++) {
      if (this.answers[i].value === 1) return i;
    }
    return -1;
  }
}

class Result {
  constructor(threshold, text) {
    this.threshold = threshold;
    this.text = text;
  }
  matches(score) {
    return score >= this.threshold;
  }
}

class Quiz {
  constructor(questions, results) {
    this.questions = questions;
    this.results = results;
    this.score = 0;
    this.currentIndex = 0;
    this.finished = false;
    this.selectedResult = null;
  }

  applyAnswer(selectedIdx) {
    if (this.finished) return null;
    const currentQ = this.questions[this.currentIndex];
    const pointsEarned = currentQ.getPoints(selectedIdx);
    this.score += pointsEarned;
    const correctIdx = currentQ.getCorrectIndex();
    const isCorrect = (selectedIdx === correctIdx);
    this.moveToNext();
    return { correctIndex: correctIdx, selectedIndex: selectedIdx, isCorrect: isCorrect };
  }

  moveToNext() {
    this.currentIndex++;
    if (this.currentIndex >= this.questions.length) {
      this.finishQuiz();
    }
  }

  finishQuiz() {
    this.finished = true;
    for (let i = 0; i < this.results.length; i++) {
      if (this.results[i].matches(this.score)) {
        this.selectedResult = this.results[i];
        break;
      }
    }
    if (!this.selectedResult && this.results.length) {
      this.selectedResult = this.results[this.results.length - 1];
    }
  }

  isFinished() {
    return this.finished;
  }

  getCurrentQuestion() {
    if (this.finished) return null;
    return this.questions[this.currentIndex];
  }

  getProgressText() {
    if (this.finished) {
      return ` Очки: ${this.score} из ${this.questions.length}`;
    }
    return `${this.currentIndex + 1} / ${this.questions.length}`;
  }

  getResultMessage() {
    if (!this.finished) return "";
    return this.selectedResult ? this.selectedResult.text : "Результат не определён";
  }
}


const QUESTIONS_LIST = [
  new Question("2 + 2 = ?", [new Answer("2",0), new Answer("3",0), new Answer("4",1), new Answer("0",0)]),
  new Question("Какая функция выводит данные в консоль?", [new Answer("console.log()",1), new Answer("print()",0), new Answer("echo()",0), new Answer("document.write()",0)]),
  new Question("Что вернёт typeof null?", [new Answer("'null'",0), new Answer("'object'",1), new Answer("'undefined'",0), new Answer("'string'",0)]),
  new Question("Как объявить переменную с блочной областью видимости?", [new Answer("var",0), new Answer("let",1), new Answer("const",0), new Answer("global",0)]),
  new Question("Оператор строгого сравнения (без приведения типов):", [new Answer("==",0), new Answer("=",0), new Answer("===",1), new Answer("!=",0)]),
  new Question("Какой метод добавляет элемент в конец массива?", [new Answer("push()",1), new Answer("pop()",0), new Answer("shift()",0), new Answer("unshift()",0)]),
  new Question("Что делает оператор '=== '?", [new Answer("Сравнивает значения с приведением типов",0), new Answer("Сравнивает значения и типы данных",1), new Answer("Присваивает значение",0), new Answer("Выполняет математическое равенство",0)]),
  new Question("Как объявить функцию в JavaScript?", [new Answer("function myFunc() {}",1), new Answer("def myFunc()",0), new Answer("create myFunc()",0), new Answer("func = myFunc()",0)]),
  new Question("Что такое 'closure' (замыкание) в JS?", [new Answer("Встроенная функция",0), new Answer("Функция, имеющая доступ к переменным внешней функции даже после её возврата",1), new Answer("Глобальная переменная",0), new Answer("Тип данных",0)]),
  new Question("Как получить длину строки 'Hello'?", [new Answer("length()",0), new Answer("len()",0), new Answer("size",0), new Answer(".length",1)]),
  new Question("Что выведет console.log(typeof NaN)?", [new Answer("'NaN'",0), new Answer("'number'",1), new Answer("'undefined'",0), new Answer("'object'",0)]),
  new Question("Как прервать цикл в JavaScript?", [new Answer("stop",0), new Answer("break",1), new Answer("exit",0), new Answer("return",0)]),
  new Question("Что делает метод map()?", [new Answer("Создаёт новый массив, преобразуя каждый элемент",1), new Answer("Фильтрует массив",0), new Answer("Сортирует массив",0), new Answer("Удаляет элементы",0)]),
  new Question("Какой атрибут используется для подключения внешнего JavaScript-файла?", [new Answer("src",1), new Answer("href",0), new Answer("link",0), new Answer("script",0)]),
  new Question("Что делает метод 'querySelector'?", [new Answer("Выбирает первый элемент по CSS-селектору",1), new Answer("Выбирает все элементы по тегу",0), new Answer("Изменяет стиль",0), new Answer("Создаёт новый элемент",0)]),
  new Question("Что такое 'this' в методе объекта?", [new Answer("Ссылка на глобальный объект",0), new Answer("Ссылка на текущий объект",1), new Answer("Ссылка на родительский объект",0), new Answer("Новая переменная",0)]),
  new Question("Какой метод преобразует JSON строку в объект?", [new Answer("JSON.stringify()",0), new Answer("JSON.parse()",1), new Answer("JSON.objectify()",0), new Answer("JSON.toObject()",0)]),
  new Question("Что выведет console.log(0.1 + 0.2 === 0.3)?", [new Answer("true",0), new Answer("false",1), new Answer("undefined",0), new Answer("NaN",0)]),
  new Question("Как создать новый массив из строки 'a,b,c'?", [new Answer("split(',')",1), new Answer("join(',')",0), new Answer("slice()",0), new Answer("concat()",0)]),
  new Question("Что делает 'event.preventDefault()'?", [new Answer("Отменяет стандартное действие браузера",1), new Answer("Останавливает всплытие события",0), new Answer("Удаляет элемент",0), new Answer("Запускает событие заново",0)])
];


const RESULTS_LIST = [
  new Result(18, " Вы в совершенстве знаете тему! Блестяще! 18-20 правильных ответов — это гениально!"),
  new Result(14, " Ваш уровень выше среднего! Отличные знания! 14-17 верных ответов — вы почти эксперт."),
  new Result(7, " Вы уже неплохо разбираетесь. Ещё немного — и вы эксперт! (7-13 верных ответов)"),
  new Result(0, " Вам многому нужно научиться. Не сдавайтесь! Начните изучать основы JavaScript и IT.")
];

let currentQuiz = null;
let isWaiting = false;
let timeoutId = null;

const headElem = document.getElementById('head');
const buttonsContainer = document.getElementById('buttons');
const pagesElem = document.getElementById('pages');

function clearPendingTimeout() {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
}

function renderQuiz() {
  if (!currentQuiz) return;

  if (currentQuiz.isFinished()) {
    const finalMessage = currentQuiz.getResultMessage();
    headElem.textContent = finalMessage;
    
    buttonsContainer.innerHTML = `
      <div class="end-message" style="text-align: center; padding: 12px 0 8px 0;">
        <div style="font-size: 2rem; margin-bottom: 8px;"></div>
        <div style="font-size: 1.2rem; font-weight: 500; margin-bottom: 20px; background: #f0f4fe; padding: 12px; border-radius: 48px;">
          ${currentQuiz.score} / ${currentQuiz.questions.length} правильных ответов
        </div>
        <button class="restart-btn" id="restartQuizBtn"> Пройти заново</button>
      </div>
    `;
    pagesElem.textContent = currentQuiz.getProgressText();
    
    const restartBtn = document.getElementById('restartQuizBtn');
    if (restartBtn) {
      restartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        restartQuiz();
      });
    }
    return;
  }
  
  const currentQ = currentQuiz.getCurrentQuestion();
  if (!currentQ) return;
  
  headElem.textContent = currentQ.text;
  buttonsContainer.innerHTML = '';
  currentQ.answers.forEach((answer, idx) => {
    const btn = document.createElement('button');
    btn.className = 'button';
    btn.textContent = answer.text;
    btn.setAttribute('data-index', idx);
    buttonsContainer.appendChild(btn);
  });
  
  pagesElem.textContent = currentQuiz.getProgressText();
  
  const allButtons = document.querySelectorAll('.button');
  allButtons.forEach(btn => {
    btn.removeEventListener('click', buttonClickHandler);
    btn.addEventListener('click', buttonClickHandler);
  });
}

function buttonClickHandler(event) {
  if (isWaiting) return;
  if (!currentQuiz || currentQuiz.isFinished()) return;
  
  const btn = event.currentTarget;
  const selectedIdx = parseInt(btn.getAttribute('data-index'), 10);
  if (isNaN(selectedIdx)) return;
  
  const resultInfo = currentQuiz.applyAnswer(selectedIdx);
  if (!resultInfo) return;
  
  isWaiting = true;
  const allCurrentBtns = document.querySelectorAll('.button');
  
  allCurrentBtns.forEach(btnEl => {
    btnEl.classList.add('button_passive');
  });
  
  const { correctIndex, selectedIndex, isCorrect } = resultInfo;
  
  if (correctIndex !== -1 && allCurrentBtns[correctIndex]) {
    allCurrentBtns[correctIndex].classList.add('button_correct');
  }
  if (!isCorrect && allCurrentBtns[selectedIndex]) {
    allCurrentBtns[selectedIndex].classList.add('button_wrong');
  }
  
  clearPendingTimeout();
  timeoutId = setTimeout(() => {
    isWaiting = false;
    clearPendingTimeout();
    if (currentQuiz && !currentQuiz.isFinished()) {
      renderQuiz();
    } else if (currentQuiz && currentQuiz.isFinished()) {
      renderQuiz();
    } else {
      if (!currentQuiz) restartQuiz();
    }
  }, 800);
}

function restartQuiz() {
  clearPendingTimeout();
  isWaiting = false;
  const freshQuestions = QUESTIONS_LIST.map(q => new Question(q.text, q.answers.slice()));
  const freshResults = RESULTS_LIST.map(r => new Result(r.threshold, r.text));
  currentQuiz = new Quiz(freshQuestions, freshResults);
  renderQuiz();
}

function initQuiz() {
  const initialQuestions = QUESTIONS_LIST.map(q => new Question(q.text, q.answers.slice()));
  const initialResults = RESULTS_LIST.map(r => new Result(r.threshold, r.text));
  currentQuiz = new Quiz(initialQuestions, initialResults);
  renderQuiz();
}

initQuiz();