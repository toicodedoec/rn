import status from './status';
import member from './member';
import coach from './coach';
import country from './country';

const rehydrated = (state = false, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return true;
    default:
      return state;
  }
};

export default {
  rehydrated,
  status,
  member,
  coach,
  country
};
