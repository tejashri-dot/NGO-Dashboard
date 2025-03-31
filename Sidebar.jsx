import React from 'react';
import { NavLink } from 'react-router-dom';
import hanuman from '../../assets/hanuman.png';
import Styles from './Sidebar.module.css';
import {FaTachometerAlt,FaUser,FaBook,FaBookOpen,FaDonate,FaPhotoVideo,FaComments,FaQrcode,FaGraduationCap,FaMusic,FaPray,FaBroadcastTower,FaChalkboardTeacher,FaCogs,FaChartPie,FaHandsHelping,FaReadme,FaUniversity} from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className={Styles.Container}>
      <div className={Styles.Logo}>
        <img src="https://i.pinimg.com/736x/bb/81/f0/bb81f00f966278bf8eefbc2847e6dbd4.jpg" 
        alt="Hanuman Chalisa Dashboard" />
      </div>
      <nav className={Styles.NavMenu}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${Styles.NavItem} ${Styles.Active}` : Styles.NavItem
          }
        >
          <FaTachometerAlt /> Dashboard
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? `${Styles.NavItem} ${Styles.Active}` : Styles.NavItem
          }
        >
          <FaUser /> Users
        </NavLink>
        {/* <NavLink
          to="/hanuman-chalisa"
          className={({ isActive }) =>
            isActive ? `${Styles.NavItem} ${Styles.Active}` : Styles.NavItem
          }
        >
          <FaBook /> Hanuman Chalisa
        </NavLink>
        <NavLink
          to="/katha"
          className={({ isActive }) =>
            isActive ? `${Styles.NavItem} ${Styles.Active}` : Styles.NavItem
          }
        >
        <FaBookOpen /> Katha
        </NavLink> */}

        <h3 className={Styles.SectionTitle}>Services</h3>
        <NavLink
          to="/services/donation"
          className={({ isActive }) =>
            isActive ? `${Styles.NavItem} ${Styles.Active}` : Styles.NavItem
          }
        >
          <FaDonate /> Donation
        </NavLink>
        <NavLink
  to="/services/bhishi"
  className={({ isActive }) =>
    isActive ? `${Styles.NavItem} ${Styles.Active}` : Styles.NavItem
  }
>
  <FaDonate /> Bhishi
</NavLink>
        <NavLink
          to="/services/y-gallery"
          className={({ isActive }) =>
            isActive ? `${Styles.NavItem} ${Styles.Active}` : Styles.NavItem
          }
        >
          <FaPhotoVideo /> Y-Gallery
        </NavLink>
        <NavLink
          to="/services/y-story"
          className={({ isActive }) =>
            isActive ? `${Styles.NavItem} ${Styles.Active}` : Styles.NavItem
          }
        >
          <FaReadme /> Y-Story
        </NavLink>
        <NavLink
          to="/services/my-yuga-library"
          className={({ isActive }) =>
            isActive ? `${Styles.NavItem} ${Styles.Active}` : Styles.NavItem
          }
        >
          <FaUniversity /> My Yuga Library
        </NavLink>
        <NavLink
          to="/services/testimony"
          className={({ isActive }) =>
            isActive ? `${Styles.NavItem} ${Styles.Active}` : Styles.NavItem
          }
        >
          <FaComments /> Testimony
        </NavLink>
        <NavLink
          to="/services/scanner"
          className={({ isActive }) =>
            isActive ? `${Styles.NavItem} ${Styles.Active}` : Styles.NavItem
          }
        >
          <FaQrcode /> Scanner
        </NavLink>
        {/* <NavLink
          to="/services/learn-hanuman-chalisa"
          className={({ isActive }) =>
            isActive ? `${Styles.NavItem} ${Styles.Active}` : Styles.NavItem
          }
        >
          <FaGraduationCap /> Learn Chalisa
        </NavLink> */}

        {/* <h3 className={Styles.SectionTitle}>Facilities</h3>
        <NavLink
          to="/facilities/bhajan"
          className={({ isActive }) =>
            isActive ? `${Styles.NavItem} ${Styles.Active}` : Styles.NavItem
          }
        >
          <FaMusic /> Bhajan
        </NavLink>
        <NavLink
          to="/facilities/mantra"
          className={({ isActive }) =>
            isActive ? `${Styles.NavItem} ${Styles.Active}` : Styles.NavItem
          }
        >
          <FaPray /> Mantra
        </NavLink>
        <NavLink
          to="/facilities/live-aarti"
          className={({ isActive }) =>
            isActive ? `${Styles.NavItem} ${Styles.Active}` : Styles.NavItem
          }
        >
          <FaBroadcastTower /> Live Aarti
        </NavLink>
        <NavLink
          to="/facilities/jaap"
          className={({ isActive }) =>
            isActive ? `${Styles.NavItem} ${Styles.Active}` : Styles.NavItem
          }
        >
          <FaChalkboardTeacher /> Jaap
        </NavLink> */}

        <h3 className={Styles.SectionTitle}>Others</h3>
        <NavLink
          to="/website-control"
          className={({ isActive }) =>
            isActive ? `${Styles.NavItem} ${Styles.Active}` : Styles.NavItem
          }
        >
          <FaCogs /> Website Control
        </NavLink>
        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            isActive ? `${Styles.NavItem} ${Styles.Active}` : Styles.NavItem
          }
        >
          <FaChartPie /> Analytics
        </NavLink>
        <NavLink
          to="/engagements"
          className={({ isActive }) =>
            isActive ? `${Styles.NavItem} ${Styles.Active}` : Styles.NavItem
          }
        >
          <FaHandsHelping /> Engagements
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? `${Styles.NavItem} ${Styles.Active}` : Styles.NavItem
          }
        >
          <FaCogs /> Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
