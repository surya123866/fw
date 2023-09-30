export const addUserNumber = (number) => {
  return {
    type: "ADD_REGISTERED_NUMBER",
    payload: {
      number,
    },
  };
};
export const adduserLoginStatus = (isLogin) => {
  return {
    type: "USER_LOGIN_STATUS",
    payload: {
      isLogin,
    },
  };
};
