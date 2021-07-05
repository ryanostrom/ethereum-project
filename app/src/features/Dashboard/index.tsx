import React, { FC, useState } from 'react';
import api, { User } from 'api';

interface Props {
  user: User;
  deregisterUser: Function;
}

const Dashboard: FC<Props> = ({ user, deregisterUser }: Props): JSX.Element => {
  const [block, setBlock] = useState(null)

  const onLogout = () => deregisterUser();
  const onBlock = async () => {
    console.log('### get accounts')
    const response = await api.block.get()
    setBlock(JSON.stringify(response.data.block))
  }
  return (
    <>
      <h2>Dashboard</h2>
      <p>
        Hello {user.firstName} {user.lastName}
      </p>
      <button onClick={onLogout}>Logout</button>
      <button onClick={onBlock}>Get block</button>
      {block ? (<div>{block}</div>) : null}
    </>
  );
};

export default Dashboard;
