import { createSignal } from 'solid-js';
import type { Component } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { auth } from '../lib/api';
import PublicNav from '../components/PublicNav';

const Login: Component = () => {
  const navigate = useNavigate();
  const [email, setEmail] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [message, setMessage] = createSignal('');

  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await auth.sendMagicLink(email());
      setMessage('✓ Magic link sent! Check your email and click the link to sign in.');
    } catch (error) {
      setMessage('✗ Failed to send magic link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="min-h-screen bg-white">
      <PublicNav />
      <div class="min-h-screen bg-gradient-to-br from-primary via-primary-hover to-cyan-600 flex items-center justify-center p-6 pt-24">
      <div class="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full">
        <h1 class="text-4xl font-bold text-primary mb-3 text-center">RetireWell</h1>
        <p class="text-slate-600 text-center mb-10">Personalized activity recommendations for an active retirement</p>

        <form onSubmit={handleSubmit} class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
            <input
              type="email"
              value={email()}
              onInput={(e) => setEmail(e.currentTarget.value)}
              required
              placeholder="you@example.com"
              class="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading()}
            class="w-full px-6 py-3 bg-gradient-to-r from-primary to-primary-hover text-white rounded-lg hover:shadow-lg transition font-semibold disabled:opacity-50"
          >
            {loading() ? 'Sending...' : 'Send Magic Link'}
          </button>
        </form>

        {message() && (
          <div class={`mt-6 p-4 rounded-lg text-center ${message().startsWith('✓') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
            {message()}
          </div>
        )}

        {isLocalhost && (
          <div class="mt-6">
            <button
              onClick={() => navigate('/dashboard')}
              class="w-full px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition font-semibold text-sm"
            >
              🛠️ Dev Mode: Skip to Dashboard
            </button>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Login;
