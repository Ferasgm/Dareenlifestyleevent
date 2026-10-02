import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Header.css';

/* Event links (second bar, Home page only) — each id must match a section id in Home.js */
const SECTION_LINKS = [
  { id: 'graduation', label: 'Graduation' },
  { id: 'birthday', label: 'Birthday' },
  { id: 'corporate', label: 'National Day' },
  { id: 'FoundingDay', label: 'Founding Day' },
  { id: 'TableSettingDesigns', label: 'Table Settings' },
  { id: 'Camp&TripEvents', label: 'Camp & Trip' },
];

const LOGO = `${process.env.PUBLIC_URL}/assets/dareenlifestylelogo1.png`;

function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const headerRef = useRef(null);

  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Measure the header so the page starts just below it
  useEffect(() => {
    const el = headerRef.current;
    const root = document.documentElement;
    if (!el) return undefined;

    const update = () => {
      const h = el.offsetHeight;
      root.style.setProperty('--header-h', `${h}px`);
      document.body.style.paddingTop = `${h}px`;
    };
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [isHome]);

  // Hide when scrolling down, show when scrolling up
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      const diff = y - lastY;
      if (Math.abs(diff) < 8) return; // ignore tiny movements
      const h = headerRef.current ? headerRef.current.offsetHeight : 0;
      setHidden(diff > 0 && y > h && !menuOpen);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  // New page: close the phone menu and start at the top
  useEffect(() => {
    setMenuOpen(false);
    setHidden(false);
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [pathname]);

  // Highlight the event link of the section you're looking at
  useEffect(() => {
    if (!isHome) return undefined;
    setActiveSection('');
    const sections = SECTION_LINKS
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  // Logo / Home: if already on Home, scroll back to the top
  const goHome = (e) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const goToSection = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navClass = ({ isActive }) => (isActive ? 'is-current' : '');

  return (
    <header
      ref={headerRef}
      className={`site-top ${hidden ? 'is-hidden' : ''} ${scrolled ? 'is-scrolled' : ''}`}
    >
      {/* Main bar: logo + pages */}
      <div className="main-bar">
        <Link to="/" className="site-logo" onClick={goHome} aria-label="DAREEN Lifestyle home">
          <img src={LOGO} alt="DAREEN Lifestyle" />
        </Link>

        <button
          type="button"
          className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="main-nav" className={`main-nav ${menuOpen ? 'is-open' : ''}`}>
          <NavLink to="/" end className={navClass} onClick={goHome}>Home</NavLink>
          <NavLink to="/AboutUs" className={navClass} onClick={() => setMenuOpen(false)}>About Us</NavLink>
          <NavLink to="/Contact" className={navClass} onClick={() => setMenuOpen(false)}>Contact</NavLink>
        </nav>
      </div>

      {/* Second bar: event sections (Home page only) */}
      {isHome && (
        <div className="section-bar">
          <nav className="section-nav" aria-label="Event sections">
            {SECTION_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={activeSection === link.id ? 'is-active' : ''}
                onClick={(e) => goToSection(e, link.id)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;