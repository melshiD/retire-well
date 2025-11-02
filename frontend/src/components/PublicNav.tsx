import { A } from '@solidjs/router';
import type { Component } from 'solid-js';

const PublicNav: Component = () => {
  return (
    <nav class="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-slate-200/80 z-50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex justify-between items-center h-16">
          {/* Logo */}
          <A href="/" class="flex items-center gap-2.5">
            <div class="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white text-base font-bold">
              RW
            </div>
            <span class="text-lg font-bold text-slate-900">RetireWell</span>
          </A>

          {/* Navigation Links */}
          <div class="hidden md:flex items-center gap-8">
            <a href="#features" class="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium">
              Features
            </a>
            <a href="#how-it-works" class="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium">
              How It Works
            </a>
            <a href="#testimonials" class="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium">
              Testimonials
            </a>
          </div>

          {/* Login Buttons */}
          <div class="flex items-center gap-3">
            <A
              href="/login"
              class="text-sm px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors font-semibold"
            >
              Sign In
            </A>
            <A
              href="/login"
              class="text-sm px-5 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-semibold"
            >
              Get Started
            </A>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PublicNav;
