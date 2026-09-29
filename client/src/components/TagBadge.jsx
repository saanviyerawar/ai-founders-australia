const tagStyles = {
    'Strict Hidden': 'tag-badge-strict',
    'Emerging Founder': 'tag-badge-emerging',
    'Verified Stealth / Early': 'tag-badge-stealth',
    'Stealth Candidate': 'tag-badge-stealth-candidate',
    'Discovery Candidate': 'tag-badge-discovery',
    'AI Founder': 'tag-badge-ai',
    'Technical Founder': 'tag-badge-technical',
    'AI/Tech Candidate': 'tag-badge-candidate',
    'AI Product': 'tag-badge-ai',
}

export default function TagBadge({ tag }) {
    return (
        <span className={`tag-badge ${tagStyles[tag] || 'tag-badge-default'}`}>
            {tag}
        </span>
    )
}
