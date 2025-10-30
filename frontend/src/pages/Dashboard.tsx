import type { Component } from 'solid-js';
import { A } from '@solidjs/router';

const Dashboard: Component = () => {
  return (
    <div class="max-w-7xl mx-auto px-8 py-10">
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-slate-800">Welcome back!</h2>
        <p class="text-lg text-slate-600 mt-2">Your personalized activity dashboard for an active retirement</p>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-8 mb-6">
        <h3 class="text-xl font-semibold mb-4">Quick Stats</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center p-6 bg-primary-light rounded-lg">
            <div class="text-4xl font-bold text-primary">0</div>
            <div class="text-slate-600 mt-2">Activities Completed</div>
          </div>
          <div class="text-center p-6 bg-accent-light rounded-lg">
            <div class="text-4xl font-bold text-accent">0</div>
            <div class="text-slate-600 mt-2">Upcoming This Week</div>
          </div>
          <div class="text-center p-6 bg-yellow-100 rounded-lg">
            <div class="text-4xl font-bold text-yellow-600">0</div>
            <div class="text-slate-600 mt-2">Recommendations</div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-8">
        <h3 class="text-xl font-semibold mb-4">Get Started</h3>
        <p class="text-slate-600 mb-6">Start exploring personalized activities tailored to your interests and lifestyle</p>
        <div class="flex gap-4 flex-wrap">
          <A href="/profile" class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition font-semibold">
            Complete Your Profile
          </A>
          <A href="/recommendations" class="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition font-semibold">
            View Recommendations
          </A>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
