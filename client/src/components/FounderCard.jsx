import React from 'react';
import { Link } from 'react-router-dom';

export default function FounderCard({ founder }) {
  const badgeClass = (tag) => {
    if (tag === 'Hidden Founder') return 'bg-warning text-dark';
    if (tag === 'Strict Hidden') return 'bg-danger';
    if (tag === 'Emerging Founder') return 'bg-success';
    if (tag === 'Stealth/Early Founder') return 'bg-dark';
    if (tag === 'Discovery Candidate') return 'bg-light text-dark border';
    if (tag === 'Stealth Candidate') return 'bg-dark';
    if (tag === 'AI/Tech Candidate') return 'bg-info text-dark';
    if (tag === 'AI Founder') return 'bg-primary';
    if (tag === 'Tech Founder') return 'bg-info text-dark';
    return 'bg-secondary';
  };

  return (
    <div className="col-md-6 mb-4">
      <div className="card h-100 founder-card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <h5 className="card-title founder-name mb-0">{founder.name}</h5>
          </div>
          <p className="text-muted mb-2">
            <i className="bi bi-geo-alt"></i> {founder.city}
          </p>
          <p className="founder-role mb-2">
            {founder.current_title}
            {founder.current_title !== "Unemployed" && founder.current_title && founder.current_company && ` at ${founder.current_company}`}
            <span className="text-muted">
              {founder.current_job_start && ` (Started: ${founder.current_job_start})`}
            </span>
          </p>
          <div className="founder-tags mb-3">
            {founder.tags && founder.tags.map((tag, index) => (
              <span key={index} className={`badge ${badgeClass(tag)} me-1 mb-1`}>{tag}</span>
            ))}
          </div>
          {founder.hidden_signals?.length > 0 && (
            <p className="small text-muted mb-3">
              <strong>Hidden signals:</strong> {founder.hidden_signals.join(' · ')}
            </p>
          )}
          <div className="diversity-badges mb-3">
            {founder.diversity && founder.diversity.map((badge, index) => (
              <span key={index} className="badge bg-info me-1">{badge}</span>
            ))}
          </div>
          <Link to={`/founder/${founder.id}`} className="btn btn-sm btn-outline-primary me-2">
            View Profile
          </Link>
          <a href={founder.linkedin_url} className="btn btn-sm btn-outline-secondary" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-linkedin"></i> LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}