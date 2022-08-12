import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { tap } from 'rxjs';
import { BalanceUI } from '../models/balanceUI';
import { GeonameDataService } from './geoname-data.service';
import { GeonameService } from './geoname.service';

@Component({
  selector: 'app-geoname',
  templateUrl: './geoname.component.html',
  styleUrls: ['./geoname.component.css'],
})
export class GeonameComponent implements OnInit {
  locationForm!: FormGroup;
  @Output() newZipcodeEvent = new EventEmitter<BalanceUI[]>();

  constructor(
    private geonameDataService: GeonameDataService,
    private geonameService: GeonameService
  ) {}

  ngOnInit(): void {
    this.locationForm = new FormGroup({
      zipcode: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      radius: new FormControl(''),
    });
    this.geonameDataService.getAll();
  }

  onSearchNearByLoction() {
    const formValues = this.locationForm.value;
    this.geonameService
      .getNearByLocationFromZipcode(
        formValues.zipcode,
        formValues.country,
        formValues.radius
      )
      .subscribe((data) => {
        this.newZipcodeEvent.emit(data);
      });
  }
}
