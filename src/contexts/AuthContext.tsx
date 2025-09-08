import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  userRole: 'client' | 'lawyer' | null;
  loading: boolean;
  signUp: (email: string, password: string, role: 'client' | 'lawyer') => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<'client' | 'lawyer' | null>(null);
  const [loading, setLoading] = useState(true);


  // Determine role from DB (lawyer if a profile exists). Fallback to intendedRole from localStorage.
  const determineRole = async (uid: string) => {
    try {
      const { data } = await supabase
        .from('lawyer_profiles')
        .select('id')
        .eq('user_id', uid)
        .maybeSingle();
      if (data) {
        setUserRole('lawyer');
      } else {
        const intended = (typeof window !== 'undefined'
          ? (localStorage.getItem('intendedRole') as 'client' | 'lawyer' | null)
          : null);
        setUserRole(intended || 'client');
      }
    } catch {
      setUserRole('client');
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        determineRole(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_e, session) => { void _e;
        setUser(session?.user ?? null);
        if (session?.user) {
          determineRole(session.user.id);
        } else {
          setUserRole(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, role: 'client' | 'lawyer') => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: undefined,
      }
    });
    if (error) throw error;

    // Remember intended role for routing decisions until a profile exists
    try { localStorage.setItem('intendedRole', role); } catch {}

    // If no active session, try to sign in immediately (for projects without email confirmation)
    if (!data.session) {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        // Likely email confirmation required; user stays logged out until confirmation
        return;
      }
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const value = {
    user,
    userRole,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}