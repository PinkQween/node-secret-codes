import { useTimeSensitiveCodeWithTimeout } from "node-secret-codes";

useTimeSensitiveCodeWithTimeout('dev', () => {
    console.log('Cool!');
}, 3000)