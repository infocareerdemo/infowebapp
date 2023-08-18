import { Link, useHistory, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
// import { Modal } from "react-bootstrap";
import Sidepannel from "./sidepannel";
import "./sidebar.css"
import { CgProfile } from "react-icons/cg"

const MainHeader = (props) => {
  // const pro = useState(props)
  const location = useLocation();

  const popover = useRef(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [modalopen, setModalopen] = useState(false);

  const [show, setShow] = useState(false);
  const [mobileshow, setMobileshow] = useState(false);

  const [show1, setShow1] = useState(false);

  const [name] = useState(localStorage.getItem("EmpName"));

  const log = () => {
    setShow(!show);
  }

  const mobilelog = () => {
    setMobileshow(!mobileshow);
  }

  const handlesidebar = () => {
    document.body.classList.toggle('mini-sidebar');
  }

  const onMenuClik = () => {
    document.body.classList.toggle('slide-nav');
    // console.log('dddd')
    // setShow1(!show1);
  }

  const openPopover = (e) => {
    console.log('dooo');
    // popover.current!.event = e;
    setPopoverOpen(true);
  };

  const logout = () => {
    // setModalopen(false);
    localStorage.clear();
    // history.push('/Login');
    window.location.href = '/Login'
  };

  const open = () => {
    window.location.hash = "/ChangePassword";
  }

  const cancel = () => {
    setShow(false);
    setMobileshow(false);
    setModalopen(false)
  }

  let pathname = location.pathname
  return (
    <div>
      <div className="header" style={{ right: "0px" }}>
        <a id="toggle_btn" style={{ display: pathname.includes('tasks') ? "none" : pathname.includes('compose') ? "none" : "" }} onClick={handlesidebar}>
          <span className="bar-icon"><span />
            <span />
            <span />
          </span>
        </a>
        <div className="page-title-box">
          <h3>InfoDemo</h3>
        </div>
        <a id="mobile_btn" className="mobile_btn" onClick={() => onMenuClik()}><i className="fa fa-bars" /></a>
        <div className="nav user-menu" style={{marginTop:"10px"}}>
          <div className="has-arrow main-drop" >
            <a onClick={() => log()} className="dropdown-toggle nav-link" data-bs-toggle="dropdown">
              <span className="user-img me-1"><CgProfile style={{ fontSize: "30px" ,color:"white"}} />
                {/* <span className="status online" /> */}
              </span>
              {/* <span>{name}</span> */}
            </a>
            {show &&
              <div className="dropdown dropdown-menu show" style={{ padding: "10px"}}>
                <Link className="dropdown-item" to="/myprofile" style={{ fontSize: "16px" }}>My Profile</Link>
                <Link className="dropdown-item" to="/chngpass" style={{ fontSize: "16px" }}>Change Password</Link>
                <Link className="dropdown-item" to="#" style={{ fontSize: "16px" }} onClick={() => logout()} >Logout</Link>
                {/* <Link className="dropdown-item" to="/chngpass" style={{ fontSize: "16px" }}>Change Pass</Link> */}

              </div>
            }
          </div>
        </div>
        <div className="dropdown mobile-user-menu" style={{ minWidth: "" }}>
          <a onClick={() => mobilelog()} className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" /></a>
          {
            mobileshow &&
            <div className="dropdown-menu  show dropdown" >
              <Link className="dropdown-item" to="/chngpass" >Change Password</Link>
              {/* <Link className="dropdown-item" to="/chngpass" >Change Pass</Link> */}

              <span className="dropdown-item" onClick={() => logout()}>Logout</span>
            </div>
          }
        </div>
      </div>
      {/* <Modal
        id="logouts-modal"
        show={modalopen}
        className="modal_logout modal-dialog-centered">
        <Modal.Body>
          <IonRow>
            <IonCol style={{ textAlign: "center" }}>
              <h5>Do you want to logout ?</h5>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6" style={{ textAlign: "end" }}>
              <IonButton color="fill" className="btn_logout" onClick={logout}>Yes</IonButton>
            </IonCol>
            <IonCol size="6">
              <IonButton color="fill" className="btn_logout" onClick={(e) => cancel()}>No</IonButton>
            </IonCol>
          </IonRow>
        </Modal.Body>
      </Modal> */}
    </div>
  )
}



export default MainHeader;