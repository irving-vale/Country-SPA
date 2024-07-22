import { Subject, takeUntil } from 'rxjs';
import { Country } from '../../interfaces/country';
import { CountriesService } from './../../services/countries.service';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``,
})
export class ByCountryPageComponent implements OnDestroy {
  constructor(private countriesService: CountriesService) {}

  private destroy$: Subject<void> = new Subject<void>();
  public countries: Country[] = [];
  public isLoading: boolean = false;

  searchByCountry(term: string): void {
    this.isLoading = true;
    this.countriesService.searchCountry(term)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) => {
      this.countries = response;
      this.isLoading = false;
    });
  }


  ngOnDestroy(): void {
    console.log('Destroying Country Page');
    this.destroy$.next();
    this.destroy$.complete();
  }
}
