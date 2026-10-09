import React, { useState, useEffect } from 'react';
import { Download, ExternalLink, Code, Mail, Terminal, Palette, Shield, Database, Smartphone, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';
import './App.css';

function App() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState(''); // '', 'sending', 'sent'

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

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    // Simulate network request
    setTimeout(() => {
      setFormStatus('sent');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(''), 3000);
    }, 1500);
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

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
        <motion.div 
          className="hero-content glass"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <p className="subtitle">SOFTWARE ENGINEER</p>
          <h1>ZICRON</h1>
          <p className="description">
            Bridging the gap between edge-computing AI, coding, Web3 communities, and cinematic design.
          </p>
          <div className="btn-group">
            <a href="#projects" className="btn primary">View My Work</a>
          </div>
        </motion.div>
      </header>

      {/* About Section */}
      <section id="about" className="relative z-10">
        <motion.h2 
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          variants={fadeUp}
        >
          The Blueprint
        </motion.h2>
        <div className="about-grid">
          <motion.div 
            className="about-text glass"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            variants={fadeUp}
          >
            <p>
              Currently engineering software at Federal University of Dutse (FUD). I don't just write code; I build ecosystems. 
              Whether I'm deploying React-based computer vision dashboards, tutoring the next generation of devs in HTML/CSS, 
              or managing communities in the Web3 space, I focus on shipping high-end results.
            </p>
            <p>
              When I'm not locking in on data structures or operating systems, I'm designing streetwear campaigns, crafting logos with cinematic lighting.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10">
        <motion.h2 
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          variants={fadeUp}
        >
          The Arsenal
        </motion.h2>
        <motion.div 
          className="skills-container"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          
          <motion.div variants={fadeUp} className="skill-card glass ai-card">
            <div className="skill-icon"><Terminal size={32} color="#3498db" /></div>
            <h3>Engineering & AI</h3>
            <p>Building intelligent systems and responsive frontends.</p>
            <div className="skill-tags">
              <span className="skill-tag"><Code size={12} className="mr-1"/> Python</span>
              <span className="skill-tag"><Code size={12} className="mr-1"/> React</span>
              <span className="skill-tag"><Database size={12} className="mr-1"/> Spring Boot</span>
              <span className="skill-tag"><Terminal size={12} className="mr-1"/> OpenCV</span>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="skill-card glass">
            <div className="skill-icon"><Palette size={32} color="#ffcc00" /></div>
            <h3>Design</h3>
            <p>Cinematic Lighting, Logo Systems, Streetwear Aesthetics.</p>
            <div className="skill-tags">
              <span className="skill-tag">Photoshop</span>
              <span className="skill-tag">Canva</span>
              <span className="skill-tag">UI/UX</span>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="skill-card glass">
            <div className="skill-icon"><Shield size={32} color="#8a2be2" /></div>
            <h3>Web3</h3>
            <p>Community Management, Pro-Shilling, Project Moderation.</p>
            <div className="skill-tags">
              <span className="skill-tag">Moderation</span>
              <span className="skill-tag">Community</span>
              <span className="skill-tag">Discord</span>
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10">
        <motion.h2 
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          variants={fadeUp}
        >
          Recent Drops
        </motion.h2>
        
        {/* Dynamic GitHub Projects */}
        <div className="github-section">
          <h3 className="sub-section-title"><Code size={24} className="inline-icon" /> Live from GitHub</h3>
          {loading ? (
            <div className="loading-spinner">Loading repos...</div>
          ) : (
            <motion.div 
              className="project-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {repos.length > 0 ? repos.map(repo => (
                <motion.div variants={fadeUp} key={repo.id} className="project-card glass">
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
                </motion.div>
              )) : (
                <p>No repositories found.</p>
              )}
            </motion.div>
          )}
        </div>

        {/* Static Handpicked Projects */}
        <div className="handpicked-section mt-50">
          <h3 className="sub-section-title">Handpicked Masterpieces</h3>
          <motion.div 
            className="project-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div variants={fadeUp} className="project-card glass">
              <div className="project-img placeholder-1"></div>
              <div className="project-info">
                <h3>Livestock Deterrence AI</h3>
                <p>An edge-computing AI pipeline for farmland protection in Rural Jigawa, featuring real-time computer vision synced to a React web dashboard.</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="project-card glass">
              <div className="project-img placeholder-4"></div>
              <div className="project-info">
                <h3>Prompt Engineering</h3>
                <p>LLM Orchestration, Image Gen, Context Optimization, Data Entry and Data Analysis.</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="project-card glass">
              <div className="project-img placeholder-3"></div>
              <div className="project-info">
                <h3>High-End Graphics Design</h3>
                <p>Quality graphics for events and birthdays, image fixing using Photoshop and Canva.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10">
        <motion.h2 
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          variants={fadeUp}
        >
          Let's Build
        </motion.h2>
        
        <div className="contact-layout">
          {/* Contact Details */}
          <motion.div 
            className="contact-details"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="contact-box glass">
              <Mail size={32} className="contact-icon" color="#3498db" />
              <div>
                <h3>Email</h3>
                <p>ehimenaudu56@gmail.com</p>
                <a href="mailto:ehimenaudu56@gmail.com" className="contact-link">Send an Email</a>
              </div>
            </div>

            <div className="contact-box glass mt-20">
              <Smartphone size={32} className="contact-icon" color="#25D366" />
              <div>
                <h3>WhatsApp</h3>
                <p>+234 707 131 6989</p>
                <a href="https://wa.me/2347071316989" target="_blank" rel="noreferrer" className="contact-link">Message Me</a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="contact-form-container glass"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h3>Send a Message</h3>
            <form onSubmit={handleContactSubmit} className="contact-form">
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <textarea 
                  placeholder="Your Message" 
                  rows="4" 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="btn primary submit-btn" disabled={formStatus === 'sending'}>
                {formStatus === 'sending' ? 'Sending...' : formStatus === 'sent' ? 'Sent!' : <><Send size={18} /> Send Message</>}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <footer className="glass-nav relative z-10">
        <p>&copy; {new Date().getFullYear()} ZICRON. All Rights Reserved.</p>
        <p className="footer-sub">Engineered with React, Framer Motion & GitHub API</p>
      </footer>
    </div>
  );
}

export default App;
