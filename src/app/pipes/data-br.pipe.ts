import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataBr',
  standalone: true
})
export class DataBrPipe implements PipeTransform {

  transform(valor: string | null | undefined): string {
    if (!valor) {
      return '';
    }

    // Espera formato "yyyy-MM-dd" (com ou sem hora depois)
    const [ano, mes, dia] = valor.substring(0, 10).split('-');

    if (!ano || !mes || !dia) {
      return valor;
    }

    return `${dia}/${mes}/${ano}`;
  }
}