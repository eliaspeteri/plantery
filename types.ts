export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  description?: string;
  cultivation?: Cultivation;
  createdAt: string | Date;
  createdBy?: string;
  updatedAt?: string | Date;
  updatedBy?: string;
  ecology?: string;
  taxonomy?: string;
}

export interface Cultivation {
  temperature?: Temperature;
  humidity?: Humidity;
  light?: 'shade' | 'half-shade' | 'medium-sun' | 'full-sun';
  water?: Water;
  fertilizer?: Fertilizer;
  acidity?: Acidity;
}

export type Temperature = {
  min: number;
  max: number;
};

export type Humidity = {
  min: number;
  max: number;
};

export type Water = {
  timesPerMonth: number;
  temperature?: Temperature;
};

export type Fertilizer = {
  timesPerMonth: number;
};

export type Acidity = {
  min: number;
  max: number;
};

export interface User {
  id: string;
  plants?: Plant[];
  lastLoggedIn: Date;
}

export interface Session {
  user: User;
  token: string;
}

export interface Errors {
  [key: string]: string;
}
