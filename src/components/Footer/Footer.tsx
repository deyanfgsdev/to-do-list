import rrssData from '../../data/rrssData';

import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <address className="footer__author">
        &copy; 2024 Developed by deyanfgsdev
      </address>
      <div className="footer__rrss">
        {rrssData.map(({ id, icon: Icon, url }) => (
          <a
            key={id}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="rrss-link"
          >
            <Icon />
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
