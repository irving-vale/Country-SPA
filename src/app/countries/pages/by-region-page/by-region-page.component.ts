import { Component, OnDestroy } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``,
})
export class ByRegionPageComponent implements OnDestroy{
  constructor(private countriesService: CountriesService) {}

  private destroy$: Subject<void> = new Subject<void>();
  public region: Country[] = [];
  public isLoading: boolean = false;
  public errorMessage: string= '';


  searchByRegion(term: string): void {
    if (term === 'Africa' || term === 'Americas' || term === 'Asia' || term === 'Europe' || term === 'Oceania') {
      this.isLoading = true;
      this.errorMessage = '';
      this.countriesService.searchRegion(term)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.region = response;
        this.isLoading = false;
      });
    } else {
      this.errorMessage = 'Region not found';
      this.isLoading = false;
    }
  }



  ngOnDestroy(): void {
    console.log('Destroying Region Page');
    this.destroy$.next();
    this.destroy$.complete();
  }
}
