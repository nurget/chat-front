import React, { useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Main } from './components/Main';
import { Login } from './components/Login';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { SignUp } from './components/SignUp';
import { Menu } from './components/Menu';
import { useChatDispatch, useChatSelector } from './store';
import { setUserList } from './store/userListSlice';
import { disconnectClient, initClient } from './service/ChatService';
import { Toast } from './components/Toast';
import { setEnterUser } from './store/enterUserSlice';
import { persistor } from '.';
import { Msg } from './types/Msg.type';
import { globalRouter } from './api/globalRouter';
import { setChatList } from './store/chatListSlice';

function App() {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;
  const selectedUser = useChatSelector((state: any) => state.selectedUser);
  const loginUser = useChatSelector((state: any) => state.user);
  const uiNum = localStorage.getItem('uiNum');
  const tmpObj = useChatSelector((state: any) => state.userList);
  const dispatch = useChatDispatch();
  const configs = [
    {
      url: `/topic/enter-chat`,
      callback: (data: any) => {
        const connectedUsers = JSON.parse(data.body);
        const users = JSON.parse(localStorage.getItem('userList') || '[]');
        users.map((user: any) => {
          for (const key in connectedUsers) {
            const connectedUser = connectedUsers[key];
            if (user.uiNum === connectedUser.uiNum) {
              user.login = connectedUser.login;
            }
          }
        });
        dispatch(setUserList(users));
      },
    },
    {
      url: `/topic/chat/${loginUser.uiNum}`,
      callback: (data: any) => {
        const msg: Msg = JSON.parse(data.body);
        const tmpList: any = JSON.parse(
          localStorage.getItem('userList') || '[]'
        );
        const selectedUser: any = JSON.parse(
          localStorage.getItem('selectedUser') || '{}'
        );
        const uiNum = parseInt(localStorage.getItem('uiNum') || '0');
        if (
          msg.cmiSenderUiNum !== selectedUser.uiNum &&
          msg.cmiSenderUiNum !== uiNum
        ) {
          for (const user of tmpList) {
            if (user.uiNum === msg.cmiSenderUiNum) {
              user.unreadCnt = isNaN(user.unreadCnt) ? 1 : ++user.unreadCnt;
              console.log(user);
            }
          }
        }
        dispatch(setUserList(tmpList));
        console.log(msg);

        if (
          msg.cmiSenderUiNum === selectedUser.uiNum ||
          msg.cmiReceiveUiNum === selectedUser.uiNum
        ) {
          const chatList: any = JSON.parse(
            localStorage.getItem('chatList') || '{}'
          );
          chatList.list.push(msg);
          dispatch(setChatList(chatList));
        }
      },
    },
  ];
  useEffect(() => {
    disconnectClient();
    if (loginUser.uiNum === 0) {
      persistor.purge();
      navigate('/');
      return;
    }
    initClient(configs).catch((e) => {
      console.log(e);
    });
  }, [loginUser]);

  useEffect(() => {
    console.log(tmpObj.list);
    setTimeout(async () => {
      await initClient(configs).catch((e) => {
        console.log(e);
      });
    }, 200);
  }, [tmpObj.list]);

  return (
    <>
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
    </>
  );
}

export default App;
