import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``,
})
export class CountryPageComponent implements OnInit, OnDestroy {
  constructor(
    private root: ActivatedRoute,
    private countryService: CountriesService,
    private router: Router
  ) {}

  private unsubscribe$ = new Subject<void>();
  public country?: Country;

  ngOnInit(): void {
    this.root.params
      .pipe(
        switchMap(({ id }) => this.countryService.searchCountryByAlphaCode(id)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((country) => {
        if (!country) return this.router.navigateByUrl('');
        return (this.country = country);
      });
  }
  ngOnDestroy(): void {
    console.log('Destroying Country Page');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
