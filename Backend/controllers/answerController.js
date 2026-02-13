import db from '../db/dbconfig.js';



exports.getAnswersByQuestionId = async (req, res) => {
    const { questionId } = req.params;  
    try {
        const [answers] = await db.execute('SELECT * FROM answers WHERE questionId = ?', [questionId]);
        res.json(answers); // Return the answers as JSON response
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' }); // Return server error if any exception occurs
    }

};


exports.createAnswer = async (req, res) => {
    const { questionId } = req.params;
    const { content } = req.body; // Get answer content from request body
    try {
        await db.execute('INSERT INTO answers (questionId, content) VALUES (?, ?)', [questionId, content]); // Insert new answer into the database
        res.status(201).json({ message: 'Answer created successfully' }); // Return success message with 201 status code
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' }); // Return server error if any exception occurs
    }   
};

exports.deleteAnswer = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.execute('DELETE FROM answers WHERE id = ?', [id]); // Delete answer by ID from the database
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Answer not found' }); // Return 404 if answer is not found
        }
        res.json({ message: 'Answer deleted successfully' }); // Return success message if answer is deleted
    }   
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' }); // Return server error if any exception occurs
    }
};
