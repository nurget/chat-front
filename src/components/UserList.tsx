import {
  Sidebar,
  Search,
  ConversationList,
  Conversation,
  Avatar,
} from '@chatscope/chat-ui-kit-react';
import { useEffect, useInsertionEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosAuth } from '../api/axiosHttp';
import { useAppSelector } from '../store';
import { User } from '../types/User.type';

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const loginUser = useAppSelector((state: any) => state.user);

  const navigate = useNavigate();
  console.log('uiNum=>', loginUser.uiNum);

  const init = async () => {
    try {
      const res = await axiosAuth.get('/user-infos');
      let tmpUsers: User[] = res.data;

      setUsers(tmpUsers.filter((user) => user.uiNum != loginUser.uiNum));
    } catch (e) {
      if (e === 'login') {
        navigate('/sign-in');
      }
      console.error(e);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Sidebar position="left" scrollable={false}>
      <Search placeholder="Search..." />

      <ConversationList>
        {users.map((chatUser: User, idx) => (
          <Conversation
            key={idx}
            name={chatUser.uiName}
            lastSenderName={chatUser.uiName}
            info="Yes i can do it for you"
            style={{ justifyContent: 'start' }}
          >
            <Avatar
              src={require('./images/ram.png')}
              name={chatUser.uiName}
              status="available"
            />
          </Conversation>
        ))}
      </ConversationList>
    </Sidebar>
  );
};
