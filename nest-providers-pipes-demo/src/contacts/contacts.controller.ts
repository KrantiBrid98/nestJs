/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Post, Body, Get, Param, Patch, Delete, ParseIntPipe, Query, DefaultValuePipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { MandatoryFieldsPipe } from 'src/mandatoryFields.pipe';
import { ContactValidation } from './contactsValidation';
import { UppercasePipe } from 'src/uppercase.pipe';

@Controller('contacts')
export class ContactsController {
    // writting private makes service available within the ts
    constructor(private service: ContactsService) { }

    @Post('/add')
    // @UsePipes(UppercasePipe)
    // MandatoryFieldsPipe is a custom made pipe
    addContact(@Body(new MandatoryFieldsPipe(['name', 'email'])) data) { //data should be of type contact
        return this.service.addContactService(data)
    }

    @Get('/query')
    // http://localhost:3000/contacts/query?page=2&limit=5
    // first DefaultValuePipe and then ParseIntPipe, order is important since first we need a value and then parse it
    getAll(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number) {
        return {
            page: {
                value: page,
                type: typeof page
            },
            limit: {
                value: limit,
                type: typeof limit
            }
        }
    }

    @Get()
    getContact() {
        return this.service.getAllContactService()
    }

    @Get('/:id')
    getContactbyId(@Param('id', ParseIntPipe) contactId: number) {
        return this.service.getOneContactService(contactId)
    }

    @Patch('/edit/:id')
    @UsePipes(ValidationPipe) //ValidationPipe will validate the data type of data against ContactValidation
    editContactById(@Body() data: ContactValidation, @Param('id') contactId: number) {
        return this.service.editContactService(data, contactId)
    }

    @Delete('delete/:id')
    deleteContact(@Param('id') contactId: number) {
        return this.service.deleteContactService(contactId)
    }
}
