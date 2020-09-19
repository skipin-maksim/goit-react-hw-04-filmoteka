import React from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from '../../routes';

import Layout from '../Layout';
import Navbar from '../Navbar/Navbar';
import HomePage from '../../views/HomePage/HomePage';
import MoviesPage from '../../views/MoviesPage/MoviesPage';
import MovieDetailsPage from '../../views/MovieDetailsPage/MovieDetailsPage';

export default function App() {
  return (
    <>
      <Navbar />

      <Layout>
        <Switch>
          <Route path={routes.HomePage} exact component={HomePage} />

          <Route path={routes.MoviesPage} exact component={MoviesPage} />

          <Route path={routes.MovieDetailsPage} component={MovieDetailsPage} />
        </Switch>
      </Layout>
    </>
  );
}
