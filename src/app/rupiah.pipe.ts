import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rupiah',
  standalone: true
})
export class RupiahPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) {
      return 'Rp 0';
    }
    return 'Rp ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
