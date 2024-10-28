export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Photo {
  id: string;
  url: string;
  title: string;
  userId: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}