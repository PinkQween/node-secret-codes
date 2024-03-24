// useTimeSensitiveCode.d.ts

declare const useTimeSensitiveCode: (
    code: string,
    callback: () => void,
    timeout: number
) => void;

export default useTimeSensitiveCode;
