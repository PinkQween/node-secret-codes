// const readline = require('readline');
// import readline from 'readline';
const readline = require('readline');

/**
 * Command-line tool to detect a specific code sequence typed by the user.
 * 
 * @param {string} code - The code to match against.
 * @param {Function} callback - The callback function to call when the code is typed.
 */
const useCode = (code, callback) => {
    let typedCode = "";

    const codeListener = (key) => {
        const typed = key.toLowerCase();
        const newTypedCode = typedCode + typed;

        if (newTypedCode === code.substr(0, newTypedCode.length)) {
            typedCode = newTypedCode;

            if (newTypedCode === code) {
                callback();
                typedCode = ""; // Reset the typed code after successful typing
            }
        } else {
            typedCode = "";
        }
    };

    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    process.stdin.on('keypress', (_, key) => {
        if (key && key.name !== 'return' && key.name !== 'escape') {
            if (key.name) codeListener(key.name);
            else (codeListener(key.sequence));
        }
    });
}

/**
 * Command-line tool to detect a specific code sequence with a timeout.
 * 
 * @param {string} code - The code to match against.
 * @param {Function} callback - The callback function to call when the code is typed.
 * @param {number} timeout - The timeout in milliseconds after which the typed code resets.
 */
const useTimeSensitiveCodeWithTimeout = (code, callback, timeout) => {
    let typedCode = "";
    let timer;

    const resetTypedCode = () => {
        typedCode = "";
        clearTimeout(timer);
    };

    const codeListener = (key) => {
        const typed = key.toLowerCase() ? key.toLowerCase() : key;
        const newTypedCode = typedCode + typed;

        if (newTypedCode === code.substr(0, newTypedCode.length)) {
            typedCode = newTypedCode;

            if (newTypedCode === code) {
                callback();
                resetTypedCode();
            } else if (timeout) {
                clearTimeout(timer);
                timer = setTimeout(resetTypedCode, timeout);
            }
        } else {
            resetTypedCode();
        }
    };

    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    process.stdin.on('keypress', (_, key) => {
        if (key && key.name !== 'return' && key.name !== 'escape') {
            if (key.name) codeListener(key.name);
            else (codeListener(key.sequence));
        }
    });
}

/**
 * Command-line tool to detect a specific code sequence with a timeout per character.
 * 
 * @param {string} code - The code to match against.
 * @param {Function} callback - The callback function to call when the code is typed.
 * @param {number} timeoutPerCharacter - The timeout in milliseconds after typing each character.
 */
const useTimeSensitiveCodeEachCharacter = (code, callback, timeoutPerCharacter) => {
    let typedCode = "";

    const codeListener = (key) => {
        clearTimeout(timeoutId);

        const typed = key.toLowerCase() ? key.toLowerCase() : key;
        const newTypedCode = typedCode + typed;

        if (newTypedCode === code.substr(0, newTypedCode.length)) {
            typedCode = newTypedCode;

            if (newTypedCode === code) {
                callback();
                typedCode = "";
            } else {
                timeoutId = setTimeout(() => {
                    typedCode = "";
                }, timeoutPerCharacter);
            }
        } else {
            typedCode = "";
        }
    };

    let timeoutId;

    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    process.stdin.on('keypress', (_, key) => {
        if (key && key.name !== 'return' && key.name !== 'escape') {
            if (key.name) codeListener(key.name);
            else (codeListener(key.sequence));
        }
    });
}

/**
 * Command-line tool to detect a specific code sequence with both timeout per character and overall timeout.
 * 
 * @param {string} code - The code to match against.
 * @param {Function} callback - The callback function to call when the code is typed.
 * @param {number} timeoutPerCharacter - The timeout in milliseconds after typing each character.
 * @param {number} overallTimeout - The overall timeout in milliseconds after which the typed code resets.
 */
const useCombinedTimeSensitiveCode = (code, callback, timeoutPerCharacter, overallTimeout) => {
    let typedCode = "";
    let overallTimer;

    const resetTypedCode = () => {
        typedCode = "";
        clearTimeout(timeoutId);
        clearTimeout(overallTimer);
    };

    const codeListener = (key) => {
        clearTimeout(timeoutId);

        const typed = key.toLowerCase() ? key.toLowerCase() : key;
        const newTypedCode = typedCode + typed;

        if (newTypedCode === code.substr(0, newTypedCode.length)) {
            typedCode = newTypedCode;

            if (newTypedCode === code) {
                callback();
                resetTypedCode();
            } else {
                timeoutId = setTimeout(() => {
                    typedCode = "";
                }, timeoutPerCharacter);
            }
        } else {
            resetTypedCode();
        }
    };

    let timeoutId;

    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    process.stdin.on('keypress', (_, key) => {
        if (key && key.name !== 'return' && key.name !== 'escape') {
            if (key.name) codeListener(key.name);
            else (codeListener(key.sequence));
        }
    });

    overallTimer = setTimeout(() => {
        resetTypedCode();
    }, overallTimeout);
}

// export default useCode;

// export {
//     useTimeSensitiveCodeWithTimeout,
//     useTimeSensitiveCodeEachCharacter,
//     useCombinedTimeSensitiveCode
// }

module.exports = {
    useCode,
    useTimeSensitiveCodeWithTimeout,
    useTimeSensitiveCodeEachCharacter,
    useCombinedTimeSensitiveCode
}