import { Client } from '@stomp/stompjs';

const brokerURL = `${process.env.REACT_APP_WS}://${process.env.REACT_APP_HOST}/chat`;

const client = new Client({
  brokerURL: brokerURL,
  debug: (str) => {
    // console.log(str);
  },
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
