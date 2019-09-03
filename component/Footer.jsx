import React from 'react';
import { FooterItem } from './FooterItem';

export function Footer(props) {
  return (
    <div>
      <FooterItem {...props} name="All" value="all" />
      <FooterItem {...props} name="Todo" value="todo" />
      <FooterItem {...props} name="Completed" value="completed" />
    </div>
  );
}
