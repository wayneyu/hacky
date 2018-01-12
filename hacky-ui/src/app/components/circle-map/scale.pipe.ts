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
@Pipe({name: 'scaleFactor'})
export class ScalePipe implements PipeTransform {

  transform(value: number, scaleFactor: string): number {
    console.log("scale: "  + value + " :: " + value * parseFloat(scaleFactor));
    return value * parseFloat(scaleFactor);
  }
}