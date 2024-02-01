import { useChatDispatch, useChatSelector } from '../store';
import { setEnterUser } from '../store/enterUserSlice';

export const Toast = () => {
  const enterUser: any = useChatSelector((state: any) => state.enterUser);
  const loginUser: any = useChatSelector((state: any) => state.user);
  const dispatch = useChatDispatch();
  const user: any = { uiNum: 0, uiName: '' };

  const hideDiv = () => {
    dispatch(setEnterUser(user));
  };

  const printMsg = () => {
    return `${enterUser.uiName}님 ${
      enterUser.uiNum === loginUser ? ' 반갑습니다.' : '님이 입장했습니다.'
    }`;
  };

  return (
    <div>
      {enterUser.uiNum != 0 ? (
        <div className="custom-toast">
          <span style={{ marginRight: '0.5rem' }}>
            <span className="toast-user-name">{printMsg()}</span>
          </span>
          <button className="toast-button" onClick={hideDiv}>
            확인
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
