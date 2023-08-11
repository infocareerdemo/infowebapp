import { useEffect, useState } from "react";
import Sidepannel from "../sidepannel";
import authservice from "../service/authservice";
import MainHeader from "../MainHeader";
import moment from "moment";

const MyProfile = () => {

  const [token] = useState(localStorage.getItem("token"));

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [country, setCountry] = useState("");

  const Load = () => {
    authservice.myProfile(token)
      .then((response) => {
        console.log(response, "kmm")
        setVideo(response.data.userId.video)
       // console.log(response.data.userId.video,"aaaa")
        setFirstName(response.data.userId.firstname)
        setLastName(response.data.userId.lastname)
        setEmail(response.data.userId.email)
        var dob = moment(response.data.userId.dob).format("DD-MM-YYYY")
        setDob(dob)
        setGender(response.data.userId.gender);
        setPhone(response.data.userId.phone);
        setImage(response.data.userId.image);
        // setVideo(response.data.userId.video);
        setCountry(response.data.userId.country);
      })
    // console.log(video,"hnhnh")
  }

  useEffect(() => {
    Load()
  }, [])
  return (
    <div>
      <MainHeader />
      <Sidepannel />
      <div className="page-wrapper">
        <h2>My Profile</h2>
        <div style={{ width: "100%", height: "100%" }}>
          <div style={{ display: "flex" }}>
            <p>Name : </p>
            <p>{firstName + " " + lastName}</p>
          </div>
          <div style={{ display: "flex" }}>
            <p>Email : </p>
            <p>{email}</p>
          </div>
          <div style={{ display: "flex" }}>
            <p>Date of Birth : </p>
            <p>{dob}</p>
          </div>
          <div style={{ display: "flex" }}>
            <p>Gender : </p>
            <p>{gender}</p>
          </div>
          <div style={{ display: "flex" }}>
            <p>Phone : </p>
            <p>{phone}</p>
          </div>
          <div style={{ display: "flex" }}>
            <p>Country : </p>
            <p>{country}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <img src={image} alt="Image" style={{ height: "200px", width: "200px" }} />
            <div>
              {video!== ""&&<video width="640" height="360" controls>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile;