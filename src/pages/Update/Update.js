import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Update.module.scss';

const onlyNumber = (value) => {
  return value.toString().replace(/[^0-9.]/g, '');
};

const Update = () => {
  const { recycler_id, branch_id } = useParams();
  const [result, setResult] = useState(null);
  const [inputs, setInputs] = useState({
    '2K': '',
    '5K': '',
    '10K': '',
    '20K': '',
    '50K': '',
    '100K': '',
  });
  const [_AC, set_AC] = useState('');
  const [_TOTAL, set_TOTAL] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(null);

    const updateRecyclerURL = `${process.env.REACT_APP_HOST}/CREDICENTRO/services/api/recycler/update.php`;

    const {
      '2K': cassette_1_count,
      '5K': cassette_2_count,
      '10K': ac_10k_count,
      '20K': ac_20k_count,
      '50K': cassette_3_count,
      '100K': cassette_4_count,
    } = inputs;

    var data = {
      recycler_id,
      branch_id,
      cassette_1_count,
      cassette_2_count,
      ac_10k_count,
      ac_20k_count,
      cassette_3_count,
      cassette_4_count,
      ac_total: _AC,
      total_cash: _TOTAL,
    };

    fetch(updateRecyclerURL, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((response) => setResult(response.message))
      .catch((error) => console.error('Error:', error));
  };

  const handleInputs = (e) => {
    setInputData(e.target.name, e.target.value);
  };

  const setInputData = (name, value) => {
    setInputs((inputs) => ({ ...inputs, [name]: onlyNumber(value) }));
  };

  useEffect(() => {
    const getData = () => {
      const getRecyclerURL = `${process.env.REACT_APP_HOST}/CREDICENTRO/services/api/recycler/read.php?recycler_id=${recycler_id}&branch_id=${branch_id}`;
      fetch(getRecyclerURL)
        .then((response) => response.json())
        .then((data) => {
          const {
            cassette_1_count,
            cassette_2_count,
            ac_10k_count,
            ac_20k_count,
            cassette_3_count,
            cassette_4_count,
          } = data.data[0];
          setInputData('2K', cassette_1_count);
          setInputData('5K', cassette_2_count);
          setInputData('10K', ac_10k_count);
          setInputData('20K', ac_20k_count);
          setInputData('50K', cassette_3_count);
          setInputData('100K', cassette_4_count);

          const ac_total = ac_10k_count * 10000 + ac_20k_count * 20000;
          const total_cash =
            ac_total +
            cassette_1_count * 2000 +
            cassette_2_count * 5000 +
            cassette_3_count * 50000 +
            cassette_4_count * 100000;

          set_AC(ac_total);
          set_TOTAL(total_cash);
        })
        .catch((error) => console.log(error));
    };

    getData();
  }, [recycler_id, branch_id]);

  useEffect(() => {
    const {
      '2K': cassette_1_count,
      '5K': cassette_2_count,
      '10K': ac_10k_count,
      '20K': ac_20k_count,
      '50K': cassette_3_count,
      '100K': cassette_4_count,
    } = inputs;

    const ac_total = ac_10k_count * 10000 + ac_20k_count * 20000;
    const total_cash =
      ac_total +
      cassette_1_count * 2000 +
      cassette_2_count * 5000 +
      cassette_3_count * 50000 +
      cassette_4_count * 100000;

    set_AC(ac_total);
    set_TOTAL(total_cash);
  }, [inputs]);

  return (
    <main className={styles.component}>
      <div className='container'>
        <div className={styles.content}>
          <h1>
            Update: {recycler_id} - {branch_id}{' '}
          </h1>
          <form onSubmit={handleSubmit}>
            <div className='form__field'>
              2K{' '}
              <Input
                className='input'
                type='text'
                name='2K'
                value={inputs['2K']}
                onChange={handleInputs}
              />
            </div>
            <div className='form__field'>
              5K{' '}
              <Input
                className='input'
                type='text'
                name='5K'
                value={inputs['5K']}
                onChange={handleInputs}
              />
            </div>
            <div className='form__field'>
              10K{' '}
              <Input
                className='input'
                type='text'
                name='10K'
                value={inputs['10K']}
                onChange={handleInputs}
              />
            </div>
            <div className='form__field'>
              20K{' '}
              <Input
                className='input'
                type='text'
                name='20K'
                value={inputs['20K']}
                onChange={handleInputs}
              />
            </div>
            <div className='form__field'>
              50K{' '}
              <Input
                className='input'
                type='text'
                name='50K'
                value={inputs['50K']}
                onChange={handleInputs}
              />
            </div>
            <div className='form__field'>
              100K{' '}
              <Input
                className='input'
                type='text'
                name='100K'
                value={inputs['100K']}
                onChange={handleInputs}
              />
            </div>
            <div className='form__field'>
              AC TOTAL{' '}
              <Input
                className='input'
                type='text'
                value={_AC}
                readOnly
                onChange={(e) => set_AC(e.target.value)}
              />
            </div>
            <div className='form__field'>
              TOTAL{' '}
              <Input
                className='input'
                type='text'
                value={_TOTAL}
                readOnly
                onChange={(e) => set_TOTAL(e.target.value)}
              />
            </div>
            <div className='form__field'>
              <Button className='button secondary' type='submit'>
                Update
              </Button>
            </div>
          </form>
          {result && <p>{result}</p>}
        </div>
      </div>
    </main>
  );
};

export default Update;
