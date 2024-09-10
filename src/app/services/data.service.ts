import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PeriodicElement } from '../models/periodic-elements';
import { ELEMENT_DATA } from '../const/element-data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  private elementsDataSource$ = new BehaviorSubject<PeriodicElement[]>(
    ELEMENT_DATA
  );
  public elementsData$ = this.elementsDataSource$.asObservable();

  public updateElementData(data: PeriodicElement[]) {
    this.elementsDataSource$.next(data);
  }
}
