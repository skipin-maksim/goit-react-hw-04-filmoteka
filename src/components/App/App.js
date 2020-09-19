import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import routes from '../../routes';

import Layout from '../Layout';
import Navbar from '../Navbar/Navbar';

const AsyncHomePage = lazy(() =>
  import('../../views/HomePage' /* webpackChunkName: "home-page" */),
);

const AsyncMoviesPage = lazy(() =>
  import('../../views/MoviesPage' /* webpackChunkName: "movies-page" */),
);

const AsyncMovieDetailsPage = lazy(() =>
  import(
    '../../views/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */
  ),
);

export default function App() {
  return (
    <>
      <Navbar />

      <Layout>
        <Suspense fallback={<></>}>
          <Switch>
            <Route path={routes.HomePage} exact component={AsyncHomePage} />

            <Route path={routes.MoviesPage} exact component={AsyncMoviesPage} />

            <Route
              path={routes.MovieDetailsPage}
              component={AsyncMovieDetailsPage}
            />

            <Redirect to={routes.HomePage} />
          </Switch>
        </Suspense>
      </Layout>
    </>
  );
}
