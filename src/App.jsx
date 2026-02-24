import { useEffect, useRef } from 'react'
import { supabase } from './supabaseClient'
import './App.css'

function App() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Log visit to Supabase
    const logVisit = async () => {
      await supabase.from('page_visits').insert({ page: 'home', visited_at: new Date().toISOString() })
    }
    logVisit().catch(() => {})

    // Custom cursor
    let mx = 0, my = 0, rx = 0, ry = 0
    const cursor = cursorRef.current
    const ring = ringRef.current

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px' }
    }
    document.addEventListener('mousemove', onMove)

    let rafId
    const animateRing = () => {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12
      if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px' }
      rafId = requestAnimationFrame(animateRing)
    }
    animateRing()

    const interactives = document.querySelectorAll('.inno-card, .btn-primary, .btn-ghost, .nav-cta, .card-link')
    const onEnter = () => {
      if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(2)'
      if (ring) { ring.style.transform = 'translate(-50%,-50%) scale(1.5)'; ring.style.borderColor = 'rgba(201,168,76,0.8)' }
    }
    const onLeave = () => {
      if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(1)'
      if (ring) { ring.style.transform = 'translate(-50%,-50%) scale(1)'; ring.style.borderColor = 'rgba(201,168,76,0.5)' }
    }
    interactives.forEach(el => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave) })

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.style.opacity = '1'; entry.target.style.transform = 'translateY(0)' }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.inno-card, .stat-box, .philosophy-quote').forEach((el, i) => {
      el.style.opacity = '0'; el.style.transform = 'translateY(40px)'
      el.style.transition = `opacity 0.8s ease ${i * 0.1}s, transform 0.8s ease ${i * 0.1}s`
      observer.observe(el)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      interactives.forEach(el => { el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave) })
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-ring" ref={ringRef}></div>

      <nav>
        <a href="#" className="logo">
          <div className="logo-mark">G</div>
          <div className="logo-text">Gnosis Tech<div className="logo-sub">Advisors</div></div>
        </a>
        <a href="mailto:contact@gnosistechadvisors.com" className="nav-cta">Connect with us &nbsp; →</a>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <div className="eyebrow"><span className="eyebrow-line"></span>Innovation-First Technology Advisory</div>
          <h1 className="hero-headline">
            <span className="line1">Where Deep</span>
            <span className="line2">Intelligence</span>
            <span className="line3">Meets Purpose</span>
          </h1>
          <p className="hero-sub">
            Gnosis Tech Advisors exists at the intersection of knowledge and innovation —
            empowering IT organizations to thrive, and democratizing institutional-grade
            intelligence through our flagship platform.
          </p>
          <div className="hero-actions">
            <a href="https://eternalquants.com" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <span>Explore EternalQuants</span><span>→</span>
            </a>
            <a href="#innovations" className="btn-ghost">Our Innovations ↓</a>
          </div>
        </div>
        <div className="scroll-hint"><span className="scroll-bar"></span>Scroll to discover</div>
      </section>

      <div className="section-divider"><div className="divider-line"></div><div className="divider-mark">✦</div><div className="divider-line"></div></div>

      <section className="innovations" id="innovations">
        <div className="section-label">Flagship Innovations</div>
        <h2 className="section-title">Two pillars of<br /><em>transformative</em> impact</h2>
        <div className="innovation-grid">
          <div className="inno-card">
            <div className="card-number">01</div>
            <div className="card-icon">
              <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
            </div>
            <div className="card-tag">Platform Innovation</div>
            <h3 className="card-title">Eternal<em>Quants</em>.com</h3>
            <p className="card-desc">Institutional-grade machine learning intelligence — now accessible to everyone. EternalQuants bridges the gap between Wall Street quantitative research and everyday practitioners who want to learn, build, and deploy sophisticated trading models.</p>
            <ul className="card-features">
              <li>Advanced ML models including ARIMA, GARCH, LSTM &amp; Transformers</li>
              <li>Upload, evaluate, and community-rate Python trading strategies</li>
              <li>NIFTY 50 &amp; Indian markets — specialized quantitative research</li>
              <li>Learn institutional quant methods used by top-tier funds</li>
            </ul>
            <a href="https://eternalquants.com" target="_blank" rel="noopener noreferrer" className="card-link">Visit Platform <span className="arrow">→</span></a>
          </div>

          <div className="inno-card">
            <div className="card-number">02</div>
            <div className="card-icon">
              <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="2" />
                <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
              </svg>
            </div>
            <div className="card-tag">Knowledge Advisory</div>
            <h3 className="card-title">IT Firms That <em>Thrive</em></h3>
            <p className="card-desc">In a world where technology evolves faster than most organizations can adapt, Gnosis Tech provides the strategic knowledge partnerships that help IT firms stay ahead — not just survive, but dominate their markets.</p>
            <ul className="card-features">
              <li>Deep-dive technology consulting and architecture advisory</li>
              <li>AI &amp; ML implementation roadmaps tailored to your business</li>
              <li>Knowledge transfer programs that upskill your entire team</li>
              <li>Strategic guidance on emerging tech adoption and competitive positioning</li>
            </ul>
            <a href="mailto:contact@gnosistechadvisors.com" className="card-link">Start a Conversation <span className="arrow">→</span></a>
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="divider-line"></div><div className="divider-mark">✦</div><div className="divider-line"></div></div>

      <section className="philosophy">
        <div className="philosophy-inner">
          <div className="philosophy-left">
            <div className="section-label">Philosophy</div>
            <div className="stats-row">
              <div className="stat-box"><span className="stat-value">∞</span><span className="stat-label">Innovation<br />Horizon</span></div>
              <div className="stat-box"><span className="stat-value">2</span><span className="stat-label">Core<br />Pillars</span></div>
              <div className="stat-box"><span className="stat-value">1</span><span className="stat-label">Guiding<br />Purpose</span></div>
            </div>
          </div>
          <div className="philosophy-right">
            <blockquote className="philosophy-quote">
              "The companies that will define tomorrow are not those with the most resources —
              they are those with the deepest <em>knowledge</em> and the courage to act on it."
            </blockquote>
            <div className="philosophy-attribution">Gnosis Tech Advisors — Core Belief</div>
          </div>
        </div>
      </section>

      <section className="footer-cta">
        <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: '32px' }}>
          <span className="eyebrow-line"></span>Ready to Begin<span className="eyebrow-line"></span>
        </div>
        <h2 className="cta-headline">Shape your<em>future now</em></h2>
        <p className="cta-sub">Whether you are an IT leader seeking a strategic edge or a quant enthusiast hungry for institutional-grade knowledge — Gnosis Tech is your partner.</p>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://eternalquants.com" target="_blank" rel="noopener noreferrer" className="btn-primary"><span>Launch EternalQuants</span><span>→</span></a>
          <a href="mailto:contact@gnosistechadvisors.com" className="btn-ghost">Advisory Inquiry →</a>
        </div>
      </section>

      <footer>
        <div className="footer-logo">Gnosis Tech Advisors</div>
        <div className="footer-links">
          <a href="https://eternalquants.com" target="_blank" rel="noopener noreferrer">EternalQuants</a>
          <a href="mailto:contact@gnosistechadvisors.com">Contact</a>
        </div>
        <div className="footer-note">© 2025 Gnosis Tech Advisors — All Rights Reserved</div>
      </footer>
    </>
  )
}

export default App
