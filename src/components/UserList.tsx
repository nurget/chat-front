import {
  Avatar,
  Conversation,
  ConversationList,
  Search,
  Sidebar,
} from '@chatscope/chat-ui-kit-react';
import axios from 'axios';
import { axiosAuth } from '../api/axiosHttp';
import { useEffect, useState } from 'react';
import { User } from '../types/User.type';

import { useNavigate } from 'react-router-dom';
import { useChatDispatch, useChatSelector } from '../store';
import { setSelectedUser } from '../store/selectedUserSlice';
import { Msg } from '../types/Msg.type';
import { setUserList } from '../store/userListSlice';

export const UserList = () => {
  const dispatch = useChatDispatch();
  const userListObj = useChatSelector((state: any) => state.userList);
  const user = useChatSelector((state: any) => state.user);

  const selectUser = async (chatUser: any) => {
    const res = await axiosAuth.put('/message-log', {
      cmiSenderUiNum: chatUser.uiNum,
      cmiReceiveUiNum: user.uiNum,
    });
    if (res.data) {
      const tmpUserList: any = JSON.parse(JSON.stringify(userListObj.list));
      tmpUserList.map((user: any) => {
        if (user.uiNum === chatUser.uiNum) {
          user.unreadCnt = 0;
        }
      });
      dispatch(setUserList(tmpUserList));
    }
    dispatch(setSelectedUser(chatUser));
  };

  return (
    <Sidebar position="left" scrollable={false}>
      <Search placeholder="Search..." />
      <ConversationList>
        {userListObj.list
          ? userListObj.list.map((chatUser: any, idx: number) => (
              <Conversation
                key={idx}
                name={chatUser.uiName}
                lastSenderName={chatUser.uiName}
                info="Yes i can do it for you"
                style={{ justifyContent: 'start' }}
                onClick={() => {
                  selectUser(chatUser);
                }}
                unreadCnt={chatUser.unreadCnt}
              >
                <Avatar
                  src={require('./images/default.png')}
                  name="Lilly"
                  status={chatUser.login ? 'available' : 'dnd'}
                />
              </Conversation>
            ))
          : ''}
      </ConversationList>
    </Sidebar>
  );
};
