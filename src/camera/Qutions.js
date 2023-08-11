import React, { useState, useRef, useEffect } from 'react';
import QuizResult from './QuizResult';
import { QuizData } from './QuizData';
import { useHistory, useNavigate } from 'react-router-dom';
//import './quizstyle.css';
import Webcam from 'react-webcam';
import draw from '../utilities';
import swal from 'sweetalert2';
import '@tensorflow/tfjs-backend-cpu';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from "react-bootstrap";
// import 'react-toastify/dist/ReactToastify.css';
import Sidepannel from '../sidepannel';
import MainHeader from '../MainHeader';

const Qutions = () => {

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [audioStream, setAudioStream] = useState(null);
    const blazeface = require('@tensorflow-models/blazeface');
    const [cameraOn, setCameraOn] = useState(true);
    const [backgroundNoiseDetected, setBackgroundNoiseDetected] = useState(false);
    const [showNoiseAlertModal, setShowNoiseAlertModal] = useState(false);

    const [borderColor, setBorderColor] = useState('green');
    const recordedChunks = [];
    const navigate = useNavigate();
    const [alertCount, setAlertCount] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [clickedOption, setClickedOption] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const changeQuestion = () => {
        updateScore();
        if (currentQuestion < QuizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setClickedOption(0);
        } else {
            setShowResult(true)
        }
    }
    const updateScore = () => {
        if (clickedOption === QuizData[currentQuestion].answer) {
            setScore(score + 1);
        }
    }
    
    const resetAll = () => {
        setShowResult(false);
        setCurrentQuestion(0);
        setClickedOption(0);
        setScore(0);
    }
    useEffect(() => {
        const runFacedetection = async () => {
            const model = await blazeface.load();
            console.log('FaceDetection Model is Loaded..');
            const intervalId = setInterval(() => {
                detect(model);
            }, 100);

            return () => {
                clearInterval(intervalId);
            };
        };

        const accessAudio = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                setAudioStream(stream);
            } catch (error) {
                console.error('Error accessing audio stream:', error);
            }
        };

        runFacedetection();

        if (alertCount >= 3) {
            navigate('/');
        }

        if (cameraOn && !audioStream) {
            accessAudio();
        }

        if (audioStream && !backgroundNoiseDetected) {
            const audioContext = new AudioContext();
            const analyser = audioContext.createAnalyser();
            const microphone = audioContext.createMediaStreamSource(audioStream);
            microphone.connect(analyser);

            const dataArray = new Uint8Array(analyser.frequencyBinCount);

            // const detectBackgroundNoise = () => {
            //     analyser.getByteFrequencyData(dataArray);

            //     setBackgroundNoiseDetected(true);
            //     setShowAlert(true);

            //     if (!backgroundNoiseDetected) {
            //         requestAnimationFrame(detectBackgroundNoise);
            //     }



            // };
            // setTimeout(() => {
            const detectBackgroundNoise = () => {
                analyser.getByteFrequencyData(dataArray);

                // Calculate the average volume of the audio
                const sum = dataArray.reduce((acc, value) => acc + value, 0);
                const average = sum / dataArray.length;

                if (average > 10) { // Adjust the threshold as needed
                    setBackgroundNoiseDetected(true);
                    setShowNoiseAlertModal(true);
                }

                if (!backgroundNoiseDetected) {
                    requestAnimationFrame(detectBackgroundNoise);
                }
            };

            detectBackgroundNoise();
            // }, 10000)
        }
    }, [alertCount, cameraOn, audioStream, backgroundNoiseDetected, navigate]);

    const detect = async (model) => {
        if (
            cameraOn &&
            webcamRef.current &&
            webcamRef.current.video &&
            webcamRef.current.video.readyState === 4 &&
            webcamRef.current.video.videoWidth &&
            webcamRef.current.video.videoHeight
        ) {
            const video = webcamRef.current.video;
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;
            video.width = videoWidth;
            video.height = videoHeight;
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            const prediction = await model.estimateFaces(video);
            const ctx = canvasRef.current.getContext('2d');
            draw(prediction, ctx);

            if (!prediction || prediction.length === 0) {
                setBorderColor('red');
                swal.fire({
                    icon: 'error',
                    title: 'Face is not clear focus on camera!',
                }).then(() => {
                    setBorderColor('green');
                    setAlertCount(prevCount => prevCount + 1);
                });
            } else if (prediction.length > 1) {
                setBorderColor('red');
                swal.fire({
                    icon: 'error',
                    title: 'More than one face detected!',
                }).then(() => {
                    setBorderColor('green');
                    setAlertCount(prevCount => prevCount + 1);
                });
            } else {
                // setAlertCount(0);
                setBorderColor('green');
                // if (audioStream && audioStream.getAudioTracks()[0].enabled) {
                //     swal.fire({
                //         icon: 'success',
                //         title: 'background Noise is detecting!',
                //     });
                // }
            }
        }
    };

    // var Questionbank = [
    //     {
    //         Question: "What is the capital of India?",
    //         Answers: [
    //             { Answer: "Delhi", isCorrect: true },
    //             { Answer: "Pune", isCorrect: false },
    //             { Answer: "Ranchi", isCorrect: false },
    //             { Answer: "Patna", isCorrect: false }
    //         ]
    //     },
    //     {
    //         Question: "Who is the PM of India?",
    //         Answers: [
    //             { Answer: "Amit Shah", isCorrect: false },
    //             { Answer: "Modi", isCorrect: true },
    //             { Answer: "Raga", isCorrect: false },
    //             { Answer: "Kejri", isCorrect: false }
    //         ]
    //     }, {
    //         Question: "2 +3 = ?",
    //         Answers: [
    //             { Answer: "5", isCorrect: true },
    //             { Answer: "7", isCorrect: false },
    //             { Answer: "4", isCorrect: false },
    //             { Answer: "3", isCorrect: false }
    //         ]
    //     },
    //     {
    //         Question: "What comes after january?",
    //         Answers: [
    //             { Answer: "feb", isCorrect: true },
    //             { Answer: "march", isCorrect: false },
    //             { Answer: "june", isCorrect: false },
    //             { Answer: "sept", isCorrect: false }
    //         ]
    //     },
    //     {
    //         Question: "Which company pankaj is working currently?",
    //         Answers: [
    //             { Answer: "Accenture", isCorrect: false },
    //             { Answer: "Oracle", isCorrect: false },
    //             { Answer: "L&T", isCorrect: true },
    //             { Answer: "IBM", isCorrect: false }
    //         ]
    //     }
    // ];

    // const [currentQuestion, setCurrentQuestion] = useState(0);
    // const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    // const handleAnswerResponse = (isCorrect) => {
    //     if (isCorrect) {
    //         setScore(score + 1);
    //     }

    //     const nextQuestion = currentQuestion + 1;
    //     if (nextQuestion < Questionbank.length) {
    //         setCurrentQuestion(nextQuestion);
    //     } else {
    //         setShowScore(true);
    //     }
    // };

    const handleNextQuestion = () => {
        setCurrentQuestion(currentQuestion + 1);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
    };

    return (
             <div>
       <MainHeader></MainHeader>
       <Sidepannel></Sidepannel>
            <div className='app'>

                {/* <div className='question-section'>

                    <div className='question-count'>
                        <span>{currentQuestion + 1}</span>/{Questionbank.length}
                    </div>

                    <div className='question-text'>
                        {Questionbank[currentQuestion].Question}
                    </div>
                </div> */}

                {/* <div className='answer-section'>
                    {Questionbank[currentQuestion].Answers.map((answer) => (
                        <label key={answer.Answer} style={{ display: 'block', marginBottom: '10px', cursor: 'pointer' }}>
                            <input
                                type="radio"
                                name="answer"
                                value={answer.isCorrect}
                                onChange={() => handleAnswerResponse(answer.isCorrect)}
                                style={{ marginRight: '5px' }}
                            />
                            {answer.Answer}
                        </label>
                    ))}
                </div> */}




                {/* {showScore && (
                    <div className='score-section'>
                        You have scored {score} out of {Questionbank.length}
                        <button type='submit' onClick={resetQuiz}>
                            Play Again!!
                        </button>
                    </div>
                )} */}
                {/* <div>
                    <div style={{ marginTop: "250px", width: "100%", marginLeft: "20px" }}>
                        {!showScore && currentQuestion < Questionbank.length - 1 && (
                            <button onClick={handleNextQuestion}>
                                <a style={{ marginLeft: "15%" }}>Next</a> </button>
                        )}
                    </div>
                </div> */}

            </div>
            <div>
                <div>
                    <p className="heading-txt">Quiz APP</p>
                    <div className="container">
                        {showResult ? (
                            <QuizResult score={score} totalScore={QuizData.length} tryAgain={resetAll} />
                        ) : (
                            <>
                                <div className="question">
                                    <span id="question-number">{currentQuestion + 1}. </span>
                                    <span id="question-txt">{QuizData[currentQuestion].question}</span>
                                </div>
                                <div className="option-container">
                                    {QuizData[currentQuestion].options.map((option, i) => {
                                        return (
                                            <button
                                                // className="option-btn"
                                                className={`option-btn ${clickedOption == i + 1 ? "checked" : null
                                                    }`}
                                                key={i}
                                                onClick={() => setClickedOption(i + 1)}
                                            >
                                                {option}
                                            </button>
                                        )
                                    })}
                                </div>
                                <input type="button" value="Next" id="next-button" onClick={changeQuestion} />
                            </>)}
                    </div>
                </div>

                

                <header>
                {showNoiseAlertModal && (
                <Modal show={showNoiseAlertModal} onHide={() => setShowNoiseAlertModal(false)}>
                    <Modal.Body style={{ backgroundColor: "#333", width: "80%", height: "80%", borderRadius: "5%", color: "white" }}>
                        <div className="alert-content">
                            <p style={{ color: 'white', fontWeight: 'bold' }}>Background noise detected!</p>
                            <span
                                // style={{ marginTop: "5%" }}
                                className="ok-button"
                                onClick={() => {
                                    setShowNoiseAlertModal(false);
                                    navigate('/');
                                    window.location.reload();
                                }}
                            >
                                OK
                            </span>
                        </div>
                    </Modal.Body>
                </Modal>
            )}

                    <Webcam
                        audio={true}
                        ref={webcamRef}
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            borderRadius: "200px",
                            zIndex: 9,
                            width: 200,
                            height: 200,
                            border: `7px solid ${borderColor}`, // Set border color and style
                            marginTop: "1%",
                            display: cameraOn ? 'block' : 'none',
                        }}
                    />
                    <canvas
                        ref={canvasRef}
                        style={{
                            position: 'absolute',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            borderRadius: "250px",
                            top: 100,
                            left: 0,
                            right: 80,
                            textAlign: 'center',
                            zIndex: 9,
                            display: 'none',
                        }}
                    />
                    {/* <button onClick={() => setCameraOn(!cameraOn)}>
                        {cameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
                    </button> */}
                    {/* <AudioTracker></AudioTracker> */}
                </header>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Qutions;