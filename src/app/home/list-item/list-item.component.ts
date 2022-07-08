import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {FocusableOption} from "@angular/cdk/a11y";

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  host: {
    tabindex: '-1',
    role: 'list-item',
  },
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit, FocusableOption {
  @Input() city?: string;
  disabled?: boolean

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
  }

  getCity() {
    return this.city;
  }

  focus(): void {
    this.elementRef.nativeElement.focus();
  }

}
