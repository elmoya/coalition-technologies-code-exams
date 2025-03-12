import React, { useState, useEffect } from 'react';

/**
 * CreatePost Component
 * Makes a POST request using traditional AJAX (XMLHttpRequest) to JSONPlaceholder API
 * Adds an "excerpt" key with the first 20 characters from the body
 * 
 * @return {JSX.Element} React component
 */
function CreatePost() {
    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        createPost();
    }, []);

    /**
     * Creates a new post via XMLHttpRequest POST request to JSONPlaceholder API
     * Adds an excerpt field containing first 20 chars of the body
     */
    const createPost = () => {
        try {
            setLoading(true);

            const newPostData = {
                userId: 1,
                title: "New Post Created with React",
                body: "This is the body of my new post created using the JSONPlaceholder API and React. It contains more than 20 characters."
            };

            newPostData.excerpt = newPostData.body.substring(0, 20);

            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts', true);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const data = JSON.parse(xhr.responseText);
                    setPostData(data);
                    console.log('Post created successfully:', data);
                } else {
                    setError(`HTTP error! Status: ${xhr.status}`);
                    console.error('Error creating post:', xhr.statusText);
                }
                setLoading(false);
            };

            xhr.onerror = function () {
                setError('Network error occurred');
                console.error('Network error occurred');
                setLoading(false);
            };

            // Send the request
            xhr.send(JSON.stringify(newPostData));

        } catch (err) {
            setError(err.message);
            setLoading(false);
            console.error('Error creating post:', err);
        }
    };

    return (
        <div>
            <h2>Task 1: Create Post with Excerpt (XMLHttpRequest)</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {postData && (
                <div>
                    <h3>Post Created Successfully</h3>
                    <p><strong>ID:</strong> {postData.id}</p>
                    <p><strong>Title:</strong> {postData.title}</p>
                    <p><strong>Body:</strong> {postData.body}</p>
                    <p><strong>Excerpt:</strong> {postData.excerpt}</p>
                </div>
            )}
        </div>
    );
}

export default CreatePost;