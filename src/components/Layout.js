import React, { Component, Fragment } from 'react';
import flamelinkApp from '../flamelink.js';

class Layout extends Component {
        constructor() {
            super();

            this.state = {
              contentDetails: ''
            }
          }


    getData(schemaData){
        for (var val in this.props.schemaDetails){
             this.getMoreData(this.props.schemaDetails[val]);
        }
    }

    getMoreData(moreData){
        var tArray = document.createElement("H1");
        var kArray = document.createElement("P");
        this.getTitle(moreData.title, tArray);
        this.getKey(moreData.key, kArray);
    }

    getTitle(title, arr){
       var t = document.createTextNode(title);
       arr.appendChild(t);
       document.getElementById("demo").appendChild(arr);
    }


    getKey(key, arr){
       var k = document.createTextNode(key); 
       arr.appendChild(k);
       document.getElementById("demo").appendChild(arr); 
    }

    render() {
        return(
            <div>
                <p id="demo">{this.getData(this.props)}</p>
            </div>
        );
    }
}

export default Layout;