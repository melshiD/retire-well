import { A } from '@solidjs/router';
import type { Component } from 'solid-js';

const PublicNav: Component = () => {
  return (
    <nav class="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          {/* Logo */}
          <A href="/" class="flex items-center gap-2">
            <div class="w-10 h-10 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center text-white text-xl font-bold">
              RW
            </div>
            <span class="text-xl font-bold text-slate-800">RetireWell</span>
          </A>

          {/* Navigation Links */}
          <div class="hidden md:flex items-center gap-8">
            <a href="#features" class="text-slate-600 hover:text-primary transition font-medium">
              Features
            </a>
            <a href="#how-it-works" class="text-slate-600 hover:text-primary transition font-medium">
              How It Works
            </a>
            <a href="#testimonials" class="text-slate-600 hover:text-primary transition font-medium">
              Testimonials
            </a>
          </div>

          {/* Login Button */}
          <div class="flex items-center gap-4">
            <A
              href="/login"
              class="px-6 py-2 text-slate-600 hover:text-primary transition font-semibold"
            >
              Sign In
            </A>
            <A
              href="/login"
              class="px-6 py-2 bg-gradient-to-r from-primary to-primary-hover text-white rounded-lg hover:shadow-lg transition font-semibold"
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
