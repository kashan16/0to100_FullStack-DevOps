import { NextApiRequest, NextApiResponse } from "next";

type post = {
    title : string;
    content : string;
}

let posts : post[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'GET') {
        res.status(200).json(posts);
    } else if(req.method === 'POST') {
        const { title , content } = req.body;
        if(!title || !content) {
            return res.status(400).json({ error : 'title or content is missing' });
        }
        const newPost = { title , content };
        posts.push(newPost);
        res.status(201).json(newPost);
    } else if(req.method === 'DELETE') {
        const { title } = req.body;
        posts = posts.filter(post => post.title !== title);
        res.status(204).end();
    } else {
        res.status(405).end();
    }
} 