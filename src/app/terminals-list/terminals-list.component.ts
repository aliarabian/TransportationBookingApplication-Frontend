import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TerminalsService} from "./terminals.service";

@Component({
  selector: 'app-cities-list',
  templateUrl: './terminals-list.component.html',
  styleUrls: ['./terminals-list.component.css']
})
export class TerminalsListComponent implements OnInit {
  terms: string[] = [];

  @Output() citySelection = new EventEmitter<string>();

  constructor(private terminalsService: TerminalsService) {
  }

  ngOnInit(): void {
    this.terminalsService.fetchTerminals()
      .subscribe(response => {
        return this.terms = [...new Set(response.data.map(terminal => terminal.city.name))];
      })
  }

  onClick(terminal: string) {
    console.log(terminal)
    this.citySelection.emit(terminal);
  }
}
