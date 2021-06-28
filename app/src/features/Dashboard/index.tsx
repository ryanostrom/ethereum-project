import React, { FC } from 'react';
import api, { User } from 'api';

interface Props {
  user: User;
  deregisterUser: Function;
}

const Dashboard: FC<Props> = ({ user, deregisterUser }: Props): JSX.Element => {
  const onLogout = () => deregisterUser();
  const onAccounts = () => {
    console.log('### get accounts')
    api.accounts.get()
  }
  return (
    <>
      <h2>Dashboard</h2>
      <p>
        Hello {user.firstName} {user.lastName}
      </p>
      <button onClick={onLogout}>Logout</button>
      <button onClick={onAccounts}>Get Accounts</button>
    </>
  );
};

export default Dashboard;
