import { Routes, Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import css from './App.module.css';

import { lazy, Suspense } from "react";
import { ThreeDots } from '../components/Loader/Loader';
// import { Home } from '../pages/Home';
// import { Movies } from '../pages/Movies';
// import { MovieDetails } from '../pages/MovieDetails';
// import { Cast } from './Cast/Cast';
// import { Reviews } from './Reviews/Reviews';

const StyledLink = styled(NavLink)`
  color: black;

  &.active {
    color: #5f9e3d;
  }
`;

const Home = lazy(() => import("../pages/Home"));
const Movies = lazy(() => import("../pages/Movies"));
const MovieDetails = lazy(() => import("../pages/MovieDetails"));

const Cast = lazy(() => import("./Cast/Cast"));
const Reviews = lazy(() => import("./Reviews/Reviews"));

export const App = () => {
  return (
    <div>
      <nav className={css.nav}>
        <StyledLink className={css.link} to="/">
          Home
        </StyledLink>
        <StyledLink className={css.link} to="/movies">
          Movies
        </StyledLink>
      </nav>

      <Suspense fallback={<ThreeDots />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
      </Suspense>
    </div>
  );
};
