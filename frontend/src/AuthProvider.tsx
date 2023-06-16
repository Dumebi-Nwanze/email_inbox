import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { decodeToken } from 'react-jwt';

export type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
};

type AuthAction = {
  type: "LOGIN" | "LOGOUT";
  payload: AuthState | null;
};

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  state: AuthState | null;
  dispatch: React.Dispatch<AuthAction>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const authReducer = (state: AuthState | null, action: AuthAction): AuthState | null => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return {
        user: null, token: null, isAuthenticated: false,
      };
    default:
      return state;
  }
};

const authState = localStorage.getItem("authState");
const data = authState ? JSON.parse(authState) : null;

const decodedToken: {
  uid: number;
  name: string;
  email: string;
} | null = data ? decodeToken(data.accessToken) : null;

const initialState: AuthState = {
  user: {
    name: decodedToken?.name ?? "",
    email: decodedToken?.email ?? "",
  },
  token: data?.accessToken ?? null,
  isAuthenticated: !!data?.accessToken,
};



function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, dispatch] = useReducer(authReducer, initialState);



  return (
    <AuthContext.Provider value={{ state: authState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
