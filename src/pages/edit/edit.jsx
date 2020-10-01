import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import axios from 'axios';

import './edit.css'

const Edit = (props) => {

    const [states, setStates] = useState({
        id: '',
        imgUrl: '',
        title: '',
        description: '',
        dateBegin: '',
        dateEnd: '',
        actions: []
    });
    const [showModal, setShowModal] = useState(false);
    const [idRoute, setIdRoute] = useState(
        {
            id: props.match.params.id,
        }
    );

    useEffect(() => {
        axios.get(`http://devserver.oktagongames.com:5000/api/campaign/${idRoute.id}`)
            .then(res => {
                const campaigns = res.data;
                setStates({
                    id: campaigns.id,
                    imgUrl: campaigns.imgUrl,
                    title: campaigns.title,
                    description: campaigns.description,
                    dateBegin: campaigns.dateBegin,
                    dateEnd: campaigns.dateEnd,
                    actions: campaigns.actions
                });
            })
    }, [idRoute.id]);

    const handleChange = (event) => {
        setStates({ ...states, [event.target.name]: event.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios({
            method: 'put',
            url: `http://devserver.oktagongames.com:5000/api/campaign/${idRoute.id}`,
            data: {
                "id": states.id,
                "imgUrl": states.imgUrl,
                "title": states.title,
                "description": states.description,
                "dateBegin": states.dateBegin,
                "dateEnd": states.dateEnd,
                "actions": [...states.actions]
            }
        })
            .then(function (response) {
                setShowModal(true);
            })
    }

    function handleContinuar() {
        setShowModal(false);
    }

    return (
        <div className="create" >
            <form className="all-content" onSubmit={handleSubmit}>
                <h2>Let's get edit</h2>
                <label>
                    1. Edit campaign title.
                    <input
                        type="text"
                        id="txt-1"
                        placeholder="Infinity War Campaign"
                        name="title"
                        value={states.title}
                        onChange={handleChange}
                        required />
                </label>
                <label>
                    2. Edit a brief description of the campaign.
                    <input
                        type="text"
                        id="txt-2"
                        placeholder="Infinity War Campaign description..."
                        name="description"
                        value={states.description}
                        onChange={handleChange}
                        required />
                </label>
                <label>
                    3. Edit when the campaign will start and end...
                    <div className="dates">
                        <input
                            type="date"
                            name="dateBegin"
                            value={states.dateBegin}
                            onChange={handleChange}
                            required />
                        <input
                            type="date"
                            name="dateEnd"
                            value={states.dateEnd}
                            onChange={handleChange}
                            required />
                    </div>
                </label>

                <div className="last-btn">
                    <Link to="/" className="cancel-btn">Cancel</Link>
                    <button className="btn-blue" type="submit" >EDIT CAMPAIGN</button>
                </div>
            </form>

            <Modal
                className="modal"
                show={showModal}
                data-testid="modal-compra-sucesso"
                onHide={handleContinuar}>
                <Modal.Header className="modal-header">
                    <Modal.Title>Campaign successfully edited</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
                <Modal.Footer>
                    <Link to={"/"} variant="success" onClick={handleContinuar} className="submit-btn">CONTINUE</Link>
                </Modal.Footer>
            </Modal>

        </div>
    );
}
export default Edit;
