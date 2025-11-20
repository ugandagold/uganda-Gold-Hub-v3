// Supabase integration removed.
// This file is kept as a placeholder to avoid import errors if referenced,
// though all references should be removed.

export const isSupabaseConfigured = (): boolean => {
  return false;
};

export const supabase = {
  from: () => ({
    select: async () => ({ data: [], error: null }),
    insert: async () => ({ data: [], error: null }),
    delete: async () => ({ data: [], error: null }),
    update: async () => ({ data: [], error: null }),
  })
};