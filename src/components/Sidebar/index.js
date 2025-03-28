import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import styled from 'styled-components';

// Styled Components
const NavbarWrapper = styled.div`
  background-color: #060b26;
  height: 80px;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const MenuBars = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  background: none;
`;

const NavMenu = styled.nav`
  background-color: #060b26;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
`;

const NavMenuItems = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
`;

const NavbarToggle = styled.li`
  background-color: #060b26;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const NavText = styled.li`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 8px 0 8px 16px;
  list-style: none;
  height: 60px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;
  width: 95%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-radius: 4px;

  &:hover {
    background-color: #1a83ff;
  }
`;

const CloseIcon = styled(AiIcons.AiOutlineClose)`
  font-size: 2rem;
  color: white;
`;

// Sidebar Data
const sidebarData = [
  { title: 'New User', path: '/signup' },
  { title: 'All Blogs', path: '/AllBlogs'},
  { title: 'Products', path: '/products' },
  { title: 'Team', path: '/team' },
  { title: 'Messages', path: '/messages' },
  { title: 'Support', path: '/support' }
];

// Sidebar Component
function Sidebar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <NavbarWrapper>
        <MenuBars to="#" onClick={showSidebar}>
          <FaIcons.FaBars />
        </MenuBars>
      </NavbarWrapper>

      <NavMenu sidebar={sidebar}>
        <NavMenuItems onClick={showSidebar}>
          <NavbarToggle>
            <MenuBars to="#">
              <CloseIcon />
            </MenuBars>
          </NavbarToggle>
          {sidebarData.map((item, index) => (
            <NavText key={index}>
              <NavLink to={item.path}>
                 <span style={{ marginLeft: '16px' }}>{item.title}</span>
              </NavLink>
            </NavText>
          ))}
        </NavMenuItems>
      </NavMenu>
    </IconContext.Provider>
  );
}

export default Sidebar;
