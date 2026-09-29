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
                <div className="col-12">
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
                                <li><strong>Filters:</strong> Cohorts, technology focus, city, startup, funding stage, name, representation, and education</li>
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

                            <h2 className="mt-4">Privacy</h2>
                            <p>We respect the privacy of the founders in our database. All publicly available information is collected ethically and in compliance with relevant regulations.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>       
    )
}