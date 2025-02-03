import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { NoteService } from '../service/notes.service';
import { Note } from '../model/note.model';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../filter/filter.component';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'note-cards',
  standalone: true,
  imports: [CommonModule, FilterComponent, SearchBarComponent, RouterModule],
  templateUrl: './note-cards.component.html',
  styleUrl: './note-cards.component.scss',
})
export class NoteCardsComponent implements OnInit {
  notes: Note[];
  showEditModal: boolean = false;
  @Output() edit = new EventEmitter<Note>();

  private _updateFlag: boolean = false;

  @Input() get updateFlag(): boolean {
    return this._updateFlag;
  }

  set updateFlag(value: boolean) {
    this._updateFlag = value;
    this.notes = this.noteService.getNotes();
  }

  constructor(private noteService: NoteService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.getNodes();
  }

  private getNodes() {
    this.notes = this.noteService.getNotes();
  }

  onDeleteNoteClick(id: string) {
    this.noteService.deleteNote(id);
  }

  onEditNoteClick(note: Note) {
    this.showEditModal = true;
    this.edit.emit(note);
    this.renderer.addClass(document.getElementById('main-box'), 'overlay');
  }

  onFilterByCategory(v: any) {
    this.getNodes();

    if (v != null) {
      this.notes = this.notes.filter((n) => n.category == v[0]);
    } else {
      this.getNodes();
    }
  }

  getFilteredNote(notes: Note[]) {
    this.notes = notes;
  }
}
