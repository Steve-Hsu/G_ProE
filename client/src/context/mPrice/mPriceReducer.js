import { LIST_MTRL } from '../types';

export default (state, action) => {
  switch (action.type) {
    case LIST_MTRL:
      return {
        mtrlLists: action.payload,
      };
    default:
  }
};
