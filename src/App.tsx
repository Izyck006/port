import React, { useState, useEffect } from 'react';
import { ExternalLink, Code, Mail, Terminal, Palette, Shield, Database, Smartphone, Send, Sun, Moon, Bot, Gamepad2, Cpu, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ContributionSkyline from './components/ui/contribution-skyline';
import { SourceCodeSection } from './components/source-code/SourceCodeSection';
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

const knownFrontendUrls: Record<string, string> = {
  'AgroSec': 'https://agro-sec.vercel.app',
  'tesla': 'https://tesla-alpha-seven.vercel.app',
  'MySignoutPage': 'https://mysignout-pi.vercel.app',
  'rpg': 'https://rpg-green.vercel.app',
  'port': 'https://port-sage-delta.vercel.app',
};

const getProjectFrontendUrl = (repo: any): string | null => {
  if (repo.homepage && typeof repo.homepage === 'string') {
    const trimmed = repo.homepage.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return trimmed;
    }
  }
  const match = Object.entries(knownFrontendUrls).find(
    ([k]) => k.toLowerCase() === repo.name.toLowerCase()
  );
  return match ? match[1] : null;
};

function App() {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [contributions, setContributions] = useState<{ date: string; count: number }[]>([]);

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

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

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
        setContributions([]);
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
    <div className={`app-container ${theme}`}>
      <div className="glow-orb"></div>
      <div className="glow-orb purple"></div>
      <div className="glow-orb gold"></div>

      <nav className="glass-nav">
        <div className="nav-content">
          <div className="nav-brand">
            <div className="logo">ISAAC.</div>
            <button
              id="theme-toggle-mobile"
              type="button"
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
            <li><a href="#source-code">Source Code</a></li>
            <li><a href="#contact">Connect</a></li>
          </ul>
          <button
            id="theme-toggle"
            type="button"
            onClick={toggleTheme}
            className="theme-toggle-btn desktop-toggle"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>

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
            Bridging the gap between edge-computing, AI, coding, Web3 communities and cinematic design.
          </p>
          <div className="btn-group">
            <a href="#projects" className="btn primary">View My Work</a>
          </div>
        </motion.div>
      </header>

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
              <span className="skill-tag"><Code size={12} className="mr-1" /> Python</span>
              <span className="skill-tag"><Code size={12} className="mr-1" /> React</span>
              <span className="skill-tag"><Database size={12} className="mr-1" /> Spring Boot</span>
              <span className="skill-tag"><Terminal size={12} className="mr-1" /> OpenCV</span>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="skill-card glass bot-card">
            <div className="skill-icon"><Bot size={32} color="#00e5ff" /></div>
            <h3>AI Automation</h3>
            <p>Autonomous Agentic Workflows & LLM Orchestration.</p>
            <div className="skill-tags">
              <span className="skill-tag"><Code size={12} className="mr-1" /> Python</span>
              <span className="skill-tag"><Cpu size={12} className="mr-1" /> CrewAI</span>
              <span className="skill-tag">n8n</span>
              <span className="skill-tag">OpenAI / Gemini</span>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="skill-card glass game-card">
            <div className="skill-icon"><Gamepad2 size={32} color="#ff007f" /></div>
            <h3>Game Dev</h3>
            <p>2D/3D Mechanics, Physics Simulation & Interactive Engines.</p>
            <div className="skill-tags">
              <span className="skill-tag"><Code size={12} className="mr-1" /> C#</span>
              <span className="skill-tag"><Gamepad2 size={12} className="mr-1" /> Unity</span>
              <span className="skill-tag"><Code size={12} className="mr-1" /> JavaScript</span>
              <span className="skill-tag">Pygame</span>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="skill-card glass design-card">
            <div className="skill-icon"><Palette size={32} color="#ffcc00" /></div>
            <h3>Design</h3>
            <p>Cinematic Lighting, Logo Systems, Streetwear Aesthetics.</p>
            <div className="skill-tags">
              <span className="skill-tag">Photoshop</span>
              <span className="skill-tag">Canva</span>
              <span className="skill-tag">UI/UX</span>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="skill-card glass web3-card">
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
              {repos.length > 0 ? repos.map(repo => {
                const liveUrl = getProjectFrontendUrl(repo);
                const targetUrl = liveUrl || repo.html_url;
                const isLive = Boolean(liveUrl);

                return (
                  <motion.div variants={fadeUp} key={repo.id} className="project-card glass">
                    <div className="project-info">
                      <div className="project-card-header">
                        <h3>
                          <a href={targetUrl} target="_blank" rel="noreferrer" className="repo-title-link">
                            {repo.name}
                          </a>
                        </h3>
                        {isLive && <span className="live-pill">● LIVE</span>}
                      </div>
                      <p className="repo-desc">{getRepoDescription(repo)}</p>
                      <div className="repo-meta">
                        {repo.language && <span className="lang-tag">{repo.language}</span>}
                        <span className="stars-tag">⭐ {repo.stargazers_count}</span>
                      </div>
                      <div className="repo-actions-group">
                        {isLive ? (
                          <>
                            <a href={liveUrl!} target="_blank" rel="noreferrer" className="btn primary repo-btn flex-1">
                              Launch App <ExternalLink size={14} />
                            </a>
                            <a href={repo.html_url} target="_blank" rel="noreferrer" className="repo-code-icon-btn" title="View Source on GitHub">
                              <Code size={16} />
                            </a>
                          </>
                        ) : (
                          <a href={repo.html_url} target="_blank" rel="noreferrer" className="btn secondary repo-btn">
                            View Code <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              }) : (
                <p>No repositories found.</p>
              )}
            </motion.div>
          )}
        </div>

        <div className="skyline-section mt-50">
          <h3 className="sub-section-title"><Terminal size={24} className="inline-icon" /> Activity Skyline</h3>
          <div className="skyline-wrapper">
            <ContributionSkyline data={contributions.length > 0 ? contributions : undefined} defaultView="2d" />
          </div>
        </div>

        <div className="handpicked-section mt-50">
          <div className="dev-section-heading">
            <div className="terminal-badge">
              <Terminal size={14} />
              <span>CORE_MODULES // ARCHITECTURES</span>
            </div>
            <h3 className="sub-section-title">Featured Engineering Architectures</h3>
            <p className="dev-section-subtitle">
              Production-grade edge vision pipelines, desktop hardware drivers, procedural kinematics, and real-time 3D web engines.
            </p>
          </div>

          <motion.div
            className="project-grid dev-masterpiece-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div variants={fadeUp} className="project-card glass dev-system-card">
              <div className="card-terminal-bar">
                <div className="traffic-lights">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <span className="terminal-file-name">edge_vision/agrosec_pipeline.py</span>
                <span className="system-status-pill status-green">● PRODUCTION</span>
              </div>
              <div className="project-img placeholder-1 dev-img-wrap">
                <div className="dev-img-overlay">
                  <span className="hud-badge"><Cpu size={12} /> YOLOv8 + OpenCV</span>
                  <span className="hud-badge"><Zap size={12} /> Sub-50ms RTSP</span>
                </div>
              </div>
              <div className="project-info">
                <div className="system-type-tag">EDGE AI & PERIMETER MONITORING</div>
                <h3>AgroSec — Autonomous Farmland Vision</h3>
                <p>Distributed computer vision edge pipeline engineered for agricultural perimeter defense. Combines hardware-accelerated YOLO detection with low-latency WebSocket video streams and a telemetry control dashboard.</p>
                <div className="tech-stack-row">
                  <span className="tech-chip">Python</span>
                  <span className="tech-chip">OpenCV</span>
                  <span className="tech-chip">FastAPI</span>
                  <span className="tech-chip">React</span>
                  <span className="tech-chip">WebSockets</span>
                </div>
                <div className="dev-card-actions">
                  <a href="https://agro-sec.vercel.app" target="_blank" rel="noreferrer" className="btn primary dev-btn flex-1">
                    Launch Demo <ExternalLink size={14} />
                  </a>
                  <a href="https://github.com/Izyck006/AgroSec" target="_blank" rel="noreferrer" className="btn secondary dev-btn">
                    Architecture <Code size={14} />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="project-card glass dev-system-card">
              <div className="card-terminal-bar">
                <div className="traffic-lights">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <span className="terminal-file-name">drivers/biometrics_engine.py</span>
                <span className="system-status-pill status-blue">● HARDWARE I/O</span>
              </div>
              <div className="project-img placeholder-biometric dev-img-wrap">
                <div className="dev-img-overlay">
                  <span className="hud-badge"><Shield size={12} /> 1:N Biometric Match</span>
                  <span className="hud-badge"><Database size={12} /> Offline Sync</span>
                </div>
              </div>
              <div className="project-info">
                <div className="system-type-tag">DESKTOP GUI & HARDWARE INTEGRATION</div>
                <h3>Biometric Workplace Attendance Engine</h3>
                <p>High-reliability desktop verification engine built with PySide6 GUI and asynchronous USB fingerprint scanner communication. Includes automated payroll shift calculation and offline-first database synchronization.</p>
                <div className="tech-stack-row">
                  <span className="tech-chip">Python</span>
                  <span className="tech-chip">PySide6</span>
                  <span className="tech-chip">MongoDB</span>
                  <span className="tech-chip">USB SDK</span>
                  <span className="tech-chip">Cryptography</span>
                </div>
                <div className="dev-card-actions">
                  <a href="https://github.com/Izyck006/WorkplaceAttandenceSystem" target="_blank" rel="noreferrer" className="btn primary dev-btn flex-1">
                    Inspect Architecture <Code size={14} />
                  </a>
                  <a href="#source-code" className="btn secondary dev-btn">
                    Source Code
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="project-card glass dev-system-card">
              <div className="card-terminal-bar">
                <div className="traffic-lights">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <span className="terminal-file-name">kinematics/zigzag_synthesizer.py</span>
                <span className="system-status-pill status-purple">● ACTIVE ENGINE</span>
              </div>
              <div className="project-img placeholder-zigzag dev-img-wrap">
                <div className="dev-img-overlay">
                  <span className="hud-badge"><Bot size={12} /> Inverse Kinematics</span>
                  <span className="hud-badge"><Zap size={12} /> Audio Rhythm Sync</span>
                </div>
              </div>
              <div className="project-info">
                <div className="system-type-tag">PROCEDURAL GRAPHICS & AUDIO SYNTHESIS</div>
                <h3>ZigZag — Procedural Kinematics Engine</h3>
                <p>Autonomous stickman motion and choreography synthesis engine. Employs inverse kinematics and dynamic audio rhythm synchronization to procedurally generate over 5,000 algorithmic routines and interactive physics simulations.</p>
                <div className="tech-stack-row">
                  <span className="tech-chip">Python</span>
                  <span className="tech-chip">Kinematics</span>
                  <span className="tech-chip">Audio Engine</span>
                  <span className="tech-chip">Procedural Math</span>
                  <span className="tech-chip">JSON Schema</span>
                </div>
                <div className="dev-card-actions">
                  <a href="#source-code" className="btn primary dev-btn flex-1">
                    Get Source Code <ExternalLink size={14} />
                  </a>
                  <a href="https://github.com/Izyck006" target="_blank" rel="noreferrer" className="btn secondary dev-btn">
                    Private Git
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="project-card glass dev-system-card">
              <div className="card-terminal-bar">
                <div className="traffic-lights">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <span className="terminal-file-name">render/three_vehicle_stage.tsx</span>
                <span className="system-status-pill status-gold">● WEBGL 60FPS</span>
              </div>
              <div className="project-img placeholder-tesla dev-img-wrap">
                <div className="dev-img-overlay">
                  <span className="hud-badge"><Gamepad2 size={12} /> Three.js / WebGL</span>
                  <span className="hud-badge"><Zap size={12} /> Realtime Shaders</span>
                </div>
              </div>
              <div className="project-info">
                <div className="system-type-tag">3D GRAPHICS & CINEMATIC INTERACTIVE</div>
                <h3>Tesla Cinematic Visualizer</h3>
                <p>High-fidelity interactive 3D vehicle configurator engineered with WebGL shaders and real-time lighting. Features seamless camera orbital paths, reactive telemetry HUD, and low-latency material customization.</p>
                <div className="tech-stack-row">
                  <span className="tech-chip">React</span>
                  <span className="tech-chip">Three.js</span>
                  <span className="tech-chip">Framer Motion</span>
                  <span className="tech-chip">GLSL</span>
                  <span className="tech-chip">Tailwind</span>
                </div>
                <div className="dev-card-actions">
                  <a href="https://tesla-alpha-seven.vercel.app" target="_blank" rel="noreferrer" className="btn primary dev-btn flex-1">
                    Launch Demo <ExternalLink size={14} />
                  </a>
                  <a href="https://github.com/Izyck006/tesla" target="_blank" rel="noreferrer" className="btn secondary dev-btn">
                    Architecture <Code size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SourceCodeSection />

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
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
