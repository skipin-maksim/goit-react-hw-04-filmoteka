import React from 'react';
import { NavLink } from 'react-router-dom';

import routes from '../../routes';

import Layout from '../Layout';

import s from './Navbar.module.scss';

export default function Navbar() {
  return (
    <header className={s.Header}>
      <Layout>
        <nav className={s.Nav}>
          <ul className={s.ListMenu}>
            <li className={s.ListMenuItem}>
              <NavLink
                to={routes.HomePage}
                exact
                className={s.NavLink}
                activeClassName={s.activeNavLink}
              >
                Home
              </NavLink>
            </li>
            <li className={s.ListMenuItem}>
              <NavLink
                to={routes.MoviesPage}
                className={s.NavLink}
                activeClassName={s.activeNavLink}
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
