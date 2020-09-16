import React from 'react';
import { NavLink } from 'react-router-dom';

import routes from '../../routes';

import Container from '../Container';

export default function Navbar() {
  return (
    <header className="Header">
      <Container>
        <nav className="Nav">
          <ul className="ListMenu">
            <li className="ListMenuItem">
              <NavLink
                to={routes.HomePage}
                exact
                className="NavLink"
                activeClassName="active-NavLink"
              >
                Home
              </NavLink>
            </li>
            <li className="ListMenuItem">
              <NavLink
                to={routes.MoviesPage}
                className="NavLink"
                activeClassName="active-NavLink"
              >
                Movies
              </NavLink>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
