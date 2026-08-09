import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const [liftOpen, setLiftOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">
          <img src={`${process.env.PUBLIC_URL}/dg.png`} alt="NLETA Logo" />
          <span className="company-name">National Lift Escalator Testing Agency</span>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </button>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/industry" className={location.pathname === '/industry' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Industry</Link></li>
          <li
            className="dropdown"
            onMouseEnter={() => setLiftOpen(true)}
            onMouseLeave={() => setLiftOpen(false)}
          >
            <span className={location.pathname.includes('inspection') ? 'active nav-dropdown-label' : 'nav-dropdown-label'} onClick={() => setLiftOpen(!liftOpen)}>
              Lift / Escalators ▾
            </span>
            {liftOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/lift-inspection" onClick={() => { setLiftOpen(false); setMenuOpen(false); }}>Lift Inspection</Link></li>
                <li><Link to="/escalator-inspection" onClick={() => { setLiftOpen(false); setMenuOpen(false); }}>Escalator Inspection</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/assessments" className={location.pathname === '/assessments' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Projects & Trainings</Link></li>
          <li><Link to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Gallery</Link></li>
          <li><Link to="/lift-acts" className={location.pathname === '/lift-acts' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Lift Acts & Standards</Link></li>
          <li><a href="http://nleta-dashboard.page.gd/dashboard/login.php" target="_blank" rel="noreferrer" className="nav-dashboard-link">Dashboard</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
