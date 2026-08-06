"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getUsers } from "@/lib/api/residents";
import {
  AuthenticatedResident,
  clearStoredResident,
  getStoredResident,
  mapUserToAuthenticatedResident,
  storeResident,
} from "@/lib/auth/session";

type AuthContextValue = {
  resident: AuthenticatedResident | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (username: string, email: string) => Promise<AuthenticatedResident>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [resident, setResident] = useState<AuthenticatedResident | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Staged client-side access only: JSONPlaceholder has no production authentication primitives.
    window.setTimeout(() => {
      setResident(getStoredResident());
      setIsLoading(false);
    }, 0);
  }, []);

  const signIn = useCallback(async (username: string, email: string) => {
    const users = await getUsers();
    const matchedUser = users.find(
      (user) => normalize(user.username) === normalize(username) && normalize(user.email) === normalize(email),
    );

    if (!matchedUser) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const authenticatedResident = mapUserToAuthenticatedResident(matchedUser);
    storeResident(authenticatedResident);
    setResident(authenticatedResident);
    return authenticatedResident;
  }, []);

  const signOut = useCallback(() => {
    clearStoredResident();
    setResident(null);
    router.replace("/sign-in");
  }, [router]);

  const value = useMemo(
    () => ({
      resident,
      isAuthenticated: Boolean(resident),
      isLoading,
      signIn,
      signOut,
    }),
    [isLoading, resident, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
