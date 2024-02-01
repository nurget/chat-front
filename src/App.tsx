import React, { useEffect } from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Main } from './components/Main';
import { Login } from './components/Login';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { SignUp } from './components/SignUp';
import { useChatDispatch, useChatSelector } from './store';
import { setUserList } from './store/userListSlice';
import { disconnectClient, initClient } from './service/ChatService';

function App() {
  const loginUser = useChatSelector((state: any) => state.user);
  const dispatch = useChatDispatch();
  const config = {
    url: `/topic/enter-chat`,
    callback: (data: any) => {
      const tmpUsers = JSON.parse(data.body);
      console.log('callback =>', tmpUsers);
      dispatch(setUserList(tmpUsers));
    },
  };

  useEffect(() => {
    disconnectClient();
    if (!loginUser.uiNum) {
      return;
    }
    initClient(config);
  }, [loginUser]);

  return (
    <BrowserRouter>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              Chatting
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    SignIn
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    SignUp
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/main'}>
                    채팅
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
