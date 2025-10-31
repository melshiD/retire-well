import { A, useNavigate } from '@solidjs/router';
import type { Component, JSX } from 'solid-js';
import { auth } from '../lib/api';

const Layout: Component<{ children?: JSX.Element }> = (props) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div class="min-h-screen flex flex-col">
      <nav class="bg-gradient-to-r from-primary to-primary-hover text-white shadow-lg">
        <div class="max-w-7xl mx-auto px-8">
          <div class="flex justify-between items-center h-16">
            <h1 class="text-2xl font-bold">RetireWell</h1>
            <div class="flex items-center gap-6">
              <A href="/dashboard" class="px-4 py-2 rounded-lg hover:bg-white/10 transition" activeClass="bg-white/20">
                🏠 Dashboard
              </A>
              <A href="/recommendations" class="px-4 py-2 rounded-lg hover:bg-white/10 transition" activeClass="bg-white/20">
                ✨ Recommendations
              </A>
              <A href="/my-activities" class="px-4 py-2 rounded-lg hover:bg-white/10 transition" activeClass="bg-white/20">
                📅 My Activities
              </A>
              <A href="/chat" class="px-4 py-2 rounded-lg hover:bg-white/10 transition" activeClass="bg-white/20">
                💬 AI Assistant
              </A>
              <A href="/profile" class="px-4 py-2 rounded-lg hover:bg-white/10 transition" activeClass="bg-white/20">
                ⚙️ Profile
              </A>
              <button
                onClick={handleLogout}
                class="ml-6 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition border border-white/30"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main class="flex-1">
        {props.children}
      </main>
    </div>
  );
};

export default Layout;
