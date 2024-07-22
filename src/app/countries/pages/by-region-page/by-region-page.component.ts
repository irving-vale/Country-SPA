import { Component, OnDestroy } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Subject, takeUntil } from 'rxjs';
import { Region } from '../../interfaces/region.type';




@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``,
})
export class ByRegionPageComponent implements OnDestroy {
  constructor(private countriesService: CountriesService) {}

  private destroy$: Subject<void> = new Subject<void>();
  public country: Country[] = [];
  public isLoading: boolean = false;
  public regions:Region[]= ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;

  searchByRegion(term: Region): void {
    this.selectedRegion = term;
    this.isLoading = true;
    this.countriesService
      .searchRegion(term)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.country = response;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    console.log('Destroying Region Page');
    this.destroy$.next();
    this.destroy$.complete();
  }
}
