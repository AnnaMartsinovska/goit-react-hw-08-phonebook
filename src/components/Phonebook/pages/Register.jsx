import { selectIsLoggedIn } from 'redux/auth/selectors';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { selectError } from 'redux/sliceContacts';
import { fetchRegister } from 'services/authApi';

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const error = useSelector(selectError);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submit = data => {
    dispatch(fetchRegister(data));
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
      <div>
        <form action="" onSubmit={handleSubmit(submit)}>
          <h2>Registration form</h2>
          <label>
            Name:
            <input
              type="text"
              {...register('name', {
                required: true,
                minLength: {
                  value: 3,
                  message: 'Name should be at least 3 characters',
                },
              })}
              placeholder="Enter name"
            />
            {errors?.name && <div>{errors.name.message}</div>}
          </label>
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
              type="password"
              autoComplete="on"
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
          <button to="/" type="submit">
            Sign up
          </button>
          <p>
            If you already have an account
            <span>
              <Link to="/login">Log in</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Register;
