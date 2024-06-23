import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

import { usePostAuth } from '../api/queries/auth';
import { queryKeys } from '../api/queries/queryKeys';
import { setCookie } from '../auth';
import { XIcon } from '../icons';
import { hideModal } from '../utils/modal';
import { Modal } from './Modal';

export const LOGIN_MODAL_ID = 'login_modal_id';

export const LoginModal = () => {
  const queryClient = useQueryClient();
  const postAuth = usePostAuth();

  const [password, setPassword] = useState<string>('');

  const authCallback = () => {
    postAuth.mutate(
      {
        password: password,
      },
      {
        onSuccess: async (data) => {
          setCookie(data.token);

          await queryClient.invalidateQueries({
            queryKey: queryKeys.auth,
          });

          hideModal(LOGIN_MODAL_ID);
        },
      },
    );
  };

  return (
    <Modal id={LOGIN_MODAL_ID}>
      <h3 className="font-bold text-lg">Logg inn</h3>
      <div className="flex flex-col space-y-4 pt-2">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Passord</span>
          </label>
          <input
            type="password"
            className="input input-bordered w-full"
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={(e) => {
              if (e.code.toLowerCase() === 'enter') {
                authCallback();
              }
            }}
          />
        </div>
        <div className="w-full flex justify-end">
          <button className="btn btn-primary" disabled={postAuth.isLoading} onClick={authCallback}>
            {postAuth.isLoading ? <span className="loading loading-spinner"></span> : 'Logg inn'}
          </button>
        </div>
        {postAuth.isError && (
          <div role="alert" className="alert alert-error">
            <XIcon />
            <span>Feil passord.</span>
          </div>
        )}
      </div>
    </Modal>
  );
};
