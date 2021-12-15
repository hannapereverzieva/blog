import { Component, OnInit } from '@angular/core';
import { Post } from "./models/post";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
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
