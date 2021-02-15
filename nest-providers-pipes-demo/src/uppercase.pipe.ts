/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UppercasePipe implements PipeTransform<string, string> { // <input, output>
  transform(value:string, metadata: ArgumentMetadata):string {
    return value.toUpperCase()   
  }
}
