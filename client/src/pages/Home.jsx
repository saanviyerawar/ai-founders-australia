import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <main>
            <div className="container mt-5 align-items-center justify-content-center">
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center">
                        <h1 className="display-4 text-center">Discover Australia's Hidden AI & Tech Founders</h1>
                        <p className="lead text-center">Start with founders who are technically oriented, early in their current journey, and still below the mainstream visibility threshold.</p>
                        <p className="mb-4 text-center">The default cohort uses concrete signals: a current AI or technical founder role, fewer than 2,000 LinkedIn followers, and no more than three years in the current role where tenure is known.</p>
                        <div className="d-grid gap-2 d-md-flex justify-content-center">
                            <Link to="/search" className="btn btn-primary btn-lg px-4 me-md-2">Start Searching</Link>
                        </div>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-12">
                        <h2 className="text-center mb-4">Why Hidden Founders?</h2>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body text-center p-4">
                                <div className="feature-icon bg-primary bg-gradient text-white rounded-circle mb-3">
                                    <i className="bi bi-search"></i>
                                </div>
                                <h3>Discover Talent</h3>
                                <p>Find high-potential founders before they're headlines. Our database surfaces talent that's not yet visible in traditional networks.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body text-center p-4">
                                <div className="feature-icon bg-primary bg-gradient text-white rounded-circle mb-3">
                                    <i className="bi bi-bar-chart"></i>
                                </div>
                                <h3>Diversity Insights</h3>
                                <p>Access detailed diversity metrics including gender, ethnicity, and migrant status to build more inclusive founder communities.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body text-center p-4">
                                <div className="feature-icon bg-primary bg-gradient text-white rounded-circle mb-3">
                                    <i className="bi bi-filter"></i>
                                </div>
                                <h3>Advanced Filtering</h3>
                                <p>Filter by expertise, background, location, and more to find exactly the founder profiles you're looking for.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-12">
                        <h2 className="text-center mb-4">Explore Founder Signals</h2>
                    </div>
                    <div className="col-md-3">
                        <div className="card category-card mb-4">
                            <div className="card-body">
                                <h3 className="h5">Hidden Founders</h3>
                                <p className="small">Low-visibility founders selected using follower count, tenure, and founder-role signals</p>
                                <Link to="/search?tag=Hidden%20Founder" className="stretched-link" aria-label="Search hidden founders" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card category-card mb-4">
                            <div className="card-body">
                                <h3 className="h5">AI Founders</h3>
                                <p className="small">Current founders whose product identity includes artificial intelligence</p>
                                <Link to="/search?tag=AI%20Founder" className="stretched-link" aria-label="Search AI founders" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card category-card mb-4">
                            <div className="card-body">
                                <h3 className="h5">Technical Founders</h3>
                                <p className="small">Current founders classified with a technical founder persona</p>
                                <Link to="/search?tag=Tech%20Founder" className="stretched-link" aria-label="Search technical founders" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card category-card mb-4">
                            <div className="card-body">
                                <h3 className="h5">All Founder Profiles</h3>
                                <p className="small">Broaden the filters to explore the complete processed Australian dataset</p>
                                <Link to="/search?tag=all" className="stretched-link" aria-label="Search all founders" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>         
        </main>
    )
}