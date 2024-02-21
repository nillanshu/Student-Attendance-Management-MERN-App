import React from 'react'
import { Link } from 'react-router-dom'
import attnLogo from '../img/logo/attnlg.jpg'

const Sidebar = ({ sections, link = {} }) => {
  return (
    <>
        <ul className="navbar-nav sidebar sidebar-light accordion" id="accordionSidebar">
        <a className="sidebar-brand d-flex align-items-center bg-gradient-primary justify-content-center" href="index.php">
            <div className="sidebar-brand-icon">
            <img src={attnLogo} alt="Logo" />
            </div>
            <div className="sidebar-brand-text mx-3">AMS</div>
        </a>
        <hr className="sidebar-divider my-0" />
        <li className="nav-item active">
          <Link className="nav-link" to={link.href}>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <hr className="sidebar-divider" />

        {sections.map((section, sectionIndex) => (
          <div key={`section-${sectionIndex}`}>
            <div className="sidebar-heading">
              {section.title}
            </div>
            {section.items.map((item, itemIndex) => (
              <li className="nav-item" key={`item-${sectionIndex}-${itemIndex}`}>
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target={`#collapseBootstrap${sectionIndex}${itemIndex}`}
                  aria-expanded="true" aria-controls={`#collapseBootstrap${sectionIndex}${itemIndex}`}>
                  <i className={item.icon}></i>
                  <span>{item.manageText}</span>
                </a>
                <div id={`collapseBootstrap${sectionIndex}${itemIndex}`} className="collapse" aria-labelledby="headingBootstrap" data-parent="#accordionSidebar">
                  <div className="bg-white py-2 collapse-inner rounded">
                    <h6 className="collapse-header">{item.manageText}</h6>
                    {item.links.map((link, linkIndex) => (
                      <a className="collapse-item" href={link.href} key={`link-${sectionIndex}-${itemIndex}-${linkIndex}`}>{link.text}</a>
                    ))}
                  </div>
                </div>
              </li>
            ))}
            <hr className="sidebar-divider" />
          </div>
        ))}
        <div className="version" id="version-ruangadmin"></div>
        </ul>
    </>
  )
}

export default Sidebar