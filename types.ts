export interface Plant extends Meta {
  id?: string;
  name: string;
  genus: string;
  latin: string;
  description?: string;
  cultivation?: Cultivation;
  region?:
    | 'Antarctica'
    | 'Eurasia'
    | 'Indonesia'
    | 'North America'
    | 'South America'
    | 'Oceania';
}

export interface PlantCategory {
  title: string;
  description: string;
  latin: string;
}

export interface Post extends Meta {
  id: string;
  postTitle: string;
  message: string;
  category?: Category;
  comments?: Comment[];
}

export interface Comment extends Meta {
  id: string;
  message: string;
}

export interface Meta {
  createdAt: Date;
  createdBy?: User;
  updatedAt?: Date;
  updatedBy?: string;
  removedAt?: Date;
  removedBy?: string;
}

export type NewPost = Omit<Post, 'id' | 'updatedAt' | 'updatedBy'>;

export interface Category {
  id: string;
  title: string;
  description: string;
  posts?: Post[];
}

export type NewCategory = Omit<Category, 'id' | 'posts'>;

export interface UserPlant extends Plant {
  id: string;
  lastWatered?: Date;
  lastFertilized?: Date;
  lastSoilChanged?: Date;
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
  id?: string;
  name: string;
  email?: string;
  plants?: UserPlant[];
  lastLoggedIn: Date;
  role: string;
  isEmailVerified: boolean;
}

export type NewUser = Omit<User, 'lastLoggedIn'>;

export interface Session {
  id: string;
  user: User;
  token: string;
  ttl: Date;
}

export interface Errors {
  [key: string]: string;
}
