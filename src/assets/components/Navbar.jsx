import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBookOpen, FaSearch, FaUser, FaBell, FaTimes, FaBars } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/', id: 'home' },
    { name: 'Browse Libraries', path: '/library', id: 'browse' },
    { name: 'My Loans', path: '/loans', id: 'loans' },
    { name: 'Favorites', path: '/favorites', id: 'favorites' }
  ];

  return (
    <nav className={`navbar ${hasScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <motion.div 
          className="navbar-brand"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <Link to="/" className="brand-link">
            <FaBookOpen className="brand-icon" />
            <span className="brand-name">QuickBooks</span>
          </Link>
        </motion.div>

        {/* Mobile Menu Toggle */}
        <button 
          className="navbar-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Items */}
        <AnimatePresence>
          {(isMenuOpen || window.innerWidth > 992) && (
            <motion.div
              className={`navbar-collapse ${isMenuOpen ? 'mobile-menu-open' : ''}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="navbar-nav">
                {navItems.map((item) => (
                  <motion.li 
                    key={item.id}
                    className="nav-item"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => 
                        `nav-link ${isActive ? 'active' : ''}`
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              {/* Search and User Controls */}
              <div className="navbar-controls">
                <form className="search-form" onSubmit={handleSearch}>
                  <div className="search-input-group">
                    <FaSearch className="search-icon" />
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search books..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button 
                        type="button" 
                        className="clear-search"
                        onClick={() => setSearchQuery('')}
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                </form>

                <div className="user-controls">
                  <button className="notification-btn">
                    <FaBell />
                    <span className="notification-badge">3</span>
                  </button>
                  <button className="user-btn">
                    <FaUser />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navbar;