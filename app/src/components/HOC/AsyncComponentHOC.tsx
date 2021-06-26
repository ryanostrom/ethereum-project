import React, { FC, useState, useEffect } from 'react';
import { User } from 'api';

interface Props {
  user?: User;
  registerUser?: Function;
  deregisterUser?: Function;
}

export default function AsyncComponentHOC(
  importComponent: Function,
): FC<Props> {
  const AsyncComponent = (props: Props): JSX.Element => {
    const [isCancelled, setCancelled] = useState(false);
    const [Component, setComponent] = useState(null);

    const getComponent = async () => {
      const response = await importComponent();
      if (!isCancelled) {
        setComponent(response);
      }
    };

    useEffect(() => {
      getComponent();
      return setCancelled(true);
    }, []);

    return Component?.default ? <Component.default {...props} /> : <div />;
  };

  return AsyncComponent;
}
