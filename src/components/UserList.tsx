import {
  Sidebar,
  Search,
  ConversationList,
  Conversation,
  Avatar,
} from '@chatscope/chat-ui-kit-react';

export const UserList = () => {
  return (
    <Sidebar position="left" scrollable={false}>
      <Search placeholder="Search..." />
      <ConversationList>
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
