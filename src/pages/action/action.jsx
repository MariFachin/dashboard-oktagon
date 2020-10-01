import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import axios from 'axios';

import './action.css'

const Action = (props) => {

    const [state, setState] = useState();
    const [showModal, setShowModal] = useState(false);
    const [idRoute, setIdRoute] = useState(
        {
            id: props.match.params.id,
        }
    );
    const [newAction, setAction] = useState(
        {
            title: '',
            description: '',
            dateBegin: '',
            dateEnd: ''
        }
    );

    useEffect(() => {
        axios.get(`http://devserver.oktagongames.com:5000/api/campaign/${idRoute.id}`)
            .then(res => {
                const campaigns = res.data;
                setState({ campaigns });
            })
    }, [idRoute.id]);

    const handleChange = (event) => {
        setAction({ ...newAction, [event.target.name]: event.target.value })
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        axios({
            method: 'put',
            url: `http://devserver.oktagongames.com:5000/api/campaign/${idRoute.id}`,
            data: {
                "id": state.campaigns.id,
                "imgUrl": state.campaigns.imgUrl,
                "title": state.campaigns.title,
                "description": state.campaigns.description,
                "dateBegin": state.campaigns.dateBegin,
                "dateEnd": state.campaigns.dateEnd,
                "actions": [...state.campaigns.actions, {
                    "title": newAction.title,
                    "description": newAction.description,
                    "dateBegin": newAction.dateBegin,
                    "dateEnd": newAction.dateEnd,
                }]
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
        <div className="action">
            <form className="all-content" onSubmit={handleSubmit}>
                <h2>New Action</h2>
                <label>
                    1. Action Title:
                    <input
                        type="text"
                        id="txt-1"
                        placeholder="Infinity War Action"
                        name="title"
                        value={newAction.title}
                        onChange={handleChange}
                        required />
                </label>
                <label>
                    2. Write a brief description of the action:
                    <input
                        type="text"
                        id="txt-2"
                        placeholder="Infinity War Action description..."
                        name="description"
                        value={newAction.description}
                        onChange={handleChange}
                        required />
                </label>
                <label>
                    Choose date range
                    <div className="dates">
                        <input
                            type="date"
                            name="dateBegin"
                            value={newAction.dateBegin}
                            onChange={handleChange}
                            required />
                        <input
                            type="date"
                            name="dateEnd"
                            value={newAction.dateEnd}
                            onChange={handleChange}
                            required />
                    </div>
                </label>
                <div className="last-btn">
                    <Link to="/" className="cancel-btn">Cancel</Link>
                    <button className="btn-blue" type="submit" >Create action</button>
                </div>
            </form>
            <Modal
                className="modal"
                show={showModal}
                data-testid="modal-compra-sucesso"
                onHide={handleContinuar}>
                <Modal.Header className="modal-header">
                    <Modal.Title>Campaign successfully saved</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
                <Modal.Footer>
                    <Link to="/" variant="success" onClick={handleContinuar} className="submit-btn">CONTINUE</Link>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default Action