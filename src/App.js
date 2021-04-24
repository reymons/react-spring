import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import { initializeApp } from './redux/reducers/appReducer';
import { isInitialized } from './redux/selectors/appSelectors';
import styles from './App.module.scss'
import MainPage from './components/MainPage/MainPage';
import ManagePage from './components/ManagePage/ManagePage';
import Footer from './components/Footer/Footer';

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
        <Route exact path="/" render={() => <MainPage/>}/>
        <Route path="/manage" render={() => <ManagePage/>}/>
      </div>
      <Footer/>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => {
  return {
    initialized: isInitialized(state),
  }
}

export default connect(mapStateToProps, { initializeApp })(App);
