exports.validateRegistor = (data) => {
    const { firstName, lastName, email, password } = data;
    if (!firstName || !lastName || !email || !password) {
        return { valid: false, message: 'All fields are required' } ;
    }
};