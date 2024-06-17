import React from 'react';
import {useHistory, useLocation} from 'react-router';

import {URLS} from '../utils/urls';

export const Menu = () => {
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="navbar-end hidden lg:flex">
      <ul className="menu menu-horizontal space-x-4">
        <li>
          <a
            href={URLS.MAP}
            className={`normal-case text-sm ${path === URLS.MAP ? 'bg-base-200' : ''}`}
            onClick={(e) => {
              e.preventDefault();

              history.push(URLS.MAP);
            }}
          >
            Kart
          </a>
        </li>
        <li>
          <a
            href={URLS.ENTRIES}
            className={`normal-case text-sm ${path === URLS.ENTRIES ? 'bg-base-200' : ''}`}
            onClick={(e) => {
              e.preventDefault();

              history.push(URLS.ENTRIES);
            }}
          >
            Innlegg
          </a>
        </li>
      </ul>
    </div>
  );
};
