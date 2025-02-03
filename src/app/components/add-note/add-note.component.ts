import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NoteService } from '../service/notes.service';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '../model/category';

@Component({
  selector: 'add-note',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.scss',
})
export class AddNoteComponent {
  @Output() close = new EventEmitter<boolean>();
  @Output() update = new EventEmitter<boolean>();
  showValidationError: boolean = false;
  myForm: FormGroup;
  category = Category;

  constructor(private fb: FormBuilder, private noteService: NoteService) {
    this.myForm = this.fb.group({
      id: uuidv4(),
      title: ['', Validators.required],
      note: ['', Validators.required],
      category: [''],
    });
  }

  onCloseClick() {
    this.close.emit(false);
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.noteService.addNote(this.myForm.value);
      this.close.emit(false);
      this.update.emit(true);
    }
  }
}
