import { createAction, props } from '@ngrx/store';
import { ICountry } from '../../shared/models/countries.interface';

export const loadCountry = createAction('[Country Component] loadProduct');

export const loadCountrySuccess = createAction(
	'[Country Component] loadProductSuccess',
	props<{ countries: ICountry[] }>()
);

export const loadCountryFailed = createAction(
	'[Country Component] loadCountryFailed',
	props<{ errorMessage: string }>()
);
