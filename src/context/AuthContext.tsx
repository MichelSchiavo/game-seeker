"use client";
import { createContext, useState, useEffect, useContext } from "react";
import {
  AuthError,
  User,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/services/firebase-config";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface IAuthContext {
  user: User | null | undefined;
  loadingUser: boolean;
  handleRegister: (email: string, password: string) => void;
  loginLoading: boolean;
  loginError?: AuthError;
  handleLogOff: () => void;
  handleSignIn: (email: string, password: string) => void;
  signInLoading: boolean;
  signInError?: AuthError;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}: AuthProviderProps) => {
  const [user, loading, error] = useAuthState(auth);
  const register = useCreateUserWithEmailAndPassword(auth);
  const signIn = useSignInWithEmailAndPassword(auth);

  function handleRegister(email: string, password: string) {
    register[0](email, password);
  }

  function handleSignIn(email: string, password: string) {
    signIn[0](email, password);
  }

  async function handleLogOff() {
    await signOut(auth);
    location.reload();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingUser: loading,
        handleRegister,
        loginLoading: register[2],
        loginError: register[3],
        handleLogOff,
        handleSignIn,
        signInLoading: signIn[2],
        signInError: signIn[3],
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
