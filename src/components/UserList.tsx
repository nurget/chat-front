import {
  Sidebar,
  Search,
  ConversationList,
  Conversation,
  Avatar,
} from '@chatscope/chat-ui-kit-react';
import { useEffect, useInsertionEffect, useState } from 'react';
import { axiosAuth } from '../api/axiosHttp';
import { useAppSelector } from '../store';
import { User } from '../types/User.type';

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const loginUser = useAppSelector((state: any) => state.user);
  console.log('uiNum=>', loginUser.uiNum);

  const init = async () => {
    const res = await axiosAuth.get('/user-infos');
    let tmpUsers: User[] = res.data;
    console.log(tmpUsers);
    setUsers(tmpUsers.filter((user) => user.uiNum != loginUser.uiNum));
    // console.log(setUsers);
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
            name="Lilly"
            lastSenderName="Lilly"
            info="Yes i can do it for you"
            style={{ justifyContent: 'start' }}
          >
            <Avatar
              src={require('./images/ram.png')}
              name="Lilly"
              status="available"
            />
          </Conversation>
        ))}

        <Conversation
          name="Joe"
          lastSenderName="Joe"
          info="Yes i can do it for you"
        >
          <Avatar src={require('./images/ram.png')} name="Joe" status="dnd" />
        </Conversation>

        <Conversation
          name="Emily"
          lastSenderName="Emily"
          info="Yes i can do it for you"
          unreadCnt={3}
        >
          <Avatar
            src={require('./images/ram.png')}
            name="Emily"
            status="available"
          />
        </Conversation>

        <Conversation
          name="Kai"
          lastSenderName="Kai"
          info="Yes i can do it for you"
          unreadDot
        >
          <Avatar
            src={require('./images/ram.png')}
            name="Kai"
            status="unavailable"
          />
        </Conversation>
      </ConversationList>
    </Sidebar>
  );
};
