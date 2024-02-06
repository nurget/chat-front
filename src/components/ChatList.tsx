import {
  Avatar,
  ChatContainer,
  ConversationHeader,
  InfoButton,
  Message,
  MessageInput,
  MessageList,
  MessageSeparator,
  TypingIndicator,
  VideoCallButton,
  VoiceCallButton,
} from '@chatscope/chat-ui-kit-react';
import { useEffect, useRef, useState } from 'react';
import { useChatDispatch, useChatSelector } from '../store';
import { Msg } from '../types/Msg.type';
import { axiosAuth } from '../api/axiosHttp';
import { publishMsg } from '../service/ChatService';
import { setChatList } from '../store/chatListSlice';

export const ChatList = () => {
  const [inputMsg, setInputMsg] = useState<string>('');
  const selectedUser = useChatSelector((state: any) => state.selectedUser);
  const loginUser = useChatSelector((state: any) => state.user);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const page = useRef<number>(1);

  const chatList = useChatSelector((state: any) => state.chatList);
  const dispatch = useChatDispatch();

  const getMsgs = async (init: boolean) => {
    const res = await axiosAuth.get(
      `/chat/msg-infos?cmiSenderUiNum=${loginUser.uiNum}&cmiReceiveUiNum=${selectedUser.uiNum}`
    );
    const tmpMsgs = res.data.list;
    tmpMsgs.sort((m1: any, m2: any) => {
      console.log(m1.cmiSentTime);
      return m1.cmiSentTime.localeCompare(m2.cmiSentTime);
    });
    if (init) {
      const chatInfo: any = {
        uiNum: selectedUser.uiNum,
        list: tmpMsgs,
      };
      dispatch(setChatList(chatInfo));
    } else {
      setMsgs([...tmpMsgs, msgs]);
    }
  };
  const getFormat = (n: number) => {
    return n < 10 ? '0' + n : n;
  };
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const printMessageSeparator = (date1?: any, date2?: any) => {
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
  const sendMsg = () => {
    console.log(inputMsg);
    const destination = `/publish/chat/${selectedUser.uiNum}`;
    publishMsg(destination, {
      cmiMessage: inputMsg,
      cmiSenderUiNum: loginUser.uiNum,
      cmiReceiveUiNum: selectedUser.uiNum,
    });
    setInputMsg('');
  };
  useEffect(() => {
    page.current = 1;
    console.log(selectedUser);
    getMsgs(true);
  }, [selectedUser]);
  return (
    <ChatContainer>
      <ConversationHeader>
        <ConversationHeader.Back />
        <Avatar src={require('./images/ram.png')} name="Zoe" />
        <ConversationHeader.Content
          userName={selectedUser.uiName}
          info={selectedUser.loginDate}
        />
        <ConversationHeader.Actions>
          {/*<VoiceCallButton />
              <VideoCallButton />
              <InfoButton />*/}
        </ConversationHeader.Actions>
      </ConversationHeader>
      <MessageList>
        {selectedUser.uiNum !== 0 &&
          chatList.list.map((msg: Msg, idx: number) => (
            <>
              {printMessageSeparator(
                idx === 0 ? null : chatList.list[idx - 1].cmiSentTime,
                msg.cmiSentTime
              )}
              <Message
                key={idx}
                model={{
                  message: msg.cmiMessage,
                  sentTime: msg.cmiSentTime,
                  sender: msg.cmiSender,
                  direction:
                    loginUser.uiNum === msg.cmiSenderUiNum
                      ? 'outgoing'
                      : 'incoming',
                  position: 'normal',
                }}
                avatarSpacer={loginUser.uiNum === msg.cmiSenderUiNum}
              >
                {loginUser.uiNum === msg.cmiSenderUiNum ? (
                  ''
                ) : (
                  <Avatar src={require('./images/ram.png')} name="Zoe" />
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
