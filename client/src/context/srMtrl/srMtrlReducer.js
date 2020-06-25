import { LIST_MTRL } from '../types';

export default (state, action) => {
  switch (action.type) {
    case LIST_MTRL:
      return {
        srMtrls: action.payload,
      };
    default:
  }
};
