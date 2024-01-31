export interface Msg {
  Message?: string;
  sentTime?: string;
  receivedTime?: string;
  sender?: string;
  senderUiNum?: number;
  receiveUiNum?: null;
  direction?: string;
  position?: string;
  type?: string;
  payload?: string;
  typing?: string;
}
