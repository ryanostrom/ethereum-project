import React, { FC } from 'react';
import { User } from 'api';

interface Props {
  registerUser: Function;
}

const Login: FC<Props> = ({ registerUser }: Props): JSX.Element => {
  const onLogin = () => {
    // TODO: replace with API response
    const user: User = {
      id: 1,
      firstName: 'Joe',
      lastName: 'Smith',
      email: 'jsmith@gmail.com',
      token: '123',
      refreshToken: '123',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };
    registerUser(user);
  };

  return (
    <>
      <h2>Eth App</h2>
      <button className="next" onClick={onLogin}>
        Login
      </button>
    </>
  );
};

export default Login;
