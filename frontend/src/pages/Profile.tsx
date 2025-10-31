import { createSignal, For, onMount } from 'solid-js';
import type { Component } from 'solid-js';
import { profile as profileApi } from '../lib/api';

const Profile: Component = () => {
  const [saving, setSaving] = createSignal(false);
  const [loading, setLoading] = createSignal(true);
  const [message, setMessage] = createSignal('');

  // Profile data signals
  const [name, setName] = createSignal('');
  const [age, setAge] = createSignal<number | undefined>();
  const [location, setLocation] = createSignal('');
  const [healthMobility, setHealthMobility] = createSignal('medium');
  const [healthConstraints, setHealthConstraints] = createSignal('');
  const [selectedInterests, setSelectedInterests] = createSignal<string[]>([]);
  const [socialPreference, setSocialPreference] = createSignal('small-groups');
  const [existingRoutines, setExistingRoutines] = createSignal('');

  // Load profile data on mount
  onMount(async () => {
    try {
      const data = await profileApi.get() as any;
      if (data.success) {
        // Set user data
        setName(data.user?.name || '');
        setAge(data.user?.age);
        setLocation(data.user?.location || '');

        // Set profile data if it exists
        if (data.profile) {
          setHealthMobility(data.profile.health_mobility || 'medium');
          setHealthConstraints(data.profile.health_constraints || '');
          setSocialPreference(data.profile.social_preference || 'small-groups');
          setExistingRoutines(data.profile.existing_routines || '');

          // Parse comma-separated interests
          if (data.profile.interests) {
            setSelectedInterests(data.profile.interests.split(',').filter(Boolean));
          }
        }
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  });

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

    try {
      await profileApi.update({
        name: name(),
        age: age() || null,
        location: location(),
        profile: {
          health_mobility: healthMobility(),
          health_constraints: healthConstraints(),
          interests: selectedInterests().join(','),
          social_preference: socialPreference(),
          existing_routines: existingRoutines(),
        },
      });

      setMessage('✓ Profile saved successfully!');
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error('Error saving profile:', error);
      setMessage('✗ Error saving profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const toggleInterest = (interestValue: string) => {
    const current = selectedInterests();
    if (current.includes(interestValue)) {
      setSelectedInterests(current.filter(i => i !== interestValue));
    } else {
      setSelectedInterests([...current, interestValue]);
    }
  };

  if (loading()) {
    return (
      <div class="max-w-4xl mx-auto px-8 py-10">
        <div class="flex items-center justify-center h-64">
          <div class="text-lg text-slate-600">Loading profile...</div>
        </div>
      </div>
    );
  }

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
                value={name()}
                onInput={(e) => setName(e.currentTarget.value)}
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
                value={age() || ''}
                onInput={(e) => setAge(e.currentTarget.value ? parseInt(e.currentTarget.value) : undefined)}
                class="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                placeholder="Indianapolis, IN"
                value={location()}
                onInput={(e) => setLocation(e.currentTarget.value)}
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
                        checked={selectedInterests().includes(interest.value)}
                        onChange={() => toggleInterest(interest.value)}
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
                value={healthMobility()}
                onChange={(e) => setHealthMobility(e.currentTarget.value)}
                class="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="high">High - I'm very active and mobile</option>
                <option value="medium">Medium - I can handle moderate activity</option>
                <option value="low">Low - I prefer low-impact activities</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Preferred Social Setting</label>
              <select
                name="social_preference"
                value={socialPreference()}
                onChange={(e) => setSocialPreference(e.currentTarget.value)}
                class="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="solo">Solo activities</option>
                <option value="small-groups">Small groups (2-10 people)</option>
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
                value={healthConstraints()}
                onInput={(e) => setHealthConstraints(e.currentTarget.value)}
                class="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Current Routines (Optional)</label>
              <textarea
                name="existing_routines"
                rows="3"
                placeholder="Tell us about your current activities and routines..."
                value={existingRoutines()}
                onInput={(e) => setExistingRoutines(e.currentTarget.value)}
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
