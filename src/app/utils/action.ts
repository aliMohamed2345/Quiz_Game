//interfaces 
export interface ShowMsgProps {
    show: boolean,
    isCorrect: boolean
}
export interface checkProps {
    checked: boolean,
    isCorrectAnswer: boolean
}
export interface HintsProps {
    Hints: number
    IsUsed: boolean
}
export function decodeHtmlEntities(text: string) {
    return text.replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#039;/g, "'")
        .replace(/&euml;/g, "ë");
}

export function RandomizeOptions(falseAnswers: string[], rightAnswer: string): string[] {
    const options = falseAnswers.filter(e => e && e.trim());
    options.splice(RandomFunction(4, 0), 0, rightAnswer);
    options.length = 4;
    return options;
}

export function RandomFunction(max: number, min: number = 1): number {
    return Math.floor(Math.random() * (max - min) + min);
}
export function EnumToArray(Obj: object): string[] {
    const Values: string[] = [];
    const AndSign = "And";

    for (let E of Object.keys(Obj)) {
        if (E.includes('&amp;')) {
            E = E.replace('&amp;', AndSign);
        }
        // Remove specific prefixes for dropdown menu
        if (E.startsWith("Entertainment: ")) {
            E = E.replace("Entertainment: ", "");
        } else if (E.startsWith("Science: ")) {
            E = E.replace("Science: ", "");
        }
        Values.push(E);
    }
    return Values;
}