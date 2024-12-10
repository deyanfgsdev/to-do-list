import './Header.scss';

const Header = ({ mainTitle }: { mainTitle: string }) => {
  return (
    <header className="header">
      <h1 className="header__main-title">{mainTitle}</h1>
    </header>
  );
};

export default Header;
