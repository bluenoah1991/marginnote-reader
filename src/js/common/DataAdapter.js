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
        let container = CloudKit.getDefaultContainer();
        let database = container.publicCloudDatabase;

        database.fetchRecords(identifier).then(function(response){
            if(response.hasErrors){
                callback(response.errors[0]);
            }
            callback(null, new NoteBook(response.records[0]));
        });
    }

    static mockCreate(identifier, callback){
        let raw = requestNoteBookData();
        let notebook = new NoteBook(raw);
        callback(null, notebook);
    }

    // public methods

    title(){
        return this.raw.fields.title.value;
    }
}