import { combineReducers } from 'redux';

import Auth from './auth/reducers';
import Chat from './chat/reducers';
import Layout from './layout/reducer';
import ChatPro from './ChatPro/reducers';

export default combineReducers({
    Auth,
    Chat,
    Layout,
    ChatPro 
});