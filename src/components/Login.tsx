import React, { ChangeEvent, useEffect, useState } from 'react';

import { User } from '../types/User.type';
import { useNavigate, useNavigation } from 'react-router-dom';
import axios from 'axios';

import { axiosAuth, axiosHttp } from '../api/axiosHttp';
import { setUser } from '../store/userSlice';

import { useChatDispatch } from '../store';
import { initClient } from '../service/ChatService';
import { setUserList } from '../store/userListSlice';

export const Login = () => {
  const [chatUser, setChatUser] = useState<User>({});
  const [rememberId, setRememberId] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const dispatch = useChatDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    let uiId: any = localStorage.getItem('uiId');
    if (uiId) {
      setChatUser({
        ...chatUser,
        uiId: uiId,
      });
    } else {
      setRememberId(true);
    }
  }, []);

  const checkRememberId = (evt: any) => {
    setRememberId(evt.target.checked);
  };
  const changeUser = (evt: any) => {
    setChatUser({
      ...chatUser,
      [evt.target.id]: evt.target.value,
    });
    console.log(chatUser);
  };
  const login = async () => {
    setError(false);
    try {
      let res = await axiosHttp.post('/api/login', chatUser);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('uiNum', res.data.uiNum);
      dispatch(setUser(res.data));
      res = await axiosAuth.get(`/chat-user-infos/${res.data.uiNum}`);
      dispatch(setUserList(res.data));
      navigate('/main');
    } catch (err) {
      setError(true);
    }
  };
  useEffect(() => {
    localStorage.clear();
  }, []);

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
              value={chatUser.uiId}
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
