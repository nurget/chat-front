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
import React, { useEffect, useState } from 'react';
import { axiosAuth } from '../api/axiosHttp';
import { useChatSelector } from '../store';
import { Msg } from '../types/Msg.type';
import { User } from '../types/User.type';
import { publishMsg } from '../service/ChatService';

export const ChatList = () => {
  const [inputMsg, setInputMsg] = useState('');
  const selectedUser = useChatSelector((state: any) => state.selectedUser);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const loginUser: User = useChatSelector((state: any) => state.user);

  // 선택된 사용자가 변경될 때마다 해당 사용자와의 채팅 메시지 목록을 가져오는 useEffect
  useEffect(() => {
    const messageList = async () => {
      const res = await axiosAuth.get(
        `/chat/msg-infos?cmiSenderUiNum=${loginUser.uiNum}&cmiReceiveUiNum=${selectedUser.uiNum}`
      );
      const resMsg = res.data.list;
      setMsgs(resMsg);
      console.log(resMsg);
    };

    console.log(selectedUser);
    messageList();
  }, [selectedUser]);

  // 시간을 2자리 숫자로 포맷팅하는 함수
  const getFormat = (n: number) => {
    return n < 10 ? '0' + n : n;
  };

  const days = ['월', '화', '수', '목', '금', '토', '일'];

  // 메시지 목록에서 날짜 구분선을 표시하는 함수
  const printMessageSeperator = (date1?: any, date2?: any) => {
    const d2 = new Date(date2);
    const d2Str = `${d2.getFullYear()}-${getFormat(
      d2.getMonth() + 1
    )}-${getFormat(d2.getDate())}`;

    if (!date1) {
      return <MessageSeparator content={`${d2Str} ${days[d2.getDay()]}요일`} />;
    }

    const d1 = new Date(date1);
    const d1Str = `${d1.getFullYear()}-${getFormat(
      d1.getMonth() + 1
    )}-${getFormat(d1.getDate())}`;

    if (d1Str !== d2Str) {
      return <MessageSeparator content={`${d2Str} ${days[d2.getDay()]}요일`} />;
    }
  };

  // 메시지 전송 함수
  const sendMsg = () => {
    const destination = `/publish/chat/${selectedUser.uiNum}`;
    publishMsg(destination, {
      cmiMessage: inputMsg,
      cmiSenderUiNum: loginUser.uiNum,
      cmiReceiveUiNum: selectedUser.uiNum,
    });
    setInputMsg('');
    console.log(inputMsg);
  };

  return (
    <ChatContainer>
      <ConversationHeader>
        <ConversationHeader.Back />
        <Avatar src={require('./images/ram.png')} name="Zoe" />
        <ConversationHeader.Content userName="Zoe" info="Active 10 mins ago" />
        {/* <ConversationHeader.Actions>
          <VoiceCallButton />
          <VideoCallButton />
          <InfoButton />
        </ConversationHeader.Actions> */}
      </ConversationHeader>
      <MessageList
        typingIndicator={<TypingIndicator content="Zoe is typing" />}
      >
        {msgs.map((msg: any, idx: number) => (
          <>
            {printMessageSeperator(
              idx === 0 ? null : msgs[idx - 1].cmiSentTime,
              msg.cmiSentTime
            )}
            <Message
              key={idx}
              model={{
                message: msg.cmiMessage,
                sentTime: msg.cmiSentTime,
                sender: msg.cmiSender,
                direction:
                  msg.cmiSenderUiNum === loginUser.uiNum
                    ? 'outgoing'
                    : 'incoming',
                position: 'single',
              }}
              avatarSpacer={loginUser.uiNum === msg.cmiSenderUiNum}
            >
              {msg.cmiSenderUiNum === loginUser.uiNum ? (
                ''
              ) : (
                <Avatar
                  src={require('./images/default.png')}
                  name={selectedUser.uiName}
                />
              )}
            </Message>
          </>
        ))}
      </MessageList>
      <MessageInput
        placeholder="Type message here"
        value={inputMsg}
        onChange={(val) => setInputMsg(val)}
        onSend={sendMsg}
        sendDisabled={false}
      />
    </ChatContainer>
  );
};
