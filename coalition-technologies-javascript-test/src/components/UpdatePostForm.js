import React, { useState } from 'react';

/**
 * UpdatePostForm Component
 * Creates a form to update any post by ID using traditional AJAX (XMLHttpRequest)
 * Allows users to update existing fields or add custom fields
 * 
 * @return {JSX.Element} React component
 */
function UpdatePostForm() {
    const [postId, setPostId] = useState('');
    const [postData, setPostData] = useState(null);
    const [formFields, setFormFields] = useState({
        title: '',
        body: '',
        userId: ''
    });
    const [customFields, setCustomFields] = useState([]);
    const [newFieldKey, setNewFieldKey] = useState('');
    const [newFieldValue, setNewFieldValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    /**
     * Makes an AJAX request using XMLHttpRequest
     * @param {string} url - The URL to send the request to
     * @param {string} method - HTTP method (GET, POST, PUT, etc.)
     * @param {object} data - Data to send in the request body
     * @returns {Promise} - Promise resolving to the response data
     */
    const makeAjaxRequest = (url, method, data = null) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

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

            xhr.send(data ? JSON.stringify(data) : null);
        });
    };

    /**
     * Fetches a post by ID to display current values
     * @param {Event} e - Form submit event
     */
    const fetchPost = (e) => {
        e.preventDefault();
        if (!postId.trim()) {
            setError('Please enter a post ID');
            return;
        }

        setFetchLoading(true);
        setError(null);

        makeAjaxRequest(`https://jsonplaceholder.typicode.com/posts/${postId}`, 'GET')
            .then(data => {
                setPostData(data);

                // Update form fields with current values
                setFormFields({
                    title: data.title || '',
                    body: data.body || '',
                    userId: data.userId || ''
                });
            })
            .catch(err => {
                setError(err.message);
                setPostData(null);
            })
            .finally(() => {
                setFetchLoading(false);
            });
    };

    /**
     * Handles changes to the main form fields
     * @param {Event} e - Input change event
     */
    const handleFieldChange = (e) => {
        setFormFields({
            ...formFields,
            [e.target.name]: e.target.value
        });
    };

    /**
     * Adds a new custom field to the form
     * @param {Event} e - Form submit event
     */
    const addCustomField = (e) => {
        e.preventDefault();
        if (!newFieldKey.trim()) {
            setError('Please enter a field key');
            return;
        }

        setCustomFields([
            ...customFields,
            { key: newFieldKey, value: newFieldValue }
        ]);

        setNewFieldKey('');
        setNewFieldValue('');
    };

    /**
     * Updates custom field values
     * @param {number} index - Index of the custom field
     * @param {string} value - New value for the field
     */
    const updateCustomField = (index, value) => {
        const updatedFields = [...customFields];
        updatedFields[index].value = value;
        setCustomFields(updatedFields);
    };

    /**
     * Removes a custom field from the form
     * @param {number} index - Index of the field to remove
     */
    const removeCustomField = (index) => {
        setCustomFields(customFields.filter((_, i) => i !== index));
    };

    /**
     * Submits the form to update the post
     * @param {Event} e - Form submit event
     */
    const updatePost = (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage(null);
        setError(null);

        const updateData = { ...formFields };

        customFields.forEach(field => {
            updateData[field.key] = field.value;
        });

        makeAjaxRequest(`https://jsonplaceholder.typicode.com/posts/${postId}`, 'PUT', updateData)
            .then(updatedPost => {
                setMessage('Post updated successfully!');
                console.log('Updated post data:', updatedPost);
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <h2>Task 3: Update Post Form (XMLHttpRequest)</h2>

            <form onSubmit={fetchPost}>
                <div>
                    <label htmlFor="postId">Post ID: </label>
                    <input
                        type="number"
                        id="postId"
                        value={postId}
                        onChange={(e) => setPostId(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={fetchLoading}>
                        {fetchLoading ? 'Loading...' : 'Fetch Post'}
                    </button>
                </div>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {postData && (
                <div>
                    <h3>Update Post #{postData.id}</h3>

                    <form onSubmit={updatePost}>
                        <div>
                            <label htmlFor="title">Title: </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formFields.title}
                                onChange={handleFieldChange}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="body">Body: </label>
                            <textarea
                                id="body"
                                name="body"
                                value={formFields.body}
                                onChange={handleFieldChange}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="userId">User ID: </label>
                            <input
                                type="number"
                                id="userId"
                                name="userId"
                                value={formFields.userId}
                                onChange={handleFieldChange}
                                required
                            />
                        </div>

                        <h4>Custom Fields:</h4>
                        {customFields.map((field, index) => (
                            <div key={index}>
                                <label>{field.key}: </label>
                                <input
                                    type="text"
                                    value={field.value}
                                    onChange={(e) => updateCustomField(index, e.target.value)}
                                />
                                <button type="button" onClick={() => removeCustomField(index)}>
                                    Remove
                                </button>
                            </div>
                        ))}

                        <div>
                            <input
                                type="text"
                                placeholder="Field Name"
                                value={newFieldKey}
                                onChange={(e) => setNewFieldKey(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Field Value"
                                value={newFieldValue}
                                onChange={(e) => setNewFieldValue(e.target.value)}
                            />
                            <button type="button" onClick={addCustomField}>
                                Add Field
                            </button>
                        </div>

                        <button type="submit" disabled={loading}>
                            {loading ? 'Updating...' : 'Update Post'}
                        </button>
                    </form>

                    {message && <p style={{ color: 'green' }}>{message}</p>}
                </div>
            )}
        </div>
    );
}

export default UpdatePostForm;