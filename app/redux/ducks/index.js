import { combineReducers } from 'redux';

import auth from './auth';
import hallways from './hallways';

export default combineReducers({
  auth,
  hallways,
});
