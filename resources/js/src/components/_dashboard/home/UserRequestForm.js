import React from "react";
import { useState } from "react";
import "./landingPage.css";
import { createUserRequest } from "../../../api";
import { checkAgeGreaterThan18, checkMobileNumber, checkPanNumber } from "../utility";
import { validate } from "react-email-validator";
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

export default function UserRequestForm() {
    const SUCCESS_MESSAGE = "Thank you for loan service request.\nWe'll get back to you within 24 hours."
    const [data, setData] = useState({
        firstname: "",
        loanType: "",
        amount: 0,
        tenurePeriod: 3,
        pancard: "",
        email: "",
        phoneNumber: "",
        sex: "",
        dob: "",
        pincode: ""
    });

    const [message, setMessage] = useState([]);

    // const error

    const handleSubmit = async () => {
        // do an api request to createUserRequest api present in api/index.js
        var errorMessage = [];
        if (!data.loanType) errorMessage.push("Please select a loan type.");
        if (!data.amount) errorMessage.push("Please enter a loan amount. ");
        if (!data.tenurePeriod) errorMessage.push("Please enter a tenure period. ");
        if (!data.firstname) errorMessage.push("Please enter your name. ");
        if (!data.pancard) errorMessage.push("Please enter your PAN card number. ");
        if (data.pancard && !checkPanNumber(data.pancard)) errorMessage.push("Please enter a valid PAN card number. ");
        if (!data.email) errorMessage.push("Please enter your email address. ");
        if (data.email && !validate(data.email)) errorMessage.push("Please enter a valid email address. ");
        if (!data.phoneNumber) errorMessage.push("Please enter your phone number. ");
        if (data.phoneNumber && !checkMobileNumber(data.phoneNumber)) errorMessage.push("Please enter a valid phone number. ");
        if (!data.sex) errorMessage.push("Please enter your sex.");
        if (!data.dob) errorMessage.push("Please enter your date of birth. ");
        if (data.dob && !checkAgeGreaterThan18(data.dob)) errorMessage.push("You must be 18 years or older to apply for a loan. ");
        if (!data.pincode) errorMessage.push("Please enter your pincode. ");

        if (errorMessage.length > 0) {
            setMessage(errorMessage);
            return;
        }
        try {
            const response = await createUserRequest(data);
            setData(response);
            setMessage([SUCCESS_MESSAGE]);

        } catch (error) {
            console.log(error.message)
        }
    };

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
        <div className="userrequestform p-md-5">
            <section className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-5">
                        <div
                            className="card border border-3 p-3" style={{ width: "fit-content" }}
                        >

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

                            <fieldset>
                                <h1> Get Instant Loan </h1>
                                <hr />
                                <table>
                                    <div className="row">
                                        <div className="col-sm-12 col-md-12">
                                            <label for="source">Loan Type: </label>
                                            <br />
                                            <select
                                                name="loanType"
                                                className="req-input-select"
                                                value={data.loanType}
                                                onChange={e =>
                                                    setData({ ...data, loanType: e.target.value })}
                                            >
                                                <option value={""}>--SELECT LOAN TYPE--</option>
                                                <option value={"Personal"}>Personal</option>
                                                <option value={"Business"}>Business</option>
                                                <option value={"Secured Business"}>
                                                    Secured Business
                                                </option>
                                                <option value={"Gold Loan"}>Gold Loan</option>
                                                <option value={"Home Loan"}>Home Loan</option>
                                                <option value={"Used Car Loan"}>Used Car Loan</option>
                                                <option value={"Bike Loan"}>Bike Loan</option>
                                                <option value={"Car Loan"}>Car Loan</option>
                                                <option value={"Loan Against Property"}>
                                                    Loan Against Property
                                                </option>
                                                <option value={"Loan Against Car"}>
                                                    Loan Against Car
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12 col-md-12">
                                            <label for="income">Loan Amount: {data.amount} </label>
                                            <br />
                                            <input
                                                className="req-input-range"
                                                type="range"
                                                min="10000"
                                                max="500000"
                                                step="5000"
                                                // onInput="showVal(this.value)"
                                                onChange={e =>
                                                    setData({ ...data, amount: e.target.value })}
                                            />up to 10,00,000
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12 col-md-12">
                                            <label for="income">
                                                Tenure: {data.tenurePeriod} months{" "}
                                            </label>
                                            <br />
                                            <input
                                                className="req-input-range"
                                                type="range"
                                                min="3"
                                                max="60"
                                                step="1"
                                                value={data.tenurePeriod}
                                                // onInput="showVal(this.value)"
                                                onChange={e =>
                                                    setData({ ...data, tenurePeriod: e.target.value })}
                                            />up to 60 months
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12 col-md-6">
                                            <label for="fname">Full Name (As per PAN) : </label>
                                            <br />
                                            <input
                                                className="form-control"
                                                type="text"
                                                required
                                                name="firstname"
                                                value={data.firstname}
                                                onChange={e =>
                                                    setData({ ...data, firstname: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-sm-12 col-md-6">
                                            <label for="lname">PAN Card number: </label>
                                            <br />
                                            <input
                                                className="form-control"
                                                type="text"
                                                required
                                                name="pancard"
                                                value={data.pancard}
                                                onChange={e =>
                                                    setData({ ...data, pancard: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12 col-md-6">
                                            <label for="email">Phone Number: </label>
                                            <br />
                                            <div class="input-group mb-3">
                                                <span class="input-group-text" id="basic-addon1">+91</span>
                                                {/* <input type="text" class=" " placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/> */}
                                                <input
                                                    className="form-control "
                                                    type="text"
                                                    name="phoneNumber"
                                                    value={data.phoneNumber}
                                                    onChange={e =>
                                                        setData({ ...data, phoneNumber: checkNumber(e.target.value) })}
                                                />
                                            </div>


                                        </div>
                                        <div className="col-sm-12 col-md-6" colspan="2">
                                            <label for="email">Email: </label>
                                            <br />
                                            <input
                                                className="form-control"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                onChange={e =>
                                                    setData({ ...data, email: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12 col-md-6">
                                            <label for="gender">Gender: </label>
                                            <br />
                                            <input
                                                className="req-input-radio"
                                                type="radio"
                                                name="sex"
                                                value="Male"
                                                onClick={e => setData({ ...data, sex: e.target.value })}
                                            />Male
                                            <input
                                                className="req-input-radio"
                                                type="radio"
                                                name="sex"
                                                value="Female"
                                                onClick={e => setData({ ...data, sex: e.target.value })}
                                            />Female
                                        </div>
                                        <div className="col-sm-12 col-md-6">
                                            <label for="age">DOB </label>
                                            <br />
                                            <input
                                                className="form-control"
                                                type="date"
                                                name="dob"
                                                value={data.dob}
                                                onChange={e =>
                                                    setData({ ...data, dob: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12 col-md-6">
                                            <label for="password">Pin Code: </label>
                                            <br />
                                            <input
                                                className="form-control"
                                                type="text"
                                                required
                                                name="pincode"
                                                value={data.pincode}
                                                onChange={e =>
                                                    setData({ ...data, pincode: checkNumber(e.target.value) })}
                                            />
                                        </div>
                                    </div>
                                </table>
                                <hr />
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="btn btn-primary"
                                >
                                    Check Eligibility
                                </button>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
}
