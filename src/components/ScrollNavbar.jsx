import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import config from '../config';

const ScrollNavbar = () => {
  const [logoError, setLogoError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); 

  // Extract colors from config
  const { primary, secondary, accent, text, background } = config.colors

  const handleLinkClick = (targetPath) => {
    navigate(targetPath);
    window.scrollTo(0, 0);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full z-20 shadow-md"
      style={{ backgroundColor: background }}
    >
      <nav className="flex justify-between items-center p-8">
        <div className="flex items-end">
          <Link to="/">
            {!logoError ? (
              <img 
                src={config.logo || "/logo.png"} 
                alt={`${config.organization} Logo`} 
                className="h-8 w-auto md:h-12 w-auto"
                onError={() => setLogoError(true)}
              />
            ) : (
              <span 
                className="text-xl md:text-2xl font-bold"
                style={{ color: primary }}
              >
                {config.organization}
              </span>
            )}
          </Link>
          <span 
            className="hidden md:block ml-3 font-bold text-xl self-end"
            style={{ color: primary }}
          >
            OSS
          </span>
        </div>

      </nav>
    </div>
  );
};

export default ScrollNavbar;