import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import axios from 'axios';

import './edit.css'
import SpiderMan from '../../assets/spiderman.jpg'
import White from '../../assets/white.jpg'

const Edit = (props) => {

    const [state, setState] = useState();
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
    const [editCampaign, setEditCampaign] = useState(
        {
            id: '',
            imgUrl: '',
            title: '',
            description: '',
            dateBegin: '',
            dateEnd: '',
            actions: [],
        }
    );
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
                <h2>Let's get started</h2>
                <label>
                    1. Which Hero is starring in this campaign?
                    <p>Don't see the HERO you want to use ? Add new HERO
                    </p>
                </label>
                <div className="upload">
                    <img src={SpiderMan} alt="spiderman" />
                    <img src={White} alt="white" />
                    <img src={White} alt="white" />
                </div>
                <label>
                    2. Whats is the title of the campaign?
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
                    3. Write a brief description of the campaign.
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
                    4.When wil the campaign start and end? This can be update latter
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
                    <button className="btn-blue" type="submit" >Create campaign</button>

                    {/* <Link type="submit" className="submit-btn">Create campaign</Link> */}
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
                    <Link to={"/"} variant="success" onClick={handleContinuar} className="submit-btn">CONTINUE</Link>
                </Modal.Footer>
            </Modal>

        </div>
    );
}
export default Edit;
