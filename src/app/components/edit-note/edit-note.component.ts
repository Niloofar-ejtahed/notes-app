import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NoteService } from '../service/notes.service';
import { Category } from '../model/category';
import { CommonModule } from '@angular/common';
import { Note } from '../model/note.model';

@Component({
  selector: 'edit-note',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-note.component.html',
  styleUrl: './edit-note.component.scss',
})
export class EditNoteComponent implements OnInit {
  @Output() close = new EventEmitter<boolean>();
  @Output() update = new EventEmitter<boolean>();
  myForm: FormGroup;
  category = Category;
  note: Note;
  @Input() data: Note;

  constructor(private fb: FormBuilder, private noteService: NoteService) {}

  ngOnInit(): void {
    this.getData();
  }

  private getData() {
    this.note = this.noteService.getNote(this.data.id);
    this.myForm = this.fb.group({
      id: this.note.id,
      title: this.note.title,
      note: this.note.note,
      category: this.note.category,
    });
  }

  onCloseClick() {
    this.close.emit(false);
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.noteService.updateNote(this.note.id, this.myForm.value);
      this.close.emit(false);
      this.update.emit(true);
    }
  }
}
