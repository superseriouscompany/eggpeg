'use strict';

import React from 'react';
import {connect} from 'react-redux';
import branch from 'react-native-branch';

class DeeplinkProvider extends React.Component {
  componentDidMount() {
    let branchUniversalObject = branch.createBranchUniversalObject(
      `default`,
      {
        metadata: {
          link_type: 'default',
        }
      }
    )

    let linkProperties = {
      feature: 'friend-invitation',
      channel: 'app'
    }

    let controlParams = {
      '$ios_deepview': 'egg_peg_deepview_ckbe',
    }
    controlParams = {};

    branchUniversalObject.generateShortUrl(linkProperties, controlParams).then((payload) => {
      this.props.dispatch({type: 'shareLink:set', shareLink: payload.url})
    })
  }

  render() { return this.props.children }
}

export default connect()(DeeplinkProvider)
