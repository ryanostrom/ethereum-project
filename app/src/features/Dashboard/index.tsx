import React, { FC } from 'react';
import { User } from 'api';

interface Props {
  user: User;
  deregisterUser: Function;
}

const Dashboard: FC<Props> = ({ user, deregisterUser }: Props): JSX.Element => {
  const onLogout = () => deregisterUser();

  return (
    <>
      <h2>Dashboard</h2>
      <p>
        Hello {user.firstName} {user.lastName}
      </p>
      <button onClick={onLogout}>Logout</button>
    </>
  );
};

export default Dashboard;
