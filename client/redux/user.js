import { rtDatabase } from "../components/utils/firebase";
import { ref, set, get, child, push, update } from "firebase/database";
import { nanoid } from "nanoid";

const CREATE_USER = "CREATE_USER";

export const createUser = (user) => {
  console.log("inside action creator");
  return {
    type: CREATE_USER,
    user,
  };
};

export default function userReducer(user = {}, action) {
  console.log(action, "action");
  switch (action.type) {
    case CREATE_USER:
      return action.user;
    default:
      return user;
  }
}
