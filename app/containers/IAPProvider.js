'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {loadProducts} from '../actions/purchases'

class IAPProvider extends React.Component {
  constructor(props) {
    super(props)
    this.loadIAPsWithRetry = this.loadIAPsWithRetry.bind(this)
  }

  componentDidMount() {
    this.loadIAPsWithRetry()
  }

  loadIAPsWithRetry() {
    this.props.dispatch(loadProducts((err, ok) => {
      if( err ) {
        setTimeout(this.loadIAPsWithRetry, 30000);
      }
    }))
  }

  render() { return this.props.children }
}

export default connect()(IAPProvider)
