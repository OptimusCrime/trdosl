import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useHistory, useLocation } from 'react-router';

import { useAuth } from '../api/queries/auth';
import { queryKeys } from '../api/queries/queryKeys';
import { deleteCookie } from '../auth';
import { LOGIN_MODAL_ID } from '../components';
import { showModal } from '../utils/modal';
import { URLS } from '../utils/urls';
import { closeMenu } from './closeMenu';

export const Menu = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();

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
              closeMenu();
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
              closeMenu();
            }}
          >
            Innlegg
          </a>
        </li>
        {auth.isSuccess && auth.data && (
          <>
            <li>
              <a
                href="#"
                className="normal-case text-sm"
                onClick={(e) => {
                  e.preventDefault();

                  history.push(URLS.ADD_ENTRY);
                  closeMenu();
                }}
              >
                Legg til
              </a>
            </li>
            <li>
              <a
                href="#"
                className="normal-case text-sm"
                onClick={async (e) => {
                  e.preventDefault();

                  deleteCookie();

                  await queryClient.invalidateQueries({
                    queryKey: queryKeys.auth,
                  });
                  closeMenu();
                }}
              >
                Logg ut
              </a>
            </li>
          </>
        )}
        {auth.isSuccess && !auth.data && (
          <li>
            <a
              href="#"
              className="normal-case text-sm"
              onClick={(e) => {
                e.preventDefault();
                showModal(LOGIN_MODAL_ID);
                closeMenu();
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
