import React, { useEffect } from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Main } from './components/Main';
import { Login } from './components/Login';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { SignUp } from './components/SignUp';
import { Menu } from './components/Menu';
import { useChatDispatch, useChatSelector } from './store';
import { setUserList } from './store/userListSlice';
import { disconnectClient, initClient } from './service/ChatService';
import { Toast } from './components/Toast';
import { setEnterUser } from './store/enterUserSlice';

function App() {
  const loginUser = useChatSelector((state: any) => state.user);
  const uiNum = localStorage.getItem('uiNum');
  const tmpObj = useChatSelector((state: any) => state.userList);
  const dispatch = useChatDispatch();
  const configs = [
    {
      url: `/topic/enter-chat`,
      callback: (data: any) => {
        const tmpUsers = JSON.parse(data.body);
        const loginUsers = tmpObj.list.filter((user: any) => {
          if (!user.login) {
            for (const tmpUser of tmpUsers) {
              if (tmpUser.login && tmpUser.uiNum === user.uiNum) {
                return user;
              }
            }
          }
        });
        for (const loginUser of loginUsers) {
          dispatch(setEnterUser(loginUser));
        }
        dispatch(setUserList(tmpUsers));
      },
    },
    {
      url: `/topic/chat/${loginUser.uiNum}`,
      callback: (data: any) => {
        const msg = JSON.parse(data.body);
        console.log(msg);
      },
    },
  ];
  useEffect(() => {
    disconnectClient();
    if (!uiNum) {
      return;
    }
    initClient(configs).catch((e) => {
      console.log(e);
    });
  }, [loginUser]);

  return (
    <BrowserRouter>
      <Toast />

      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link
              className="navbar-brand"
              to={loginUser.uiNum === 0 ? '/sign-in' : '/main'}
            >
              Chatting
            </Link>
            <Menu />
          </div>
        </nav>

        <div className="auth-wrapper">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/main" element={<Main />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
