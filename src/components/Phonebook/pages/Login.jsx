import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectError } from 'redux/sliceContacts';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { fetchLogin } from 'services/authApi';
import { selectIsLoggedIn } from 'redux/auth/selectors';

const Login = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const error = useSelector(selectError);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = data => {
    dispatch(fetchLogin(data));
    reset();
  };
  const handleExit = () => {
    navigate('/');
  };

  useEffect(() => {
    if (error) {
      return error.message;
    }
  }, [error]);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <div>
        <button onClick={handleExit} type="button">
          X
        </button>
      </div>
      <divr>
        <form nFormaction="" onSubmit={handleSubmit(submit)}>
          <h2>Log in</h2>
          <label>
            Email:
            <input
              type="email"
              {...register('email', {
                required: true,
                minLength: {
                  value: 6,
                  message: 'Email should be at least 6 characters',
                },
              })}
              placeholder="Enter email"
            />
            {errors?.email && <div>{errors.email.message}</div>}
          </label>
          <label>
            Password:
            <input
              autoComplete="on"
              type="password"
              {...register('password', {
                required: true,
                minLength: {
                  value: 7,
                  message: 'Password should be at least 7 characters',
                },
              })}
              placeholder="Enter password"
            />
            {errors?.password && <div>{errors.password.message}</div>}
          </label>
          <button>Log in</button>
          <p>
            If you don't have an account
            <span>
              <Link to="/register">Sign Up</Link>
            </span>
          </p>
        </form>
      </divr>
    </div>
  );
};

export default Login;
