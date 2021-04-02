import React from 'react';
import styles from "./Header.module.scss"

const Header = () => {
  return (
    <header className={styles.component}>
      <div className="container">
        <div className={styles.content}>
          <h1>Recyclers</h1>
        </div>
      </div>

    </header>
  );
};

export default Header;