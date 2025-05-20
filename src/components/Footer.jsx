import React from 'react';
import config from '../config';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const organization = config.organization
  
  // Extract colors from config
  const { primary, secondary, accent, text, background } = config.colors

  return (
    <footer style={{
      background: `linear-gradient(to right, ${primary}, ${secondary})`,
      color: 'white',
      padding: '1rem 0',
      fontFamily: 'monospace'
    }}>
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-14 text-sm md:text-base">
          <a 
            href={`mailto:oss@${organization.toLowerCase().replace(/\s+/g, '')}.pt`} 
            className="hover:underline"
            style={{ color: 'white' }}
          >
            Contact us
          </a>
          <a 
            href={`https://github.com/${organization}/.github/blob/main/documents/code_of_conduct.md`} 
            className="hover:underline"
            style={{ color: 'white' }}
          >
            Code of Conduct
          </a>
        </div>
        <div className="mt-4 md:mt-0 text-center md:text-right text-sm md:text-base">
          {currentYear}, {organization}
        </div>
      </div>
    </footer>
  );
};

export default Footer;