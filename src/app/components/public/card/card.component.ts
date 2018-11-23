import { Component, OnInit, Input } from '@angular/core';
import { Feature } from 'src/app/models/feature';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() feature: Feature;
  constructor() { }

  ngOnInit() {
  }

}
