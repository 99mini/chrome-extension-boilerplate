/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

const containerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
`;

const NewTab: React.FC = () => {
  return (
    <div css={containerStyle}>
      <h1>Welcome to My New Tab</h1>
    </div>
  );
};

export default NewTab;
