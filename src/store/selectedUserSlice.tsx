import { create } from 'domain';
import { User } from '../types/User.type';
import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

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
const selectedUserSlice = createSlice({
  name: 'selectedUser',
  initialState: initialState,
  reducers: {
    setSelectedUser: (state: User, action: any) => {
      state.uiNum = action.payload.uiNum;
      state.uiId = action.payload.uiId;
      state.uiName = action.payload.uiName;
      state.uiAddress = action.payload.uiAddress;
      state.uiPhoneNum = action.payload.uiPhoneNum;
      state.uiPwd = action.payload.uiPwd;
      state.uiEmail = action.payload.uiEmail;
      state.uiArea = action.payload.uiArea;
      state.uiCredat = action.payload.uiCredat;
      state.uiCretim = action.payload.uiBirth;
      state.uiCretim = action.payload.uiCretim;
      state.uiActiveStatus = action.payload.uiActiveStatus;
      state.loginDate = action.payload.loginDate;
      state.uiImgPath = action.payload.uiImgPath;
      localStorage.setItem('selectedUser', JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});
export const { setSelectedUser } = selectedUserSlice.actions;
export default selectedUserSlice.reducer;
