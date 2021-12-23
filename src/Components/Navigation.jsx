
export default function Navigation(props){

    return(
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        {/* Sidebar - Brand */}
        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink" />
          </div>
          <div className="sidebar-brand-text mx-3">QL chuyến xe</div>
        </a>
        {/* Divider */}
        <hr className="sidebar-divider my-0" />
        {/* Nav Item - Dashboard */}
        <li className="nav-item">
          <a className="nav-link" href="/Turnover">

            <i className="fas fa-fw fa-credit-card" />
            <span>Doanh thu</span></a>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider" />
        {/* Heading */}
        <div className="sidebar-heading">
          Bảng Lương
        </div>
        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item">
          <a className="nav-link collapsed" href="/Pay" >
            <i className="fas fa-fw fa-table" />
            <span>Tài xế</span>
          </a>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider" />
        {/* Heading */}
        <div className="sidebar-heading">
          Table
        </div>
        {/* Nav Item - Bus */}
        <li className={ props.toggleNav.bus ? ("nav-item active") : ("nav-item")}>
          <a className="nav-link" href="/tablesBus">
            <i className="fas fa-fw fa-bus" />
            <span>Xe Khách</span></a>
        </li>
        {/* Nav Item - Buses */}
        <li className={ props.toggleNav.buses ? ("nav-item active") : ("nav-item")}>
          <a className="nav-link" href="/tablesBuses" >
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Chuyến Xe</span></a>
        </li>
        {/* Nav Item - Driver */}
        <li className={ props.toggleNav.driver ? ("nav-item active") : ("nav-item")}>
          <a className="nav-link" href="/tablesDriver">
            <i className="fas fa-fw fa-users" />
            <span>Tài Xế</span></a>
        </li>
        {/* Nav Item - Route */}
        <li className={ props.toggleNav.route ? ("nav-item active") : ("nav-item")}>
          <a className="nav-link" href="/tablesTrip">
            <i className="fas fa-fw fa-road" />
            <span>Tuyến Đường</span></a>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider d-none d-md-block" />
      </ul>
    );
}