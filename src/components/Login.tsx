import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosHttp } from '../api/axiosHttp';
import { useAppDispatch } from '../store';
import { setUser } from '../store/userSlice';
import { User } from '../types/User.type';

export const Login = () => {
  const [error, setError] = useState<boolean>(false);
  const [chatUser, setChatUser] = useState<User>({});
  const [rememberId, setRememberId] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const changeUser = (evt: any) => {
    setChatUser({
      ...chatUser,
      [evt.target.id]: evt.target.value,
    });
  };
  const checkRememberId = (evt: any) => {
    setRememberId(evt.target.checked);
  };

  // const login = async () => {
  // setError(false);
  const login = async () => {
    setError(false);
    try {
      const res = await axiosHttp.post('/api/login', chatUser);
      localStorage.setItem('token', res.data.token);
      dispatch(setUser(res.data));
      navigate('/main');
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form>
          <h3>Sign In</h3>

          <div className="mb-3">
            {error ? (
              <div className="text-danger">
                아이디와 비밀번호를 확인해주세요.
              </div>
            ) : (
              ''
            )}
            <label>ID</label>
            <input
              id="uiId"
              type="text"
              className="form-control"
              placeholder="Enter ID"
              onChange={changeUser}
              value={chatUser.uiId || ''}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              id="uiPwd"
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={changeUser}
            />
          </div>

          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
                onChange={checkRememberId}
                checked={rememberId}
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                아이디 기억하기
              </label>
            </div>
          </div>

          <div className="d-grid">
            <button type="button" className="btn btn-primary" onClick={login}>
              Login
            </button>
          </div>
          <p className="forgot-password text-right">
            <a href="#" onClick={() => navigate('/sign-up')}>
              회원가입
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
