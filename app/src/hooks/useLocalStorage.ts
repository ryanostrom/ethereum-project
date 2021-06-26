import React, { useState, useEffect } from 'react';

interface Props {
  initialValue: any;
  name: string;
}

const getStorage = ({ initialValue, name }: Props) => {
  const persistedString = localStorage.getItem(name);
  return persistedString ? JSON.parse(persistedString) : initialValue;
};
const useLocalStorage = (props: Props) => {
  const { localStorage } = window;
  const [prop, setter] = useState(getStorage(props));

  useEffect(() => {
    localStorage.setItem(name, prop);
  }, [prop]);

  return [prop, setter];
};

export default useLocalStorage;
