import React, { useState, useEffect } from 'react';
import { Download, ExternalLink, Code, Mail, Terminal, Palette, Shield, Database, Smartphone } from 'lucide-react';
import './index.css';
import './App.css';

function App() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  // GitHub Username from User
  const githubUsername = 'Izyck006';

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`);
        const data = await response.json();
        // Filter out forks if desired, or just take the latest 6
        setRepos(data.slice(0, 6));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching repos:", error);
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  return (
    <div className="app-container">
      {/* Background Glows */}
      <div className="glow-orb"></div>
      <div className="glow-orb purple"></div>
      <div className="glow-orb gold"></div>

      {/* Navigation */}
      <nav className="glass-nav">
        <div className="nav-content">
          <div className="logo">ZICRON.</div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Arsenal</a></li>
            <li><a href="#projects">Drops</a></li>
            <li><a href="#contact">Connect</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="relative z-10">
        <div className="hero-content glass">
          <p className="subtitle">SOFTWARE ENGINEER</p>
          <h1>ZICRON</h1>
          <p className="description">
            Bridging the gap between edge-computing AI, coding, Web3 communities, and cinematic design.
          </p>
          <div className="btn-group">
            <a href="#projects" className="btn primary">View My Work</a>
            <button onClick={() => alert("Resume coming soon!")} className="btn accent">
              <Download size={18} /> Download CV
            </button>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="relative z-10">
        <h2 className="section-title">The Blueprint</h2>
        <div className="about-grid">
          <div className="about-text glass">
            <p>
              Currently engineering software at Federal University of Dutse (FUD). I don't just write code; I build ecosystems. 
              Whether I'm deploying React-based computer vision dashboards, tutoring the next generation of devs in HTML/CSS, 
              or managing communities in the Web3 space, I focus on shipping high-end results.
            </p>
            <p>
              When I'm not locking in on data structures or operating systems, I'm designing streetwear campaigns, crafting logos with cinematic lighting.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10">
        <h2 className="section-title">The Arsenal</h2>
        <div className="skills-container">
          
          <div className="skill-card glass ai-card">
            <div className="skill-icon"><Terminal size={32} color="#3498db" /></div>
            <h3>Engineering & AI</h3>
            <p><strong>Stack:</strong> Python (PyTorch/OpenCV), Spring Boot, React</p>
            <div className="skill-tag">Edge-Computing</div>
            <div className="skill-tag">Computer Vision</div>
          </div>

          <div className="skill-card glass">
            <div className="skill-icon"><Palette size={32} color="#ffcc00" /></div>
            <h3>Design</h3>
            <p>Cinematic Lighting, Logo Systems, Streetwear Aesthetics</p>
            <div className="skill-tag">Photoshop</div>
            <div className="skill-tag">Canva</div>
          </div>

          <div className="skill-card glass">
            <div className="skill-icon"><Shield size={32} color="#8a2be2" /></div>
            <h3>Web3</h3>
            <p>Community Management, Pro-Shilling, Project Moderation</p>
            <div className="skill-tag">Moderation</div>
            <div className="skill-tag">Community</div>
          </div>

        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10">
        <h2 className="section-title">Recent Drops</h2>
        
        {/* Dynamic GitHub Projects */}
        <div className="github-section">
          <h3 className="sub-section-title"><Code size={24} className="inline-icon" /> Live from GitHub</h3>
          {loading ? (
            <div className="loading-spinner">Loading repos...</div>
          ) : (
            <div className="project-grid">
              {repos.length > 0 ? repos.map(repo => (
                <div key={repo.id} className="project-card glass">
                  <div className="project-info">
                    <h3>{repo.name}</h3>
                    <p className="repo-desc">{repo.description || "No description provided."}</p>
                    <div className="repo-meta">
                      {repo.language && <span className="lang-tag">{repo.language}</span>}
                      <span className="stars-tag">⭐ {repo.stargazers_count}</span>
                    </div>
                    <a href={repo.html_url} target="_blank" rel="noreferrer" className="btn secondary repo-btn">
                      View Code <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              )) : (
                <p>No repositories found.</p>
              )}
            </div>
          )}
        </div>

        {/* Static Handpicked Projects */}
        <div className="handpicked-section mt-50">
          <h3 className="sub-section-title">Handpicked Masterpieces</h3>
          <div className="project-grid">
            <div className="project-card glass">
              <div className="project-img placeholder-1"></div>
              <div className="project-info">
                <h3>Livestock Deterrence AI</h3>
                <p>An edge-computing AI pipeline for farmland protection in Rural Jigawa, featuring real-time computer vision synced to a React web dashboard.</p>
              </div>
            </div>

            <div className="project-card glass">
              <div className="project-img placeholder-4"></div>
              <div className="project-info">
                <h3>Prompt Engineering</h3>
                <p>LLM Orchestration, Image Gen, Context Optimization, Data Entry and Data Analysis.</p>
              </div>
            </div>

            <div className="project-card glass">
              <div className="project-img placeholder-3"></div>
              <div className="project-info">
                <h3>High-End Graphics Design</h3>
                <p>Quality graphics for events and birthdays, image fixing using Photoshop and Canva.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10">
        <h2 className="section-title">Let's Build</h2>
        <div className="contact-container">
          <div className="contact-box glass">
            <Mail size={40} className="contact-icon" color="#3498db" />
            <h3>Looking for a Dev?</h3>
            <p>Need a software engineer, Web3 mod, or designer for your next campaign?</p>
            <a href="mailto:ehimenaudu56@gmail.com" className="btn primary">Send an Email</a>
          </div>

          <div className="contact-box glass">
            <Smartphone size={40} className="contact-icon" color="#25D366" />
            <h3>Just wanna Chat?</h3>
            <p>I'm always down to chat about tech, edge-computing, or cinematic design.</p>
            <a href="https://wa.me/2347071316989" target="_blank" rel="noreferrer" className="btn secondary">WhatsApp Me</a>
          </div>
        </div>
      </section>

      <footer className="glass-nav relative z-10">
        <p>&copy; {new Date().getFullYear()} ZICRON. All Rights Reserved.</p>
        <p className="footer-sub">Engineered with React & GitHub API</p>
      </footer>
    </div>
  );
}

export default App;
