import { Component, inject, model } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PeriodicElement } from '../../models/periodic-elements';
import { DialogData } from '../../models/dialog-data';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatInputModule,
    MatFormFieldModule,
    MatDialogContent,
    FormsModule,
    MatDialogClose,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  public keyOnChange: keyof PeriodicElement = this.data.key;
  public pattern: string = this.setPattern().pattern;
  public errorMessage: string = this.setPattern().errorMessage;

  public input = new FormControl('', [
    Validators.required,
    Validators.pattern(this.pattern),
  ]);

  onNoClick(): void {
    this.dialogRef.close();
  }

  setPattern(): {
    pattern: string;
    errorMessage: string;
  } {
    if (this.keyOnChange === 'symbol' || this.keyOnChange === 'name') {
      return { pattern: '[A-Za-z]+', errorMessage: 'Only letters' };
    } else {
      return {
        pattern: '^\\d+(\\.\\d+)?$',
        errorMessage: 'Only integer or float',
      };
    }
  }
}
