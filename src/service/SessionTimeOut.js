import React, { useEffect, useRef } from 'react';

const SessionTimeout = ({ timeoutMinutes }) => {
  const logoutTimerRef = useRef(null);

  const resetTimer = () => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
    }
    logoutTimerRef.current = setTimeout(logoutUser, timeoutMinutes * 60 * 1000);
  };

  const logoutUser = () => {
    // Perform logout action (e.g., clearing user session, redirecting to login page)
    console.log('Session timed out. Logging out user...');
    localStorage.clear();
    window.location.href = '/Login';
  };

  useEffect(() => {
    resetTimer();

    // Attach event listeners to detect user activity and reset the timer
    const events = ['mousedown', 'keydown', 'mousemove', 'touchstart'];
    const resetTimerOnActivity = () => {
      resetTimer();
    };
    events.forEach((event) => {
      document.addEventListener(event, resetTimerOnActivity);
    });

    // Clean up the event listeners when the component unmounts
    return () => {
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
      }
      events.forEach((event) => {
        document.removeEventListener(event, resetTimerOnActivity);
      });
    };
  }, [timeoutMinutes]);

  // Return null if you want to keep the component render-free
  return null;
};

export default SessionTimeout;