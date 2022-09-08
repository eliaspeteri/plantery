import { createContext } from 'react';
import { getSessionCookie } from '../utils/sessions';

const SessionContext = createContext(getSessionCookie());

export default SessionContext;
