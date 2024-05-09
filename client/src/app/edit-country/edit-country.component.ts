import { Component, OnInit, inject } from '@angular/core';
import { ICountry } from '../shared/models/countries.interface';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import * as CountrySelector from '../states/country/country.selector'
import { AsyncPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryApiService } from '../shared/services/CountryApi.service';

@Component({
	selector: 'app-edit-country',
	standalone: true,
	imports: [AsyncPipe, ReactiveFormsModule],
	templateUrl: './edit-country.component.html',
	styleUrl: './edit-country.component.scss',
})
export class EditCountryComponent implements OnInit {
	countries$!: Observable<ICountry[]>;
	country$!: Observable<ICountry | undefined>
  form!: FormGroup;
  private api = inject(CountryApiService);
  id!: string | null;

	constructor(private route: ActivatedRoute, private store: Store, private fb: FormBuilder) {
   this.countries$ = this.store.select(CountrySelector.selectAllCountries);
  }

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get('id');
		this.country$ = this.countries$.pipe(
			map((countries) => countries.find((country) => country.id === this.id)),
			switchMap((country) => (country ? of(country) : of(undefined)))
		);
		this.country$.subscribe(country => console.log(country?.name.official));
		this.country$.subscribe(
			(country) =>
				(this.form = this.fb.group({
					commonName: [country?.name.common || '', Validators.required],
					officialName: [country?.name.official || '', Validators.required],
					capital: [country?.capital || '', Validators.required],
					region: [country?.region || '', Validators.required],
					subRegion: [country?.region || '', Validators.required],
					population: [country?.region || '', Validators.required],
				}))
		);
    
	}

  onSubmit(event: Event) :void {
    event.preventDefault();
    if(this.form.valid){
      console.log(this.form.value);
      const formValues = this.form.value;
      const updatedCountry = {
        id: this.id || '',
        name: {
          common: formValues.commonName,
          official: formValues.officialName
        },
        capital: formValues.capital,
        region: formValues.region,
        subRegion: formValues.subRegion,
        population: formValues.population
      }
     console.log(this.api.putCountries(updatedCountry));
    }
  }
}
