# Node/Bun Cheat/Secret Codes

This package provides a hook that allows you to implement cheat codes functionality in your React application. You can use this hook to listen for specific key sequences and trigger actions or callbacks when those sequences are typed by the user.

## Installation

You can install `node-secret-codes` via npm:

```bash
npm install node-secret-codes
```

OR

```bash
yarn add node-secret-codes
```

OR

```bash
bun i node-secret-codes
```

# Usage

To use `react-secret-codes` in your React application, import the `useCheatCode` hook and call it with the desired cheat code sequence and a callback function to be executed when the code is typed.

```JavaScript
const NSCodes = require('node-secret-codes');

NSCodes.useCheatCode('awesome', () => {
  // Callback function to be executed when the code is typed
  console.log('Cheat code activated!');
  // Add your custom logic here
});
```

We recommend combining with environment variables to create something like this:

```JavaScript
const NSCodes = require('node-secret-codes');

NSCodes.useCheatCode(process.env.REACT_APP_SECRET_CODE, () => {
  // Callback function to be executed when the code is typed
  console.log('Cheat code activated!');
  // Add your custom logic here
});
```

Do you want the user to have to do it within a time limit? well you can do this:

```JavaScript
const NSCodes = require('node-secret-codes');

NSCodes.useTimeSensitiveCode(process.env.REACT_APP_SECRET_CODE, () => {
  // Callback function to be executed when the code is typed
  console.log('Cheat code activated!');
  // Add your custom logic here
}, 3000);
```

If you want to just look at the time of every individual character you can use a slightly different function:

```JavaScript
const NSCodes = require('node-secret-codes');

NSCodes.useTimeSensitiveCodeEachCharacter(process.env.REACT_APP_SECRET_CODE, () => {
  // Callback function to be executed when the code is typed
  console.log('Cheat code activated!');
  // Add your custom logic here
}, 20);
```

You can even combine the last 2 like this:

```JavaScript
const NSCodes = require('node-secret-codes');

NSCodes.useCombinedTimeSensitiveCode(process.env.REACT_APP_SECRET_CODE, () => {
  // Callback function to be executed when the code is typed
  console.log('Cheat code activated!');
  // Add your custom logic here
}, 20, 3000);
```

# Notes
- The hook returns the current typed code sequence, allowing you to track the progress of the code entry if needed.
- You can use the hook in any component where you want to implement cheat code functionality.
- Remember to handle side effects or logic within the callback function passed to the hook.

# Contributing
Contributions are welcome! If you have any ideas, suggestions, or find any issues, feel free to open an issue or submit a pull request on GitHub.
