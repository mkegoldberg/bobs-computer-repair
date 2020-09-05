/*
============================================
; Title: Bob's Computer Repair
; Author: Mike Goldberg
; Date: 09/04/2020
; Modified By: Mike Goldberg
; Description: Angular Application
;===========================================
*/

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Service } from '../service';

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.component.css']
})
export class InvoicePreviewComponent implements OnInit {

  selectedServices: Service[] = [];
  parts: number = 0;
  labor: number = 0;
  totalLabor: number = 0;
  total: number = 0;
  subTotal: number = 0;
  tax: number = 0;

  constructor(private dialogRef: MatDialogRef<InvoicePreviewComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.selectedServices = data.selectedServices;
    this.parts = data.parts;
    this.labor = data.labor;
    this.totalLabor = (data.labor * 50);
  }

  ngOnInit(): void {
    let servicesTotal = 0;

    this.selectedServices.forEach(service => {
      servicesTotal += parseFloat(service.servicePrice);
    });

    this.subTotal = servicesTotal + this.parts + this.totalLabor;
    this.tax = (this.subTotal * .08);
    this.total = this.subTotal + this.tax;
  }

  toMoney(number) {
    return "$" + number.toFixed(2);
  }

}
