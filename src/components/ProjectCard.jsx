import React, { useState, useEffect } from 'react';
import config from '../config';
import GitHubIcon from '../assets/github-icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faCodeBranch as faCodeBranchSolid } from '@fortawesome/free-solid-svg-icons';
import { Popover, Button } from 'antd'; 

const ProjectCard = ({ project, onTagClick }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [truncationLimit, setTruncationLimit] = useState(30);

  // Extract colors from config
  const { primary, secondary, accent, text, background } = config.colors 

  useEffect(() => {
    const updateTruncationLimit = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1280) {
        setTruncationLimit(50);
      } else if (screenWidth >= 1024) {
        setTruncationLimit(40);
      } else if (screenWidth >= 768) {
        setTruncationLimit(30);
      } else {
        setTruncationLimit(20);
      }
    };

    updateTruncationLimit();
    window.addEventListener('resize', updateTruncationLimit);

    return () => window.removeEventListener('resize', updateTruncationLimit);
  }, []);

  useEffect(() => {
    if (project.project_logo) {
      try {
        // Try to load from assets folder
        import(`../assets/${project.project_logo}`)
          .then((module) => {
            setImageSrc(module.default);
          })
          .catch((err) => {
            console.error('Error loading project logo:', err);
            setImageSrc(null);
          });
      } catch (error) {
        console.error('Error importing project logo:', error);
        setImageSrc(null);
      }
    } else {
      setImageSrc(null);
    }
  }, [project.project_logo]);

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const normalizeTags = (tags) => {
    if (!tags || !Array.isArray(tags)) return [];
    
    const uniqueTags = new Set();
    tags.forEach(tag => {
      uniqueTags.add(tag.toLowerCase());
    });
    return Array.from(uniqueTags);
  };
  
  // A simple placeholder logo as base64 (a gray square with rounded corners)
  const defaultLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF8WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDYwLCAyMDIwLzA1LzEyLTE2OjA0OjE3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMiAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMDQtMDRUMTA6MDU6NDQrMDI6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTA0LTA0VDEwOjA1OjQ0KzAyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTA0LTA0VDEwOjA1OjQ0KzAyOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjRkZTZlZWMyLWI5ZGQt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';

  // For organization links
  const organization = config.organization || "INESCTEC";

  const filteredTags = project.project_tags
    ? normalizeTags(project.project_tags).filter(tag => tag !== (project.project_area ? project.project_area.toLowerCase() : ''))
    : [];
    
  const maxTagsToShow = 3;
  const extraTags = filteredTags.length > maxTagsToShow ? filteredTags.slice(maxTagsToShow) : [];
  const visibleTags = filteredTags.slice(0, maxTagsToShow);

  const popoverContent = (
    <div className="flex flex-wrap">
      {extraTags.map((tag, index) => (
        <span
          key={tag + index}
          style={{ 
            padding: '0.25rem 0.75rem', 
            backgroundColor: primary, 
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '9999px',
            fontSize: '0.875rem',
            cursor: 'pointer',
            margin: '0.25rem'
          }}
          onClick={() => onTagClick(tag)}
        >
          {tag}
        </span>
      ))}
    </div>
  );

  // Style for tag buttons
  const tagStyle = {
    padding: '0.25rem 0.75rem', 
    backgroundColor: primary, 
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    cursor: 'pointer'
  };

  // Style for links
  const linkStyle = {
    color: primary
  };
  
  return (
    <>
      {/* Desktop view */}
      <div 
        className="hidden md:flex justify-between font-mono relative mb-12 ml-8 mr-12 md:mx-16"
        style={{ 
          backgroundColor: background,
          color: text,
          position: 'relative'
        }}
      >
        {/* Left bar gradient */}
        <div 
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '4px',
            background: `linear-gradient(to bottom, ${primary}, ${secondary})`
          }}
        />
        
        <div className="flex-auto pl-4" style={{ width: '65%' }}>
          <div className="flex flex-col items-start space-y-2 mb-2">
            <a href={`https://github.com/orgs/${organization}/repositories?q=topic%3A${project.project_topic}`} target="_blank" rel="noopener noreferrer">
              {imageSrc ? (
                <img src={imageSrc} alt={project.project_name} className="h-12 w-auto" />
              ) : (
                <span 
                  className="text-xl font-bold"
                  style={{ color: primary }}
                >
                  {project.project_name}
                </span>
              )}
            </a>
            {project.project_website ? (
              <a 
                href={project.project_website} 
                target="_blank" 
                className="text-md" 
                rel="noreferrer"
                style={linkStyle}
              >
                Project Website
              </a>
            ) : (
              <span className="block h-6"></span>
            )}
          </div>
          <div className="mb-4 text-start max-w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl">
            <p style={{ color: text }}>
              {project.project_description
                ? project.project_description
                : 'No description available.'}
            </p>
          </div>
          <div className="flex space-x-2 items-center">
            {project.project_area && (
              <span
                style={tagStyle}
                onClick={() => onTagClick(project.project_area)}
              >
                {project.project_area}
              </span>
            )}

            {visibleTags.map((tag, index) => (
              <span
                key={tag + index}
                style={tagStyle}
                onClick={() => onTagClick(tag)}
              >
                {tag}
              </span>
            ))}

            {extraTags.length > 0 && (
              <Popover content={popoverContent} title="Extra Tags" trigger="click">
                <Button style={{
                  ...tagStyle,
                  border: 'none',
                  height: 'auto',
                  lineHeight: 'normal'
                }}>
                  ...
                </Button>
              </Popover>
            )}
          </div>
        </div>
        <div className="flex-none pl-4" style={{ width: '32%' }}>
          <div className="flex flex-col justify-between h-full">
            <div>
              <h3 className="font-semibold mb-3 text-start">Top OSS Repositories</h3>
              <div className="flex flex-col space-y-3 mb-3" style={{ maxHeight: 'calc(100% - 40px)', overflowY: 'auto' }}>
                {project.top_repositories && project.top_repositories.length > 0 ? (
                  project.top_repositories.map(repo => (
                    <div key={repo.name} className="flex justify-between text-start">
                      <div className="flex items-start flex-grow overflow-hidden">
                        <img src={GitHubIcon} alt="GitHub" className="h-6 w-6 mr-2 mb-1" />
                        <a 
                          href={`https://github.com/${organization}/${repo.name}`} 
                          className="truncate" 
                          style={{ color: text }}
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          {truncateText(repo.name, truncationLimit)}
                        </a>
                      </div>
                      <div className="flex items-center ml-4">
                        <span className="mr-1">{repo.stars}</span>
                        <FontAwesomeIcon icon={faStarRegular} />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center w-full">No repositories available.</p>
                )}
              </div>
            </div>
            <div className="mt-auto text-end">
              <a 
                href={`https://github.com/orgs/${organization}/repositories?q=topic%3A${project.project_topic}`} 
                style={linkStyle}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <button style={linkStyle}>See repositories</button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile view */}
      <div className="block md:hidden relative z-10 mb-8 mx-4 sm:mx-8">
        <div 
          className="flex flex-col p-4 rounded-lg shadow-md"
          style={{ 
            backgroundColor: background,
            borderColor: secondary,
            borderWidth: '1px'
          }}
        >
          <div className="flex flex-col items-center mb-4">
            {imageSrc ? (
              <img src={imageSrc} alt={project.project_name} className="h-12 w-auto" />
            ) : (
              <span 
                className="text-xl font-bold mb-2"
                style={{ color: primary }}
              >
                {project.project_name}
              </span>
            )}
            <div className="flex items-center space-x-2 mt-2 mb-2 text-sm">
              <div className="items-center">
                <img src={GitHubIcon} alt="GitHub" className="h-4 w-4" />
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faStarRegular} />
                <span className="ml-1">{project.total_stars || 0}</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faCodeBranchSolid} />
                <span className="ml-1">{project.total_repositories || 0}</span>
              </div>
            </div>
            {project.project_website ? (
              <a 
                href={project.project_website} 
                style={linkStyle}
                className="mt-2 mb-4 text-xs" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Project Website
              </a>
            ) : (
              <span className="block h-6"></span>
            )}
            <div className="flex flex-wrap justify-center mb-4">
              {project.project_area && (
                <span
                  style={{
                    ...tagStyle,
                    fontSize: '0.75rem',
                    marginRight: '0.25rem',
                    marginBottom: '0.25rem'
                  }}
                  onClick={() => onTagClick(project.project_area)}
                >
                  {project.project_area}
                </span>
              )}
              
              {visibleTags.map((tag, index) => (
                <span
                  key={tag + index}
                  style={{
                    ...tagStyle,
                    fontSize: '0.75rem',
                    marginRight: '0.25rem',
                    marginBottom: '0.25rem'
                  }}
                  onClick={() => onTagClick(tag)}
                >
                  {tag}
                </span>
              ))}

              {extraTags.length > 0 && (
                <Popover content={popoverContent} title="Extra Tags" trigger="click">
                  <Button style={{
                    ...tagStyle,
                    fontSize: '0.75rem',
                    border: 'none',
                    height: 'auto',
                    lineHeight: 'normal'
                  }}>
                    ...
                  </Button>
                </Popover>
              )}
            </div>
            <div className="mt-auto text-center">
              <a 
                href={`https://github.com/orgs/${organization}/repositories?q=topic%3A${project.project_topic}`} 
                style={linkStyle}
                className="text-sm" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                See all repositories
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;