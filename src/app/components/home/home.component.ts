import { Component, Renderer2  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { NoteCardsComponent } from '../note-cards/note-cards.component';
import { AddNoteComponent } from '../add-note/add-note.component';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import { Note } from '../model/note.model';

@Component({
  selector: 'home',
  standalone: true,
  imports: [ SearchBarComponent  , NoteCardsComponent , AddNoteComponent ,
     FormsModule ,  CommonModule , EditNoteComponent , RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'notes-app';
  showAddModel:boolean = false;
  showEditModal:boolean = false;
  isUpdatedNotes:boolean = false;
  selectedNote : Note;

  constructor(private renderer: Renderer2) {}
  
  onAddClick(){
    this.showAddModel = true;
    this.renderer.addClass(document.getElementById('main-box'), 'overlay');
  }

  onClose(value:boolean){
    this.showAddModel = value;
    this.renderer.removeClass(document.getElementById('main-box'), 'overlay');
  }

  getUpdates(value:boolean){
    this.isUpdatedNotes= value;
  }

  getNote(note:Note){
    this.selectedNote = note;
    this.showEditModal = true;
  }

  onEditClose(value:boolean){
    this.showEditModal = value;
    this.renderer.removeClass(document.getElementById('main-box'), 'overlay');

  }


}
