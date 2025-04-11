const axios = require('axios');

async function fetchCategories() {
    try {
        const response = await axios.get('https://rithm-jeopardy.herokuapp.com/api/categories?count=5');
        console.log("Categories:", response.data);

        // Now that we have the categories, let's fetch questions for the "baseball" category (id: 2)
        await fetchCategoryQuestions(2);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

async function fetchCategoryQuestions(categoryId) {
    try {
        const response = await axios.get(`https://rithm-jeopardy.herokuapp.com/api/category?id=${categoryId}`);
        console.log(`Questions for category id ${categoryId}:`, response.data);
    } catch (error) {
        console.error('Error fetching category questions:', error);
    }
}

fetchCategories();
