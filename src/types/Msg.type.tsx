export interface Msg {
  cmiNum?: number;
  cmiMessage?: string;
  cmiSentTime?: string;
  cmiReceivedTime?: string;
  cmiSender?: string;
  cmiSenderUiNum?: number;
  cmiReceiveUiNum?: number;
  cmiDirection?: string;
  cmiPosition?: string;
  cmiType?: string;
  payload?: string;
  type?: string;
}
