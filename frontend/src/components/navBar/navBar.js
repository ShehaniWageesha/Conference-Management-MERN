import React, { Component, useState } from 'react';
import {MenuItem} from "./MenuItem.js";
import { NavLink, Link } from 'react-router-dom';
import './navBar.css';
import {FiAlignRight,FiXCircle,FiChevronDown } from "react-icons/fi";
import AuthOption from '../signin/AuthOption';
import Dropdown from './Dropdown';
import DropdownTwo from './DropdownTwo';
// import {Button} from '../signin/AuthOption';

// class Navbar extends Component {
//   state = {clicked: false}

//     handleClick = () => {
//       this.setState({clicked: !this.state.clicked})
//     }

//   render() {
//     return (
//         <nav className="NavItems">
//           <h1 className="navbar-logo">SLIITCon</h1>
//           <div className="menu-icon" onClick={this.handleClick}>
//             <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}>

//             </i>
//             </div>
//           <ul className={this.state.clicked ? 'nav-menu active': 'nav-menu'}>
//            {MenuItem.map((item, index) => {
//              return(
//                <li key={index}>
//                  <a className={item.mName} href={item.url}>
//                    {item.title}
//                  </a>
//                </li>
//              )
//            })}  
//           </ul>  
//           <AuthOption/>
//            {/* <Button>Sign In</Button> */}
//         </nav>
//     )
//   }
// }

// export default Navbar;

////////////////////////////////////////////////////////////////////////

// function Navbar() {
//   const [click, setClick] = useState(false);
//   const [dropdown, setDropdown] = useState(false);

//   const handleClick = () => setClick(!click);
//   const closeMobileMenu = () => setClick(false);

//   const onMouseEnter = () => {
//     if (window.innerWidth < 960) {
//       setDropdown(false);
//     } else {
//       setDropdown(true);
//     }
//   };

//   const onMouseLeave = () => {
//     if (window.innerWidth < 960) {
//       setDropdown(false);
//     } else {
//       setDropdown(false);
//     }
//   };

//   return (
//     <>
//       <nav className='navbar'>
//         <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
//         SLIITCon
//         </Link>
//         <div className='menu-icon' onClick={handleClick}>
//           <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
//         </div>
//         <ul className={click ? 'nav-menu active' : 'nav-menu'}>
//           <li className='nav-item'>
//             <Link to='/' className='nav-links' onClick={closeMobileMenu}>
//               Home
//             </Link>
//           </li>
//           <li className='nav-item'>
//             <Link
//               to='/presentations'
//               className='nav-links'
//               onClick={closeMobileMenu}
//             >
//               Presentations
//             </Link>
//           </li>
//           <li className='nav-item'>
//             <Link
//               to='/workshops'
//               className='nav-links'
//               onClick={closeMobileMenu}
//             >
//               Workshops
//             </Link>
//           </li>
//           <li
//             className='nav-item'
//             onMouseEnter={onMouseEnter}
//             onMouseLeave={onMouseLeave}
//           >
//             <Link
//               to='/view'
//               className='nav-links'
//               onClick={closeMobileMenu}
//             >
//               Researches <i className='fas fa-caret-down' />
//             </Link>
//             {dropdown && <Dropdown />}
//           </li>
          
//           <li className='nav-item'>
//             <Link
//               to='/downloads'
//               className='nav-links'
//               onClick={closeMobileMenu}
//             >
//               Downloads
//             </Link>
//           </li>

//           {/* <li
//             className='nav-item'
//             onMouseEnter={onMouseEnter}
//             onMouseLeave={onMouseLeave}
//           >
//             <Link
//               to='/reviwers'
//               className='nav-links'
//               onClick={closeMobileMenu}
//             >
//               Reviwers <i className='fas fa-caret-down' />
//             </Link>
//             {dropdown && <DropdownTwo />}
//           </li> */}

//           <li className='nav-item'>
//             <Link
//               to='/contact'
//               className='nav-links'
//               onClick={closeMobileMenu}
//             >
//               Contact Us
//             </Link>
//           </li>
//           <li>
//             <Link
//               to='/login'
//               className='nav-links-mobile'
//               onClick={closeMobileMenu}
//             >
//               Sign In
//             </Link>
//           </li>
//         </ul>
//         <AuthOption/>
//       </nav>
//     </>
//   );
// }

// export default Navbar;

//////////////////////////////////////////////////////////////////////////////

const Navbar = () => {
  const [isMenu, setisMenu] = useState(false);
  const [isResponsiveclose, setResponsiveclose] = useState(false);
  const toggleClass = () => {
    setisMenu(isMenu === false ? true : false);
    setResponsiveclose(isResponsiveclose === false ? true : false);
};
  let boxClass = ["main-menu menu-right menuq1"];
  if(isMenu) {
      boxClass.push('menuq2');
  }else{
      boxClass.push('');
  }
  const [isMenuSubMenu, setMenuSubMenu] = useState(false);
  const toggleSubmenu = () => {
    setMenuSubMenu(isMenuSubMenu === false ? true : false);
  };
  let boxClassSubMenu = ["sub__menus"];
  if(isMenuSubMenu) {
      boxClassSubMenu.push('sub__menus__Active');
  }else {
      boxClassSubMenu.push('');
  }
  return (
  <header className="header__middle">
      <div className="contner">
          <div className="row">
              <div className="header__middle__menus">
                  <nav className="main-nav " >
                  <h1 className="navbar-logo">SLIITCon</h1>
                  {/* Responsive Menu Button */}
                  {isResponsiveclose === true ? <> 
                      <span className="menubar__button" style={{ display: 'none' }} onClick={toggleClass} > <FiXCircle />   </span>
                  </> : <> 
                      <span className="menubar__button" style={{ display: 'none' }} onClick={toggleClass} > <FiAlignRight />   </span>
                  </>}
                  <ul className={boxClass.join(' ')}>
                      <li  className="menu-item" >
                          <NavLink exact activeClassName='is-active' onClick={toggleClass} to={`/`}> Home </NavLink> 
                      </li>
                      <li className="menu-item " ><NavLink onClick={toggleClass} activeClassName='is-active' to={`/presentations`}> Presentations </NavLink> </li>
                      <li className="menu-item " ><NavLink onClick={toggleClass} activeClassName='is-active' to={`/workshops`}> Workshops </NavLink> </li>
                      <li onClick={toggleSubmenu} className="menu-item sub__menus__arrows" > <Link to="#"> Researches <FiChevronDown /> </Link>
                          <ul className={boxClassSubMenu.join(' ')} > 
                              <li> <NavLink onClick={toggleClass} activeClassName='is-active'  to={`/researches`}> Add Item </NavLink> </li>
                              <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/view`}> View </NavLink> </li>
                          </ul>
                      </li>
                      <li className="menu-item " ><NavLink onClick={toggleClass} activeClassName='is-active' to={`/downloads`}> Downloads </NavLink> </li>

                      <li onClick={toggleSubmenu} className="menu-item sub__menus__arrows" > <Link to="#"> Reviwers <FiChevronDown /> </Link>
                          <ul className={boxClassSubMenu.join(' ')} > 
                              <li> <NavLink onClick={toggleClass} activeClassName='is-active'  to={`/Reviwers`}> Researche Review </NavLink> </li>
                              <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/work`}> Workshop Review </NavLink> </li>
                          </ul>
                      </li>

                      <li className="menu-item " ><NavLink onClick={toggleClass} activeClassName='is-active' to={`/Contact`}> Contact </NavLink> </li>
                  </ul>
                  <AuthOption/>
                  </nav>     
              </div>   
          </div>
    </div>
  </header>
  )
}
export default Navbar