import React, { useState, useEffect } from 'react';

/**
 * FetchPostWithComments Component
 * Fetches a post with ID 50 and retrieves all associated comments using XMLHttpRequest
 * Merges the comments into the post data under a "comments" key
 * 
 * @return {JSX.Element} React component
 */
function FetchPostWithComments() {
    const [postWithComments, setPostWithComments] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPostAndComments();
    }, []);

    /**
     * Uses traditional AJAX (XMLHttpRequest) to fetch post and comments
     * Implements a custom promise-based wrapper for XMLHttpRequest
     * @param {string} url - The URL to fetch data from
     * @returns {Promise} - Promise resolving to the response data
     */
    const makeAjaxRequest = (url) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);

            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(new Error(`HTTP error! Status: ${xhr.status}`));
                }
            };

            xhr.onerror = function () {
                reject(new Error('Network error occurred'));
            };

            xhr.send();
        });
    };

    /**
     * Fetches post with ID 50 and its comments, then merges them
     * Uses separate AJAX calls for post and comments
     */
    const fetchPostAndComments = () => {
        setLoading(true);
        const postId = 50;

        makeAjaxRequest(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(post => {
                return makeAjaxRequest(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
                    .then(comments => {
                        const mergedData = {
                            ...post,
                            comments: comments
                        };

                        setPostWithComments(mergedData);
                        console.log('Post with comments:', mergedData);
                    });
            })
            .catch(err => {
                setError(err.message);
                console.error('Error fetching data:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <h2>Task 2: Fetch Post with Comments (XMLHttpRequest)</h2>
            {loading && <p>Loading post and comments...</p>}
            {error && <p>Error: {error}</p>}
            {postWithComments && (
                <div>
                    <h3>Post #{postWithComments.id}: {postWithComments.title}</h3>
                    <p>{postWithComments.body}</p>

                    <h4>Comments ({postWithComments.comments.length}):</h4>
                    <ul>
                        {postWithComments.comments.map(comment => (
                            <li key={comment.id}>
                                <strong>{comment.name}</strong> ({comment.email})
                                <p>{comment.body}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default FetchPostWithComments;