/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PipeTransform, ArgumentMetadata, HttpException, Injectable } from "@nestjs/common";

@Injectable() // best practice but no use of @injectable
export class MandatoryFieldsPipe implements PipeTransform {
    constructor(private fields: Array<string>){}

    // value will be request object
    transform(value: any, metadata: ArgumentMetadata) {   // press control + . on MandatoryFieldsPipe to implement transform interface
        const missingFields = [];
        this.fields.forEach(field => {
            if(!value[field])
                missingFields.push(field);
        })

        if(missingFields.length > 0)
            throw new HttpException(`payload should have ${missingFields.join(', ')} fields`, 404)
        
        return value;
    }

}