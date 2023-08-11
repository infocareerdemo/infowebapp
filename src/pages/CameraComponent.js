import React, { useRef, useState, useEffect } from 'react';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import { BiCamera, BiCameraOff } from 'react-icons/bi';
import { useLocation } from 'react-router';
import authservice from '../service/authservice';

const CameraComponent = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const location = useLocation()

  const [capturedImageShow, setCapturedImageShow] = useState(null);
  const [recordedVideoShow, setRecordedVideoShow] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isCameraOn, setCameraOn] = useState(false);
  const [isRecording, setRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerColor, setTimerColor] = useState('black');

  const [data, setData] = useState(location.state.attributes)
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [dob, setDob] = useState('')
  const [country, setCountry] = useState('')
  const [image, setImage] = useState('')
  const [video, setVideo] = useState('')

  useEffect(() => {
    console.log(location.state.attributes)
    setFirstName(data.firstname);
    setLastName(data.lastname);
    setEmail(data.email);
    setPhone(data.phone);
    setGender(data.gender);
    setDob(data.dob);
    setCountry(data.country);

    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
        setTimerColor('red');
      }, 1000);
    } else {
      setTimer(0);
      setTimerColor('black');
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleOpenCameraClick = async () => {
    try {
      const constraints = { video: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      setCameraOn(true);
    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  };

  const handleOffCameraClick = () => {
    if (isRecording) {
      stopRecording();
    }
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    videoRef.current.srcObject = null;
    setCapturedImage(null);
    setCapturedImageShow(null);
    setRecordedVideo(null);
    setCameraOn(false);
  };

  const startRecording = () => {
    const stream = videoRef.current.srcObject;
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    const chunks = [];
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };
    mediaRecorder.onstop = () => {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      if (!canvas || !video) return;

      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      // const dataURL = canvas.toDataURL();
      // return new Promise((resolve) => {
      //   video.toBlob((blob) => resolve(blob), 'video/mp4');
      // })
      //   .then((blob) => {
      //     const file = new File([blob], 'captured_video.mp4', { type: 'video/mp4' });
      //     setRecordedVideo(file);
      //   })
      const recordedBlob = new File(chunks, "captured_video.mp4", { type: 'video/mp4' });
      setRecordedVideoShow(URL.createObjectURL(recordedBlob));
      setRecordedVideo(recordedBlob);
      console.log(recordedBlob)

      // console.log(recordedBlob, "kmkkk")
    };
    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const handleSnapClick = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL();
    setCapturedImageShow(dataURL);
    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), 'image/jpeg');
    }).then((blob) => {
      const file = new File([blob], 'captured_image.jpg', { type: 'image/jpeg' });
      setCapturedImage(file);
      alert("Image was Saved !")
      console.log(file, "kmkk")
    })
  };

  const handleSaveClick = () => {
    authservice.createRegisterUser(firstname,
      lastname,
      email,
      phone,
      gender,
      dob,
      country,
      capturedImage,
      recordedVideo)
      .then((response) => {
        console.log(response)
        if (response.data != null) {
          alert(response.data.Message)
          setShowModal(false);
          window.location.href = "/register";
        }
        else {
          alert(response.data.Error)
          setShowModal(false);
        }
      }).catch(error => {
        console.log(error)
      })
  };

  const handlePreviewClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='container-fluid h-100'>
      <div style={{ width: "100%", height: "100%" }}>
        <div style={{ justifyContent: "center", display: "flex" }}>
          {isCameraOn ? (
            <div>
              <BiCameraOff style={{ cursor: 'pointer', color: 'black', fontSize: "100px", fontWeight: "bold" }} onClick={handleOffCameraClick} />
            </div>
          ) : (
            <div>
              <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <BiCamera style={{ cursor: 'pointer', color: 'black', fontSize: "100px", fontWeight: "bold" }} onClick={handleOpenCameraClick} />
              </div>
              <p color='black'>Click here to Open the Camera</p>
            </div>
          )}
        </div>
        <br />

        <canvas
          ref={canvasRef}
          style={{ display: 'none' }}
          width="640"
          height="480"
        />

        {isCameraOn && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <div style={{ padding: "10px" }}>
              <button className='btn btn-primary' onClick={handleSnapClick}>Take Snapshot</button>
            </div>
            <div style={{ padding: "10px" }}>
              {isRecording ? (
                <button className='btn btn-primary' onClick={stopRecording}>Stop Recording</button>
              ) : (
                <button className='btn btn-primary' onClick={startRecording}>Start Recording</button>
              )}
            </div>
          </div>
        )}
        <video
          ref={videoRef}
          style={{ display: 'block', margin: '20px auto', maxWidth: '100%' }}
          autoPlay
          playsInline
        />
        <br />

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {recordedVideo && (
            <button className='btn btn-primary' onClick={handlePreviewClick}>Save & Preview</button>
          )}
        </div>

        <Modal isOpen={showModal} onRequestClose={handleCloseModal} style={{ content: { width: '95%', height: 'auto', margin: '0 auto', backgroundColor: "whitesmoke" } }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <AiOutlineClose style={{ cursor: 'pointer' }} onClick={handleCloseModal} />
          </div>
          <div style={{ display: "flex" }}>
            <div>
              <h4>Image :</h4>
              {capturedImageShow && <img src={capturedImageShow} alt="Captured" style={{ display: 'block', margin: '20px auto', maxWidth: '90%' }} />}
            </div>
            <div>
              <h4>Video :</h4>

              {recordedVideoShow && (
                <video src={recordedVideoShow} style={{ display: 'block', margin: '20px auto', maxWidth: '90%' }} controls />
              )}
              {isRecording && <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', color: 'white' }}>Recording Time: {timer} seconds</div>}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <button className='btn btn-primary'
              onClick={handleSaveClick}
              onChange={(e) => setImage(e.target.value)}
            >Save</button>
          </div>
        </Modal>

      </div>
    </div>
  );
};

export default CameraComponent;