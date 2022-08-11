import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { tap } from 'rxjs';
import { GeonameDataService } from './geoname-data.service';
import { GeonameService } from './geoname.service';

@Component({
  selector: 'app-geoname',
  templateUrl: './geoname.component.html',
  styleUrls: ['./geoname.component.css'],
})
export class GeonameComponent implements OnInit {
  zipcode!: string;
  @Output() newZipcodeEvent = new EventEmitter<string>();

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

  onSearchZipcode() {
    this.geonameService
      .getZipcodesFromGeoName(this.zipcode)
      .subscribe((data) => {
        this.newZipcodeEvent.emit(this.zipcode);
        console.log(data);
        this.updateDistances();
      });
  }

  updateDistances() {
    this.geonameDataService.entities$.pipe(
      tap((locations) => {
        locations.forEach((location) => {
          let i = 1;
          i++;
          location.distance = 100 + i;
        });
      })
    );
  }
}
