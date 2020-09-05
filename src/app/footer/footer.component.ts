/*
============================================
; Title: Bob's Computer Repair
; Author: Mike Goldberg
; Date: 09/04/2020
; Modified By: Mike Goldberg
; Description: Angular Application
;===========================================
*/

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  currentYear: string;

  constructor() { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear().toString();
  }

}
