import React from 'react';

export const FooterItem = ({ name, value, active, changeFilter }) => (
  <button
    onClick={() => changeFilter(value)}
    className={active === value ? 'active' : ''}
  >
    {name}
  </button>
);
