const quizDB = [
  {
    question: "What is your Favourite Sport? 🏈",
    a: "Cricket",
    b: "Football",
    c: "Kabaddi",
    d: "Badminton",
  },
  {
    question: "Which cuisine do you like the most? 🍟",
    a: "Indian",
    b: "Chinese",
    c: "Continental",
    d: "Italian",
  },
  {
    question: "What's your favourite film genre? 🎬",
    a: "Thriller",
    b: "Romance",
    c: "Suspense",
    d: "Horror",
  },
  {
    question: "How often do you listen to music? 🎶",
    a: "Less than 2 hours>",
    b: "2 to 4 hours",
    c: "4 to 6 hours",
    d: "More than 6 hours",
  }
];

const question = document.querySelector(".question");
const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const option3 = document.querySelector("#option3");
const option4 = document.querySelector("#option4");
const next = document.querySelector("#next");

const answers = document.querySelectorAll(".answer");

let questionCount = 0;

const loadQuestion = () => {
  const questionList = quizDB[questionCount];
  question.innerHTML = questionList.question;
  option1.innerHTML = questionList.a;
  option2.innerHTML = questionList.b;
  option3.innerHTML = questionList.c;
  option4.innerHTML = questionList.d;
};

loadQuestion();

const getCheckedAns = () => {
  let answer;

  answers.forEach((curEl) => {
    if (curEl.checked) {
      answer = curEl.id;
    }
  });
  return answer;
};

const res = [];
let checkedAns;

next.addEventListener("click", () => {
  checkedAns = getCheckedAns();
  questionCount = questionCount + 1;
  res.push(checkedAns);
  console.log(res)
//  # if (questionCount < quizDB.length) {
//     loadQuestion();
//   }
});


next.addEventListener("click", (e) => {
  console.log(e);
});
