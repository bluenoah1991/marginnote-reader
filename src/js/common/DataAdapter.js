// mock
import {requestNoteBookData} from '../mock';

CloudKit.configure({
    locale: 'en-us',
    containers: [{
        containerIdentifier: '@@CLOUDKIT_CONTAINER_IDENTIFIER',
        apiTokenAuth: {
            apiToken: '@@CLOUDKIT_API_TOKEN',
            persist: true,
            signInButton: {
                id: 'apple-sign-in-button',
                theme: 'black'
            },
            signOutButton: {
                id: 'apple-sign-out-button',
                theme: 'black'
            }
        },
        environment: '@@CLOUDKIT_ENV'
    }]
});

export class NoteBook{
    constructor(raw){
        this.raw = raw;
    }

    static create(identifier, callback){
        let raw = requestNoteBookData();
        let notebook = new NoteBook(raw);
        callback(null, notebook);
    }

    // public methods

    notes(){
        return this.raw.ZBOOKNOTES;
    }
}