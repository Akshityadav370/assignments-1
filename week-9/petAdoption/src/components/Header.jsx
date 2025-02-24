import style from './header.module.css';

const Header = (props) => {
  return <div className={style.header}>{props.message}</div>;
};

export default Header;
