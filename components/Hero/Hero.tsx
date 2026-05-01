import './Hero.css'

const Hero = () => {

    return (
        <section className="hero-wrapper">
            <div className="hero-particles" />
            <div className="hero-glow" />
            <div className="hero-card">
                <div className="hero-scanline" />
                <div className="hero-content">
                    <div className="hero-grid">
                        {/* LEFT */}
                        <div className="hero-text">
                            <div className="hero-eyebrow">
                                <div className="eyebrow-dot" />
                                <span className="eyebrow-text">open catalogue</span>
                            </div>
                            <h1 className="hero-title">
                                Edumania
                            </h1>
                            <a href="/books/new" className="hero-cta">
                                <span className="cta-plus">+</span>
                                <span className="c">Add New Book</span>
                            </a>
                            <p className="hero-description">
                                Listen, explore, and interact with every story you love.
                            </p>
                        </div>
                        {/* CENTER */}
                        <div className="hero-illustration">
                            <div className="orb-ring orb-ring-1" />
                            <div className="orb-ring orb-ring-2" />
                            <div className="orbit-dot" />
                            <div className="orbit-dot-2" />
                            <div className="orb-core" />
                            <div className="orb-ring-small"></div>
                        </div>
                        {/* RIGHT */}
                        <div className="steps-card">
                            <ul className="steps-list">
                                <li className="step-item">
                                    <div className="step-number">01</div>
                                    <div>
                                        <div className="step-title">Upload PDF</div>
                                        <div className="step-desc">Add your book file</div>
                                    </div>
                                </li>
                                <div className="step-divider" />
                                <li className="step-item">
                                    <div className="step-number">02</div>
                                    <div>
                                        <div className="step-title">AI Processing</div>
                                        <div className="step-desc">We analyze the content</div>
                                    </div>
                                </li>
                                <div className="step-divider" />
                                <li className="step-item">
                                    <div className="step-number">03</div>
                                    <div>
                                        <div className="step-title">Voice Chat</div>
                                        <div className="step-desc">Discuss with AI</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero