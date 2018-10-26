import React, { Component, Fragment } from 'react';
import Disqus from 'disqus-react';
import Divider from '@material-ui/core/Divider';
import SightingDetailMap from './SightingDetailMap';

class SightingDetail extends Component {

    render() {
        const disqusShortname = 'https-marten-application-netlify-com';
        const disqusConfig = {
            url: `http://localhost:3000/${this.props.detail.id}`,
            identifier: this.props.detail.id,
            title: this.props.detail.id
        }

        return (
            <Fragment>
                <h1>{`Sighting ${this.props.detail.id}`}</h1>
                <Divider/>
                <p>{`Type: ${this.props.detail.type}`}</p>
                <p>{`Confidence: ${this.props.detail.confidence}`}</p>
                <p>{`When: ${this.props.detail.date}, ${this.props.detail.time}`}</p>
                <p>{`Where: ${this.props.detail.lat} degrees N, and ${this.props.detail.lng} degrees E`}</p>
                <p>{`${this.props.detail.desc}`}</p>
                <SightingDetailMap lat={this.props.detail.lat} lng={this.props.detail.lng}/>

                <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
            </Fragment>
        );
    }
}

export default SightingDetail;
