import React from 'react';
import CreatePost from './components/CreatePost';
import FetchPostWithComments from './components/FetchPostWithComments';
import UpdatePostForm from './components/UpdatePostForm';

/**
 * Main App Component
 * Renders all three task components
 * 
 * @return {JSX.Element} React component
 */
function App() {
  return (
    <div className="App">
      <h1>JavaScript Skills Test with React</h1>
      
      <div style={{ marginBottom: "40px" }}>
        <CreatePost />
      </div>
      
      <div style={{ marginBottom: "40px" }}>
        <FetchPostWithComments />
      </div>
      
      <div style={{ marginBottom: "40px" }}>
        <UpdatePostForm />
      </div>
    </div>
  );
}

export default App;