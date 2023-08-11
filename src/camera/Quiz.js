import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import QuizResult from './QuizResult';
import { QuizData } from './QuizData';

function Quiz() {
    return (
        <div>
            <p className="heading-txt">Terms and Conditions</p>
            <div className="container_teams">
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '30px' }}><strong>1.</strong> Focus on the camera and do not attempt to move or look anywhere else.</li>
                    <li style={{ marginBottom: '30px' }}><strong>2.</strong> Ensure that no noise in background,if we detect any noise in background the exam will end</li>
                    <li style={{ marginBottom: '30px' }}><strong>3.</strong> Only your face must be in frame don't dont be multiface</li>
                    <li style={{ marginBottom: '30px' }}><strong>4.</strong> Focus look at back and side </li>
                    <li style={{ marginBottom: '30px' }}><strong>5.</strong> Focus on the camera and do not attempt to move or look anywhere else, as it may result in exam disqualification.</li>
                    <li style={{ marginBottom: '30px' }}><strong>6.</strong> Focus on the camera and do not attempt to move or look anywhere else, as it may result in exam disqualification.</li>
                </ul>
            </div>
            <Link to="/" style={{marginLeft:"45%",color:'white'}}>Back</Link>
        </div>
    );
}

export default Quiz;
