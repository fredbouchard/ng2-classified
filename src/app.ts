import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ContactDetails} from './contact-details';

@Component({
    selector: 'app',
    directives: [ContactDetails],
    templateUrl: './components/tpls/classifieds-card.tpl.html'
})
export class App {
    ref: Firebase = firebase.database().ref();
    classifieds: Array<Object> =  [];

    constructor(){
    	let classifieds = this.classifieds;
    	this.ref.on('value', function(data){
    		data.forEach(function(child){
    			classifieds.push(child.val());

    		});
    	});
    }
}

bootstrap(App);