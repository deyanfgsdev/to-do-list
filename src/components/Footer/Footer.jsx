import rrssData from '../../data/rrssData'

import './Footer.scss'

const Footer = () => {
  return (
    <footer>
      <address className='to-do-list--footer-author'>
        &copy; 2024 Developed by deyanfgsdev
      </address>
      <div className='to-do-list--footer-rrss'>
        {rrssData.map(({ id, icon: Icon, url }) => (
          <a key={id} href={url} target='_blank' rel='noopener noreferrer'>
            <Icon />
          </a>
        ))}
      </div>
    </footer>
  )
}

export default Footer
