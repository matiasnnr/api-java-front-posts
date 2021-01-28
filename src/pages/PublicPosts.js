import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../components/post/Post';
import { PUBLIC_POSTS_ENDPOINT } from '../helpers/endpoints';
import { Jumbotron } from 'react-bootstrap';
import Placeholder from '../components/utils/Placeholder';

export default function PublicPosts() {

    const [posts, setPosts] = useState([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        axios.get(PUBLIC_POSTS_ENDPOINT).then(res => {
            setPosts(res.data);
            setFetching(false);
        }).catch(e => {
            console.error(e);
            setFetching(false);
        })
    }, []);

    return (
        <div>
            <Jumbotron className="mt-4">
                <h1>Últimos posts públicos</h1>
            </Jumbotron>
            { fetching && <Placeholder />}
            <div>
                {posts.map(post => <Post key={post.postId} post={post} renderControls={false}></Post>)}
            </div>
        </div>
    )
}
