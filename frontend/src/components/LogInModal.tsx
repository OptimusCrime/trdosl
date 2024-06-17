import React, {useState} from 'react';

import {useAuth} from "../api/queries/auth";
import {XIcon} from "../icons";
import {Modal} from "./Modal";
import {setCookie} from "../auth";
import {URLS} from "../utils/urls";

export const LOGIN_MODAL_ID = 'entry_modal_id';

export const LoginModal = () => {
  const auth = useAuth();
  const [password, setPassword] = useState<string>('');

  const authCallback = () => {
    auth.mutate({
      password: password,
    }, {
      onSuccess: (data) => {
        setCookie(data.token);

        // Lol (I am lazy)
        window.location.replace(URLS.MAP);
      }
    });
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
            autoFocus={true}
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
          <button className="btn btn-primary" disabled={auth.isLoading} onClick={authCallback}>
            {auth.isLoading ? <span className="loading loading-spinner"></span> : 'Logg inn'}
          </button>
        </div>
        {auth.isError && (
          <div role="alert" className="alert alert-error">
            <XIcon/>
            <span>Feil passord.</span>
          </div>
        )}
      </div>
    </Modal>
  );
}
