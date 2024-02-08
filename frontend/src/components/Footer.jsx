import React from "react";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <a href="#" >
      <footer className="footer footer-center  bg-base text-gray-900">
        <aside>
         <Link to={"https://github.com/Bamof25th"}>
         <p>Vibely 2024 - Aniket Baghel</p>
         </Link> 
        </aside>
      </footer>
    </a>
  );
};

export default Footer;
