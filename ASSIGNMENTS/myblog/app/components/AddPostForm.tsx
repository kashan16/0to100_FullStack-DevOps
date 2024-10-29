"use client";
import { useState } from "react";

const AddPostForm = () => {
    const [ title , setTitle ] = useState('');
    const [ content , setContent ] = useState('');
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!title || !content) {
            alert('Please fill in all the fields');
            return;
        }
        const newPost = { title, content };
        fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Success', data);
            setTitle('');
            setContent('');
        })
        .catch((error) => {
            console.error('Error', error);
        });
    };
    
    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input 
                        type="text" 
                        id="title"
                        name="title"
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                    <input 
                        type="text" 
                        id="content"
                        name="content"
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add Post</button>
            </form>
        </div>
    )
}

export default AddPostForm