import { A } from '@solidjs/router';
import type { Component } from 'solid-js';
import PublicNav from '../components/PublicNav';

const Home: Component = () => {
  return (
    <div class="min-h-screen bg-gradient-to-b from-amber-50 via-white to-slate-50">
      <PublicNav />

      {/* Hero Section */}
      <section class="pt-32 pb-20 px-6">
        <div class="max-w-6xl mx-auto text-center">
          <h1 class="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Your answer to
            <br />
            <span class="bg-gradient-to-r from-primary to-cyan-600 bg-clip-text text-transparent">
              social isolation
            </span>
          </h1>
          <p class="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto">
            AI-powered weekly activity planner for retirees in Indianapolis.
            Discover personalized recommendations that keep you active, engaged, and connected.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <A
              href="/login"
              class="px-8 py-4 bg-gradient-to-r from-primary to-primary-hover text-white rounded-xl hover:shadow-2xl transition-all font-bold text-lg"
            >
              Get Started Free
            </A>
            <a
              href="#how-it-works"
              class="px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 rounded-xl hover:border-primary hover:text-primary transition-all font-bold text-lg"
            >
              See How It Works
            </a>
          </div>

          {/* Hero Visual */}
          <div class="mt-16 relative">
            <div class="bg-gradient-to-br from-primary/10 to-cyan-600/10 rounded-3xl p-8 border-2 border-primary/20">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div class="bg-white rounded-2xl p-6 shadow-lg">
                  <div class="text-4xl mb-3">🏃‍♀️</div>
                  <h3 class="font-bold text-slate-800 mb-2">Fitness & Wellness</h3>
                  <p class="text-slate-600 text-sm">Silver Sneakers, Walking Groups, Tai Chi</p>
                </div>
                <div class="bg-white rounded-2xl p-6 shadow-lg">
                  <div class="text-4xl mb-3">🎨</div>
                  <h3 class="font-bold text-slate-800 mb-2">Arts & Culture</h3>
                  <p class="text-slate-600 text-sm">Museums, Symphony, Pottery Classes</p>
                </div>
                <div class="bg-white rounded-2xl p-6 shadow-lg">
                  <div class="text-4xl mb-3">🤝</div>
                  <h3 class="font-bold text-slate-800 mb-2">Volunteering</h3>
                  <p class="text-slate-600 text-sm">Meals on Wheels, Reading Buddies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" class="py-20 px-6 bg-white">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Everything you need to stay active
            </h2>
            <p class="text-xl text-slate-600 max-w-2xl mx-auto">
              RetireWell uses AI to understand your preferences and recommend activities that truly match your lifestyle.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="p-8 rounded-2xl border-2 border-slate-100 hover:border-primary/30 hover:shadow-lg transition-all">
              <div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <span class="text-3xl">🎯</span>
              </div>
              <h3 class="text-xl font-bold text-slate-800 mb-3">Personalized Recommendations</h3>
              <p class="text-slate-600">
                AI-powered matching based on your interests, mobility level, and preferences.
              </p>
            </div>

            <div class="p-8 rounded-2xl border-2 border-slate-100 hover:border-primary/30 hover:shadow-lg transition-all">
              <div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <span class="text-3xl">🧠</span>
              </div>
              <h3 class="text-xl font-bold text-slate-800 mb-3">Smart Memory System</h3>
              <p class="text-slate-600">
                Learns from your feedback to provide better recommendations over time.
              </p>
            </div>

            <div class="p-8 rounded-2xl border-2 border-slate-100 hover:border-primary/30 hover:shadow-lg transition-all">
              <div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <span class="text-3xl">💬</span>
              </div>
              <h3 class="text-xl font-bold text-slate-800 mb-3">Conversational AI</h3>
              <p class="text-slate-600">
                Chat naturally about your preferences and get instant activity suggestions.
              </p>
            </div>

            <div class="p-8 rounded-2xl border-2 border-slate-100 hover:border-primary/30 hover:shadow-lg transition-all">
              <div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <span class="text-3xl">📍</span>
              </div>
              <h3 class="text-xl font-bold text-slate-800 mb-3">Local Indianapolis Focus</h3>
              <p class="text-slate-600">
                Curated activities from across Indianapolis, tailored to your neighborhood.
              </p>
            </div>

            <div class="p-8 rounded-2xl border-2 border-slate-100 hover:border-primary/30 hover:shadow-lg transition-all">
              <div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <span class="text-3xl">📅</span>
              </div>
              <h3 class="text-xl font-bold text-slate-800 mb-3">Weekly Planning</h3>
              <p class="text-slate-600">
                Get a personalized weekly schedule that fits your calendar and energy levels.
              </p>
            </div>

            <div class="p-8 rounded-2xl border-2 border-slate-100 hover:border-primary/30 hover:shadow-lg transition-all">
              <div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <span class="text-3xl">💪</span>
              </div>
              <h3 class="text-xl font-bold text-slate-800 mb-3">Health-Aware Matching</h3>
              <p class="text-slate-600">
                Activities matched to your physical capabilities and health considerations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" class="py-20 px-6 bg-gradient-to-br from-primary/5 to-cyan-600/5">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              How it works
            </h2>
            <p class="text-xl text-slate-600">
              Four simple steps to a more active, connected life
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-white p-8 rounded-2xl shadow-lg">
              <div class="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-xl mb-4">
                1
              </div>
              <h3 class="text-2xl font-bold text-slate-800 mb-3">Create Your Profile</h3>
              <p class="text-slate-600">
                Tell us about your interests, mobility level, and preferences. The more we know, the better your recommendations.
              </p>
            </div>

            <div class="bg-white p-8 rounded-2xl shadow-lg">
              <div class="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-xl mb-4">
                2
              </div>
              <h3 class="text-2xl font-bold text-slate-800 mb-3">Get Personalized Suggestions</h3>
              <p class="text-slate-600">
                Our AI analyzes hundreds of Indianapolis activities to find perfect matches for you.
              </p>
            </div>

            <div class="bg-white p-8 rounded-2xl shadow-lg">
              <div class="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-xl mb-4">
                3
              </div>
              <h3 class="text-2xl font-bold text-slate-800 mb-3">Plan Your Week</h3>
              <p class="text-slate-600">
                Build a weekly schedule with activities that fit your calendar and energy levels.
              </p>
            </div>

            <div class="bg-white p-8 rounded-2xl shadow-lg">
              <div class="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-xl mb-4">
                4
              </div>
              <h3 class="text-2xl font-bold text-slate-800 mb-3">Stay Connected</h3>
              <p class="text-slate-600">
                Join activities, meet new people, and live your best retirement life in Indianapolis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" class="py-20 px-6 bg-white">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Loved by Indianapolis retirees
            </h2>
            <p class="text-xl text-slate-600">
              Join hundreds of active seniors staying engaged and connected
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl border-2 border-amber-100">
              <div class="flex items-center gap-1 mb-4">
                <span class="text-yellow-400">★★★★★</span>
              </div>
              <p class="text-slate-700 mb-6 italic">
                "RetireWell helped me discover the Silver Sneakers class at the YMCA. I've made so many new friends and feel healthier than ever!"
              </p>
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-gradient-to-br from-primary to-primary-hover rounded-full flex items-center justify-center text-white font-bold">
                  MJ
                </div>
                <div>
                  <div class="font-bold text-slate-800">Margaret J.</div>
                  <div class="text-sm text-slate-600">Broad Ripple</div>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl border-2 border-amber-100">
              <div class="flex items-center gap-1 mb-4">
                <span class="text-yellow-400">★★★★★</span>
              </div>
              <p class="text-slate-700 mb-6 italic">
                "I was spending too much time alone after retiring. RetireWell's recommendations got me involved in volunteering and community events."
              </p>
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-gradient-to-br from-primary to-primary-hover rounded-full flex items-center justify-center text-white font-bold">
                  RT
                </div>
                <div>
                  <div class="font-bold text-slate-800">Robert T.</div>
                  <div class="text-sm text-slate-600">Fountain Square</div>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl border-2 border-amber-100">
              <div class="flex items-center gap-1 mb-4">
                <span class="text-yellow-400">★★★★★</span>
              </div>
              <p class="text-slate-700 mb-6 italic">
                "The AI really understands my limitations. Every activity it suggests is perfect for my mobility level and interests."
              </p>
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-gradient-to-br from-primary to-primary-hover rounded-full flex items-center justify-center text-white font-bold">
                  SK
                </div>
                <div>
                  <div class="font-bold text-slate-800">Susan K.</div>
                  <div class="text-sm text-slate-600">Carmel</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="py-20 px-6 bg-gradient-to-r from-primary to-primary-hover">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to start your journey?
          </h2>
          <p class="text-xl text-white/90 mb-8">
            Join RetireWell today and discover a more active, connected retirement in Indianapolis.
          </p>
          <A
            href="/login"
            class="inline-block px-8 py-4 bg-white text-primary rounded-xl hover:shadow-2xl transition-all font-bold text-lg"
          >
            Get Started Free
          </A>
        </div>
      </section>

      {/* Footer */}
      <footer class="py-12 px-6 bg-slate-900 text-white">
        <div class="max-w-6xl mx-auto text-center">
          <div class="flex items-center justify-center gap-2 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center text-white text-xl font-bold">
              RW
            </div>
            <span class="text-xl font-bold">RetireWell</span>
          </div>
          <p class="text-slate-400 mb-4">
            AI-powered activity planning for Indianapolis retirees
          </p>
          <p class="text-sm text-slate-500">
            Built for the <a href="https://liquidmetal.devpost.com/" target="_blank" class="text-primary hover:underline">Devpost AI Championship 2025</a> • Powered by LiquidMetal.AI
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
