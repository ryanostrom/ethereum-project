import React, { FC } from 'react';
import Routes from 'Routes';
import { initialUserState } from 'api';
import { useLocalStorage } from 'hooks';

const App: FC = (): JSX.Element => {
  const [user, setUser] = useLocalStorage({
    initialValue: initialUserState,
    name: 'user',
  });

  const deregisterUser = () => {
    setUser(initialUserState);
  };

  return (
    <Routes
      user={user}
      registerUser={setUser}
      deregisterUser={deregisterUser}
    />
  );
};

export default App;
