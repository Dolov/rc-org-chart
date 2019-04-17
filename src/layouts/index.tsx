import React from 'react';
import S from './index.css';

const BasicLayout: React.FC = props => {
  return (
    <div className={S.basicLayout}>
      {props.children}
    </div>
  );
};

export default BasicLayout;
