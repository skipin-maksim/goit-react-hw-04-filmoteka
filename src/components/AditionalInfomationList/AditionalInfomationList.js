import React from 'react';
import { NavLink } from 'react-router-dom';

import routes from '../../routes';

export default function AditionalInfomationList({ url, onCheckLocationState }) {
  const { Cast, Reviews } = routes;

  return (
    <ul className="AditionalInfomationList">
      <li>
        <NavLink
          to={{
            pathname: `${url}${Cast}`,
            state: { from: onCheckLocationState() },
          }}
          exact
          className="InfomationBtn"
          activeClassName="ActiveInfomationBtn"
        >
          Cast
        </NavLink>
      </li>
      <li>
        <NavLink
          to={{
            pathname: `${url}${Reviews}`,
            state: { from: onCheckLocationState() },
          }}
          className="InfomationBtn"
          activeClassName="ActiveInfomationBtn"
        >
          Reviews
        </NavLink>
      </li>
    </ul>
  );
}
