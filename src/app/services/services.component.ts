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
import { InvoicePreviewComponent } from '../invoice-preview/invoice-preview.component';
import { Service } from '../service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  showSelectedWarning: boolean;
  showAddedCostWarning: boolean;
  serviceList: Service[] = [];
  selectedServices: Service[] = [];
  serviceGroup: FormGroup;
  addedCosts: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    // Build list of services
    this.serviceList.push(new Service(10001, "Password Reset", "39.99", "2", "25"));
    this.serviceList.push(new Service(10002, "RAM Upgrade", "129.99", "4", "25"));
    this.serviceList.push(new Service(10003, "Software Installation", "49.99", "4", "25"));
    this.serviceList.push(new Service(10004, "Tune-Up", "89.99", "6", "25"));
    this.serviceList.push(new Service(10005, "Keyboard Cleaning", "45.00", "2", "25"));
    this.serviceList.push(new Service(10006, "Disk Clean-Up", "149.99", "4", "25"));
    this.serviceList.push(new Service(10007, "Spyware Removal", "99.99", "6", "25"));

    this.showSelectedWarning = false;
    this.showAddedCostWarning = false;

    this.serviceGroup = this.fb.group({
      10001: new FormControl(),
      10002: new FormControl(),
      10003: new FormControl(),
      10004: new FormControl(),
      10005: new FormControl(),
      10006: new FormControl(),
      10007: new FormControl(),
    });

    this.addedCosts = this.fb.group({
      parts: ['', Validators.required],
      labor: ['', Validators.required]
    });
  }

  get form() { return this.addedCosts.controls; }

  handleSelection(event, serviceObj) {
    if (event.checked === true) {
      if (this.showSelectedWarning) {
        this.showSelectedWarning = false;
      }
      this.selectedServices.push(serviceObj);
    } else {
      let index = this.selectedServices.findIndex(x => x.serviceNumber === serviceObj.serviceNumber);
      this.selectedServices.splice(index, 1);
    }
  }

  createInvoice() {
    const parts = this.addedCosts.controls.parts.value;
    const labor = this.addedCosts.controls.labor.value;
    const missingData = this.selectedServices.length === 0 || !parts || !labor ? true : false;
    if (missingData === true) {
      if (this.selectedServices.length === 0) {
        this.showSelectedWarning = true;
      }
      if (!parts || !labor) {
        this.showAddedCostWarning = true;
      } else {
        this.showAddedCostWarning = false;
      }
    } else {
      this.showSelectedWarning = false;
      this.showAddedCostWarning = false;
      const dialogRef = this.dialog.open(InvoicePreviewComponent, {
        data: {
          selectedServices: this.selectedServices,
          parts: parts,
          labor: labor
        },
        disableClose: true,
        width: '90%',
        maxWidth: '800px'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === "confirm") {
          this.resetForm();
        }
      });
    }
  }

  resetForm() {
    this.addedCosts = this.fb.group({
      parts: ['', Validators.required],
      labor: ['', Validators.required]
    });
    this.serviceGroup = this.fb.group({
      10001: new FormControl(),
      10002: new FormControl(),
      10003: new FormControl(),
      10004: new FormControl(),
      10005: new FormControl(),
      10006: new FormControl(),
      10007: new FormControl(),
    });
    this.selectedServices = [];
  }

}
