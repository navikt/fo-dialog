export const cutStringAtLength = (text: string, maxLength: number, postfix?: string) => {
    return text.length > maxLength
        ? `${text.substring(0, postfix ? maxLength - postfix.length : maxLength)}${postfix ? postfix : ''}`
        : text;
};
