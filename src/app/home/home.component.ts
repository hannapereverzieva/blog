import { Component, OnInit } from '@angular/core';
import { Post } from "../admin/shared/interfaces";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public allPostsFromServer : Post[] = [
    {
      id: '123',
      date: new Date(),
      title: 'Shiba Inu 1',
      author: 'John Galt',
      content: `The Shiba Inu is the smallest of the six original and distinct spitz
        breeds of dog from Japan. A small, agile dog that copes very well with mountainous
        terrain, the Shiba Inu was originall bred for hunting`
    },
    {
      id: '123',
      date: new Date(),
      title: 'Shiba Inu 2',
      author: 'John Galt',
      content: `The Shiba Inu is the smallest of the six original and distinct spitz
        breeds of dog from Japan. A small, agile dog that copes very well with mountainous
        terrain, the Shiba Inu was originall bred for hunting`
    },
    {
      id: '123',
      date: new Date(),
      title: 'Shiba Inu 3',
      author: 'John Galt',
      content: `The Shiba Inu is the smallest of the six original and distinct spitz
        breeds of dog from Japan. A small, agile dog that copes very well with mountainous
        terrain, the Shiba Inu was originall bred for hunting`
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
