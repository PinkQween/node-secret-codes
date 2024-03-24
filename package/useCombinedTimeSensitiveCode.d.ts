// useTimeSensitiveCodeEachCharacter.d.ts

declare const useTimeSensitiveCodeEachCharacter: (
    code: string,
    callback: () => void,
    timeoutPerCharacter: number,
    overallTimeout: number
) => void;

export default useTimeSensitiveCodeEachCharacter;
