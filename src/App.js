import React, { useState } from 'react';
import HomepageCards from './components/HomepageCards';
import './App.css'; // Where you define your theme styles

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <HomepageCards onToggleDarkMode={toggleDarkMode} darkMode={darkMode} />
    </div>
  );
}

export default App;
