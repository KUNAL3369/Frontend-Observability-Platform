import { create } from "zustand";
import { supabase } from "../../lib/supabase";

export const useAuthStore = create((set) => ({
  user: null,
  role: "admin",
  loading: true,

  // manual role switch
  setRole: (role) => set({ role }),

  fetchUser: async () => {
    const { data } = await supabase.auth.getUser();

    set({
      user: data.user || null,
      loading: false,
    });
  },

  signIn: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    const { data } = await supabase.auth.getUser();

    set({
      user: data.user,
    });
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },

  initAuthListener: () => {
    supabase.auth.onAuthStateChange((_, session) => {
      set({
        user: session?.user || null,
        loading: false,
      });
    });
  },
}));