import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
        <Link className="navbar-item" to="/">
          <img src="https://i.ibb.co/n6djjxV/daytriplogo.png" width="300" alt="logo" className="logo" />
        </Link>

      <div className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to="/">
            Trip Finder
          </Link>

          <Link className="navbar-item" to="/savedtrips">
            My Saved Trips
          </Link>

          <Link className="navbar-item" to="/suggesttrip">
            Suggest a Trip
          </Link>

          {localStorage.getItem("day_user") ? (
            <Link
              className="navbar-item"
              to=""
              onClick={() => {
                localStorage.removeItem("day_user");
                navigate("/", { replace: true });
              }}
            >
              Logout
            </Link>
          ) : (
            ""
          )}
        </div>

        <div className="navbar-end">
        </div>
      </div>
    </nav>
  );
};
