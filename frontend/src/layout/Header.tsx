import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useHistory, useLocation } from 'react-router';

import { useAuth } from '../api/queries/auth';
import { queryKeys } from '../api/queries/queryKeys';
import { deleteCookie } from '../auth';
import { LOGIN_MODAL_ID } from '../components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleHideFace } from '../store/reducers/globalReducer';
import { ReducerNames } from '../store/reducers/reducerNames';
import { formatDistance } from '../utils/dataFormatters';
import { showModal } from '../utils/modal';
import { URLS } from '../utils/urls';
import { closeMenu } from './closeMenu';
import { Menu } from './Menu';

export const Header = () => {
  const { distanceTotal, distanceCompleted, hideFace } = useAppSelector((state) => state[ReducerNames.GLOBAL]);

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const auth = useAuth();
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
          <ul tabIndex={0} className="menu dropdown-content p-2 bg-base-100 rounded-box w-64">
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

            {auth.isSuccess && auth.data && (
              <li>
                <a
                  href={URLS.ADD_ENTRY}
                  className={`normal-case text-sm ${path === URLS.ADD_ENTRY ? 'bg-base-200' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();

                    history.push(URLS.ADD_ENTRY);
                    closeMenu();
                  }}
                >
                  Legg til
                </a>
              </li>
            )}

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
            <li>
              <a
                href="#"
                className="normal-case text-sm"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(toggleHideFace());
                  closeMenu();
                }}
              >
                {hideFace ? 'Vis ansikt' : 'Fjern ansikt'}
              </a>
            </li>

            {auth.isSuccess && auth.data && (
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
        <a
          href={URLS.MAP}
          className="normal-case text-xl"
          onClick={(e) => {
            e.preventDefault();

            history.push(URLS.MAP);
            closeMenu();
          }}
        >
          NOREG
        </a>
      </div>
      <div className="text-center lg:w-[400px]">
        {distanceTotal !== null && distanceCompleted !== null && (
          <>
            {formatDistance(distanceCompleted)} / {formatDistance(distanceTotal)}
          </>
        )}
      </div>
      <Menu />
    </div>
  );
};
