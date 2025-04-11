// Use Axios to fetch the categories from the API
axios.get('https://rithm-jeopardy.herokuapp.com/api/categories?count=5')
  .then(response => {
    const categories = response.data;
    const categoriesContainer = document.getElementById('categories');
    
    // Loop through the categories and create HTML for each one
    categories.forEach(category => {
      const categoryElement = document.createElement('button');
      categoryElement.textContent = category.title; // Display the category title
      categoryElement.classList.add('category'); // Add a class for styling (optional)

      // Add a click event to fetch questions for the selected category
      categoryElement.addEventListener('click', () => {
        fetchCategoryQuestions(category.id);
      });

      categoriesContainer.appendChild(categoryElement); // Append category to the container
    });
  })
  .catch(error => {
    console.error('Error fetching categories:', error);
  });

// Fetch questions for the selected category
function fetchCategoryQuestions(categoryId) {
  axios.get(`https://rithm-jeopardy.herokuapp.com/api/category?id=${categoryId}`)
    .then(response => {
      const questions = response.data;
      const questionBoard = document.getElementById('question-board');
      questionBoard.innerHTML = ''; // Clear previous questions

      // Display the questions
      questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `
          <p><strong>Question ${index + 1}: ${question.question}</strong></p>
          <button onclick="showAnswer('${question.answer}')">Show Answer</button>
        `;
        questionBoard.appendChild(questionElement);
      });
    })
    .catch(error => {
      console.error('Error fetching category questions:', error);
    });
}

// Show the answer to the selected question
function showAnswer(answer) {
  alert(`The answer is: ${answer}`);
}
