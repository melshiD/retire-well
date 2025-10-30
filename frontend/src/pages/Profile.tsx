import { createSignal, For } from 'solid-js';
import type { Component } from 'solid-js';
import { profile as profileApi } from '../lib/api';

const Profile: Component = () => {
  const [saving, setSaving] = createSignal(false);
  const [message, setMessage] = createSignal('');

  const interests = [
    { value: 'fitness', label: 'Fitness & Wellness' },
    { value: 'arts-culture', label: 'Arts & Culture' },
    { value: 'social', label: 'Social Activities' },
    { value: 'volunteering', label: 'Volunteering' },
    { value: 'learning', label: 'Learning & Education' },
    { value: 'hobbies', label: 'Hobbies & Crafts' },
  ];

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const selectedInterests = interests
      .filter(i => formData.get(i.value))
      .map(i => i.value)
      .join(',');

    try {
      await profileApi.update({
        name: formData.get('name'),
        age: formData.get('age') ? parseInt(formData.get('age') as string) : null,
        location: formData.get('location'),
        profile: {
          health_mobility: formData.get('health_mobility'),
          health_constraints: formData.get('health_constraints'),
          interests: selectedInterests,
          social_preference: formData.get('social_preference'),
          existing_routines: formData.get('existing_routines'),
        },
      });

      setMessage('✓ Profile saved successfully!');
    } catch (error) {
      setMessage('✗ Error saving profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div class="max-w-4xl mx-auto px-8 py-10">
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-slate-800">Your Profile</h2>
        <p class="text-lg text-slate-600 mt-2">Customize your preferences for better recommendations</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div class="bg-white rounded-xl shadow-sm p-8 mb-6">
          <h3 class="text-xl font-semibold mb-6">Personal Information</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                required
                class="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Age</label>
              <input
                type="number"
                name="age"
                min="50"
                max="120"
                placeholder="65"
                class="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                placeholder="Indianapolis, IN"
                class="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-8 mb-6">
          <h3 class="text-xl font-semibold mb-6">Activity Preferences</h3>
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-3">What activities interest you? (select all that apply)</label>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <For each={interests}>
                  {(interest) => (
                    <label class="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name={interest.value}
                        class="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                      />
                      <span class="ml-2 text-slate-700">{interest.label}</span>
                    </label>
                  )}
                </For>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Physical Mobility Level</label>
              <select
                name="health_mobility"
                class="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="high">High - I'm very active and mobile</option>
                <option value="medium" selected>Medium - I can handle moderate activity</option>
                <option value="low">Low - I prefer low-impact activities</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Preferred Social Setting</label>
              <select
                name="social_preference"
                class="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="solo">Solo activities</option>
                <option value="small-groups" selected>Small groups (2-10 people)</option>
                <option value="large-groups">Large groups (10+ people)</option>
                <option value="one-on-one">One-on-one interactions</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Health Considerations (Optional)</label>
              <textarea
                name="health_constraints"
                rows="3"
                placeholder="Any health conditions or limitations we should consider when recommending activities..."
                class="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Current Routines (Optional)</label>
              <textarea
                name="existing_routines"
                rows="3"
                placeholder="Tell us about your current activities and routines..."
                class="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving()}
          class="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition font-semibold disabled:opacity-50"
        >
          {saving() ? 'Saving...' : 'Save Profile'}
        </button>

        {message() && (
          <div class={`mt-4 p-4 rounded-lg ${message().startsWith('✓') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
            {message()}
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
