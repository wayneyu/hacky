import { Pipe, PipeTransform } from '@angular/core';
import { validateConfig } from '@angular/router/src/config';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'swapIcon'})
export class SwapIconPipe implements PipeTransform {

  transform(value: number, positiveIcon: string, negativeIcon: string): string {
    return value > 0 ? positiveIcon : negativeIcon;
  }
}