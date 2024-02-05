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
import { setselectedUser } from '../store/selectedUserSlice';
import { Msg } from '../types/Msg.type';

export const UserList = () => {
  const dispatch = useChatDispatch();
  const tmpUsers = useChatSelector((state: any) => state.userList);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    console.log('!!=>', tmpUsers.list);
    setUsers(tmpUsers.list);
  }, [tmpUsers]);

  return (
    <Sidebar position="left" scrollable={false}>
      <Search placeholder="Search..." />
      <ConversationList>
        {users
          ? users.map((chatUser: any, idx) => (
              <Conversation
                key={idx}
                name={chatUser.uiName}
                lastSenderName={chatUser.uiName}
                info="Yes i can do it for you"
                style={{ justifyContent: 'start' }}
                onClick={() => {
                  dispatch(setselectedUser(chatUser));
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
