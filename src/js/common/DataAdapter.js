import _ from 'lodash';

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

    id(){
        return this.raw.recordName;
    }

    title(){
        return this.raw.fields.title.value;
    }
}

export class Note{
    constructor(raw){
        this.raw = raw;
    }

    static query(notebookId, callback){
        let container = CloudKit.getDefaultContainer();
        let database = container.publicCloudDatabase;

        let query = {
            recordType: 'BookNote',
            filterBy: [{
                comparator: 'EQUALS',
                fieldName: 'topicid',
                fieldValue: {
                    value: notebookId
                }
            }]
        };

        database.performQuery(query).then(function(response){
            if(response.hasErrors){
                callback(response.errors[0]);
            }
            callback(null, _.map(response.records, function(record){
                return new Note(record);
            }));
        });
    }

    id(){
        return this.raw.recordName;
    }

    children(){
        if(this.raw.fields.mindlinks){
            return this.raw.fields.mindlinks.value.split('|');
        } else {
            return [];
        }
    }

    title(){
        if(this.raw.fields.notetitle){
            return this.raw.fields.notetitle.value;
        } else {
            return null;
        }
    }

    mindpos(){
        if(this.raw.fields.mindpos){
            let str = this.raw.fields.mindpos.value;
            return _.map(str.split(','), function(val){
                return parseFloat(val);
            });
        } else {
            return null;
        }
    }
}