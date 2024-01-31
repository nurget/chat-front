import {
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
import React, { useState } from 'react';

export const ChatList = () => {
  const [inputMsg, setInputMsg] = useState('');
  return (
    <ChatContainer>
      <ConversationHeader>
        <ConversationHeader.Back />
        <Avatar src={require('./images/ram.png')} name="Zoe" />
        <ConversationHeader.Content userName="Zoe" info="Active 10 mins ago" />
        <ConversationHeader.Actions>
          <VoiceCallButton />
          <VideoCallButton />
          <InfoButton />
        </ConversationHeader.Actions>
      </ConversationHeader>
      <MessageList
        typingIndicator={<TypingIndicator content="Zoe is typing" />}
      >
        <MessageSeparator content="Saturday, 30 November 2019" />

        <Message
          model={{
            message: 'Hello my friend',
            sentTime: '15 mins ago',
            sender: 'Zoe',
            direction: 'incoming',
            position: 'single',
          }}
        >
          <Avatar src={require('./images/ram.png')} name="Zoe" />
        </Message>

        <Message
          model={{
            message: 'Hello my friend',
            sentTime: '15 mins ago',
            sender: 'Patrik',
            direction: 'outgoing',
            position: 'single',
          }}
          avatarSpacer
        />
        <Message
          model={{
            message: 'Hello my friend',
            sentTime: '15 mins ago',
            sender: 'Zoe',
            direction: 'incoming',
            position: 'first',
          }}
          avatarSpacer
        />
      </MessageList>
      <MessageInput
        placeholder="Type message here"
        value={inputMsg}
        onChange={(val) => setInputMsg(val)}
        onSend={() => setInputMsg('')}
      />
    </ChatContainer>
  );
};
