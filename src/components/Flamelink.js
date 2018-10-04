import { Component } from 'react';
import flamelinkApp from '../flamelink.js';

class Flamelink extends Component {
    render() {

        //Grabs data from text field in entry from the martenSchemaDemo
        flamelinkApp.content.get('martenSchemaDemo')
        .then(flameData => document.getElementById("flamelinkDemo").innerHTML = flameData.field_1538162314419);
        
        return(null);
    }
}

export default Flamelink;