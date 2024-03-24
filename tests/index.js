import { useCode, useTimeSensitiveCodeWithTimeout } from "node-secret-codes";

useTimeSensitiveCodeWithTimeout('dev', () => {
    console.log('Cool!');
}, 3000)

useCode('`', () => {
    console.log('Cool!```');
}, 3000)