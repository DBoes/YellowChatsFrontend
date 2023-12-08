export interface ChatInitiateRequest {
    context: Context;
}

export interface ChatInitiateResponse {
    chatId: string;
}

export interface Context {
    age: number;
    mood: string;
}

export interface MessageRequest {
    message: string;
    chatId: string;
}

export interface MessageResponse {
    message: string;
}

export interface MessageLog {
    message: string;
    person: Person;
    time: Date;
}

export enum Person {
    AGENT,
    CUSTOMER
}