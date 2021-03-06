import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({
  title,
  route,
  routeTitle,
  handleClick,
}) => (
  <div className="header row">
    <div className="headerLeft col-8">
      <h1>{title}</h1>
      {/* Page title */}
    </div>
    <div className="headerRight col-4">
      <Link to={route}>
        <button
          type="submit"
          className="btn headerButton"
          onClick={handleClick}
        >
          {routeTitle}
        </button>
      </Link>
    </div>
  </div>
);

export default Header;
