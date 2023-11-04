import React from "react";
import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

import "./landingPage.css";
import { postReview } from "../../../api";
import { checkMobileNumber } from "../utility";
import Modal from 'react-modal';
import { Card } from "reactstrap";
import Lottie from "react-lottie";
import successJson from "./svg/success.json";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
export default function UserReviewForm() {
    const SUCCESS_MESSAGE = "Thank you for your review.";
  const [data, setData] = useState({
    firstname: "",
    phoneNumber: "",
    rating: 0,
    review: ""
  });

  const [message, setMessage] = useState([]);

  const sendReview = (e) => {
    e.preventDefault();
    var errors = [];
    if (data.firstname === "") errors.push("Please enter your name.");
    if (data.phoneNumber === "") errors.push("Please enter your phone number.");
    if (data.phoneNumber && !checkMobileNumber(data.phoneNumber)) errors.push("Please enter a valid phone number.");
    if (data.review === "") errors.push("Please enter your review.");

    if (errors.length > 0) {
        setMessage(errors);
        return;
    }

    // api call
    postReview(data).then((response) => {
        console.log(response);
        setMessage([SUCCESS_MESSAGE]);
        })
        .catch((error) => {
            console.log(error.response);
            setMessage([error.response.data.error]);
        });
  };

  const rate = (index) => {
    console.log("rate")
    setData({...data, rating: index+1})
  }

  const isNumber = (str) => {
    const regex = /^[0-9]+$/;
    return regex.test(str);
}

const checkNumber = (value) => {
    if (isNumber(value)) {
        return value;
    } else {
        return value.slice(0, -1);
    }
}

const [modalIsOpen, setIsOpen] = React.useState(false);

function closeModal() {
    setIsOpen(false);
    setMessage([]);
}
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: successJson,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

  return (
    <div>
      <div className="form">
        <form className="" noValidate>
          <div className="row text-center">
            <div className="col-xs-12  text-start d-flex">
            <Modal
                                isOpen={message.length > 0}
                                onRequestClose={closeModal}
                                style={customStyles}
                                contentLabel="Message"
                            >
                                <Card className="p-3">
                                    <div>
                                        {message[0] === SUCCESS_MESSAGE ? <Lottie options={defaultOptions} height={300} width={300} /> : null}
                                        {message.length > 1 ? <ul>
                                            {message.map((msg, index) => (
                                                <li>{msg}</li>
                                            ))}
                                        </ul>
                                            : <p>{message[0]}</p>
                                        }
                                    </div>
                                    <button onClick={closeModal} className="btn btn-primary">close</button>

                                </Card>
                            </Modal>


              {[...Array(5)].map((elementInArray, index) =>
                <div key={index}>
                    {
                     (index<data.rating) ? (<FaStar size={50} onClick={(e) => setData({...data, rating: index+1})}/>): (<FaRegStar size={50}  onClick={(e) => setData({...data, rating: index+1})}/>)
                    }
                </div>
              )}

            </div>
            <div className="col-xs-12 col-md-6 text-start">
              <input
                className="contact-input-field"
                name="firstName"
                variant="outlined"
                autoComplete="First Name"
                required
                fullWidth
                id="firstName"
                placeholder="Name"
                value={data.firstname}
                onChange={e =>
                  setData({
                    ...data,
                    firstname: e.target.value
                  })}
              />
            </div>
            <div className="col-xs-12 col-md-6 text-start">
              <input
                className="contact-input-field"
                name="phoneNumber"
                variant="outlined"
                autoComplete="phone"
                required
                fullWidth
                placeholder="Phone"
                type="text"
                id="phoneNumber"
                value={data.phoneNumber}
                onChange={e =>
                  setData({
                    ...data,
                    phoneNumber: checkNumber(e.target.value)
                  })}
              />
            </div>
            <div className="col-xs-12 text-start">
              <textarea
                className="contact-input-field"
                name="review"
                variant="outlined"
                required
                fullWidth
                placeholder="Enter your message"
                type="textarea"
                id="message"
                rows="5"
                value={data.review}
                onChange={e => setData({ ...data, review: e.target.value })}
              />
            </div>
            <button type="submit" className="submit-btn" onClick={sendReview}>
              Publish Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
