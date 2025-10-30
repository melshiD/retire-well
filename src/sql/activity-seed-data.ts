/**
 * Seed data for Indianapolis activities
 * Curated for retirees in the Indianapolis area
 */

export interface Activity {
  id: string;
  name: string;
  description: string;
  category: 'fitness' | 'arts-culture' | 'volunteering' | 'learning' | 'social' | 'hobbies';
  location: string;
  venue: string;
  schedule_type: 'evergreen' | 'dated';
  schedule_details: string;
  difficulty_level: number; // 1-5
  social_size: 'solo' | 'small' | 'medium' | 'large';
  cost: 'free' | 'low' | 'medium' | 'high';
  health_requirements: string;
  data_source: string;
}

export const activities: Activity[] = [
  // FITNESS ACTIVITIES
  {
    id: 'fit-001',
    name: 'Silver Sneakers Fitness Class',
    description: 'Low-impact group fitness class designed for active older adults. Includes strength training, cardio, and flexibility exercises.',
    category: 'fitness',
    location: 'Downtown Indianapolis',
    venue: 'YMCA - Athenaeum',
    schedule_type: 'evergreen',
    schedule_details: 'Monday, Wednesday, Friday at 9:00 AM',
    difficulty_level: 2,
    social_size: 'medium',
    cost: 'low',
    health_requirements: 'Able to stand and move for 45 minutes',
    data_source: 'YMCA of Greater Indianapolis'
  },
  {
    id: 'fit-002',
    name: 'Walking Group at Eagle Creek Park',
    description: 'Casual walking group meets for 2-mile walks around the scenic Eagle Creek reservoir. All fitness levels welcome.',
    category: 'fitness',
    location: 'Northwest Indianapolis',
    venue: 'Eagle Creek Park',
    schedule_type: 'evergreen',
    schedule_details: 'Tuesday and Thursday at 8:30 AM',
    difficulty_level: 1,
    social_size: 'medium',
    cost: 'free',
    health_requirements: 'Able to walk on paved trails',
    data_source: 'Indy Parks & Recreation'
  },
  {
    id: 'fit-003',
    name: 'Tai Chi in the Park',
    description: 'Gentle tai chi sessions in Garfield Park. Improves balance, flexibility, and inner peace. Instructor provided.',
    category: 'fitness',
    location: 'South Indianapolis',
    venue: 'Garfield Park Sunken Garden',
    schedule_type: 'evergreen',
    schedule_details: 'Saturday at 7:30 AM (weather permitting)',
    difficulty_level: 1,
    social_size: 'medium',
    cost: 'free',
    health_requirements: 'Able to stand for 45 minutes',
    data_source: 'Garfield Park Conservatory'
  },
  {
    id: 'fit-004',
    name: 'Aqua Aerobics',
    description: 'Water-based exercise class that is easy on joints. Great for those with arthritis or mobility concerns.',
    category: 'fitness',
    location: 'Broad Ripple',
    venue: 'Broad Ripple Aquatic Center',
    schedule_type: 'evergreen',
    schedule_details: 'Monday, Wednesday, Friday at 10:00 AM',
    difficulty_level: 2,
    social_size: 'medium',
    cost: 'low',
    health_requirements: 'Comfortable in water, basic swimming ability helpful',
    data_source: 'Indy Parks & Recreation'
  },

  // ARTS & CULTURE
  {
    id: 'art-001',
    name: 'Indianapolis Museum of Art Tour',
    description: 'Guided tour of rotating exhibitions at Newfields. Includes gardens and outdoor art installations.',
    category: 'arts-culture',
    location: 'Midtown Indianapolis',
    venue: 'Newfields (Indianapolis Museum of Art)',
    schedule_type: 'evergreen',
    schedule_details: 'Self-guided anytime during museum hours; guided tours Tuesday-Sunday at 2:00 PM',
    difficulty_level: 2,
    social_size: 'small',
    cost: 'medium',
    health_requirements: 'Moderate walking, seating available throughout',
    data_source: 'Newfields'
  },
  {
    id: 'art-002',
    name: 'Indianapolis Symphony Orchestra Concert',
    description: 'World-class orchestral performances at the beautiful Hilbert Circle Theatre. Senior discounts available.',
    category: 'arts-culture',
    location: 'Downtown Indianapolis',
    venue: 'Hilbert Circle Theatre',
    schedule_type: 'dated',
    schedule_details: 'Various dates, typically Friday and Saturday evenings',
    difficulty_level: 1,
    social_size: 'large',
    cost: 'medium',
    health_requirements: 'Able to sit for 2 hours with intermission',
    data_source: 'Indianapolis Symphony Orchestra'
  },
  {
    id: 'art-003',
    name: 'Pottery Class at Garfield Park Arts Center',
    description: 'Beginner-friendly pottery throwing class. All materials provided. Create functional and decorative pieces.',
    category: 'arts-culture',
    location: 'South Indianapolis',
    venue: 'Garfield Park Arts Center',
    schedule_type: 'evergreen',
    schedule_details: 'Tuesday at 1:00 PM, 6-week sessions',
    difficulty_level: 2,
    social_size: 'small',
    cost: 'low',
    health_requirements: 'Manual dexterity, able to sit for 2 hours',
    data_source: 'Garfield Park Arts Center'
  },
  {
    id: 'art-004',
    name: 'Indiana History Center Exhibits',
    description: 'Explore Indiana history through interactive exhibits. Current special exhibition on Indiana during WWII.',
    category: 'arts-culture',
    location: 'Downtown Indianapolis',
    venue: 'Indiana History Center',
    schedule_type: 'evergreen',
    schedule_details: 'Tuesday-Saturday 10:00 AM - 5:00 PM',
    difficulty_level: 1,
    social_size: 'solo',
    cost: 'low',
    health_requirements: 'Moderate walking',
    data_source: 'Indiana Historical Society'
  },

  // VOLUNTEERING
  {
    id: 'vol-001',
    name: 'Meals on Wheels Delivery',
    description: 'Deliver hot meals to homebound seniors in your neighborhood. Flexible schedule, meaningful connections.',
    category: 'volunteering',
    location: 'Various Indianapolis neighborhoods',
    venue: 'Meals on Wheels of Central Indiana',
    schedule_type: 'evergreen',
    schedule_details: 'Weekday mornings, 9:30 AM - 12:00 PM, commit to one day per week',
    difficulty_level: 2,
    social_size: 'solo',
    cost: 'free',
    health_requirements: 'Valid driver\'s license, able to carry meal containers',
    data_source: 'Meals on Wheels of Central Indiana'
  },
  {
    id: 'vol-002',
    name: 'Reading Buddies at Local Elementary',
    description: 'Read with elementary students one-on-one to improve literacy. Background check required.',
    category: 'volunteering',
    location: 'Broad Ripple',
    venue: 'Broad Ripple Elementary School',
    schedule_type: 'evergreen',
    schedule_details: 'Tuesday and Thursday, 2:00 PM - 3:00 PM during school year',
    difficulty_level: 1,
    social_size: 'small',
    cost: 'free',
    health_requirements: 'Able to sit and read aloud for 1 hour',
    data_source: 'Indianapolis Public Schools Volunteer Program'
  },
  {
    id: 'vol-003',
    name: 'Habitat for Humanity Build Days',
    description: 'Help build affordable housing for families in need. Various tasks available for different abilities.',
    category: 'volunteering',
    location: 'Various Indianapolis locations',
    venue: 'Habitat for Humanity of Indiana',
    schedule_type: 'dated',
    schedule_details: 'Saturday builds, 8:00 AM - 3:00 PM, sign up online',
    difficulty_level: 3,
    social_size: 'large',
    cost: 'free',
    health_requirements: 'Moderate physical activity, safety training provided',
    data_source: 'Habitat for Humanity of Indiana'
  },
  {
    id: 'vol-004',
    name: 'Indianapolis Zoo Docent',
    description: 'Share your love of animals by leading tours and educating visitors. Training provided.',
    category: 'volunteering',
    location: 'West Indianapolis',
    venue: 'Indianapolis Zoo',
    schedule_type: 'evergreen',
    schedule_details: 'Flexible shifts, minimum 4 hours per week',
    difficulty_level: 2,
    social_size: 'medium',
    cost: 'free',
    health_requirements: 'Comfortable walking and standing for extended periods',
    data_source: 'Indianapolis Zoo'
  },

  // LEARNING
  {
    id: 'learn-001',
    name: 'OLLI Lecture Series',
    description: 'Osher Lifelong Learning Institute offers university-level courses without exams. Topics include history, science, arts, and current events.',
    category: 'learning',
    location: 'IUPUI Campus',
    venue: 'IUPUI - University Library',
    schedule_type: 'dated',
    schedule_details: 'Fall and Spring semesters, various times',
    difficulty_level: 2,
    social_size: 'large',
    cost: 'low',
    health_requirements: 'None',
    data_source: 'IUPUI OLLI'
  },
  {
    id: 'learn-002',
    name: 'Computer Skills Workshop',
    description: 'Learn smartphone basics, social media, video calls, and online safety. Beginner-friendly.',
    category: 'learning',
    location: 'Downtown Indianapolis',
    venue: 'Indianapolis Public Library - Central Branch',
    schedule_type: 'evergreen',
    schedule_details: 'Every other Wednesday at 2:00 PM',
    difficulty_level: 1,
    social_size: 'small',
    cost: 'free',
    health_requirements: 'None',
    data_source: 'Indianapolis Public Library'
  },
  {
    id: 'learn-003',
    name: 'Local History Walking Tour',
    description: 'Guided walking tour of historic downtown Indianapolis. Learn about architecture, famous residents, and city development.',
    category: 'learning',
    location: 'Downtown Indianapolis',
    venue: 'Indiana Landmarks Center',
    schedule_type: 'dated',
    schedule_details: 'First Saturday of each month at 10:00 AM',
    difficulty_level: 2,
    social_size: 'medium',
    cost: 'low',
    health_requirements: 'Able to walk 1-2 miles on sidewalks',
    data_source: 'Indiana Landmarks'
  },
  {
    id: 'learn-004',
    name: 'Conversational Spanish Class',
    description: 'Beginner Spanish conversation group. Practice speaking in a low-pressure, friendly environment.',
    category: 'learning',
    location: 'Fountain Square',
    venue: 'Fountain Square Library',
    schedule_type: 'evergreen',
    schedule_details: 'Thursday at 4:00 PM',
    difficulty_level: 2,
    social_size: 'small',
    cost: 'free',
    health_requirements: 'None',
    data_source: 'Indianapolis Public Library'
  },

  // SOCIAL
  {
    id: 'soc-001',
    name: 'Bridge Club',
    description: 'Friendly bridge games for all skill levels. Beginners welcome, instruction available.',
    category: 'social',
    location: 'Carmel (North Indianapolis)',
    venue: 'Carmel Senior Center',
    schedule_type: 'evergreen',
    schedule_details: 'Monday and Friday at 1:00 PM',
    difficulty_level: 1,
    social_size: 'medium',
    cost: 'free',
    health_requirements: 'None',
    data_source: 'Carmel Clay Parks & Recreation'
  },
  {
    id: 'soc-002',
    name: 'Coffee & Conversation Social',
    description: 'Casual morning meetup at local coffee shop. Discuss books, current events, or just chat with neighbors.',
    category: 'social',
    location: 'Broad Ripple',
    venue: 'Coat Check Coffee',
    schedule_type: 'evergreen',
    schedule_details: 'Wednesday at 9:00 AM',
    difficulty_level: 1,
    social_size: 'small',
    cost: 'low',
    health_requirements: 'None',
    data_source: 'Broad Ripple Village Association'
  },
  {
    id: 'soc-003',
    name: 'Indianapolis Hiking Club',
    description: 'Group hikes around central Indiana state parks and nature preserves. Carpools arranged.',
    category: 'social',
    location: 'Various locations around Indianapolis',
    venue: 'Meetup coordination via email',
    schedule_type: 'dated',
    schedule_details: 'First and third Saturday each month, 9:00 AM',
    difficulty_level: 3,
    social_size: 'medium',
    cost: 'free',
    health_requirements: 'Able to hike 3-5 miles on trails',
    data_source: 'Indianapolis Hiking Meetup'
  },
  {
    id: 'soc-004',
    name: 'Book Club at Barnes & Noble',
    description: 'Monthly book club discussing fiction and non-fiction. Book selections voted on by members.',
    category: 'social',
    location: 'Castleton (Northeast Indianapolis)',
    venue: 'Barnes & Noble - Castleton',
    schedule_type: 'dated',
    schedule_details: 'Last Tuesday of each month at 6:30 PM',
    difficulty_level: 1,
    social_size: 'medium',
    cost: 'free',
    health_requirements: 'None',
    data_source: 'Barnes & Noble Events'
  },

  // HOBBIES
  {
    id: 'hob-001',
    name: 'Quilting Circle',
    description: 'Weekly quilting group for all skill levels. Bring your projects, share techniques, and enjoy community.',
    category: 'hobbies',
    location: 'Greenwood (South Indianapolis)',
    venue: 'Greenwood Public Library',
    schedule_type: 'evergreen',
    schedule_details: 'Thursday at 10:00 AM',
    difficulty_level: 2,
    social_size: 'small',
    cost: 'free',
    health_requirements: 'Manual dexterity for needlework',
    data_source: 'Johnson County Public Library'
  },
  {
    id: 'hob-002',
    name: 'Woodworking Workshop',
    description: 'Use fully-equipped woodshop to create projects. Training required for tool certification.',
    category: 'hobbies',
    location: 'Northeast Indianapolis',
    venue: 'Indy Urban Acres',
    schedule_type: 'evergreen',
    schedule_details: 'Open shop hours: Tuesday, Thursday, Saturday 10:00 AM - 4:00 PM',
    difficulty_level: 3,
    social_size: 'small',
    cost: 'low',
    health_requirements: 'Able to safely operate power tools, standing for extended periods',
    data_source: 'Indy Urban Acres'
  },
  {
    id: 'hob-003',
    name: 'Photography Club',
    description: 'Monthly photo walks and critique sessions. All camera types welcome, including smartphones.',
    category: 'hobbies',
    location: 'Various Indianapolis locations',
    venue: 'Meeting locations rotate',
    schedule_type: 'dated',
    schedule_details: 'Second Saturday each month at 10:00 AM',
    difficulty_level: 1,
    social_size: 'medium',
    cost: 'free',
    health_requirements: 'Able to walk during photo outings',
    data_source: 'Indianapolis Photography Meetup'
  },
  {
    id: 'hob-004',
    name: 'Community Garden Plot',
    description: 'Grow your own vegetables and flowers in a shared garden space. Tools and water provided.',
    category: 'hobbies',
    location: 'Fountain Square',
    venue: 'Murphy Art Center Community Garden',
    schedule_type: 'evergreen',
    schedule_details: 'Access during daylight hours, April-October',
    difficulty_level: 2,
    social_size: 'solo',
    cost: 'low',
    health_requirements: 'Able to bend, kneel, and lift light objects',
    data_source: 'Indy Urban Acres'
  },
  {
    id: 'hob-005',
    name: 'Chess Club',
    description: 'Play chess with fellow enthusiasts. All skill levels welcome, casual games and coaching available.',
    category: 'hobbies',
    location: 'Downtown Indianapolis',
    venue: 'Indianapolis City Market',
    schedule_type: 'evergreen',
    schedule_details: 'Sunday at 2:00 PM',
    difficulty_level: 2,
    social_size: 'small',
    cost: 'free',
    health_requirements: 'None',
    data_source: 'Indianapolis Chess Club'
  }
];

/**
 * SQL INSERT statements for seeding the activity database
 */
export function generateInsertSQL(): string {
  const values = activities.map(a => {
    return `(
      '${a.id}',
      '${a.name.replace(/'/g, "''")}',
      '${a.description.replace(/'/g, "''")}',
      '${a.category}',
      '${a.location.replace(/'/g, "''")}',
      '${a.venue.replace(/'/g, "''")}',
      '${a.schedule_type}',
      '${a.schedule_details.replace(/'/g, "''")}',
      ${a.difficulty_level},
      '${a.social_size}',
      '${a.cost}',
      '${a.health_requirements.replace(/'/g, "''")}',
      '${a.data_source.replace(/'/g, "''")}'
    )`;
  }).join(',\n');

  return `INSERT INTO activities (
    id, name, description, category, location, venue,
    schedule_type, schedule_details, difficulty_level,
    social_size, cost, health_requirements, data_source
  ) VALUES ${values};`;
}
