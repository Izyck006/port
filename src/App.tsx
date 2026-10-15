import React, { useState, useEffect } from 'react';
import { ExternalLink, Code, Mail, Terminal, Palette, Shield, Database, Smartphone, Send, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ContributionSkyline from './components/ui/contribution-skyline';
import './index.css';
import './App.css';

const repoCustomDescriptions: Record<string, string> = {
  'ZIC-model_makers': 'Parametric 3D CAD enclosure generator built with Flask, CadQuery, and interactive web visualization for rapid prototyping.',
  'WorkplaceAttandenceSystem': 'Biometric attendance tracking system with PySide6 desktop GUI, MongoDB, and USB fingerprint scanner integration.',
  'port': 'Personal engineering portfolio built with React, TypeScript, Framer Motion, and dynamic GitHub API integration.',
  'tesla': 'Modern interactive Tesla showcase & vehicle visualizer with responsive UI, dynamic controls, and cinematic aesthetics.',
  'AgroSec': 'Edge-driven AI intrusion detection and computer vision monitoring system for agricultural security and perimeter defense.',
  'MySignoutPage': 'Full-stack digital yearbook and commemorative sign-out platform with secure authentication and real-time messaging.',
  'Thronecraft': 'Interactive browser strategy game engine with custom mechanics, tactical grid gameplay, and procedural state management.',
  'CampusConnect': 'Full-stack campus collaboration platform connecting students, faculty, and academic communities.',
  'KPI': 'Real-time performance metrics and business intelligence dashboard with interactive charting and analytics.',
  'rpg': 'Browser-based 2D action role-playing game engineered with vanilla JavaScript, collision physics, and combat loops.',
  'Project-1': 'Full-stack responsive food delivery web application with item customization, cart persistence, and order tracking.',
  'Umbrella_Jam': 'Interactive canvas particle physics and weather simulation exploring real-time dynamic forces.',
  'IVY_D-FIGHT': 'Interactive 2D arcade combat simulator and fighting engine with custom animation states.',
  'Fluke': 'Computer vision and intelligent automation system engineered for high-precision object detection.',
  'IVY': 'Experimental AI assistant and conversational interaction interface.',
  'expense': 'Clean personal finance and budget tracking application with category analytics and expense breakdown.',
  'gmaee': 'Interactive game prototype featuring custom physics, sprite animations, and audio effects.',
  'jrsite': 'Modern responsive web portal engineered with lightweight frontend architecture.'
};

function App() {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [contributions, setContributions] = useState<{ date: string; count: number }[]>([]);
  
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
      document.body.classList.add('light');
    } else {
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
      document.body.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState(''); // '', 'sending', 'sent'

  // GitHub Username from User
  const githubUsername = 'Izyck006';

  const getRepoDescription = (repo: any) => {
    if (repoCustomDescriptions[repo.name]) return repoCustomDescriptions[repo.name];
    const lower = repo.name.toLowerCase();
    for (const [k, v] of Object.entries(repoCustomDescriptions)) {
      if (k.toLowerCase() === lower) return v;
    }
    if (repo.description && repo.description.trim()) {
      return repo.description.replace(/in Rural Jigawa/gi, 'for modern agriculture');
    }
    return "Production-ready software project built with modern engineering standards.";
  };

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=12`);
        const data = await response.json();
        if (Array.isArray(data)) {
          // Take active repos (filtering out forks)
          const filtered = data.filter((repo: any) => !repo.fork);
          setRepos(filtered.slice(0, 6));
        } else {
          setRepos([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching repos:", error);
        setLoading(false);
      }
    };

    const fetchContributions = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/events?per_page=100`);
        const data = await response.json();
        if (Array.isArray(data)) {
          const counts: Record<string, number> = {};
          data.forEach((event: any) => {
            const date = event.created_at.split('T')[0];
            counts[date] = (counts[date] || 0) + 1;
          });
          const mappedData = Object.keys(counts).map(date => ({
            date,
            count: counts[date]
          }));
          setContributions(mappedData);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setContributions([]); // fallback
      }
    };

    fetchRepos();
    fetchContributions();
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/ehimenaudu56@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: `New Portfolio Message from ${formData.name}`
        })
      });

      if (response.ok) {
        setFormStatus('sent');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus(''), 3000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus(''), 3000);
      }
    } catch (error) {
      console.error(error);
      setFormStatus('error');
      setTimeout(() => setFormStatus(''), 3000);
    }
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
          <div className="nav-brand">
            <div className="logo">ISAAC.</div>
            <button 
              onClick={toggleTheme} 
              className="theme-toggle-btn mobile-toggle"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Arsenal</a></li>
            <li><a href="#projects">Drops</a></li>
            <li><a href="#contact">Connect</a></li>
          </ul>
          <button 
            onClick={toggleTheme} 
            className="theme-toggle-btn desktop-toggle"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
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
          <h1>ISAAC</h1>
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
              Full-stack software engineer and systems builder. I don't just write code; I build ecosystems. 
              Whether I'm deploying React-based computer vision dashboards, mentoring emerging devs in frontend engineering, 
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
                    <p className="repo-desc">{getRepoDescription(repo)}</p>
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

        {/* Contribution Skyline */}
        <div className="skyline-section mt-50">
          <h3 className="sub-section-title"><Terminal size={24} className="inline-icon" /> Activity Skyline</h3>
          <div className="skyline-wrapper">
             <ContributionSkyline data={contributions.length > 0 ? contributions : undefined} />
          </div>
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
                <p>An edge-computing AI pipeline for autonomous farmland protection and perimeter security, featuring real-time computer vision synced to a React web dashboard.</p>
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
              <svg className="contact-icon" style={{ stroke: 'var(--heading-color)' }} width="32" height="32" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              <div>
                <h3>GitHub</h3>
                <p>@Izyck006</p>
                <a href="https://github.com/Izyck006" target="_blank" rel="noreferrer" className="contact-link">View Profile</a>
              </div>
            </div>

            <div className="contact-box glass mt-20">
              <Smartphone size={32} className="contact-icon" color="#25D366" />
              <div>
                <h3>WhatsApp</h3>
                <p>Direct Message</p>
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
                {formStatus === 'sending' ? 'Sending...' : formStatus === 'sent' ? 'Sent!' : formStatus === 'error' ? 'Error. Try Again' : <><Send size={18} /> Send Message</>}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <footer className="glass-nav relative z-10">
        <p>&copy; {new Date().getFullYear()} ISAAC. All Rights Reserved.</p>
        <p className="footer-sub">Engineered with React, Framer Motion & GitHub API</p>
      </footer>
    </div>
  );
}

export default App;
