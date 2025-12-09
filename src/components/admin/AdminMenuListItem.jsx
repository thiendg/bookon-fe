import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenuListItem = ({ to, icon: Icon, title, activeclassname }) => {
  return (
    <li className="nav-item">
      <NavLink to={to} className="nav-link" activeclassname={activeclassname}>
        <span className="nav-link-icon d-md-none d-lg-inline-block">
          {Icon && <Icon />}
        </span>
        <span className="nav-link-title">{title}</span>
      </NavLink>
    </li>
  );
};

export default AdminMenuListItem;