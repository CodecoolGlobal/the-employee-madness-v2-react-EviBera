import { Outlet, Link } from "react-router-dom";

import "./Layout.css";

const Layout = () => (
  <div className="Layout">
    <nav>
      <ul>
        <li className="grow">
          <Link to="/">Employees</Link>
        </li>
        <li className="grow">
          <Link to="/top-paid">Top paid employees</Link>
        </li>
        <li className="grow">
          <Link to="/equipments">Equipments</Link>
        </li>
        <li className="grow">
          <Link to="/divisions">Divisions</Link>
        </li>
        <li>
          <Link to="/create">
            <button type="button">Create Employee</button>
          </Link>
        </li>
        <li>
          <Link to="/equipments/create">
            <button type="button">Create Equipment</button>
          </Link>
        </li>
        <li>
          <Link to="/divisions/create">
            <button type="button">Create Division</button>
          </Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </div>
);

export default Layout;
