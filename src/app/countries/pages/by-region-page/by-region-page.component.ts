import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``,
})
export class ByRegionPageComponent {
  constructor(private countriesService: CountriesService) {}

  public region: Country[] = [];


searchByRegion(term: string): void {
    this.countriesService.searchRegion(term)
    .subscribe((response=>{
      console.log(response);
      this.region = response;
    }))

  }


}
