import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ICountry } from '../../shared/models/countries.interface';

@Injectable({
	providedIn: 'root',
})
export class CountryApiService {
	http = inject(HttpClient);
	serverUrl = 'https://localhost:7127/Country';
	constructor() {
		provideHttpClient();
	}

	getCountries(): Observable<ICountry[]> {
		// Replace 'your_backend_url' with the actual URL of your backend server endpoint
		return this.http.get<ICountry[]>(this.serverUrl);
	}
	putCountries(country: ICountry) {
		// const updatedCountry = {...country, id}
		this.http.put<ICountry>(this.serverUrl, country);
	}
}
