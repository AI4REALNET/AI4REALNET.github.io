import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import config from '../config';
// Import FontAwesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowUp, faArrowDown, faTimes, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

const Header = ({
  searchTerm,
  onSearchChange,
  onSortByStars,
  onSortByRepos,
  onCategoryChange,
  activeFilters,
  onRemoveTag,
  sortByStars,
  sortByRepos,
  defaultCategory
}) => {
  const [activeCategory, setActiveCategory] = useState(defaultCategory || 'All');
  const [isArrowUp, setIsArrowUp] = useState(true);
  const [calendarArrowUp, setCalendarArrowUp] = useState(true);
  
  // Extract colors from config
  const { primary, secondary, accent, text, background } = config.colors
  
  const categories = config.categories && config.categories.length > 0 
    ? config.categories.map(cat => cat.label) 
    : ['All'];

  const handleSearchInputChange = (event) => {
    onSearchChange(event.target.value);
  };

  const toggleArrow = () => {
    setIsArrowUp(!isArrowUp);
    onSortByStars();
  };

  const toggleCalendarArrow = () => {
    setCalendarArrowUp(!calendarArrowUp);
    onSortByRepos();
  };

  useEffect(() => {
    setActiveCategory(defaultCategory || 'All');
  }, [defaultCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    onCategoryChange(category);
  };

  // Style for category buttons
  const categoryButtonStyle = (isActive) => ({
    padding: '0.25rem 1rem',
    fontSize: '0.75rem',
    fontWeight: '600',
    borderRadius: '9999px',
    transition: 'colors 0.3s',
    backgroundColor: isActive ? primary : background,
    color: isActive ? 'white' : primary,
    border: isActive ? 'none' : `1px solid ${primary}`
  });

  // Style for filter tags
  const filterTagStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: primary,
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    marginRight: '0.5rem',
    marginBottom: '0.5rem'
  };

  // Gradient text style
  const gradientTextStyle = {
    background: `linear-gradient(to right, ${primary}, ${secondary})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'inline-block'
  };

  return (
    <header style={{
      backgroundColor: background,
      color: text,
      position: 'relative',
      zIndex: 10,
      paddingTop: '0.5rem'
    }} className="font-mono pt-2 md:p-8">
      <div className="flex flex-col items-start ml-6 md:ml-8 mt-8 mb-6">
        <Link to="/">
          <img src={config.logo} alt={config.organization} className="h-12 md:h-20" />
        </Link>
        <span 
          className="mt-4 mb-4 text-2xl md:text-4xl"
          style={gradientTextStyle}
        >
          {config.title || "Open Source Software"}
        </span>
        <div className="flex space-x-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              style={categoryButtonStyle(activeCategory === category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center w-full px-6 md:px-8">
        <div className="flex-grow flex overflow-hidden" style={{
          border: `1px solid ${primary}`,
          borderRadius: '9999px'
        }}>
          <input
            type="text"
            className="flex-grow ml-6 p-2 outline-none"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchInputChange}
            style={{
              backgroundColor: background,
              color: text,
              '::placeholder': { color: text }
            }}
          />
          <button style={{
            padding: '0.5rem 1rem',
            backgroundColor: background,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FontAwesomeIcon icon={faSearch} style={{ color: primary }} />
          </button>
        </div>
        <div className="hidden md:flex items-center ml-4">
          <span style={{ color: primary }}>Sort: </span>
          <div className="ml-2 flex items-center">
            <FontAwesomeIcon icon={faStarRegular} style={{ color: primary, marginLeft: '0.5rem' }} />
            <button
              onClick={toggleArrow}
              className="focus:outline-none"
              style={{ 
                opacity: sortByRepos ? 0.5 : 1,
                cursor: sortByRepos ? 'not-allowed' : 'pointer'
              }}
              disabled={!!sortByRepos}
            >
              <FontAwesomeIcon
                icon={isArrowUp ? faArrowUp : faArrowDown}
                style={{ color: primary, marginLeft: '0.25rem' }}
              />
            </button>
          </div>
          <div className="ml-2 flex items-center">
            <FontAwesomeIcon icon={faCodeBranch} style={{ color: primary, marginLeft: '0.5rem' }} />
            <button
              onClick={toggleCalendarArrow}
              className="focus:outline-none"
              style={{ 
                opacity: sortByStars ? 0.5 : 1,
                cursor: sortByStars ? 'not-allowed' : 'pointer'
              }}
              disabled={!!sortByStars}
            >
              <FontAwesomeIcon
                icon={calendarArrowUp ? faArrowUp : faArrowDown}
                style={{ color: primary, marginLeft: '0.25rem' }}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center flex-wrap mt-4 ml-6 md:ml-8">
        {activeFilters.map((filter, index) => (
          <div
            key={index}
            style={filterTagStyle}
          >
            <span>{filter}</span>
            <FontAwesomeIcon
              icon={faTimes}
              style={{ marginLeft: '0.5rem', cursor: 'pointer' }}
              onClick={() => onRemoveTag(filter)}
            />
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;