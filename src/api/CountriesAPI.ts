import {RESTCOUNTRIES_URL} from '../config';

import { fields } from '../constants/country';
import { Country } from '../types/country';

const fetchCountriesApi = async (url:string): Promise<Country[]> => {
  try {
    const response = await fetch(url);
    const countriesData = await response.json() as Promise<Country[]>;

    if (!response.ok) throw new Error();

    return countriesData;

  } catch(error) {
    console.error(error);
    return [];
  }
}

export const getAllCountries = async (): Promise<Country[]> => {
    return await fetchCountriesApi(`${RESTCOUNTRIES_URL}/all?fields=${fields.join()}`);
};

export const getCountyByName = async ( _name : string): Promise<Country[]> => {
    return await fetchCountriesApi(`${RESTCOUNTRIES_URL}/name/${_name}?fields=${fields.join()}`);
};

export const getAllCountriesByRegion = async ( _region : string): Promise<Country[]> => {
  return await fetchCountriesApi(`${RESTCOUNTRIES_URL}/region/${_region}?fields=${fields.join()}`);
};

