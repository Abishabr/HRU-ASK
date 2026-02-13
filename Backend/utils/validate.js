exports.validateRegistor = (data) => {
    const { firstName, lastName, email, password } = data;
    if (!firstName || !lastName || !email || !password) {
        return { valid: false, message: 'All fields are required' } ;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { valid: false, message: 'Invalid email format' };
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        return { valid: false, message: 'Password must be at least 8 characters long and contain at least one letter and one number' };
    }
    return { valid: true };

};

exports.validateLogin = (data) => {
    const { email, password } = data;
    if (!email || !password) {
        return { valid: false, message: 'Email and password are required' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { valid: false, message: 'Invalid email format' };
    }
    return { valid: true };
};
