import { A } from '@solidjs/router';
import type { Component } from 'solid-js';
import PublicNav from '../components/PublicNav';

const Home: Component = () => {
  return (
    <div class="min-h-screen bg-white">
      <PublicNav />

      {/* Hero Section */}
      <section class="pt-32 pb-24 px-6">
        <div class="max-w-5xl mx-auto text-center">
          <h1 class="text-6xl md:text-7xl lg:text-8xl font-extrabold text-slate-900 mb-8 leading-[1.1] tracking-tight">
            Your answer to frustrating
            <br />
            <span class="text-primary">
              social isolation
            </span>
          </h1>
          <p class="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            AI-powered activity planning for Indianapolis retirees.
            Stay active, engaged, and connected.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <A
              href="/login"
              class="px-7 py-3.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-semibold text-base"
            >
              Get Started Free
            </A>
            <a
              href="#how-it-works"
              class="px-7 py-3.5 text-slate-700 hover:text-slate-900 transition-colors font-semibold text-base underline decoration-2 underline-offset-4"
            >
              See how it works
            </a>
          </div>

          {/* Hero Visual - cleaner, more Statamic-like */}
          <div class="mt-20">
            <div class="bg-slate-50 rounded-2xl p-10 border border-slate-200/60">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="text-left">
                  <div class="text-5xl mb-4">🏃‍♀️</div>
                  <h3 class="font-bold text-slate-900 mb-2 text-lg">Fitness & Wellness</h3>
                  <p class="text-slate-600 text-sm leading-relaxed">Silver Sneakers classes, walking groups, and gentle tai chi sessions</p>
                </div>
                <div class="text-left">
                  <div class="text-5xl mb-4">🎨</div>
                  <h3 class="font-bold text-slate-900 mb-2 text-lg">Arts & Culture</h3>
                  <p class="text-slate-600 text-sm leading-relaxed">Museum tours, symphony concerts, and creative pottery workshops</p>
                </div>
                <div class="text-left">
                  <div class="text-5xl mb-4">🤝</div>
                  <h3 class="font-bold text-slate-900 mb-2 text-lg">Volunteering</h3>
                  <p class="text-slate-600 text-sm leading-relaxed">Meals on Wheels delivery and reading buddy programs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" class="py-32 px-6 bg-slate-50">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-20">
            <h2 class="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Everything you need
            </h2>
            <p class="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              RetireWell understands your preferences and recommends activities that truly match your lifestyle.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white p-8 rounded-xl border border-slate-200/60">
              <div class="text-4xl mb-5">🎯</div>
              <h3 class="text-lg font-bold text-slate-900 mb-3">Personalized Recommendations</h3>
              <p class="text-slate-600 text-sm leading-relaxed">
                AI-powered matching based on your interests, mobility level, and preferences.
              </p>
            </div>

            <div class="bg-white p-8 rounded-xl border border-slate-200/60">
              <div class="text-4xl mb-5">🧠</div>
              <h3 class="text-lg font-bold text-slate-900 mb-3">Smart Memory System</h3>
              <p class="text-slate-600 text-sm leading-relaxed">
                Learns from your feedback to provide better recommendations over time.
              </p>
            </div>

            <div class="bg-white p-8 rounded-xl border border-slate-200/60">
              <div class="text-4xl mb-5">💬</div>
              <h3 class="text-lg font-bold text-slate-900 mb-3">Conversational AI</h3>
              <p class="text-slate-600 text-sm leading-relaxed">
                Chat naturally about your preferences and get instant activity suggestions.
              </p>
            </div>

            <div class="bg-white p-8 rounded-xl border border-slate-200/60">
              <div class="text-4xl mb-5">📍</div>
              <h3 class="text-lg font-bold text-slate-900 mb-3">Local Indianapolis Focus</h3>
              <p class="text-slate-600 text-sm leading-relaxed">
                Curated activities from across Indianapolis, tailored to your neighborhood.
              </p>
            </div>

            <div class="bg-white p-8 rounded-xl border border-slate-200/60">
              <div class="text-4xl mb-5">📅</div>
              <h3 class="text-lg font-bold text-slate-900 mb-3">Weekly Planning</h3>
              <p class="text-slate-600 text-sm leading-relaxed">
                Get a personalized weekly schedule that fits your calendar and energy levels.
              </p>
            </div>

            <div class="bg-white p-8 rounded-xl border border-slate-200/60">
              <div class="text-4xl mb-5">💪</div>
              <h3 class="text-lg font-bold text-slate-900 mb-3">Health-Aware Matching</h3>
              <p class="text-slate-600 text-sm leading-relaxed">
                Activities matched to your physical capabilities and health considerations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" class="py-32 px-6 bg-white">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-20">
            <h2 class="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
              How it works
            </h2>
            <p class="text-xl text-slate-600 leading-relaxed">
              Four simple steps to a more active, connected life
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-slate-50 p-10 rounded-xl border border-slate-200/60">
              <div class="w-10 h-10 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold text-lg mb-5">
                1
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-3">Create Your Profile</h3>
              <p class="text-slate-600 text-sm leading-relaxed">
                Tell us about your interests, mobility level, and preferences. The more we know, the better your recommendations.
              </p>
            </div>

            <div class="bg-slate-50 p-10 rounded-xl border border-slate-200/60">
              <div class="w-10 h-10 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold text-lg mb-5">
                2
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-3">Get Personalized Suggestions</h3>
              <p class="text-slate-600 text-sm leading-relaxed">
                Our AI analyzes hundreds of Indianapolis activities to find perfect matches for you.
              </p>
            </div>

            <div class="bg-slate-50 p-10 rounded-xl border border-slate-200/60">
              <div class="w-10 h-10 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold text-lg mb-5">
                3
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-3">Plan Your Week</h3>
              <p class="text-slate-600 text-sm leading-relaxed">
                Build a weekly schedule with activities that fit your calendar and energy levels.
              </p>
            </div>

            <div class="bg-slate-50 p-10 rounded-xl border border-slate-200/60">
              <div class="w-10 h-10 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold text-lg mb-5">
                4
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-3">Stay Connected</h3>
              <p class="text-slate-600 text-sm leading-relaxed">
                Join activities, meet new people, and live your best retirement life in Indianapolis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" class="py-32 px-6 bg-slate-50">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-20">
            <h2 class="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Loved by Indianapolis retirees
            </h2>
            <p class="text-xl text-slate-600 leading-relaxed">
              Join hundreds of active seniors staying engaged and connected
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white p-8 rounded-xl border border-slate-200/60">
              <div class="flex items-center gap-0.5 mb-5 text-amber-400">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p class="text-slate-700 mb-6 leading-relaxed text-sm">
                "RetireWell helped me discover the Silver Sneakers class at the YMCA. I've made so many new friends and feel healthier than ever!"
              </p>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  MJ
                </div>
                <div>
                  <div class="font-semibold text-slate-900 text-sm">Margaret J.</div>
                  <div class="text-xs text-slate-500">Broad Ripple</div>
                </div>
              </div>
            </div>

            <div class="bg-white p-8 rounded-xl border border-slate-200/60">
              <div class="flex items-center gap-0.5 mb-5 text-amber-400">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p class="text-slate-700 mb-6 leading-relaxed text-sm">
                "I was spending too much time alone after retiring. RetireWell's recommendations got me involved in volunteering and community events."
              </p>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  RT
                </div>
                <div>
                  <div class="font-semibold text-slate-900 text-sm">Robert T.</div>
                  <div class="text-xs text-slate-500">Fountain Square</div>
                </div>
              </div>
            </div>

            <div class="bg-white p-8 rounded-xl border border-slate-200/60">
              <div class="flex items-center gap-0.5 mb-5 text-amber-400">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p class="text-slate-700 mb-6 leading-relaxed text-sm">
                "The AI really understands my limitations. Every activity it suggests is perfect for my mobility level and interests."
              </p>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  SK
                </div>
                <div>
                  <div class="font-semibold text-slate-900 text-sm">Susan K.</div>
                  <div class="text-xs text-slate-500">Carmel</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="py-32 px-6 bg-slate-900">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Ready to start your journey?
          </h2>
          <p class="text-xl text-slate-300 mb-10 leading-relaxed">
            Join RetireWell today and discover a more active, connected retirement in Indianapolis.
          </p>
          <A
            href="/login"
            class="inline-block px-7 py-3.5 bg-white text-slate-900 rounded-lg hover:bg-slate-100 transition-colors font-semibold text-base"
          >
            Get Started Free
          </A>
        </div>
      </section>

      {/* Footer */}
      <footer class="py-16 px-6 bg-slate-900 border-t border-slate-800">
        <div class="max-w-6xl mx-auto">
          <div class="flex flex-col items-center text-center">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white text-base font-bold">
                RW
              </div>
              <span class="text-lg font-bold text-white">RetireWell</span>
            </div>
            <p class="text-slate-400 text-sm mb-3">
              AI-powered activity planning for Indianapolis retirees
            </p>
            <p class="text-xs text-slate-500">
              Built for the <a href="https://liquidmetal.devpost.com/" target="_blank" class="text-primary hover:text-primary/80 transition-colors">Devpost AI Championship 2025</a> • Powered by LiquidMetal.AI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
