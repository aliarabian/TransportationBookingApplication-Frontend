import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(list: string[] | null, term: string): string[] | null {
    if (list)
      return list.filter(c => c.toLowerCase().includes(term.toLowerCase()));

    return list
  }

}
