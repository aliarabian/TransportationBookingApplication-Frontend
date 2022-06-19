import {Component, ElementRef, forwardRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SelectComponent
    }
  ]
})
export class SelectComponent implements OnInit, ControlValueAccessor {
  terminal: FormControl = new FormControl('', [Validators.required]);
  citiesListState: boolean = false;
  touched = false;
  disabled = false;
  @Input() terms$?: Observable<string[]>;
  @Input() placeholder?: string;
  onChange = (_: any) => {
  };
  onTouched = () => {
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  registerOnChange(onChangeFn: any): void {
    this.onChange = onChangeFn;
  }

  registerOnTouched(onTouchedFn: any): void {
    console.log(onTouchedFn)
    this.onTouched = onTouchedFn;

  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: string): void {
    this.terminal.setValue(value);
  }

  onClickToggleCitiesList() {
    this.markAsTouched();
    this.citiesListState = !this.citiesListState;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  onInput() {
    if (!this.citiesListState) {
      this.onClickToggleCitiesList();
    }
    this.onChange(this.terminal.value)
  }

  clickedOutside() {
    if (this.citiesListState)
      this.citiesListState = false;
  }

  onClick(terminal: string) {
    this.onClickToggleCitiesList();
    this.writeValue(terminal);
    this.onChange(terminal);

  }
}

