import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectComponent)
    }
  ]
})
export class SelectComponent implements OnInit, ControlValueAccessor {
  terminal: FormControl = new FormControl('');
  citiesListState: boolean = false;
  touched = false;
  disabled = false;
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
    this.onChange(this.terminal.value)
  }

  onCitySelection(selectedCity: string) {
    this.onClickToggleCitiesList();
    this.writeValue(selectedCity);
    this.onChange(selectedCity);
  }

  clickedOutside() {
    if (this.citiesListState)
      this.citiesListState = false;
  }
}
