// Fetch categories and display buttons
axios.get('https://rithm-jeopardy.herokuapp.com/api/categories?count=5')
  .then(response => {
    const categories = response.data;
    const categoriesContainer = document.getElementById('categories');

    categories.forEach(category => {
      const categoryButton = document.createElement('button');
      categoryButton.textContent = category.title;
      categoryButton.addEventListener('click', () => {
        fetchCategoryQuestions(category.id);
      });

      categoriesContainer.appendChild(categoryButton);
    });
  })
  .catch(error => {
    console.error('Error fetching categories:', error);
  });

// Fetch and display questions from selected category
function fetchCategoryQuestions(categoryId) {
  axios.get(`https://rithm-jeopardy.herokuapp.com/api/category?id=${categoryId}`)
    .then(response => {
      const data = response.data;
      const questionBoard = document.getElementById('board');
      questionBoard.innerHTML = ''; // Clear board

      // Display category title
      const titleDiv = document.createElement('div');
      titleDiv.className = 'category';
      titleDiv.textContent = data.title;
      questionBoard.appendChild(titleDiv);

      // Add question values
      for (let clue of data.clues.slice(0, 5)) { // limit to 5
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.textContent = `$${clue.value || 100}`;
        questionDiv.addEventListener('click', () => {
          showQuestion(clue);
        });
        questionBoard.appendChild(questionDiv);
      }
    })
    .catch(error => {
      console.error('Error fetching questions:', error);
    });
}

function showQuestion(clue) {
  const container = document.getElementById('question-container');
  const questionText = document.getElementById('question-text');
  const answerInput = document.getElementById('answer-input');
  const submitButton = document.getElementById('submit-answer');
  const scoreDisplay = document.getElementById('score');

  container.style.display = 'block';
  questionText.textContent = clue.question;
  answerInput.value = '';

  submitButton.onclick = function () {
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = clue.answer.trim().toLowerCase();
    let currentScore = parseInt(scoreDisplay.textContent.replace('Score: ', ''));

    if (userAnswer === correctAnswer) {
      currentScore += clue.value || 100;
      alert('Correct!');
    } else {
      currentScore -= clue.value || 100;
      alert(`Incorrect! The correct answer was: ${clue.answer}`);
    }

    scoreDisplay.textContent = `Score: ${currentScore}`;
    container.style.display = 'none';
  };
}
