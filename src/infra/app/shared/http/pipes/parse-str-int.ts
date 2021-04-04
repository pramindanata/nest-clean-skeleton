import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseStrIntPipe implements PipeTransform {
  transform(value: any) {
    if (!value.match('^[0-9]*$')) {
      throw new BadRequestException();
    }

    return value;
  }
}
