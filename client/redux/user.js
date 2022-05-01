const CREATE_USER = "CREATE_USER";
const UPDATE_USER = "UPDATE_USER";
const REMOVE_USER = "REMOVE_USER";
// const SET_USER = "SET_USER"; // TODO: set using using sessionStorage if sustaining user info

export const createUser = (user) => {
  console.log(user, "user in creatUser");
  return {
    type: CREATE_USER,
    user,
  };
};

export const updateUser = (user) => {
  console.log("update user action creator, ", user);
  return {
    type: UPDATE_USER,
    user,
  };
};

export const removeUser = () => {
  return {
    type: REMOVE_USER,
    user: {},
  };
};

// export const setUser = (user) => {
//   return {
//     type: SET_USER,
//     user,
//   };
// };

export default function userReducer(user = {}, action) {
  console.log("inside users reducer");
  switch (action.type) {
    case CREATE_USER:
      return action.user;
    case UPDATE_USER:
      return { ...user, ...action.user };
    case REMOVE_USER:
      return action.user;
    // case SET_USER:
    //   return action.user;
    default:
      return user;
  }
}
