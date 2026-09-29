export const tagGroups = [
    {
        label: 'Founder cohorts',
        description: 'Verified cohorts and newly sourced candidates',
        tags: [
            'Strict Hidden',
            'Emerging Founder',
            'Verified Stealth / Early',
            'Stealth Candidate',
            'Discovery Candidate',
        ],
    },
    {
        label: 'Technology focus',
        description: 'AI and technical founder signals',
        tags: [
            'AI Founder',
            'Technical Founder',
            'AI/Tech Candidate',
            'AI Product',
        ],
    },
    {
        label: 'Founder background',
        description: 'Career and ecosystem experience',
        tags: [
            'Current Founder',
            'Previous Founder',
            'Accelerator Alumni',
            'Scaleup Alumni',
            'Worked in Big Tech',
            'Currently Unemployed',
        ],
    },
    {
        label: 'Representation',
        description: 'Optional diversity signals in the processed dataset',
        tags: ['Female Founder', 'Migrant'],
    },
]

export const tags = tagGroups.flatMap((group) => group.tags)
