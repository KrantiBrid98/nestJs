/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Param, NotFoundException, Post, Body, Patch, Delete } from '@nestjs/common';

@Controller('contact')
// there will be request handlers in the below class
export class ContactController {
    contacts = [
        { id: 1, name: "Kranti", email: "kranti@gmail.com" },
        { id: "2", name: "radha", email: "radha@gmail.com" },
        { id: "3", name: "tom", email: "tom@gmail.com" },
    ];

    @Get()
    getAllContacts() {
        return [...this.contacts]
    }

    @Get('/:id')
    getContactbyId(@Param('id') contactId: number) {
        const c = this.contacts.find(contact => contact.id == contactId);
        return c ? { ...c } : new NotFoundException()
    }

    @Post('/add/')
    addContact(@Body() data) {
        data.id = this.contacts.length + 1
        this.contacts.push(data);
        return [...this.contacts]
    }

    @Patch('/edit/:id')
    editContact(@Body() data, @Param('id') contactId: number) {
        const index = this.contacts.findIndex(contact => contact.id == contactId);
        data.id = contactId;
        this.contacts[index] = { ...this.contacts[index], ...data };
        return [...this.contacts]
    }

    @Delete('/delete/:id')
    deleteContact(@Param('id') contactId: number) {
        const index = this.contacts.findIndex(contact => contact.id == contactId);
        this.contacts.splice(index, 1);
        return [...this.contacts]
    }

}
