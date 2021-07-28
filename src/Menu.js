import React, { Component } from 'react'
import { useHistory } from 'react-router';
import swal from 'sweetalert';

let Menu = (props) => {
  let history = useHistory();
  let logout = (props) => {
    localStorage.removeItem("token");
    swal({ text: 'User Logged out', buttons: false, timer: 1000 });
    history.push('/login')

  }

  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="index3.html" className="brand-link">
          <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
          <span className="brand-text font-weight-light">AdminLTE 3</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
            </div>
            <div className="info">
              <a href="#" className="d-block">Alexander Pierce</a>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item">
                <a href="/dashboard" className="nav-link" >
                  <i className="nav-icon far fa-circle text-info" />
                  <p>Dashboard</p>
                </a>
              </li>
              {/* Add icons to the links using the .nav-icon class
           with font-awesome or any other icon font library */}
              <li className="nav-item has-treeview menu-open">
                <a href="#" className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>
                    Content
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/content" className="nav-link ">
                      <i className="far fa-circle nav-icon" />
                      <p>Create Content</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/show-content" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Show Contents</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/edit-content" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Edit & Delete</p>
                    </a>
                  </li>
                </ul>
              </li>
              {/* Page Section */}
              <li className="nav-item has-treeview menu-open">
                <a href="#" className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>
                    Page
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/page" className="nav-link ">
                      <i className="far fa-circle nav-icon" />
                      <p>Create Page</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/show-pages" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Show Pages</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Edit & Delete</p>
                    </a>
                  </li>
                </ul>
              </li>
             
              <li className="nav-item">
                <a href="#" className="nav-link" onClick={logout}>
                  <i className="nav-icon far fa-circle text-info" />
                  <p>Logout</p>
                </a>
              </li>

            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>

  )
}

export default Menu