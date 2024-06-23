import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { useEntries } from '../api/queries/entries';
import { LoginModal } from '../components';
import { ErrorIcon } from '../icons';
import { AddEntry, Entries, Map } from '../pages';
import { useAppDispatch } from '../store/hooks';
import { setEntries } from '../store/reducers/globalReducer';
import { URLS } from '../utils/urls';
import { Header } from './Header';

interface OuterWrapperProps {
  children: React.ReactNode;
}

const OuterWrapper = (props: OuterWrapperProps) => {
  const { children } = props;

  return (
    <div className="container max-w-none">
      <div className="container max-w-none bg-neutral">
        <div className="container">
          <Header />
        </div>
      </div>
      {children}
    </div>
  );
};

export const Wrapper = () => {
  const dispatch = useAppDispatch();
  const entries = useEntries();

  useEffect(() => {
    if (!entries.isLoading && !entries.isError) {
      dispatch(
        setEntries({
          entries: entries.data,
        }),
      );
    }
  }, [entries]);

  if (entries.isLoading) {
    return (
      <OuterWrapper>
        <div className="flex flex-col w-full items-center h-[calc(50vh-2rem)] justify-end">
          <span className="loading loading-spinner loading-lg"></span>
          <div className="pt-10 text-center px-10">
            <span>Revurderer om dette var en god idé...</span>
          </div>
        </div>
      </OuterWrapper>
    );
  }

  if (entries.isError) {
    return (
      <div className="flex flex-col w-full items-center h-[calc(50vh-2rem)] justify-end">
        <div className="flex self-center w-full max-w-2xl pt-4 px-4">
          <div role="alert" className="alert alert-error">
            <div>
              <ErrorIcon />
            </div>
            <div className="flex flex-col space-y-2">
              <span>Kunne ikke laste innleggene dine</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <OuterWrapper>
      <LoginModal />
      <Switch>
        <Route exact path={URLS.MAP}>
          <Map />
        </Route>
        <Route exact path={URLS.ENTRIES}>
          <Entries />
        </Route>
        <Route exact path={URLS.ADD_ENTRY}>
          <AddEntry />
        </Route>
        <Route path="*">
          <p>Page not found</p>
        </Route>
      </Switch>
    </OuterWrapper>
  );
};
