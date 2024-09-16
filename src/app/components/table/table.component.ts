import { Component } from '@angular/core';
import { PeriodicElement } from '../../models/periodic-elements';
import { DataService } from '../../services/data.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BehaviorSubject, debounceTime, delay, map, tap } from 'rxjs';
import { LoadingService } from '../../services/loading.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RxState } from '@rx-angular/state';

interface ElementDataState {
  data: MatTableDataSource<PeriodicElement>;
  filteredValue: string;
  updateValue: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  providers: [RxState],
})
export class TableComponent {
  public dataSource = new MatTableDataSource<PeriodicElement>();
  public tableColumns: (keyof PeriodicElement)[] = [
    'position',
    'name',
    'weight',
    'symbol',
  ];

  public filterData$ = new BehaviorSubject<string>('');

  public elementsDataAsMatTableDataSource$ = this._state.select(
    ['data', 'filteredValue'],
    (state) => {
      state.data.filter = state.filteredValue.trim().toLowerCase();
      return state.data;
    }
  );
  constructor(
    private _dataService: DataService,
    private _loadingService: LoadingService,
    private _dialogService: MatDialog,
    private _state: RxState<ElementDataState>
  ) {
    this._state.connect(
      'data',
      this._dataService.elementsData$.pipe(
        tap(() => this._loadingService.loadingOn()),
        delay(5000),
        map((elementsData) => {
          const dataSource = this.dataSource;
          dataSource.data = elementsData;
          return dataSource;
        }),
        tap(() => this._loadingService.loadingOff())
      )
    );

    this._state.connect(
      'filteredValue',
      this.filterData$.pipe(debounceTime(2000))
    );
  }

  openDialog(key: keyof PeriodicElement, element: PeriodicElement): void {
    const dialogRef = this._dialogService.open(DialogComponent, {
      data: { key: key },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        const index = this._state
          .get('data')
          .data.findIndex((e) => e === element);
        if (index !== -1) {
          if (key === 'symbol' || key === 'name') {
            this._state.set('data', (state) => {
              state.data.data[index][key] = result as string;
              return state.data;
            });
          } else if (key === 'position' || key === 'weight') {
            this._state.set('data', (state) => {
              state.data.data[index][key] = result as number;
              return state.data;
            });
          }
        }
      }
    });
  }

  onFilterInputChange(input: Event) {
    const val = (input.target as HTMLInputElement).value;
    this.filterData$.next(val);
  }
}
