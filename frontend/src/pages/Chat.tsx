import type { Component } from 'solid-js';

const Chat: Component = () => {
  return (
    <div class="max-w-5xl mx-auto px-8 py-10">
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-slate-800">AI Assistant</h2>
        <p class="text-lg text-slate-600 mt-2">Get personalized advice and answers about activities</p>
      </div>

      <div class="bg-white rounded-xl shadow-sm flex flex-col" style={{ height: '600px' }}>
        <div class="flex-1 p-6 overflow-y-auto">
          <div class="bg-primary-light p-4 rounded-lg max-w-2xl">
            <p class="font-semibold text-slate-800">RetireWell Assistant</p>
            <p class="text-slate-700 mt-2">
              Hello! I'm here to help you discover and plan activities. Ask me anything about staying active in retirement!
            </p>
          </div>
        </div>

        <div class="border-t p-6">
          <div class="flex gap-3">
            <input
              type="text"
              placeholder="Ask me anything..."
              disabled
              class="flex-1 px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-primary disabled:bg-slate-100 disabled:cursor-not-allowed"
            />
            <button
              disabled
              class="px-6 py-3 bg-primary text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
          <p class="text-center text-slate-400 text-sm mt-4">AI Assistant coming soon - Powered by Cerebras</p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
