import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User.type';

const initialState: User = {
  uiNum: 0,
  uiName: '',
  uiBirth: '',
  uiAddress: '',
  uiPhoneNum: '',
  uiPwd: '',
  uiId: '',
  uiEmail: '',
  uiGender: '',
  uiArea: '',
  uiCredat: '',
  uiCretim: '',
  uiImgPath: '',
  uiActiveStatus: '',
  token: '',
  loginDate: '',
  login: false,
  sessionId: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state: User, action: any) => {
      state.uiNum = action.payload.uiNum;
      state.uiId = action.payload.uiId;
      state.uiName = action.payload.uiName;
      state.token = action.payload.token;
      state.uiBirth = action.payload.uiBirth;
      state.uiAddress = action.payload.uiAddress;
      state.uiPhoneNum = action.payload.uiPhoneNum;
      state.uiPwd = action.payload.uiPwd;
      state.uiEmail = action.payload.uiEmail;
      state.uiCredat = action.payload.uiCredat;
      state.uiCretim = action.payload.uiCretim;
      state.uiActiveStatus = action.payload.uiActivityStatus;
      state.loginDate = action.payload.loginDate;
      state.login = action.payload.login;
    },
    initUser: (state: User) => {
      state = {};
    },
  },
});

export const { setUser, initUser } = userSlice.actions;
export default userSlice.reducer;
