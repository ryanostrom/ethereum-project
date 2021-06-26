import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { User } from 'api';
import routeCodes from 'constants/routeCodes';
import AsyncComponentHOC from 'components/HOC/AsyncComponentHOC';
import AuthenticatedRoute from 'components/RouteAuthentication/Authenticated';
import UnauthenticatedRoute from 'components/RouteAuthentication/Unauthenticated';

const AsyncLogin = AsyncComponentHOC(
  () => import('features/Unauthenticated/Login'),
);
const AsyncNotFound = AsyncComponentHOC(
  () => import('features/Unauthenticated/NotFound'),
);
const AsyncDashboard = AsyncComponentHOC(() => import('features/Dashboard'));

interface Props {
  user: User;
  registerUser: Function;
  deregisterUser: Function;
}

const Routes: FC<Props> = (props: Props): JSX.Element => {
  return (
    <Router>
      <Switch>
        <AuthenticatedRoute
          path={routeCodes.INDEX}
          exact
          component={AsyncDashboard}
          {...props}
        />
        <UnauthenticatedRoute
          path={routeCodes.LOGIN}
          exact
          component={AsyncLogin}
          {...props}
        />
        <Route component={AsyncNotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
