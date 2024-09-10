import { Component, OnInit } from '@angular/core';
import { PeriodicElement } from '../../models/periodic-elements';
import { DataService } from '../../services/data.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  delay,
  distinctUntilChanged,
  tap,
} from 'rxjs';
import { LoadingService } from '../../services/loading.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

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
})
export class TableComponent implements OnInit {
  public data = new MatTableDataSource<PeriodicElement>();
  public tableColumns: (keyof PeriodicElement)[] = [
    'position',
    'name',
    'weight',
    'symbol',
  ];

  public filterData$ = new BehaviorSubject<string>('');

  constructor(
    private _dataService: DataService,
    private _loadingService: LoadingService,
    private _dialogService: MatDialog
  ) {}

  ngOnInit(): void {
    combineLatest([
      this._dataService.elementsData$.pipe(
        tap(() => this._loadingService.loadingOn()),
        delay(5000)
      ),
      this.filterData$.pipe(
        tap(() => this._loadingService.loadingOn()),
        debounceTime(2000),
        distinctUntilChanged()
      ),
    ]).subscribe(([sourceData, filterData]) => {
      console.log('test');
      this._loadingService.loadingOff();
      this.data.data = sourceData;
      this.data.filter = filterData.trim().toLowerCase();
    });
  }

  openDialog(key: keyof PeriodicElement, element: PeriodicElement): void {
    const dialogRef = this._dialogService.open(DialogComponent, {
      data: { key: key },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result !== undefined) {
        const index = this.data.data.findIndex((e) => e === element);
        if (index !== -1) {
          if (key === 'symbol' || key === 'name') {
            this.data.data[index][key] = result as string;
          } else if (key === 'position' || key === 'weight') {
            this.data.data[index][key] = result as number;
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
