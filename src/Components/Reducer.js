import {  RANDOM_Breed_ACTION} from "../Constants";

export default function reducer(state, action) {
  switch (action.action) {
    case  RANDOM_Breed_ACTION.INIT:
      return {
        ...state,
        ...action.payload,
        isUpdate: false,
      };

    case  RANDOM_Breed_ACTION.UPDATE:
      return {
        ...state,
        ...action.payload,
        isUpdate: true,
      };

    default:
      return {
        state,
      };
  }
}