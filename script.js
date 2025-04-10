// To store questions dynamically
let questions = {};
let score = 0;

// Fetch categories from the API
async function fetchCategories() {
  try {
    const response = await axios.get('https://rithm-jeopardy.herokuapp.com/api/categories?count=10');
    const categories = response.data;
    
    // Display categories dynamically
    categories.forEach((category) => {
      const categoryButton = document.createElement('button');
      categoryButton.textContent = category.title;
      categoryButton.dataset.categoryId = category.id;
      categoryButton.classList.add('category-button');
      document.getElementById('categories').appendChild(categoryButton);
    });

    // Add event listeners to category buttons
    document.querySelectorAll('.category-button').forEach(button => {
      button.addEventListener('click', () => fetchQuestions(button.dataset.categoryId));
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

// Fetch questions for the selected category
async function fetchQuestions(categoryId) {
  try {
    const response = await axios.get(`https://rithm-jeopardy.herokuapp.com/api/category?id=${categoryId}`);
    const categoryData = response.data;

    // Store questions for the selected category
    questions = {
      [categoryData.title]: categoryData.clues.reduce((acc, clue) => {
        acc[clue.value] = { question: clue.question, answer: clue.answer };
        return acc;
      }, {})
    };

    // Display question options dynamically
    const questionBoard = document.getElementById('question-board');
    questionBoard.innerHTML = ''; // Clear previous questions
    Object.keys(questions[categoryData.title]).forEach((value) => {
      const questionButton = document.createElement('button');
      questionButton.textContent = `$${value}`;
      questionButton.dataset.category = categoryData.title;
      questionButton.dataset.value = value;
      questionButton.classList.add('question');
      questionBoard.appendChild(questionButton);
    });

    // Add event listeners for each question
    document.querySelectorAll('.question').forEach((question) => {
      question.addEventListener('click', function () {
        const category = this.dataset.category;
        const value = this.dataset.value;
        const currentQuestion = questions[category][value];

        // Display question and input
        document.getElementById('question-container').style.display = 'block';
        document.getElementById('question-text').textContent = currentQuestion.question;

        // Set up answer submission
        const submitButton = document.getElementById('submit-answer');
        submitButton.onclick = () => checkAnswer(currentQuestion, value);
      });
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
}

// Check if the answer is correct and update the score
function checkAnswer(currentQuestion, value) {
  const userAnswer = document.getElementById('answer-input').value.trim();
  const correctAnswer = currentQuestion.answer;

  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    score += parseInt(value);
    alert("Correct!"); //
  } else {
    score -= parseInt(value);
    alert("Incorrect. The correct answer was: " + correctAnswer);
  }

  // Update score and hide question container
  document.getElementById('score').textContent = "Score: " + score;
  document.getElementById('question-container').style.display = 'none';
  document.getElementById('answer-input').value = '';
}

// Initialize the game by fetching categories
fetchCategories();
