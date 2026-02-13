import db from '../db/dbconfig.js';


exports.getAllQuestions = async (req, res) => {
    try {
        const [questions] = await db.execute('SELECT * FROM questions'); // Fetch all questions from the database
        res.json(questions); // Return the questions as JSON response
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' }); // Return server error if any exception occurs
    }   
};

exports.getQuestionById = async (req, res) => { 
    const { id } = req.params; // Get question ID from request parameters
    try {
        const [question] = await db.execute('SELECT * FROM questions WHERE id = ?', [id]); // Fetch question by ID from the database
        if (question.length === 0) {
            return res.status(404).json({ message: 'Question not found' }); // Return 404 if question is not found
        }   
        res.json(question[0]); // Return the question as JSON response
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' }); // Return server error if any exception occurs
    }
};

exports.createQuestion = async (req, res) => {
    const { title, content } = req.body; // Get question title and content from request body
    try {
        await db.execute('INSERT INTO questions (title, content) VALUES (?, ?)', [title, content]); // Insert new question into the database    
        res.status(201).json({ message: 'Question created successfully' }); // Return success message with 201 status code
    }
    catch (error) {     
        console.error(error);

        res.status(500).json({ message: 'Server error' }); // Return server error if any exception occurs
    }   
};
