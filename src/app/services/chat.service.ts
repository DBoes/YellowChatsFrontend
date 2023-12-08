import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageRequest, MessageResponse, ChatInitiateRequest, ChatInitiateResponse, MessageLog, Person } from './chat.models';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'https://api.example.com';
  private messageLog: BehaviorSubject<Array<MessageLog>> = new BehaviorSubject([] as Array<MessageLog> );
  public messageLog$: Observable<Array<MessageLog>> = this.messageLog.asObservable();
  private chatId?: string;

  constructor(private http: HttpClient) {}

  initiateChat(): void {
    const url = `${this.apiUrl}/chat`;
    const body: ChatInitiateRequest = {
        context: {
            age: 0, 
            mood: ""
        }
    };
    const request = this.http.post<ChatInitiateResponse>(url, body);

    request.subscribe(
        (response) => {
          this.chatId = response.chatId;
        },
        (error) => {
          console.error('API Error:', error);
        }
      );
  }

  postMessage(message: string): void {
    const messageToSend: MessageLog = {
        message: message,
        person: Person.CUSTOMER,
        time: new Date(),
    };

    this.messageLog.next([
        ...this.messageLog.value,
        messageToSend
    ]);

    const url = `${this.apiUrl}/message`;
    if (!this.chatId) {
        console.error("Post message called before initiated chat.");
        throw "Error";
    }
    const body: MessageRequest = {chatId: this.chatId, message};
    const request = this.http.post<MessageResponse>(url, body);
    
    request.subscribe(
      (response) => {
        const messageReceived: MessageLog = {
            message: response.message,
            person: Person.AGENT,
            time: new Date(),
        };
    
        this.messageLog.next([
            ...this.messageLog.value,
            messageReceived
        ]);
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }
}

