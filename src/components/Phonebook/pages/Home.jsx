import { selectIsLoggedIn, selectUser } from 'redux/auth/selectors';
import React from 'react';
import { useSelector } from 'react-redux';

export const Home = () => {
  const { name } = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return (
      <div>
        <h1>Phonebook</h1>
        <p>Welcome {name}</p>
      </div>
    );
  }
  return (
    <div>
      <h1>Phonebook</h1>
      <p>Please Log in</p>
    </div>
  );
};
export default Home;
