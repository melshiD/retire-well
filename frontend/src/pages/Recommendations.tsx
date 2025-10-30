import type { Component } from 'solid-js';
import { A } from '@solidjs/router';

const Recommendations: Component = () => {
  return (
    <div class="max-w-7xl mx-auto px-8 py-10">
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-slate-800">Your Personalized Recommendations</h2>
        <p class="text-lg text-slate-600 mt-2">Activities curated based on your interests and preferences</p>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-16 text-center">
        <h3 class="text-2xl font-semibold text-slate-800 mb-4">No Recommendations Yet</h3>
        <p class="text-slate-600 mb-8">Complete your profile to get personalized activity recommendations</p>
        <A href="/profile" class="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition font-semibold">
          Set Up Your Profile
        </A>
      </div>
    </div>
  );
};

export default Recommendations;
