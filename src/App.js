import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { initializeApp } from './redux/reducers/appReducer';
import { getAuthInfo } from './redux/reducers/authReducer';
import { isInitialized } from './redux/selectors/appSelectors';

const App = ({ initializeApp,  initialized }) => {
  useEffect(() => {
    initializeApp();
  }, [initializeApp])

  if (!initialized) {
    // TODO: Insert a nice preloader
    return <h1>Loading...</h1>
  }

  return (
    <>Header</>
  )
}

export default connect(
  (state) => ({ initialized: isInitialized(state) }), 
  { initializeApp, getAuthInfo }
)(App);
