import React from 'react';
import { useHistory, useLocation } from 'react-router';

import { URLS } from '../utils/urls';
import { Menu } from './Menu';

export const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="navbar p-0">
      <div className="navbar-start z-[9999]">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu dropdown-content p-2 bg-base-100 rounded-box">
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
        <a
          href="#"
          className="normal-case text-xl"
          onClick={(e) => {
            e.preventDefault();

            history.push(URLS.MAP);
          }}
        >
          TRD-OSL
        </a>
      </div>
      <Menu/>
    </div>
  );
};
