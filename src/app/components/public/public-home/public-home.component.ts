import { Component, OnInit } from '@angular/core';
import {Feature} from '../../../models/feature';

@Component({
  selector: 'app-public-home',
  templateUrl: './public-home.component.html',
  styleUrls: ['./public-home.component.css']
})
export class PublicHomeComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  segnaposto = 'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  features: Array<Feature> = [
    {title: 'UserStory Title',    type: 'UserStory',    description: this.segnaposto},
    {title: 'Integration Title',  type: 'Integration',  description: this.segnaposto},
    {title: 'UserStory Title',    type: 'UserStory',    description: this.segnaposto},
    {title: 'Integration Title',  type: 'Integration',  description: this.segnaposto},
    {title: 'DevOps Title',       type: 'DevOps',       description: this.segnaposto},
    {title: 'UserStory Title',    type: 'UserStory',    description: this.segnaposto},
    {title: 'Integration Title',  type: 'Integration',  description: this.segnaposto},
    {title: 'DevOps Title',       type: 'DevOps',       description: this.segnaposto}
  ];
  constructor() {

  }

  ngOnInit() {
  }

}
