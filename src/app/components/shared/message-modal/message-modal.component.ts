import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent {
  messageType: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; message: string; type: string }) {
    this.messageType = data.type; 
  }
}
