import React, { Component } from 'react';
import flamelinkApp from '../../utilities/flamelink.js';
import FlameLinkCollectionComponentCreations from './FlameLinkCollectionComponentCreations';

class FlameLinkCollection extends Component {
    state = {
        schemaContent: '',
    }

    componentDidMount() {
        flamelinkApp.content.get(this.props.schemaName)
            .then(result => this.setState({
                schemaContent: result
            }))
    }

    getCollectionContent(schemaData) {
        var arr2 = [];
        var collectionInfo = [schemaData, this.state.schemaContent];
        for (var val in this.state.schemaContent) {
            arr2[this.state.schemaContent[val]['order']] = val;
        }
        return arr2.map(this.getCollectionComponentInfo, collectionInfo);
    }

    getCollectionComponentInfo(num) {
        var arr3 = [];
        for (var val in this[0]) {
            arr3.push(val);
        }
        return <FlameLinkCollectionComponentCreations schemaData={this[0]} schemaContent={this[1][num]} arr={arr3} key={num} />
    }

    countProperties(obj) {
        var count = 0;

        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                ++count;
        }

        return count;
    }

    render() {
        return (
            <div>
                {this.getCollectionContent(this.props.schemaData)}
            </div>
        );
    }
}

export default FlameLinkCollection;