import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from '../routes';
import Nav from './Nav/Nav';

const HomePage = lazy(() =>
  import('./HomePage/HomePage' /* webpackChunkName: "home-page" */),
);
const SearchPage = lazy(() =>
  import('./SearchPage/SearchPage' /* webpackChunkName: "search-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */
  ),
);
const PageNotFound = lazy(() =>
  import(
    './PageNotFound/PageNotFound' /* webpackChunkName: "page-not-found" */
  ),
);

function App() {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Nav />
        <Switch>
          <Route exact path={routes.home} component={HomePage} />
          <Route exact path={routes.movies} component={SearchPage} />
          <Route path={routes.movieDetails} component={MovieDetailsPage} />
          <Route component={PageNotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
