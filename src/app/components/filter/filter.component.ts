import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NoteService } from '../service/notes.service';
import { Note } from '../model/note.model';
import { CommonModule } from '@angular/common';

interface CategoryCount {
  [key: string]: number;
}

@Component({
  selector: 'filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements OnInit {
  categoryList: any[];
  notes: Note[];
  @Output() filter = new EventEmitter<any>();

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.getCategoryCount();
  }

  onCategoryClick(v: any) {
    this.filter.emit(v);
  }

  private getCategoryCount() {
    this.notes = this.noteService.getNotes();
    const categoryCount = this.notes.reduce((acc: CategoryCount, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});

    this.categoryList = Object.entries(categoryCount);
  }
}
