import React from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate} from 'react-router-dom';
import { changeLoggin } from "../../../utils/redux/actionCreator";


function Layout(){
  
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        localStorage.removeItem("user");
        dispatch(changeLoggin(false));
        navigate("/login");
    }

  return (
      <div className="container-fluid">
        <div className="row" style={{ minHeight: "100vh", position: "relative", alignItems: "stretch" }} >
          <div className="col-md-2 col-sm-3" style={{ background: "#EDEDED" }} >
            <Link to="home" ><button className={"sidebar-btn"} >Home</button></Link>
            <Link to="bookmark" ><button className={"sidebar-btn"} >Boormark</button></Link>
            <button className={"sidebar-btn text-danger"} onClick={()=>{logout();}} >Logout</button>
            
          </div>
          <div className="col" style={{ height: "100%" }} >
            <Outlet/>
          </div>
        </div>
      </div>
  );
}

export default Layout;