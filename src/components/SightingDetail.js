import React, { Component, Fragment } from 'react';
import Disqus from 'disqus-react';
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
                <SightingDetailMap lat={this.props.detail.lat} lng={this.props.detail.lng}/>
                <div className='sighting-details-content'>
                    <p>{`Confidence: ${this.props.detail.confidence}`}</p>
                    <p>{`When: ${this.props.detail.date}, ${this.props.detail.time}`}</p>
                    <p>{`Where: ${this.props.detail.lat} degrees N, and ${this.props.detail.lng} degrees E`}</p>
                    <p>{`${this.props.detail.desc}`}</p>
                </div>
                <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
            </Fragment>
        );
    }
}

export default SightingDetail;
