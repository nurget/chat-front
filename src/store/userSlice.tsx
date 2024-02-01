import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
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
      state.uiArea = action.payload.uiArea;
      state.uiCredat = action.payload.uiCredat;
      state.uiCretim = action.payload.uiCretim;
      state.uiImgPath = action.payload.uiImgPath;
      state.uiActiveStatus = action.payload.uiActivityStatus;
      state.loginDate = action.payload.loginDate;
      state.login = action.payload.login;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
