import React from 'react';
import { NavLink } from 'react-router-dom';

import routes from '../../routes';

import Layout from '../Layout';

export default function Navbar() {
  return (
    <header className="Header">
      <Layout>
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
      </Layout>
    </header>
  );
}
