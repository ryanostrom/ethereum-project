import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router';
import { User } from 'api';

interface OwnProps {
  component?: any;
  location: any;
  exact: boolean;
  path: string;
  user?: User;
  registerUser?: Function;
  deregisterUser?: Function;
}

type Props = OwnProps & RouteComponentProps;

const AuthenticatedRoute: FC<Props> = ({
  component,
  location,
  exact,
  path,
  user,
  registerUser,
  deregisterUser,
}: OwnProps): JSX.Element => {
  const renderComponent: FC = (): JSX.Element => {
    const token = user?.token ? user.token : null;
    const C = component;
    if (token)
      return (
        <C
          user={user}
          registerUser={registerUser}
          deregisterUser={deregisterUser}
        />
      );

    const q = `${location.pathname}${location.search}`;
    return <Redirect to={`/login?redirect=${q}`} />;
  };

  return (
    <Route
      exact={exact}
      path={path}
      render={() => renderComponent({ children: null })}
    />
  );
};

const WrappedComponent = withRouter(AuthenticatedRoute);
export default WrappedComponent;
