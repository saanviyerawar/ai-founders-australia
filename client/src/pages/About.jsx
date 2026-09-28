export default function AboutPage() {
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <h1>About AI Founders Australia</h1>
                    <p className="lead">Mapping Australia's emerging AI and technical founder ecosystem.</p>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-8">
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <h2>Our Mission</h2>
                            <p>AI Founders Australia identifies and maps current, emerging, and early-stage AI and technical founders across Australia. Our mission is to make the ecosystem easier to discover while clearly separating verified hidden signals from broader discovery candidates.</p>
                            
                            <p>Some of the best founders are hidden in plain sight. They're not posting on LinkedIn — they're heads down building. They're scale-up veterans whose options are vesting. Migrants building quiet empires. PhD researchers with IP ready to spin out.</p>
                            
                            <p>Our searchable database helps connect founders with the resources, mentorship, collaborators, and investment opportunities they need to succeed.</p>
                            
                            <h2 className="mt-4">How It Works</h2>
                            <p>Our platform aggregates data from multiple sources to create comprehensive founder profiles that include:</p>
                            
                            <ul>
                                <li><strong>Basic Information:</strong> Name, LinkedIn profile, city, and startup details</li>
                                <li><strong>Filters:</strong> Name, City, Startup Name, Highest Level Degree, Tags, Gender and Migrant Status</li>
                                <li><strong>Diversity Measures:</strong> Gender and Migrant Status</li>
                                <li><strong>Professional Background:</strong> Companies, Roles and Education</li>
                            </ul>
                            
                            <p>Users can search and filter this database to find specific types of founders.</p>
                            
                            <h2 className="mt-4">Data Sources</h2>
                            <p>Our founder profiles are compiled from a variety of sources, including:</p>
                            
                            <ul>
                                <li><strong>LinkedIn:</strong> Professional backgrounds, career trajectories, and side project links</li>
                                <li><strong>Crunchbase:</strong> Information on stealth startups and early-stage companies</li>
                                <li><strong>Search Engines:</strong> Webscraping Google and Bing</li>
                                <li><strong>Community Groups:</strong> Slack/Discord communities, meetup lists, and university clubs</li>
                                <li><strong>Social Media:</strong> Twitter/X profiles, Product Hunt submissions, and GitHub repositories</li>
                            </ul>
                            
                            <p>Profiles use public professional and company information. Cohort labels represent the evidence available in the dataset and are not investment recommendations.</p>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-4">
                    <div className="card shadow-sm mb-4">
                        <div className="card-header bg-light">
                            <h5 className="card-title mb-0">Project Origin</h5>
                        </div>
                        <div className="card-body">
                            <p>The original prototype won the Techstars Sydney Build Challenge and has since evolved into AI Founders Australia.</p>
                            
                            <p><strong>Challenge Period:</strong><br />May 26 - June 5, 2025</p>
                            
                            <p><strong>Judging Criteria:</strong></p>
                            <ul>
                                <li>Data insight and quality</li>
                                <li>Filterable, usable UX</li>
                                <li>Creativity in uncovering non-obvious talent</li>
                            </ul>
                            
                            <a href="https://campus.buildclub.ai/challenges/0196f479-922e-7996-b723-4b93fc160cf8" target="_blank" className="btn btn-primary mt-2">
                                <i className="bi bi-link-45deg"></i> Visit Techstars
                            </a>
                        </div>
                    </div>
                    
                    <div className="card shadow-sm mb-4">
                        <div className="card-header bg-light">
                            <h5 className="card-title mb-0">Contact Us</h5>
                        </div>
                        <div className="card-body">
                            <p>Have questions about AI Founders Australia or want to suggest an update?</p>
                            
                            <p>
                                <i className="bi bi-github"></i> <a href="https://github.com/saanviyerawar/ai-founders-australia" target="_blank" rel="noreferrer">GitHub Repository</a>
                            </p>
                        </div>
                    </div>
                    
                    <div className="card shadow-sm">
                        <div className="card-header bg-light">
                            <h5 className="card-title mb-0">Privacy Policy</h5>
                        </div>
                        <div className="card-body">
                            <p>We respect the privacy of the founders in our database. All publicly available information is collected ethically and in compliance with relevant regulations.</p>
                            
                            <p>If you're a founder who would like your information updated or removed, please contact us.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>       
    )
}