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
@Pipe({name: 'circleColor'})
export class CircleColorPipe implements PipeTransform {


  transform(value: number, positiveColor: string, negativeColor): string {
    return value > 0 ? positiveColor : negativeColor;
  }
}