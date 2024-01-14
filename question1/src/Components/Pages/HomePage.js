// eslint-disable-next-line import/no-cycle, no-unused-vars
import routes from '../Router/routes';
import { getRandomQuestions } from '../../utils/questions';

const HomePage = () => {
  const main = document.querySelector('main');
  main.innerHTML = `
  <div class="text-center">
    <h1 class="display-1">Quizz !</h1>

    <form id="questionnaire">Questions</form>
  </div>`;

  const questions = getRandomQuestions();

  const questionnaire = document.getElementById("questionnaire");

  questions.forEach((question) => {
    const questionText = document.createElement('p');
    questionText.textContent = question.question;
    questionnaire.appendChild(questionText);

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < question.answers.length; i++) {
        const answer = document.createElement('input');
        answer.type = 'radio';
        answer.name = `question${question.id}`; // Add a unique name for each question
        answer.value = question.answers[i].text;
        answer.id = `q${question.id}_answer${i}`; // Optional: Set a unique ID for each answer

        const label = document.createElement('label');
        label.setAttribute('for', answer.id); // Associate the label with the corresponding input
        label.textContent = question.answers[i].text;

        questionnaire.appendChild(answer);
        questionnaire.appendChild(label);
        questionnaire.appendChild(document.createElement('br'));
    }
  });

  const submitButton = document.createElement('input');
  submitButton.type = 'submit';
  submitButton.value = 'Submit answers';
  questionnaire.appendChild(submitButton);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const selectedOptions = document.querySelectorAll('input[type="radio"]:checked');
    const choices = Array.from(selectedOptions);
    let score = 0;
    choices.forEach((choice) => {
        if(choice.isCorrect){
            score += 1;
        }
    });

    main.innerHTML = `
        <div class="text-center">
            <h1 class="display-1">Results</h1>
            <p id="result"></p>
            <p id="bouton"></p>
        </div>`;

    const finalResult = document.getElementById("result");
    finalResult.innerHTML = `Your result is ${score}/3`;

    const replayButton = document.createElement('input');
    replayButton.type = "submit";
    replayButton.value = "Replay";
    const bouton = document.getElementById("bouton");
    bouton.appendChild(replayButton);

    const handleSubmit2 = async (event2) => {
        event2.preventDefault();
        window.location.href = '/';
    }

    replayButton.addEventListener('submit', handleSubmit2);
  }

  questionnaire.addEventListener('submit', handleSubmit);

};

export default HomePage;
