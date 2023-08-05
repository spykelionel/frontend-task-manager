import React from "react";

function Header() {
  return (
    <div>
      <nav className="nav">
        <div className="nav-left">
          <a className="brand" href="#">
            Task Manager
          </a>
        </div>
        <div className="nav-right">
          <div className="tabs">
            <a href="/">
              Simple task manager
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
