import React, { FC } from 'react';
import { Route } from 'react-router-dom';
import { withRouter, Redirect, RouteComponentProps } from 'react-router';
import { decode } from 'query-params';
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

const UnauthenticatedRoute: FC<Props> = ({
  component,
  location,
  exact,
  path,
  user,
  registerUser,
  deregisterUser,
}: OwnProps): JSX.Element => {
  const querystring = (name) => {
    if (location && location.search) {
      const params = decode(location.search.replace(/\?/g, ''));
      return params[name];
    }
    return null;
  };

  const renderComponent: FC = (): JSX.Element => {
    const token = user?.token ? user.token : null;
    const redirect = querystring('redirect');

    const C = component;
    if (!token)
      return (
        <C
          user={user}
          registerUser={registerUser}
          deregisterUser={deregisterUser}
        />
      );

    return <Redirect to={redirect && redirect !== '' ? redirect : '/'} />;
  };

  return (
    <Route
      exact={exact}
      path={path}
      render={() => renderComponent({ children: null })}
    />
  );
};

const WrappedComponent = withRouter(UnauthenticatedRoute);
export default WrappedComponent;
