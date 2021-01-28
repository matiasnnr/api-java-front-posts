import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../components/post/Post';
import { USER_POST_ENDPOINT } from '../helpers/endpoints';
import { Jumbotron } from 'react-bootstrap';
import Placeholder from '../components/utils/Placeholder';

export default function UserPosts() {

    const [posts, setPosts] = useState([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        axios.get(USER_POST_ENDPOINT).then(res => {
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
                <h1>Mis posts</h1>
            </Jumbotron>
            { fetching && <Placeholder />}
            <div>
                {posts.map(post => <Post key={post.postId} post={post} renderControls={true}></Post>)}
            </div>
        </div>
    )
}
