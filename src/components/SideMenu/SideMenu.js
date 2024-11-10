import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import sidemenu from "./SideMenu.module.css";
import UserContext from "../../UserContext";

export default function SideMenu() {
  const { user } = useContext(UserContext);
  // const modalRef = useRef(null); // Reference for the modal element
  const navigate = useNavigate(); // React Router's navigation hook
  const location = useLocation(); // Hook to get the current location

  // State to determine which nav item is active
  const [activeNavHome, setActiveNavHome] = useState(false);
  const [activeNavFind, setActiveNavFind] = useState(false);
  const [activeNavMes, setActiveNavMes] = useState(false);
  const [activeNavApp, setActiveNavApp] = useState(false);
  const [activeNavNOtes, setActiveNavNotes] = useState(false);
  //const [activeNavSupp, setActiveNavSupp] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update active states based on current location
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Update isMobile state
    };
    window.addEventListener("resize", handleResize);

    

    setActiveNavHome(location.pathname === "/dashboard-main");
    setActiveNavFind(location.pathname === "/find");
    setActiveNavMes(location.pathname === "/chatlist");
    setActiveNavApp(location.pathname === "/appointment");
    setActiveNavNotes(location.pathname === "/notes");
    //setActiveNavSupp(location.pathname === '/support'); // Update as per your support route
  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
 }, [location.pathname]);

  const clickedActiveNotes = () => {
    navigate("/notes");
  };

  const handleLogout = () => {
    navigate("/logout");
  };

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle sidebar visibility
  };


  return (
    <React.Fragment>
      {isMobile ? (
        <>
          {/* Content for mobile view */}
          <button onClick={handleToggleSidebar} className={sidemenu.toggleButton}>
            ☰
          </button>
          {/* Sidebar */}
          <div className={`${sidemenu.sidebar} ${isOpen ? sidemenu.open : ""}`}>
            <div className="logo my-4 text-center">
              <img src="../wecare_logo.png" alt="WeCare" width="100" />
            </div>



            <div className="menu-items flex-grow-1 d-flex flex-column ml-4 mr-4">
              {/* Add your Links here */}
              <Link
            to={"/dashboard-main"}
            // onClick={clickedActiveHome}
            className={activeNavHome ? "menu-item actives" : "menu-item"}
          >
            <span className="material-symbols-outlined side-menu-color icon-size ">
              home
            </span>
            <p className="ml-2 pt-3">
              {user?.userType !== "admin" ? "Home" : "Dashboard"}
            </p>
          </Link>
          {user?.userType === "senior" && (
            <Link
              to={"/find"}
              // onClick={clickedActiveFind}
              className={activeNavFind ? "menu-item actives" : "menu-item"}
            >
              <span className="material-symbols-outlined side-menu-color icon-size">
                search
              </span>
              <p className="ml-2 pt-3">Find</p>
            </Link>
          )}




  
          {user?.userType !== "admin" && (
            <Link
              to={"/chatlist"}
              // onClick={clickedActiveMess}
              className={activeNavMes ? "menu-item actives" : "menu-item"}
            >
              <span className="material-symbols-outlined side-menu-color icon-size">
                chat
              </span>
              <p className="ml-2 pt-3">Message</p>
            </Link>
          )}



          {user?.userType !== "admin" && (
            <Link
              to="/appointment"
              // onClick={clickedActiveApp}
              className={activeNavApp ? "menu-item actives" : "menu-item"}
            >
              <span className="material-symbols-outlined side-menu-color icon-size">
                list_alt
              </span>
              <p className="ml-2 pt-3">Appointment</p>
            </Link>
          )}
          {user?.userType === "assistant" && (
            <Link
              to="/notes"
              onClick={clickedActiveNotes}
              className={activeNavNOtes ? "menu-item actives" : "menu-item"}
            >
              <span className="material-symbols-outlined side-menu-color icon-size">
                list_alt
              </span>
              <p className="ml-2 pt-3">Notes</p>
            </Link>
          )}

          {user?.userType === "admin" && (
            <>
              <Link
                to="/users"
                // onClick={clickedActiveApp}
                className={activeNavApp ? "menu-item actives" : "menu-item"}
              >
                <span className="material-symbols-outlined side-menu-color icon-size">
                  list_alt
                </span>
                <p className="ml-2 pt-3">Users</p>
              </Link>

              <Link
                to="/ratings"
                // onClick={clickedActiveApp}
                className={activeNavApp ? "menu-item actives" : "menu-item"}
              >
                <span className="material-symbols-outlined side-menu-color icon-size">
                  list_alt
                </span>
                <p className="ml-2 pt-3">Ratings</p>
              </Link>
            </>
          )}
          </div>


          <div className={`${sidemenu.supportSpacing}`}>
        {user?.userType !== "admin" && (
          <div className="support-item ml-4 mr-4 mb-4">
            <div className={sidemenu["support"]}>
              <span className="material-symbols-outlined side-menu-color icon-size">
                volunteer_activism
              </span>
              <p>Support</p>
            </div>
          </div>
        )}

        {user?.userType === "admin" && (
          <div className="support-item ml-4 mr-4 mb-4">
            <div>
              <span className="material-symbols-outlined side-menu-color icon-size">
                volunteer_activism
              </span>
              <p>Requests</p>
            </div>
          </div>
        )}


        
        <div className="support-item logout-bottom ml-4">
          <span className="material-symbols-outlined side-menu-color icon-size">
            logout
          </span>
          <button
            type="button"
            className={`${sidemenu.customLogoutBtn} button-logout`}
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Log-Out
          </button>
        </div>
      </div>

          </div>
        </>
      ) : (
        <>
          {/* Content for desktop view */}
          <div className={`${sidemenu.sidebarLaptopView}`}>
        <div className="logo my-4 text-center">
          <img src="../wecare_logo.png" alt="WeCare" width="100" />
        </div>


        <div className="menu-items flex-grow-1 d-flex flex-column ml-4 mr-4">
          <Link
            to={"/dashboard-main"}
            // onClick={clickedActiveHome}
            className={activeNavHome ? "menu-item actives" : "menu-item"}
          >
            <span className="material-symbols-outlined side-menu-color icon-size ">
              home
            </span>
            <p className="ml-2 pt-3">
              {user?.userType !== "admin" ? "Home" : "Dashboard"}
            </p>
          </Link>


          {user?.userType === "senior" && (
            <Link
              to={"/find"}
              // onClick={clickedActiveFind}
              className={activeNavFind ? "menu-item actives" : "menu-item"}
            >
              <span className="material-symbols-outlined side-menu-color icon-size">
                search
              </span>
              <p className="ml-2 pt-3">Find</p>
            </Link>
          )}
          {user?.userType !== "admin" && (
            <Link
              to={"/chatlist"}
              // onClick={clickedActiveMess}
              className={activeNavMes ? "menu-item actives" : "menu-item"}
            >
              <span className="material-symbols-outlined side-menu-color icon-size">
                chat
              </span>
              <p className="ml-2 pt-3">Message</p>
            </Link>
          )}

          {user?.userType !== "admin" && (
            <Link
              to="/appointment"
              // onClick={clickedActiveApp}
              className={activeNavApp ? "menu-item actives" : "menu-item"}
            >
              <span className="material-symbols-outlined side-menu-color icon-size">
                list_alt
              </span>
              <p className="ml-2 pt-3">Appointment</p>
            </Link>
          )}

          

          {user?.userType === "assistant" && (
            <Link
              to="/notes"
              onClick={clickedActiveNotes}
              className={activeNavNOtes ? "menu-item actives" : "menu-item"}
            >
              <span className="material-symbols-outlined side-menu-color icon-size">
                list_alt
              </span>
              <p className="ml-2 pt-3">Notes</p>
            </Link>
          )}

          {user?.userType === "admin" && (
            <>
              <Link
                to="/users"
                // onClick={clickedActiveApp}
                className={activeNavApp ? "menu-item actives" : "menu-item"}
              >
                <span className="material-symbols-outlined side-menu-color icon-size">
                  list_alt
                </span>
                <p className="ml-2 pt-3">Users</p>
              </Link>

              <Link
                to="/ratings"
                // onClick={clickedActiveApp}
                className={activeNavApp ? "menu-item actives" : "menu-item"}
              >
                <span className="material-symbols-outlined side-menu-color icon-size">
                  list_alt
                </span>
                <p className="ml-2 pt-3">Ratings</p>
              </Link>
            </>
          )}
        </div>

        <div className={`${sidemenu.supportSpacing}`}>
        {user?.userType !== "admin" && (
          <Link to="/emergency">
          <div className="support-item ml-4 mr-4 mb-2">
            <div className={sidemenu["support"]}>
              <span className="material-symbols-outlined side-menu-color icon-size">
                volunteer_activism
              </span>
              <p>Support</p>
            </div>
          </div>
          </Link>
        )}

        {user?.userType === "admin" && (
          <Link to="/emergency">
          <div className="support-item ml-4 mr-4 mb-2">
            <div className={sidemenu["support"]}>
              <span className="material-symbols-outlined side-menu-color icon-size">
                volunteer_activism
              </span>
              <p>Requests</p>
            </div>
          </div>
          </Link>
        )}
        <div className="logout-bottom ml-4">
          <span className="material-symbols-outlined side-menu-color icon-size">
            logout
          </span>
          <button
            type="button"
            className={`${sidemenu.customLogoutBtn} button-logout`}
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Log-Out
          </button>
        </div>
      </div>
      </div>
        </>
      )}


      

 <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Are you sure you Log-Out?
              </h5>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn button-modal-logout"
                onClick={handleLogout}
                data-dismiss="modal"
              >
                Yes
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
  
}
