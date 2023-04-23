import { Routes, Route, NavLink } from "react-router-dom";
import styled from "styled-components";
import css from './App.module.css';

import { Home } from '../pages/Home';
import { Movies } from '../pages/Movies';
import { MovieDetails } from '../pages/MovieDetails';

const StyledLink = styled(NavLink)`
  color: black;

  &.active {
    color: green;
  }
`;

export const App = () => {
  return (
    <div>
      <nav className={css.nav}>
        <StyledLink className={css.link} to="/">Home</StyledLink>
        <StyledLink className={css.link} to="/movies">Movies</StyledLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
};
