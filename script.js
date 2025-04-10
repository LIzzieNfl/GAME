// Data for the questions and answers
const questions = {
    "category1": {
      "100": { question: "What is the chemical symbol for water?", answer: "H2O" },
      "200": { question: "What planet is known as the Red Planet?", answer: "Mars" },
      "300": { question: "What is the most abundant gas in Earth's atmosphere?", answer: "Nitrogen" },
      "400": { question: "What is the hardest natural substance?", answer: "Diamond" },
      "500": { question: "What element has the atomic number 1?", answer: "Hydrogen" }
    },
    "category2": {
      "100": { question: "Who was the first president of the United States?", answer: "George Washington" },
      "200": { question: "In what year did World War II end?", answer: "1945" },
      "300": { question: "Who was the leader of the Soviet Union during WWII?", answer: "Joseph Stalin" },
      "400": { question: "What ancient civilization built the pyramids?", answer: "Egyptians" },
      "500": { question: "Which battle ended the Napoleonic Wars?", answer: "Battle of Waterloo" }
    },
    // Add similar data for other categories
  };
  
  let score = 0;
  
  // Handle question click
  document.querySelectorAll('.question').forEach((question) => {
    question.addEventListener('click', function() {
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
  
  // Check user's answer
  function checkAnswer(currentQuestion, value) {
    const userAnswer = document.getElementById('answer-input').value.trim();
    const correctAnswer = currentQuestion.answer;
  
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      score += parseInt(value);
      alert("Correct!");
    } else {
      score -= parseInt(value);
      alert("Incorrect. The correct answer was: " + correctAnswer);
    }
  
    // Update score and hide question
    document.getElementById('score').textContent = "Score: " + score;
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('answer-input').value = '';
  }
  