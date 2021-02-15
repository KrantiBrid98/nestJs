/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class ContactsService {
    contacts = [];
    path = '../contacts';

    constructor() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.contacts = JSON.parse(data);
        }
        catch {
            this.contacts = [];
        }
    }

    writeToFile() {
        fs.writeFileSync(this.path, JSON.stringify(this.contacts), 'utf-8')
    }

    // get keyword makes nextId to be used as a variables and not call it as a function
    get nextId() {
        if(this.contacts.length === 0) 
            return 1;
        const idArr = this.contacts.map( c => c.id);
        return 1 + Math.max(...idArr);
    }

    currentContact(id) {
        const index = this.contacts.find(c => c.id == id)
        return index ? index : new NotFoundException()
    }

    addContactService(contact) {
        contact.id = this.nextId;
        this.contacts.push(contact);
        this.writeToFile();
        return contact
    }

    getAllContactService(){
        return this.contacts;
    }

    getOneContactService(id) {
        return this.currentContact(id)
    }

    editContactService(data, id){
        const contact = this.currentContact(id);
        this.contacts[contact.id] = data;
        this.contacts[contact.id].id = id;
        this.writeToFile();
        return [...this.contacts]
    }

    deleteContactService(id){
        const index = this.contacts.findIndex(c => c.id == id);
        this.writeToFile();
        return this.contacts.splice(index,1);
    }
}
