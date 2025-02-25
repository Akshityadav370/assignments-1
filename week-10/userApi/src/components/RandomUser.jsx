import { useEffect, useState } from 'react';
import axios from 'axios';
import style from './RandomUser.module.css';

const URL = 'https://randomuser.me/api/';
const LIMIT = 10;
const SEED = 'abc';

const RandomUser = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(`${URL}/?page=${page}&results=${LIMIT}&seed=${SEED}`)
      .then((res) => {
        setData((prevData) => [...prevData, ...res.data.results]);
      })
      .catch((err) => console.error('Error fetching data:', err));
  }, [page]);

  return (
    <div className={style.mainContainer}>
      <div className={style.gridContainer}>
        {data.map((user) => (
          <div key={user.cell} className={style.userContainer}>
            <img
              src={user.picture?.large}
              alt='User'
              className={style.userImage}
            />
            <h3>
              {user.name.title}. {user.name.first} {user.name.last}
            </h3>
          </div>
        ))}
      </div>
      <button
        onClick={() => setPage((prevPage) => prevPage + 1)}
        className={style.loadMoreButton}
      >
        Load More
      </button>
    </div>
  );
};

export default RandomUser;
