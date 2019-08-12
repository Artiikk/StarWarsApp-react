import React from 'react';

import './error-indicator.css';
import icon from './death-star.png'

const ErrorIndicator = () => {
  return (
    <div className="error-indicator justify-content-center">
      <img src={icon} alt="error icon"/>
      <span className="boom">BOOM!</span>
      <span>something has gone terribly wrong...</span>
      <span>(but we had already sent our droids to fix it)</span>
    </div>
  );
}

export default ErrorIndicator;
