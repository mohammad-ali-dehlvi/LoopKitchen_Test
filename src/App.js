import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home';
import { fetchAutoComplete } from './utils/apis';
import './App.css';
import { connect, useDispatch, useSelector } from 'react-redux';
import { addAutoComplete } from './utils/redux/actionCreator';
import BookmarkedRestaurents from './pages/Bookmarked_restaurents/BookmarkedRestaurents';
import Login from './pages/Login/Login';
import Layout from './pages/Home/Layout/Layout';

function App({ isLoggedIn }) {

  const dispatch = useDispatch();

  const authWrapper = (comp) => {
    return (
      isLoggedIn ? comp : <Navigate to="/login" replace />
    );
  }

  const nonAuthWrapper = (comp) => {
    return (
      isLoggedIn ? <Navigate to="/layout" replace /> : comp
    );
  }

  useEffect(() => {
    fetchAutoComplete().then((data) => {
      console.log("success");
      let { records } = data;
      dispatch(addAutoComplete(records));
    }).catch(err => {
      console.log("error: ", err);
    })
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={authWrapper(<Navigate to="/layout" />)} />
        <Route path='/layout' element={authWrapper(<Layout />)} >
          <Route path='' element={authWrapper(<Navigate to='home' />)} />
          <Route path='bookmark' element={authWrapper(<BookmarkedRestaurents />)} />
          <Route path='home' element={authWrapper(<Home />)} />
        </Route>
        <Route path='/login' element={nonAuthWrapper(<Login />)} />
      </Routes>
    </Router>
  );
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn,
  }
}

export default connect(mapStateToProps)(App);
