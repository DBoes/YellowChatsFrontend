import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    public data: any;
    public chat =  [
        {
            "message": "Waar gaat uw vraag over?"
        },
        {
            "message": "Bassie en Adriaan"
        },
        {
            "message": "Wat wil je weten?"
        },
        {
            "message": "Hoe heet die kaulo enge clown?"
        },
        {
            "message": "De plaaggeest"
        }
    ]

    constructor(private chatService: ChatService) { }

    ngOnInit(): void {
        this.chatService.messageLog$.subscribe((response) => {
            this.data = response;
            console.log(this.data);
          });
      
          this.chatService.postMessage(this.data);
    }
}
