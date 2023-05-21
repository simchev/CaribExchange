class Validation {
    constructor(valid, error) {
        this.valid = valid;
        this.error = error;
    }
}

const emailRe = /^\S+@\S+$/;
export function validateEmail(email) {
    const cleaned = email?.trim().toLowerCase();

    if (!cleaned) {
        return new Validation(false, "You must enter an email");
    } else if (!emailRe.test(cleaned)) {
        return new Validation(false, "You must enter a valid email address");
    }
    
    return new Validation(true, "");
}

export function validateCaribou(email) {
    const cleaned = email?.trim().toLowerCase();

    if (!cleaned.split("@")[0].endsWith("carib")) {
        return new Validation(false, "Our secret agents decided that you are not allowed to register");
    }

    return new Validation(true, "");
}

const minLength = 8, maxLength = 64;
export function validatePassword(password) {
    if (!password) {
        return new Validation(false, "You must enter a password");
    } else if (password.length < minLength) {
        return new Validation(false, `Your password must contain at least ${minLength} characters`);
    } else if (password.length > maxLength) {
        return new Validation(false, `Your password must not exceed ${maxLength} characters`);
    }

    return new Validation(true, "");
}

export function validateLogin(email, password) {
    const validEmail = validateEmail(email);
    if (!validEmail.valid) {
        return validEmail;
    }

    const validPassword = validatePassword(password);
    if (!validPassword.Valid) {
        return validPassword;
    }

    return validEmail;
}