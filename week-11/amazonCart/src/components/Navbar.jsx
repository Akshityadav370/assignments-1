import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import '../Navbar.css';
import { useRecoilValue } from 'recoil';
import { totalItems } from '../store/cartItemsState';

export default function Navbar() {
  const itemCount = useRecoilValue(totalItems);

  return (
    <nav>
      <div>
        <Link to={'/'}>
          <img
            alt='logo'
            src='https://www.shutterstock.com/image-vector/chattogram-bangladesh-april-24-2023-600nw-2292992631.jpg'
          />
        </Link>
      </div>
      <div>
        <p>Hello, User</p>
        <Link to={'/cart'}>
          <div>
            <FontAwesomeIcon
              icon={faCartShopping}
              style={{ color: '#f7f7f7' }}
            />
            <span>{itemCount}</span>
          </div>
        </Link>
      </div>
    </nav>
  );
}
