import React from 'react';
import {useHistory, useLocation} from 'react-router';

import {deleteCookie, getCookie} from "../auth";
import {URLS} from '../utils/urls';
import {showModal} from "../utils/modal";
import {LOGIN_MODAL_ID} from "../components/LogInModal";
import {ADD_MODAL_ID} from "../components";

export const Menu = () => {
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname;
  const signedIn = getCookie() !== "";

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
        {signedIn ? (
          <>
            <li>
              <a
                href="#"
                className="normal-case text-sm"
                onClick={(e) => {
                  e.preventDefault();
                  showModal(ADD_MODAL_ID);
                }}
              >
                Legg til
              </a>
            </li>
            <li>
              <a
                href="#"
                className="normal-case text-sm"
                onClick={(e) => {
                  e.preventDefault();

                  deleteCookie();
                  window.location.replace(URLS.MAP);
                }}
              >
                Logg ut
              </a>
            </li>
          </>
        ) : (
          <li>
            <a
              href="#"
              className="normal-case text-sm"
              onClick={(e) => {
                e.preventDefault();
                showModal(LOGIN_MODAL_ID);
              }}
            >
              Logg inn
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};
