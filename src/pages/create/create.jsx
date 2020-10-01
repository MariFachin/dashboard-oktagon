import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import axios from 'axios';

import './create.css'
import SpiderMan from '../../assets/spiderman.jpg'
import White from '../../assets/white.jpg'

const Create = (props) => {

    const [state, setState] = useState();
    const [showModal, setShowModal] = useState(false);
    const [idCampaign, setId] = useState({ id: '' });
    const [newCampaign, setNewCampaign] = useState(
        {
            title: '',
            description: '',
            dateBegin: '',
            dateEnd: ''
        }
    );

    const handleChange = (event) => {
        setNewCampaign({ ...newCampaign, [event.target.name]: event.target.value })
    }

    const onChange = (e) => {
        console.log("file to upload:", e.target.files[0])
        let file = e.target.files[0]


        if (file) {
            var reader = new FileReader();
            reader.onload = _handleReaderLoaded.bind(this)
            reader.readAsBinaryString(file)
        }
    }

    const _handleReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result
        setState({
            base64TextString: btoa(binaryString)
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault()


        let img = { image: state.base64TextString }

        axios({
            method: 'post',
            url: 'http://devserver.oktagongames.com:5000/api/campaign',
            data: {
                "imgUrl": JSON.stringify(img),
                "title": newCampaign.title,
                "description": newCampaign.description,
                "dateBegin": newCampaign.dateBegin,
                "dateEnd": newCampaign.dateEnd
            }
        })
            .then(function (response) {
                setShowModal(true);

                setId({ id: response.data._id })
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
                    <input
                            style={{ border: "none", fontSize: "12px", margin: "0px 10px" }}
                            type="file"
                            name="imgUrl"
                            accept="image/png, image/jpeg"
                            onChange={(e) => onChange(e)}
                            required />
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
                        value={newCampaign.title}
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
                        value={newCampaign.description}
                        onChange={handleChange}
                        required />
                </label>
                <label>
                    4.When wil the campaign start and end? This can be update latter
                    <div className="dates">
                        <input
                            type="date"
                            name="dateBegin"
                            value={newCampaign.dateBegin}
                            onChange={handleChange}
                            required />
                        <input
                            type="date"
                            name="dateEnd"
                            value={newCampaign.dateEnd}
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
                    <Link to={"/description/" + idCampaign.id} variant="success" onClick={handleContinuar} className="submit-btn">CONTINUE</Link>
                </Modal.Footer>
            </Modal>

        </div>
    );
}
export default Create
