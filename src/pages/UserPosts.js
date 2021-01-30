import React, { useState, useEffect } from 'react';
import Post from '../components/post/Post';
import { Jumbotron } from 'react-bootstrap';
import Placeholder from '../components/utils/Placeholder';
import { useSelector, useDispatch } from 'react-redux';
import { getUserPost } from '../actions/postActions';
import { toast } from 'react-toastify';

export default function UserPosts() {

    const [fetching, setFetching] = useState(false);
    const fetched = useSelector(state => state.posts.fetched);
    const posts = useSelector(state => state.posts.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchedPosts = async () => {
            if (!fetched) {
                try {
                    setFetching(true);
                    await dispatch(getUserPost());
                    setFetching(false);
                } catch (error) {
                    toast.error(error.response.data.message, {
                        position: toast.POSITION.BOTTOM_CENTER,
                        autoClose: 2000
                    })
                }
            }
        }
        fetchedPosts();
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
