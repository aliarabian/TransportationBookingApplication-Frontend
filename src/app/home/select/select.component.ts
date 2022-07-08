import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {FocusKeyManager} from "@angular/cdk/a11y";
import {ListItemComponent} from "../list-item/list-item.component";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  // host: {
  //   tabindex: '0',
  //   role: 'list'
  // },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SelectComponent
    }
  ]
})
export class SelectComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  terminal: FormControl = new FormControl('', [Validators.required]);
  citiesListState: boolean = false;
  touched = false;
  disabled = false;
  @Input() terminals$?: Observable<string[]>;
  @Input() placeholder?: string;
  @ViewChild("iv") inputChild?: ElementRef;
  @ViewChildren(ListItemComponent) citiesList?: QueryList<ListItemComponent>;
  private keyManager?: FocusKeyManager<ListItemComponent>;
  onChange = (_: any) => {
  };
  onTouched = () => {
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.keyManager = new FocusKeyManager<ListItemComponent>(this.citiesList!)
      .withWrap();
  }

  registerOnChange(onChangeFn: any): void {
    this.onChange = onChangeFn;
  }

  @HostListener('keydown', ['$event'])
  onKeydown($event: any) {
    console.log($event)
    this.keyManager?.onKeydown($event);
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
    console.log(terminal)
    this.onClickToggleCitiesList();
    // this.writeValue(terminal);
    this.onChange(terminal);
    // this._renderer.setProperty(this.inputChild?.nativeElement,'value', terminal)
    this.terminal.setValue(terminal);
  }
}

