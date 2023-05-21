function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
}

export function encryptCaribou(message) {
    message = message.toLowerCase();
    let cipher = "";
    for (let i = 0; i < message.length; i++) {
        if (isLetter(message[i])) {
            switch (message[i]) {
                case 'a':
                case 'e':
                case 'i':
                case 'o':
                case 'u':
                case 'y':
                    cipher += 'muu';
                    break;
                default:
                    cipher += 'grm';
            }
        } else {
            cipher += message[i];
        }
    }
    return cipher;
}