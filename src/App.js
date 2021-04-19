import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Banner from './components/Banner/Banner';
import Header from './components/Header/Header';
import { initializeApp } from './redux/reducers/appReducer';
import { isInitialized } from './redux/selectors/appSelectors';
import styles from './App.module.scss'

const App = ({ initializeApp,  initialized }) => {
  useEffect(() => {
    initializeApp();
  }, [initializeApp])

  if (!initialized) {
    // TODO: Insert a nice preloader
    return (
      <div className={styles.preloaderContainer}>
        <div className={styles.preloader}></div>
        <div className={styles.preloaderLoader}></div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Header/>
      <div className={styles.page}>
        <Banner/>
        <div className={styles.scroll}></div>
      </div>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => {
  return {
    initialized: isInitialized(state),
  }
}

export default connect(mapStateToProps, { initializeApp })(App);
