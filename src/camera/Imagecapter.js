import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import Webcam from 'react-webcam';
import { AiOutlineClose } from 'react-icons/ai';

function Imagecapter() {
    const [isClicked, setIsClicked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null); // Track the captured image
    const webcamRef = React.useRef(null);

    const startCamera = () => {
        setShowModal(true); // Update showModal to true to open the modal
    };

    const captureImage = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        localStorage.setItem('capturedImage', imageSrc);
        setCapturedImage(imageSrc);
        setShowModal(false); // Update showModal to false to close the modal
    };

    return (
        <div className="App">
            <header className="App-header">
                <div style={{ width: '10%', height: '100px' }}>
                    <button onClick={startCamera}>Capture</button>
                </div>
                <p>
                    Press click hear to  enter <code> into the</code> exam{' '}


                    {capturedImage ? (
                        <Link to={{ pathname: '/questions', state: { capturedImage: capturedImage } }} className={isClicked ? 'blue-clicked' : 'blue'}>
                            Click here
                        </Link>

                    ) : null}
                </p>
            </header>

            <Modal isOpen={showModal} style={{ content: { width: '50%', height: 'auto', margin: '0 auto', backgroundColor: '#252d4a' } }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <AiOutlineClose style={{ cursor: 'pointer' }} onClick={() => setShowModal(false)} />
                </div>
                <div>
                    {/* <h2>Capture Selfie</h2> */}
                    <Webcam  ref={webcamRef} screenshotFormat="image/jpeg" />
                    <button className='sa' onClick={captureImage}> Click here to Capture </button>
                </div>
            </Modal>
        </div>
    );
}

export default Imagecapter;
