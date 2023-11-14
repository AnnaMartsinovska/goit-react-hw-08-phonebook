import { selectIsLoggedIn, selectUser } from 'auth/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchLogout } from 'services/authApi';

export const NavBar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleLogout = () => {
    dispatch(fetchLogout());
  };

  return (
    <nav>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/phonebook">Phonebook</NavLink>
        <NavLink to="/contacts">Contacts</NavLink>
        {!isLoggedIn && (
          <div>
            <NavLink to="/login">Log in</NavLink>
            <NavLink to="/register">Sign Up</NavLink>
          </div>
        )}

        {isLoggedIn && (
          <div>
            <p>{name}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};
