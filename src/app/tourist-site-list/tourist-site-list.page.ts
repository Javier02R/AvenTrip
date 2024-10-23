import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations'; 

@Component({
  selector: 'app-tourist-site-list',
  templateUrl: './tourist-site-list.page.html',
  styleUrls: ['./tourist-site-list.page.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class TouristSiteListPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
