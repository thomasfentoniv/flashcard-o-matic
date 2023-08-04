import  React, { Fragment } from "react";
import { useRouteMatch } from "react-router";
import { Link } from "react-router-dom";

function NavBar({ items }) {
  const { url } = useRouteMatch();
  return (
    <>
      <nav className="breadcrumb" aria-label="breadcrumb">
        <Link to="/" className="breadcrumb-item">
          <span className="oi oi-home mr-1"></span>Home
        </Link>
        {items.map((item) => {
          const isActive = item === items[items.length - 1];
          return (
            <Link 
              key={item} 
              className={`breadcrumb-item ${isActive ? "active" : ""}`} 
              to={url}
            >
              {item}
            </Link>
          )
        })}
      </nav>
    </>
  );
}

export default NavBar;

