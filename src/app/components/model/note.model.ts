import { v4 as uuidv4 } from 'uuid';

export class Note {
  id: string | null;

  constructor(public title: string  ,public note: string,public category: string ) {
    this.id = uuidv4();
    this.title = title;
    this.note= note;
    this.category= category;
  }
}
