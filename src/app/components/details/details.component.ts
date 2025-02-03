import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../service/notes.service';
import { Note } from '../model/note.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  id:string;
  notes:Note[];
  note:Note;

  constructor(private activatedRout:ActivatedRoute 
    , private noteService:NoteService , private router :Router){}

  ngOnInit(): void {

   this.id= this.activatedRout.snapshot.params['id']
   this.notes = this.noteService.getNotes()
   this.note = this.notes.find(n=>n.id === this.id)
  }

  navigateToHome(){
    this.router.navigateByUrl('/')
  }

}
