import React, { useEffect } from 'react';
import Routes from './routes';

//Import Scss
import "./assets/scss/themes.scss";
import './App.css'

import 'react-toastify/dist/ReactToastify.css';
//fackbackend
import fakeBackend from './helpers/fake-backend';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

// //Firebase helper
// import { initFirebaseBackend } from "./helpers/firebase";

// TODO
fakeBackend();


function App() {

  const selectLayoutProperties = createSelector(
    (state) => state.Layout,
    (layout) => ({
      layoutMode: layout.layoutMode,
    })
  );

  const { layoutMode } = useSelector(selectLayoutProperties);

  useEffect(() => {
    layoutMode && localStorage.setItem("layoutMode", layoutMode);
  }, [layoutMode])

  return <Routes />;
};

export default App;
