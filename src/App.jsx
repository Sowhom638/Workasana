
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Signup from './pages/Signup'
import { Link } from 'react-router-dom';

function App() {

  return (
    <>
    <ToastContainer position="bottom-right" />
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        :root {
          --wa-teal: #06b6d4;
          --wa-green: #10b981;
          --wa-gold: #f59e0b;
          --wa-gradient: linear-gradient(135deg, #06b6d4 0%, #10b981 50%, #f59e0b 100%);
          --wa-gradient-h: linear-gradient(90deg, #06b6d4, #10b981, #f59e0b);
          --wa-card: #ffffff;
          --wa-bg: #f8fafb;
          --wa-text: #1e293b;
          --wa-muted: #64748b;
          --wa-border: #e2e8f0;
          --wa-shadow: 0 4px 20px rgba(6, 182, 212, 0.1);
          --wa-shadow-lg: 0 12px 40px rgba(6, 182, 212, 0.15);
          --wa-radius: 20px;
          --wa-radius-sm: 14px;
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          margin: 0;
          background: var(--wa-bg);
          color: var(--wa-text);
          overflow-x: hidden;
        }

        .wa-landing {
          min-height: 100vh;
        }

        /* ===== NAVBAR ===== */
        .wa-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--wa-border);
          padding: 0.9rem 0;
          transition: all 0.3s ease;
        }
        .wa-nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .wa-brand {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
        }
        .wa-brand-icon {
          width: 42px;
          height: 42px;
          background: var(--wa-gradient);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 800;
          font-size: 1.1rem;
        }
        .wa-brand-text {
          font-size: 1.3rem;
          font-weight: 800;
          background: var(--wa-gradient-h);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .wa-nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .wa-nav-links a {
          text-decoration: none;
          color: var(--wa-muted);
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.2s;
        }
        .wa-nav-links a:hover { color: var(--wa-green); }
        .wa-nav-cta {
          background: var(--wa-gradient);
          color: white !important;
          padding: 0.6rem 1.5rem !important;
          border-radius: 50px;
          font-weight: 600 !important;
          transition: all 0.2s ease !important;
          box-shadow: 0 4px 15px rgba(6, 182, 212, 0.25);
        }
        .wa-nav-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(6, 182, 212, 0.35) !important;
        }

        /* ===== HERO ===== */
        .wa-hero {
          padding: 150px 0 100px;
          position: relative;
          overflow: hidden;
        }
        .wa-hero::before {
          content: '';
          position: absolute;
          top: -200px;
          left: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .wa-hero::after {
          content: '';
          position: absolute;
          bottom: -100px;
          right: -200px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(245, 158, 11, 0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .wa-hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .wa-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, rgba(6,182,212,0.1), rgba(16,185,129,0.1));
          border: 1px solid rgba(16,185,129,0.2);
          padding: 0.4rem 1rem;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--wa-green);
          margin-bottom: 1.5rem;
        }
        .wa-hero h1 {
          font-size: 3.4rem;
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 1.25rem;
          color: var(--wa-text);
        }
        .wa-hero h1 .gradient-text {
          background: var(--wa-gradient-h);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .wa-hero-desc {
          font-size: 1.15rem;
          color: var(--wa-muted);
          line-height: 1.7;
          margin-bottom: 2rem;
          max-width: 520px;
        }
        .wa-hero-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }
        .wa-btn-primary {
          background: var(--wa-gradient);
          color: white;
          border: none;
          padding: 0.9rem 2.2rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 4px 20px rgba(6, 182, 212, 0.3);
        }
        .wa-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(6, 182, 212, 0.4);
          color: white;
        }
        .wa-btn-outline {
          background: transparent;
          color: var(--wa-text);
          border: 2px solid var(--wa-border);
          padding: 0.85rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .wa-btn-outline:hover {
          border-color: var(--wa-green);
          color: var(--wa-green);
          transform: translateY(-2px);
        }

        /* Google Button in Hero */
        .wa-divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1.25rem 0;
        }
        .wa-divider hr {
          flex: 1;
          border: none;
          border-top: 1px solid var(--wa-border);
        }
        .wa-divider span {
          color: var(--wa-muted);
          font-size: 0.8rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }
        .wa-google-btn {
          background: var(--wa-card);
          border: 1.5px solid var(--wa-border);
          color: var(--wa-text);
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          min-width: 230px;
          justify-content: center;
          box-shadow: var(--wa-shadow);
        }
        .wa-google-btn:hover {
          border-color: var(--wa-teal);
          box-shadow: var(--wa-shadow-lg);
          transform: translateY(-2px);
        }

        /* Hero Visual */
        .wa-hero-visual {
          position: relative;
        }
        .wa-hero-card {
          background: var(--wa-card);
          border-radius: var(--wa-radius);
          box-shadow: var(--wa-shadow-lg);
          border: 1px solid var(--wa-border);
          overflow: hidden;
        }
        .wa-hero-card-header {
          background: var(--wa-gradient);
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .wa-hero-card-dots {
          display: flex;
          gap: 6px;
        }
        .wa-hero-card-dots span {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
        }
        .wa-hero-card-dots span:first-child { background: rgba(255,255,255,0.9); }
        .wa-hero-card-title {
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .wa-hero-card-body {
          padding: 1.5rem;
        }
        .wa-task-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.85rem;
          border-radius: var(--wa-radius-sm);
          margin-bottom: 0.6rem;
          transition: background 0.2s;
        }
        .wa-task-row:hover { background: #f8fafb; }
        .wa-task-check {
          width: 22px;
          height: 22px;
          border-radius: 6px;
          border: 2px solid var(--wa-border);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .wa-task-check.done {
          background: var(--wa-gradient);
          border-color: transparent;
          color: white;
          font-size: 0.7rem;
        }
        .wa-task-info { flex: 1; }
        .wa-task-name {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--wa-text);
        }
        .wa-task-name.completed {
          text-decoration: line-through;
          color: var(--wa-muted);
        }
        .wa-task-meta {
          font-size: 0.75rem;
          color: var(--wa-muted);
          margin-top: 2px;
        }
        .wa-task-badge {
          padding: 0.25rem 0.6rem;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 600;
        }
        .wa-badge-green { background: rgba(16,185,129,0.1); color: var(--wa-green); }
        .wa-badge-teal { background: rgba(6,182,212,0.1); color: var(--wa-teal); }
        .wa-badge-gold { background: rgba(245,158,11,0.1); color: var(--wa-gold); }
        .wa-progress-bar {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--wa-border);
        }
        .wa-progress-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          margin-bottom: 0.5rem;
          color: var(--wa-muted);
        }
        .wa-progress-track {
          height: 8px;
          background: var(--wa-border);
          border-radius: 10px;
          overflow: hidden;
        }
        .wa-progress-fill {
          height: 100%;
          background: var(--wa-gradient);
          border-radius: 10px;
          width: 72%;
        }

        /* Floating badges around hero card */
        .wa-float-badge {
          position: absolute;
          background: var(--wa-card);
          border-radius: 14px;
          padding: 0.75rem 1rem;
          box-shadow: var(--wa-shadow-lg);
          border: 1px solid var(--wa-border);
          font-size: 0.8rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          animation: waFloat 6s ease-in-out infinite;
        }
        .wa-float-badge.top-right {
          top: -20px;
          right: -30px;
          animation-delay: 0s;
        }
        .wa-float-badge.bottom-left {
          bottom: 30px;
          left: -40px;
          animation-delay: 2s;
        }
        @keyframes waFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        /* ===== LOGOS ===== */
        .wa-logos {
          padding: 3rem 0;
          border-top: 1px solid var(--wa-border);
          border-bottom: 1px solid var(--wa-border);
          background: white;
        }
        .wa-logos-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: center;
        }
        .wa-logos p {
          color: var(--wa-muted);
          font-size: 0.85rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 1.5rem;
        }
        .wa-logos-row {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 3rem;
          flex-wrap: wrap;
          opacity: 0.5;
        }
        .wa-logo-item {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--wa-text);
        }

        /* ===== FEATURES ===== */
        .wa-features {
          padding: 6rem 0;
          background: var(--wa-bg);
        }
        .wa-features-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        .wa-section-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }
        .wa-section-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: linear-gradient(135deg, rgba(6,182,212,0.1), rgba(16,185,129,0.1));
          border: 1px solid rgba(16,185,129,0.15);
          padding: 0.35rem 0.9rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--wa-green);
          margin-bottom: 1rem;
        }
        .wa-section-header h2 {
          font-size: 2.4rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
        }
        .wa-section-header p {
          color: var(--wa-muted);
          font-size: 1.1rem;
          max-width: 550px;
          margin: 0 auto;
          line-height: 1.6;
        }
        .wa-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .wa-feature-card {
          background: var(--wa-card);
          border: 1px solid var(--wa-border);
          border-radius: var(--wa-radius);
          padding: 2rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .wa-feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--wa-gradient);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .wa-feature-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--wa-shadow-lg);
          border-color: rgba(16,185,129,0.3);
        }
        .wa-feature-card:hover::before { opacity: 1; }
        .wa-feature-icon {
          width: 52px;
          height: 52px;
          background: linear-gradient(135deg, rgba(6,182,212,0.1), rgba(16,185,129,0.1));
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          font-size: 1.4rem;
        }
        .wa-feature-card h3 {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .wa-feature-card p {
          color: var(--wa-muted);
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0;
        }

        /* ===== HOW IT WORKS ===== */
        .wa-how {
          padding: 6rem 0;
          background: white;
        }
        .wa-how-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        .wa-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 3rem;
        }
        .wa-step {
          text-align: center;
          position: relative;
        }
        .wa-step-number {
          width: 64px;
          height: 64px;
          background: var(--wa-gradient);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          font-weight: 800;
          margin: 0 auto 1.25rem;
          box-shadow: 0 6px 20px rgba(6,182,212,0.25);
        }
        .wa-step h3 {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .wa-step p {
          color: var(--wa-muted);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .wa-step-connector {
          position: absolute;
          top: 32px;
          right: -1rem;
          width: 2rem;
          height: 2px;
          background: var(--wa-border);
        }
        .wa-step:last-child .wa-step-connector { display: none; }

        /* ===== STATS ===== */
        .wa-stats {
          padding: 4rem 0;
          background: var(--wa-gradient);
          position: relative;
          overflow: hidden;
        }
        .wa-stats::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .wa-stats-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
        }
        .wa-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          text-align: center;
        }
        .wa-stat-item h3 {
          font-size: 2.8rem;
          font-weight: 900;
          color: white;
          margin-bottom: 0.25rem;
        }
        .wa-stat-item p {
          color: rgba(255,255,255,0.8);
          font-weight: 500;
          font-size: 0.95rem;
          margin: 0;
        }

        /* ===== TESTIMONIALS ===== */
        .wa-testimonials {
          padding: 6rem 0;
          background: var(--wa-bg);
        }
        .wa-testimonials-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        .wa-testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .wa-testimonial-card {
          background: var(--wa-card);
          border: 1px solid var(--wa-border);
          border-radius: var(--wa-radius);
          padding: 2rem;
          transition: all 0.3s ease;
        }
        .wa-testimonial-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--wa-shadow-lg);
        }
        .wa-testimonial-stars {
          color: var(--wa-gold);
          font-size: 0.9rem;
          margin-bottom: 1rem;
          letter-spacing: 2px;
        }
        .wa-testimonial-text {
          color: var(--wa-text);
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 1.5rem;
          font-style: italic;
        }
        .wa-testimonial-author {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .wa-testimonial-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--wa-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 0.9rem;
        }
        .wa-testimonial-name {
          font-weight: 600;
          font-size: 0.95rem;
        }
        .wa-testimonial-role {
          font-size: 0.8rem;
          color: var(--wa-muted);
        }

        /* ===== CTA ===== */
        .wa-cta {
          padding: 6rem 0;
          background: white;
        }
        .wa-cta-inner {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: center;
        }
        .wa-cta-card {
          background: var(--wa-gradient);
          border-radius: var(--wa-radius);
          padding: 4rem 3rem;
          color: white;
          position: relative;
          overflow: hidden;
        }
        .wa-cta-card::before {
          content: '';
          position: absolute;
          top: -100px;
          right: -100px;
          width: 300px;
          height: 300px;
          background: rgba(255,255,255,0.08);
          border-radius: 50%;
        }
        .wa-cta-card::after {
          content: '';
          position: absolute;
          bottom: -80px;
          left: -80px;
          width: 250px;
          height: 250px;
          background: rgba(255,255,255,0.05);
          border-radius: 50%;
        }
        .wa-cta-card h2 {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
          position: relative;
          z-index: 1;
        }
        .wa-cta-card p {
          opacity: 0.9;
          font-size: 1.1rem;
          margin-bottom: 2rem;
          position: relative;
          z-index: 1;
        }
        .wa-cta-btn {
          background: white;
          color: var(--wa-teal);
          border: none;
          padding: 1rem 2.5rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 1.05rem;
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          position: relative;
          z-index: 1;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .wa-cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        /* ===== FOOTER ===== */
        .wa-footer {
          background: var(--wa-text);
          color: rgba(255,255,255,0.6);
          padding: 3rem 0 2rem;
        }
        .wa-footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        .wa-footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 2.5rem;
        }
        .wa-footer-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .wa-footer-brand-icon {
          width: 36px;
          height: 36px;
          background: var(--wa-gradient);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 800;
          font-size: 0.9rem;
        }
        .wa-footer-brand-text {
          font-size: 1.1rem;
          font-weight: 700;
          color: white;
        }
        .wa-footer-desc {
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        .wa-footer h4 {
          color: white;
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .wa-footer ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .wa-footer ul li { margin-bottom: 0.5rem; }
        .wa-footer ul a {
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s;
        }
        .wa-footer ul a:hover { color: white; }
        .wa-footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
        }
        .wa-footer-social {
          display: flex;
          gap: 1rem;
        }
        .wa-footer-social a {
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: color 0.2s;
        }
        .wa-footer-social a:hover { color: white; }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .wa-hero-inner { grid-template-columns: 1fr; text-align: center; gap: 3rem; }
          .wa-hero-desc { margin: 0 auto 2rem; }
          .wa-hero-buttons { justify-content: center; }
          .wa-hero-card { max-width: 550px; margin: 0 auto; }
          .wa-float-badge { display: none; }
          .wa-features-grid { grid-template-columns: repeat(2, 1fr); }
          .wa-stats-grid { grid-template-columns: repeat(2, 1fr); gap: 2rem; }
          .wa-testimonials-grid { grid-template-columns: repeat(2, 1fr); }
          .wa-footer-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .wa-hero h1 { font-size: 2.4rem; }
          .wa-section-header h2 { font-size: 1.8rem; }
          .wa-features-grid { grid-template-columns: 1fr; }
          .wa-steps { grid-template-columns: 1fr; gap: 2rem; }
          .wa-step-connector { display: none; }
          .wa-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .wa-testimonials-grid { grid-template-columns: 1fr; }
          .wa-footer-grid { grid-template-columns: 1fr; gap: 2rem; }
          .wa-footer-bottom { flex-direction: column; gap: 1rem; text-align: center; }
          .wa-nav-links { display: none; }
          .wa-cta-card { padding: 3rem 2rem; }
          .wa-cta-card h2 { font-size: 1.8rem; }
        }
      `}</style>

      {/* ===== NAVBAR ===== */}
      <nav className="wa-nav">
        <div className="wa-nav-inner">
          <Link to="/" className="wa-brand">
            <span className="wa-brand-text">Workasana</span>
          </Link>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="wa-hero">
        <div className="wa-hero-inner">
          <div>
            <div className="wa-hero-badge">🚀 Trusted by 10,000+ teams worldwide</div>
            <h1>Manage Projects<br/>with <span className="gradient-text">Crystal Clarity</span></h1>
            <p className="wa-hero-desc">
              A centralized platform that helps teams organize workflows, delegate responsibilities, and track progress in real time — all in one beautiful workspace.
            </p>
            <div className="wa-hero-buttons">
              <Link to="/login" className="wa-btn-primary">
                Get Started Free
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <a href="#how" className="wa-btn-outline">
                See How It Works
              </a>
            </div>
          </div>

          <div className="wa-hero-visual">
            <div className="wa-hero-card">
              <div className="wa-hero-card-header">
                <div className="wa-hero-card-dots"><span></span><span></span><span></span></div>
                <span className="wa-hero-card-title">Sprint Board — Q4 Launch</span>
              </div>
              <div className="wa-hero-card-body">
                <div className="wa-task-row">
                  <div className="wa-task-check done">✓</div>
                  <div className="wa-task-info">
                    <div className="wa-task-name completed">Design system components</div>
                    <div className="wa-task-meta">Assigned to Sarah · Completed</div>
                  </div>
                  <span className="wa-task-badge wa-badge-green">Done</span>
                </div>
                <div className="wa-task-row">
                  <div className="wa-task-check done">✓</div>
                  <div className="wa-task-info">
                    <div className="wa-task-name completed">API endpoint integration</div>
                    <div className="wa-task-meta">Assigned to Mike · Completed</div>
                  </div>
                  <span className="wa-task-badge wa-badge-green">Done</span>
                </div>
                <div className="wa-task-row">
                  <div className="wa-task-check"></div>
                  <div className="wa-task-info">
                    <div className="wa-task-name">User testing & QA review</div>
                    <div className="wa-task-meta">Assigned to Team · Due Today</div>
                  </div>
                  <span className="wa-task-badge wa-badge-teal">In Progress</span>
                </div>
                <div className="wa-task-row">
                  <div className="wa-task-check"></div>
                  <div className="wa-task-info">
                    <div className="wa-task-name">Deploy to production</div>
                    <div className="wa-task-meta">Assigned to DevOps · Due Tomorrow</div>
                  </div>
                  <span className="wa-task-badge wa-badge-gold">Pending</span>
                </div>
                <div className="wa-progress-bar">
                  <div className="wa-progress-label">
                    <span>Sprint Progress</span>
                    <span>72%</span>
                  </div>
                  <div className="wa-progress-track">
                    <div className="wa-progress-fill"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="wa-float-badge top-right">
              <span style={{color: '#10b981'}}>●</span> 3 tasks completed today
            </div>
            <div className="wa-float-badge bottom-left">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              Team velocity ↑ 24%
            </div>
          </div>
        </div>
      </section>


      {/* ===== FEATURES ===== */}
      <section id="features" className="wa-features">
        <div className="wa-features-inner">
          <div className="wa-section-header">
            <div className="wa-section-badge">✨ Features</div>
            <h2>Everything Your Team Needs</h2>
            <p>Powerful tools designed to simplify project management, boost collaboration, and keep everyone aligned.</p>
          </div>
          <div className="wa-features-grid">
            {[
              { icon: "📋", title: "Task Management", desc: "Create, assign, and track tasks with custom workflows, priorities, and deadlines." },
              { icon: "📊", title: "Visual Analytics", desc: "Interactive dashboards with filtering, sorting, and charts to identify bottlenecks instantly." },
              { icon: "👥", title: "Team Collaboration", desc: "Real-time updates, comments, and @mentions keep cross-functional teams perfectly aligned." },
              { icon: "️⏰", title: "Time Tracking", desc: "Built-in time logging and estimation tools to monitor effort and improve planning accuracy." },
              { icon: "🔔", title: "Smart Notifications", desc: "Customizable alerts ensure you never miss a deadline, update, or critical team message." },
              { icon: "🔗", title: "Integrations", desc: "Connect with Slack, GitHub, Figma, and 100+ tools your team already uses daily." }
            ].map((f, i) => (
              <div className="wa-feature-card" key={i}>
                <div className="wa-feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how" className="wa-how">
        <div className="wa-how-inner">
          <div className="wa-section-header">
            <div className="wa-section-badge">🔄 Workflow</div>
            <h2>Up and Running in Minutes</h2>
            <p>Three simple steps to transform how your team manages projects.</p>
          </div>
          <div className="wa-steps">
            <div className="wa-step">
              <div className="wa-step-number">1</div>
              <h3>Create Your Workspace</h3>
              <p>Sign up in seconds, invite your team, and set up your first project with our guided onboarding.</p>
              <div className="wa-step-connector"></div>
            </div>
            <div className="wa-step">
              <div className="wa-step-number">2</div>
              <h3>Organize & Delegate</h3>
              <p>Break work into tasks, assign owners, set deadlines, and visualize everything on boards or timelines.</p>
              <div className="wa-step-connector"></div>
            </div>
            <div className="wa-step">
              <div className="wa-step-number">3</div>
              <h3>Track & Iterate</h3>
              <p>Monitor progress with real-time analytics, adjust priorities on the fly, and celebrate wins together.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section id="cta" className="wa-cta">
        <div className="wa-cta-inner">
          <div className="wa-cta-card">
            <h2>Ready to Streamline Your Workflow?</h2>
            <p>Join 10,000+ teams who are shipping faster, staying aligned, and actually enjoying project management.</p>
            <a href="#" className="wa-cta-btn">
              Start Your Free Trial
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="wa-footer">
        <div className="wa-footer-inner">
          <div className="wa-footer-grid">
            <div>
              <div className="wa-footer-brand">
                <span className="wa-footer-brand-text">Workasana</span>
              </div>
              <p className="wa-footer-desc">A modern project management platform built for teams that ship. Organize, delegate, and track — all in one place.</p>
            </div>
            
          
          </div>
          <div className="wa-footer-bottom">
            <span>&copy; {new Date().getFullYear()} Workasana. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
