import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import React, { useState } from 'react';
import {
  MainContainer,
  Sidebar,
  Search,
  ConversationList,
  Conversation,
  Avatar,
  ChatContainer,
  ConversationHeader,
  VoiceCallButton,
  Message,
  MessageInput,
  VideoCallButton,
  InfoButton,
  MessageSeparator,
  TypingIndicator,
  MessageList,
} from '@chatscope/chat-ui-kit-react';
import { UserList } from './UserList';
import { ChatList } from './ChatList';

export const Main = () => {
  const [messageInputValue, setMessageInputValue] = useState('');

  return (
    <div
      style={{
        height: '600px',
        position: 'relative',
      }}
    >
      <MainContainer responsive>
        <UserList></UserList>
        <ChatList></ChatList>

        {/* <Sidebar position="right">
          <ExpansionPanel open title="INFO">
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
          </ExpansionPanel>
          <ExpansionPanel title="LOCALIZATION">
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
          </ExpansionPanel>
          <ExpansionPanel title="MEDIA">
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
          </ExpansionPanel>
          <ExpansionPanel title="SURVEY">
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
          </ExpansionPanel>
          <ExpansionPanel title="OPTIONS">
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
          </ExpansionPanel>
        </Sidebar> */}
      </MainContainer>
    </div>
  );
};
