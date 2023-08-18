import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainHeader from '../MainHeader';
import Sidepannel from '../sidepannel';

function HeaderCamera() {
  const [isClicked, setIsClicked] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // State for checkbox

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
   
    <div className="App">
      <header className="App-header">
        <p>
          After capturing your face, you are ready for the exam{' '}
          {isChecked && ( // Show the "Click here" link only when the checkbox is checked
            <Link to="/questions" className={isClicked ? 'blue-clicked' : 'blue'}>
              Click here
            </Link>
          )}
        </p>
        {/* Checkbox for terms and conditions */}
     <label style={{ fontSize: "20px", marginTop: "5%", display: "flex", alignItems: "center" }}>
    <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
        style={{ marginRight: "10px" }} // Add spacing to the right of the checkbox
    />
    I agree to the <a href="/Quiz">Terms and Conditions</a>
</label>






      </header>
    </div>
   
  );
}

export default HeaderCamera;
