import { Country } from '../../interfaces/country';
import { CountriesService } from './../../services/countries.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {

  constructor(private countriesService:CountriesService){}

  public countries:Country[]= [];

 searchByCountry(term: string): void {
    this.countriesService.searchCountry(term)
    .subscribe((response=>{
      this.countries = response;
    }))

  }

}
