import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <main>
            <div className="container mt-5 align-items-center justify-content-center">
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center">
                        <h1 className="display-4 text-center">Discover Australia's Hidden AI & Tech Founders</h1>
                        <p className="lead text-center">Explore more than 500 strict hidden, emerging, stealth/early, and newly discovered founder candidates across Australia, with stealth signals prioritized.</p>
                        <p className="mb-4 text-center">Verified cohorts use follower, tenure, founder-role, AI-product, funding, and stealth signals. Newly sourced profiles are labeled Discovery Candidate until those signals are verified.</p>
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
                                <h3 className="h5">Strict Hidden</h3>
                                <p className="small">Under 1,000 followers, within two years of the current AI or technical founder role</p>
                                <Link to="/search?tag=Strict%20Hidden" className="stretched-link" aria-label="Search strict hidden founders" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card category-card mb-4">
                            <div className="card-body">
                                <h3 className="h5">Emerging Founders</h3>
                                <p className="small">Under 5,000 followers and within four years of the current founder role</p>
                                <Link to="/search?tag=Emerging%20Founder" className="stretched-link" aria-label="Search emerging founders" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card category-card mb-4">
                            <div className="card-body">
                                <h3 className="h5">Stealth / Early</h3>
                                <p className="small">Stealth, bootstrapped, or within two years of an AI or technical founder role</p>
                                <Link to="/search?tag=Stealth%2FEarly%20Founder" className="stretched-link" aria-label="Search stealth and early founders" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card category-card mb-4">
                            <div className="card-body">
                                <h3 className="h5">Stealth Candidates</h3>
                                <p className="small">Founder profiles whose public professional headline explicitly signals stealth or an unannounced venture</p>
                                <Link to="/search?tag=Stealth%20Candidate" className="stretched-link" aria-label="Search stealth candidates" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>         
        </main>
    )
}