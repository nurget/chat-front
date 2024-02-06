import { Client } from '@stomp/stompjs';
import { subscribe } from 'diagnostics_channel';
import { resolve } from 'path';

import { setUserList } from '../store/userListSlice';
import { useDispatch } from 'react-redux';
import { useChatDispatch } from '../store';
import { config } from 'process';
import { Msg } from '../types/Msg.type';

const brokerURL = `${process.env.REACT_APP_WS}://${process.env.REACT_APP_HOST}/chat`;

const client = new Client({
  brokerURL: brokerURL,
  debug: (str) => {
    console.log(str);
  },
  // 연결이 끊어졌을 때 재연결을 시도하기 전 대기해야 하는 시간 (1초)
  reconnectDelay: 1000,
  // 클라이언트가 서버에 연결하는데 허용되는 최대 시간 (0.1초)
  connectionTimeout: 100,
});
export const initClient = async (configs: any) => {
  return new Promise((resolve, reject) => {
    if (!localStorage.getItem('uiNum') || !localStorage.getItem('token')) {
      reject('login');
    }
    client.connectHeaders = {
      uiNum: localStorage.getItem('uiNum') || '',
      token: localStorage.getItem('token') || '',
    };
    client.onConnect = () => {
      for (const config of configs) {
        client.subscribe(config.url, config.callback);
      }
      resolve(client);
    };
    client.activate();
  });
};
export const disconnectClient = () => {
  if (client.connected) {
    client.deactivate();
  }
};
export const publishMsg = (destination: string, msg: Msg) => {
  client.publish({
    destination: destination,
    body: JSON.stringify(msg),
  });
};
