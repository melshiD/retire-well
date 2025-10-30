import type { Component } from 'solid-js';
import { A } from '@solidjs/router';

const MyActivities: Component = () => {
  return (
    <div class="max-w-7xl mx-auto px-8 py-10">
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-slate-800">My Activities</h2>
        <p class="text-lg text-slate-600 mt-2">Track your scheduled activities and commitments</p>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-8 mb-6">
        <h3 class="text-xl font-semibold mb-4">This Week</h3>
        <div class="text-center py-12 text-slate-500">
          <p class="mb-4">No activities scheduled yet</p>
          <A href="/recommendations" class="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition font-semibold">
            Browse Activities
          </A>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-8">
        <h3 class="text-xl font-semibold mb-4">Past Activities</h3>
        <div class="text-center py-12 text-slate-500">
          <p>Your completed activities will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default MyActivities;
