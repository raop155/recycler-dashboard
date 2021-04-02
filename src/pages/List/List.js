import React, { useEffect, useState } from 'react';
import Button from 'components/Button/Button';
import styles from './List.module.scss';
import { useHistory } from 'react-router-dom';

const List = () => {
  const history = useHistory();
  const [list, setList] = useState([]);

  useEffect(() => {
    const getData = () => {
      const getRecyclerURL = `${process.env.REACT_APP_HOST}/CREDICENTRO/services/api/recycler/read.php`;
      fetch(getRecyclerURL)
        .then((response) => response.json())
        .then((data) => setList(data.data))
        .catch((error) => console.log(error));
    };

    getData();
  }, []);

  const handleUpdate = (recycler_id, branch_id) => {
    history.push(`/update/${recycler_id}/${branch_id}`);
  };

  return (
    <main className={styles.component}>
      <div className='container'>
        <div className={styles.content}>
          <h1>Recycler List</h1>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>BranchId</th>
                <th>2K</th>
                <th>5K</th>
                <th>10K</th>
                <th>20K</th>
                <th>50K</th>
                <th>100K</th>
                <th>AC Total</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {list.length > 0 &&
                list.map((item, index) => (
                  <tr key={index}>
                    <td>{item.recycler_id}</td>
                    <td>{item.branch_id}</td>
                    <td>{item.cassette_1_count}</td>
                    <td>{item.cassette_2_count}</td>
                    <td>{item.ac_10k_count}</td>
                    <td>{item.ac_20k_count}</td>
                    <td>{item.cassette_3_count}</td>
                    <td>{item.cassette_4_count}</td>
                    <td>{item.ac_total}</td>
                    <td>{item.total_cash}</td>
                    <td>
                      <Button
                        className='button primary'
                        onClick={() => handleUpdate(item.recycler_id, item.branch_id)}
                      >
                        Update
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default List;
