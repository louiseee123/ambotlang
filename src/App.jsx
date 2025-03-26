import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaBookOpen, FaHeart, FaSearch, FaArrowRight, FaRegStar, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Navbar from './assets/components/Navbar';
import './App.css';
import Library from './Library';
import Favorites from './Favorites';
import Loans from './Loans';

const featuredBooks = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    blurb: "Between life and death there is a library. What will you find there?",
    rating: 4.5,
    isAvailable: true
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    blurb: "Tiny changes, remarkable results.",
    rating: 5,
    isAvailable: true
  },
  {
    id: 3,
    title: "Dune",
    author: "Frank Herbert",
    blurb: "The spice must flow.",
    rating: 4.8,
    isAvailable: false
  }
];

const genres = ["Fantasy", "Sci-Fi", "Mystery", "Romance", "Non-Fiction"];

const BookCard = ({ book }) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const handleBorrowClick = () => {
    if (book.isAvailable) {
      navigate('/loans');
    }
  };

  return (
    <motion.div 
      className={`book-card ${!book.isAvailable ? 'unavailable' : ''}`}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="book-header">
        <h3>{book.title}</h3>
        <button 
          className="like-btn" 
          onClick={() => setIsLiked(!isLiked)}
          aria-label={isLiked ? "Unlike book" : "Like book"}
        >
          <FaHeart color={isLiked ? "#ff4757" : "#ddd"} />
        </button>
      </div>
      <p className="author">{book.author}</p>
      <p className="blurb">{book.blurb}</p>
      <div className="book-footer">
        <div className="rating">
          {[...Array(5)].map((_, i) => (
            i < Math.floor(book.rating) ? 
              <FaStar key={i} color="#f39c12" /> : 
              <FaRegStar key={i} color="#f39c12" />
          ))}
          <span>({book.rating})</span>
        </div>
        <button className="action-btn" onClick={handleBorrowClick}>
          {book.isAvailable ? "Borrow Now" : "Join Waitlist"} <FaArrowRight />
        </button>
      </div>
    </motion.div>
  );
};

const GenrePill = ({ genre }) => {
  const navigate = useNavigate();
  
  const handleGenreClick = () => {
    navigate('/library', { state: { genre } });
  };

  return (
    <motion.span 
      className="genre-pill"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleGenreClick}
    >
      {genre}
    </motion.span>
  );
};

const Home = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/library', { state: { searchQuery } });
    }
  };

  return (
    <main className="content">
      <section className="hero">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Borrow Books Like <span className="highlight">Lightning</span>
        </motion.h1>
        <p className="subtitle">Instant access to your local library's collection</p>
        
        <form className="search-bar" onSubmit={handleSearchSubmit}>
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search for titles, authors, or genres..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </section>

      <section className="featured">
        <h2>Featured Books</h2>
        <div className="books-grid">
          {featuredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      <section className="genres">
        <h2>Browse by Genre</h2>
        <div className="genre-container">
          {genres.map((genre, index) => (
            <GenrePill key={index} genre={genre} />
          ))}
        </div>
      </section>
    </main>
  );
};

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <div className="app">
        <Navbar />
        
        <Routes>
          <Route 
            path="/" 
            element={<Home searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} 
          />
          <Route path="/library" element={<Library />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>

        <footer className="footer">
          <p>© 2023 QuickBooks Library | No late fees, just reading</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;