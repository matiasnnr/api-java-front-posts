import React from 'react'
import { Button } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import { getUserPost } from '../../../actions/postActions';
import { DELETE_POST_ENDPOINT } from '../../../helpers/endpoints';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function DeletePostButton({ title, postId }) {

    const dispatch = useDispatch();

    const createAlert = () => {
        confirmAlert({
            title: "Eliminar post",
            message: `Estás seguro que deseas eliminar el post ${title}`,
            buttons: [
                {
                    label: "Sí",
                    onClick: () => { deletePost() }
                },
                {
                    label: "No",
                    onClick: () => { return false }
                }
            ]
        })
    }

    const deletePost = async () => {
        try {
            await axios.delete(`${DELETE_POST_ENDPOINT}/${postId}`);

            await dispatch(getUserPost());

            toast.info(`El post ${title} se ha eliminado`, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 2000 // 2 segundos
            });
        } catch (e) {
            toast.error(e.response.data.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 2000 // 2 segundos
            });
        }
    }

    return (
        <Button variant="primary" size="sm" onClick={createAlert} >Eliminar</Button>
    )
}
