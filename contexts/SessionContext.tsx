import React, { createContext } from 'react';
import { Session } from '../types';

const SessionContext = createContext<Session>({
  user: { id: '', name: '', email: '', plants: [], lastLoggedIn: new Date() },
  ttl: new Date(),
  token: ''
});

export default SessionContext;
