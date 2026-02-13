import db from '../db/dbconfig.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const {validateregister, validateLogin} = require('../utils/validate.js');


// Registration and login functions

// Registration function
exports.register = async (req, res) => {
    const validationResult = validateregister(req.body); // Validate registration data
    if (!validationResult.valid) { // If validation fails, return error message
        return res.status(400).json({ message: validationResult.message });
    }
    const { firstName, lastName, email, password } = req.body;// Destructure registration data
    try {
        const [existingUser] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);  // Check if email already exists  
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        await db.execute('INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)', [firstName, lastName, email, hashedPassword]); //
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }   
};

// Login function
exports.login = async (req, res) => {
    const validationResult = validateLogin(req.body); // Validate login data
    if (!validationResult.valid) {
        return res.status(400).json({ message: validationResult.message });
    }
    const { email, password } = req.body; // Destructure login data
    try {
        const [user] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);    // Check if user exists
        if (user.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }       
        const validPassword = await bcrypt.compare(password, user[0].password); // Compare provided password with hashed password in database
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }       
        const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generate JWT token
        res.json({ token });
    }   
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }   
};  
