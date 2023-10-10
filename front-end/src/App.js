import React from 'react';
import './App.css'; // Import the app-specific CSS
import FileUpload from './components/FileUpload'; // Import your FileUpload component

function App() {
  return (
    <div className="container">
      <h1 className="heading">PDF Extraction App</h1>
      <main>
        <FileUpload />
        {/* Add other components as needed */}
      </main>
      <footer>
        {/* You can add a footer here if needed */}
      </footer>
    </div>
  );
}

export default App;
