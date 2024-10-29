"use client";
import { useEffect, useState } from 'react';

type Post = {
    title : string;
    content : string;
};

const HomePage = () => {
    const [ posts , setPosts ] = useState<Post[]>([]);

    useEffect(() => {
        fetch('/api/posts')
            .then((response) => response.json())
            .then((data) => setPosts(data))
            .catch((error) => console.error(error));
    } , []);

    const handleDeletePost = (postTitle: string) => {
        fetch('/api/posts', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: postTitle }),
        })
          .then(() => {
            setPosts((prevPosts) => prevPosts.filter((post) => post.title !== postTitle));
          })
          .catch((error) => console.error('Error deleting post:', error));
      };
    
    return (
        <div className="max-w-3xl mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Posts</h1>
            <ul className="space-y-4">
                {posts.map((post) => (
                    <li key={post.title} className="p-4 border rounded shadow bg-white">
                        <h2 className="text-xl font-semibold">{post.title}</h2>
                        <p className="text-gray-700">{post.content}</p>
                        <button onClick={() => handleDeletePost(post.title)}
                                className="mt-2 bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )  
}

export default HomePage;