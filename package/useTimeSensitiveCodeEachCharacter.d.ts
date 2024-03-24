// useTimeSensitiveCodeEachCharacter.d.ts

declare const useTimeSensitiveCodeEachCharacter: (
    code: string,
    callback: () => void,
    timeoutPerCharacter: number
) => void;

export default useTimeSensitiveCodeEachCharacter;
