// API client for RetireWell backend
const API_BASE = import.meta.env.VITE_API_URL || 'https://svc-01k8r81ngamv5ny0gerqayh5dh.01k8eade5c6qxmxhttgr2hn2nz.lmapp.run';

export async function api<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    credentials: 'include', // Send cookies for session
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
}

export const auth = {
  sendMagicLink: (email: string) =>
    api('/auth/send-magic-link', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  logout: () =>
    api('/auth/logout', {
      method: 'POST',
    }),
};

export const profile = {
  get: () => api('/api/profile'),
  update: (data: any) =>
    api('/api/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};
