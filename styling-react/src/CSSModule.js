import React from 'react';
import classNames from 'classnames/bind';
import styles from './CSSModule.module.css';

const cx = classNames.bind(styles); // 미리 styles에서 클래스를 받아 오도록 설정하고 

const CSSModule = () => {
    return(
        <div classNames={cx('wrapper','inverted')}>
            안녕하세요, 저는 <span className="something">CSS Module!</span>
        </div>
        // <div className={`${styles.wrapper} ${styles.inverted}`}>
        //     안녕<span className="something">CSSModule!</span>
        // </div>
    );
};
export default CSSModule;
// className={[styles.wrapper,styles.inverted].join(' ')}