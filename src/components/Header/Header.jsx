import './Header.scss'

const Header = ({ mainTitle }) => {
  return (
    <header className='header'>
      <h1 className='header__main-title'>{mainTitle}</h1>
    </header>
  )
}

export default Header
