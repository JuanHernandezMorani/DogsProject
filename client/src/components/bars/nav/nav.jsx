import React from "react";
import style from "./nav.module.css";


export default function NavBar() {
  return (
        <nav className={style.menu}>
          <ul>
            <li><a href='/'>Main</a></li>
            <li><a href='/Create'>Create Dog</a></li>
          </ul>
        </nav>
    );
}