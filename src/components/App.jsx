import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectRefresh } from 'redux/auth/selectors';
import { fetchRefresh } from 'services/authApi';
import { PulseLoader } from 'react-spinners';
import { Route, Routes } from 'react-router-dom';

import Layout from './Layout';
import Home from './Phonebook/pages/Home';
import Phonebook from './Phonebook/pages/Phonebook';
import Contacts from './Phonebook/pages/Contacts';
import Login from './Phonebook/pages/Login';
import Register from './Phonebook/pages/Register';
import NotFound from './Phonebook/pages/NotFound';
import { PrivateRoute } from 'routes/PrivateRoute';
import PublicRoute from 'routes/PublicRoute';

export const App = () => {
  const dispatch = useDispatch();
  const refresh = useSelector(selectRefresh);

  useEffect(() => {
    dispatch(fetchRefresh());
  }, [dispatch]);

  return refresh ? (
    <PulseLoader />
  ) : (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<PulseLoader />}>
            <Layout />
          </Suspense>
        }
      >
        <Route index element={<Home />} />
        <Route
          path="/phonebook"
          element={
            <PrivateRoute>
              <Phonebook />
            </PrivateRoute>
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute>
              <Contacts />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
      </Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};
