import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../service/notes.service';
import { Note } from '../model/note.model';

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit {
  notes: Note[];
  filteredNotes: any[] = [];
  searchQuery: string = '';
  @Output() result = new EventEmitter<Note[]>();

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.getNotes();
  }

  private getNotes() {
    this.notes = this.noteService.getNotes();
  }

  searchNotes() {
    if (this.searchQuery) {
      this.filteredNotes = this.notes.filter(
        (note) =>
          note.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          note.note.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredNotes = this.notes;
    }

    this.result.emit(this.filteredNotes);
  }
}
