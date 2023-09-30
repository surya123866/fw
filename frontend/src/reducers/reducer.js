const initialState = {
  mobileNumber: null,
  userLogged: false,
};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_REGISTERED_NUMBER":
      return {
        ...state,
        mobileNumber: action.payload,
      };

    case "USER_LOGIN_STATUS":
      return {
        ...state,
        userLogged: action.payload,
      };

    default:
      return state;
  }
};

export default registrationReducer;
