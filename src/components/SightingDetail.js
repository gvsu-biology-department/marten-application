import React, { Component, Fragment } from 'react';
import Disqus from 'disqus-react';

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
                <p>{this.props.detail.type}</p>
                <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
            </Fragment>
        );
    }
}

export default SightingDetail;
