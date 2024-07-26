import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, map, delay, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  constructor(private http: HttpClient) {
    this.loadFromLocalStrorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore ));

  }

  private loadFromLocalStrorage(){
    if(!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore') || '{}');
}

  private apiUrl = 'https://restcountries.com/v3.1';

  public cacheStore:CacheStore ={
    byCapital:   {term:'',countries:[]},
    byCountries: {term:'',countries:[]},
    byRegion:    {region:'',countries:[]},
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(
      catchError(() => of([])),
      delay(2000)
    );
  }

  searchCountryByAlphaCode(id: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${id}`).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap((countries) => this.cacheStore.byCapital = {term, countries}),
      tap(()=> this.saveToLocalStorage()),
    )

    // return this.http
    //   .get<Country[]>(`${this.apiUrl}/capital/${term}`)
    //   .pipe(catchError(() => of([])));
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap((countries)=> this.cacheStore.byCountries = {term, countries}),
      tap(()=> this.saveToLocalStorage()),
    )

    // return this.http
    //   .get<Country[]>(`${this.apiUrl}/name/${term}`)
    //   .pipe(catchError(() => of([])));
  }

  searchRegion(term: Region): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap((countries)=> this.cacheStore.byRegion = {region:term, countries}),
      tap(()=> this.saveToLocalStorage()),
    )
    // return this.http
    //   .get<Country[]>(`${this.apiUrl}/region/${term}`)
    //   .pipe(catchError(() => of([])));
  }
}
