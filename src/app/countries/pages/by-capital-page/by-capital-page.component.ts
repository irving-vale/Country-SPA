import { Component, OnDestroy } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``,
})
export class ByCapitalPageComponent implements OnDestroy {
  constructor(private countriesService: CountriesService) {}

  private destroy$: Subject<void> = new Subject<void>();
  public countries: Country[] = [];
  public isLoading: boolean = false;

  public searchByCapital(term: string): void {
    this.isLoading = true;
    this.countriesService
      .searchCapital(term)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.countries = response;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    console.log('Destroying Capital Page');
    this.destroy$.next();
    this.destroy$.complete();
  }
}
