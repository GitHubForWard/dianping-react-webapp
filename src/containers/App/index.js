import React from 'react';
import ErrorToast from './../../components/ErrorToast';
import Home from './../Home'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as appActions, getError } from './../../redux/modules/app'

function App(props) {
  const { error, appActions: { clearError } } = props;
  return (
    <div className="App">
      <Home />
      {error ? <ErrorToast msg={error} clearError={clearError} /> : null}
    </div>
  );
}

const mapStateToProps = (state, props) => {
  return {
    error: getError(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    appActions: bindActionCreators(appActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
