exports.validateRegistor = (data) => { // Validate registration data
    const { firstName, lastName, email, password } = data; // Destructure registration data
    if (!firstName || !lastName || !email || !password) {
        return { valid: false, message: 'All fields are required' } ; // If any field is missing, return error message
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression to validate email format
    if (!emailRegex.test(email)) {
        return { valid: false, message: 'Invalid email format' };
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        return { valid: false, message: 'Password must be at least 8 characters long and contain at least one letter and one number' };
    }
    return { valid: true };

};

exports.validateLogin = (data) => { // Validate login data
    const { email, password } = data; // Destructure login data
    if (!email || !password) {
        return { valid: false, message: 'Email and password are required' } // If email or password is missing, return error message;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression to validate email format
    if (!emailRegex.test(email)) {
        return { valid: false, message: 'Invalid email format' };
    }
    return { valid: true }; // If validation passes, return valid: true
};
