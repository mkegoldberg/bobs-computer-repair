/*
============================================
; Title: Bob's Computer Repair
; Author: Mike Goldberg
; Date: 09/04/2020
; Modified By: Mike Goldberg
; Description: Angular Application
;===========================================
*/

export class Service {
  constructor (
   public serviceNumber: number,
   public serviceName: string,
   public servicePrice: string,
   public estHours: string,
   public parts: string
  ) {}
}
