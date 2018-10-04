import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import firebase from '../firebase.js';

class ViewSightings extends React.Component {

    /*TODO:
    * Constructor in case functions
    * need to be state bound
    */
    constructor(props){
        super(props);
        this.state = {
            type:[],
            confidence: [],
            date: [],
            time: [],
            desc: [],
            items: []
        };

        this.handleChange = this.handleChange.bind(this);
//        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    //FIXME: Do I Need this function?
    // handleSubmit(e){
    //     e.preventDefault();
    //     const itemsRef = firebase.database().ref('items').orderByKey();
    //     const item = {
    //         type: this.state.type,
    //         confidence: this.state.confidence,
    //         date: this.state.date,
    //         time: this.state.time,
    //         desc: this.state.desc
    //     }
    //     itemsRef.push(item);
    // }

    componentDidMount(){
        const itemsRef = firebase.database().ref('items').orderByKey();
        
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    id: item,
                    type: items[item].type,
                    confidence: items[item].confidence,
                    date: items[item].date,
                    time: items[item].time,
                    desc: items[item].desc
                });
            }
            this.setState({
                items: newState
            });
        });
    
    }
    render(){

        return (
            console.log("hello"),
            null
        );

    }

}

export default ViewSightings;