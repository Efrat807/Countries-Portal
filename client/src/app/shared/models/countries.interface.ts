import { ICountryName } from "./countryName.interface";

export interface ICountry {
	id: string;
	name: ICountryName;
	capital: string[];
	region: string;
	subRegion: string;
	population: number;
}