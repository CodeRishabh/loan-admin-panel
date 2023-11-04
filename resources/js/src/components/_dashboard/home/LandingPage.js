import React, {useState as UseState} from 'react'
import './landingPage.css'
import logo from './svg/logo.svg'
import iconHamburger from './svg/icon-hamburger.svg'
import desktopIntro from './svg/image-intro-desktop.jpg'
import snappyProcess from "./svg/icon-snappy-process.svg"
import affordablePrices from "./svg/icon-affordable-prices.svg"
import peopleFirst from "./svg/icon-people-first.svg"
import dwnld from "./svg/dwnld.svg"
import fast from "./svg/fast.svg"
import secure from "./svg/secure.svg"
import easy from "./svg/easy.svg"
import phHeader from "./design/phHeader.png"
import approval from "./design/approval.png"
import pigBank from "./design/pigBank.png"
import contactImg from "./design/contactImg.svg"
import { MdHomeWork, MdSchool, MdDirectionsCar, MdAirplaneTicket, MdStorefront, MdDocumentScanner, MdOutlineLock } from 'react-icons/md';
import { HiStatusOnline } from 'react-icons/hi';
import { BiShuffle, BiTimer } from 'react-icons/bi'
import { AiFillGold } from 'react-icons/ai'

import { baseUri, postQuery } from '../../../api/index'
import UserRequestForm from './UserRequestForm'
import UserReviewForm from './UserReviewForm'
import Reviews from './Reviews'

export default function LandingPage() {

    const [contactData, setData] = UseState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        emailID: "",
        query: "",
    })

    const handeleSubmit = (e) => {
        e.preventDefault();
        postQuery(contactData);
    }

    return (
        <body className='landing-page'>

            <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="#">LoanPe</a>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <a className='nav-link' href="#about">About</a>
                        </li>
                        <li className="nav-item">
                            <a className='nav-link' href="#features">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className='nav-link' href="#benefits">Benefits</a>
                        </li>
                        <li className="nav-item">
                            <a className='nav-link' href="#testimonials">Testimonials</a>
                        </li>
                        <li className="nav-item">
                            <a className='nav-link' href="/terms">Terms And Conditions</a>
                        </li>
                        <li className="nav-item">
                            <a className='nav-link' href="/privacypolicy">Privacy Policy</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <header className='header' id='about'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-12 col-md-10, col-lg-6'>
                            <h1 className='hero-heading'>LoanPe - Instant Personal Loans</h1>
                            <p className='hero-helper'>Instant cash loans in India at lowest interest rates.</p>
                            <a target="_blank" rel="noopener noreferrer" className="google-dwnld" href={`${baseUri}/getApk`}><img src={dwnld} width="200" alt="dwnld-link" /></a>
                        </div>
                    </div>
                </div>
            </header>

            <UserRequestForm />

            <section id='features'>
                <div className='features'>
                    <div className='row'>
                        <div className='col-sm-12 col-md-4'>
                            <div className="features-card">
                                <div className='feature-img'>
                                    <img src={fast} />
                                </div>
                                <h1 className='feature-heading'>Fast</h1>
                                <p className='mx-lg-5'>Transfer your LoanPe wallet balance
                                    directly to your bank account with just one
                                    click and choose flexible repayment plans
                                    as per your convenience.</p>
                            </div>
                        </div>
                        <div className='col-sm-12 col-md-4'>
                            <div className="features-card">
                                <div className='feature-img'>
                                    <img src={secure} />
                                </div>
                                <h1 className='feature-heading'>Secure</h1>
                                <p className='mx-lg-5'>256 - bit secured collateral free instant
                                    loan disbursments in partnership with
                                    global insurance companies covering
                                    100+ benefits!</p>
                            </div>
                        </div>
                        <div className='col-sm-12 col-md-4'>
                            <div className="features-card">
                                <div className='feature-img'>
                                    <img src={easy} />
                                </div>
                                <h1 className='feature-heading'>Easy to use</h1>
                                <p className='mx-lg-5'>Our efficient operational schematics based
                                    on loan eligiblity checkup algorithm disburses
                                    your loan amount within 10 minutes* after
                                    successful completion of all the process involved.</p>
                            </div>
                        </div>
                        {/* <div className='col-sm 12 col-md-6'>
                            <div className="features-card">
                                <h3 className='feature-heading'>Secured Process</h3>
                                <p className='mx-lg-5'>We deals in different types of secured & unsecured loans online. Salary, Education, Business etc.</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>

            <section className='approval'>
                <div className='container'>
                    <div className='row align-items-center justify-content-end'>
                        <div className="col-lg-7 why-details">
                            <h2 className="main-heading mb-2">Get Your Loan Approved In No Time</h2>
                            <p className="helper-text">Best in-class provider of financing solutions for all your personal financial requirements,
                                be it for Home Renovation, Family Functions & weddings, shopping, travel, urgent medical treatments.
                                Collateral-free personal loans with competitive interest rates and minimum processing fees.</p>
                        </div>
                        <div className='d-none d-lg-flex col-lg-5 text-center mb-5'>
                            <img src={approval} className="mt-4" width="550" alt="ph-screens" />
                        </div>
                    </div>
                </div>
            </section>

            <section className='container why-us' id='benefits'>
                <div className='row align-items-center'>
                    <div className="d-none d-lg-flex col-lg-5 text-center mb-5"><img src={pigBank} className="mt-4" width="550" alt="ph-screens" /></div>
                    <div className='col-lg-7 why-details'>
                        <h2 className='main-heading'>Fast, Fair and Friendly Personal Loans</h2>
                        <p className='main-helper'>It may look like just in the business of loans. But for us, it’s much deeper than that. Our goal is to help you get the cash you need right when you need it most.</p>
                        <div className='row'>
                            <div className='col-sm-12 col-md-6'>
                                <div className='row why-card'>
                                    <div className='col-12'>
                                        <BiShuffle size={50} className='why-img' />
                                    </div>
                                    <div className='col-12'>
                                        <h5 className='mt-3 mb-1'>Flexible loan tenures</h5>
                                        <p>Flexible tenures easy repayment options and competitive interest rates.</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-12 col-md-6'>
                                <div className='row why-card'>
                                    <div className='col-12'>
                                        <BiTimer size={50} className='why-img' />
                                    </div>
                                    <div className='col-12'>
                                        <h5 className='mt-3 mb-1'>Get money in 24 hours</h5>
                                        <p>Minimal documentation with instant approval.</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-12 col-md-6'>
                                <div className='row why-card'>
                                    <div className='col-12'>
                                        <MdDocumentScanner size={50} className='why-img' />
                                    </div>
                                    <div className='col-12'>
                                        <h5 className='mt-3 mb-1'>No collateral required</h5>
                                        <p>You don't have to pledge your assets as a collateral to get approved.</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-12 col-md-6'>
                                <div className='row why-card'>
                                    <div className='col-12'>
                                        <HiStatusOnline size={50} className='why-img' />
                                    </div>
                                    <div className='col-12'>
                                        <h5 className='mt-3 mb-1'>Complete Online</h5>
                                        <p>Quick and hassle-free online processing. Get finance from the comfort of your home.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container testimonials" id='testimonials'>
                <div className='row align-items-center'>
                    <div className="col-sm-12 testimonial-overview">
                        <h2 className="main-heading text-center">JOIN THE COMMUNITY OF OVER 135K+ HAPPY BORROWERS TO ATTAIN THE FINANCIAL FREEDOM YOU DESERVE</h2>
                        {/* <p className="helper-text">Over 1,60,000 loans disbursed-happy customers.
                            With a continously growing community of happy customers we are disbursing more
                            loans every minute.</p> */}
                    </div>
                    <div>
                    <Reviews />
                    </div>
                </div>
            </section>

            <section>
                <div className='dwnld-now'>
                    <div className='container'>
                        <div className='row align-items-center justify-content-center'>
                            <div className='col-sm-12 col-md-7'>
                                <h1 className='dwnld-heading' >Ready To Get Started?</h1>
                                <p className='dwnld-helper'>No more financial crunch.
                                    We are here to help you for all your quick financial needs.
                                    LoanPe gives you the amount of loan you require, anytime-anywhere</p>
                                <a target="_blank" rel="noopener noreferrer" className="google-dwnld" href={`${baseUri}/getApk`}><img src={dwnld} width="200" alt="dwnld-link" /></a>
                            </div>
                            <div className='col-sm-12 col-md-4'>
                                {/* <a target="_blank" rel="noopener noreferrer" className="dwnld" href="#"><img src={phHeader} width="400" alt="dwnld-link" /></a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact">
                <div className='container'>
                    <div className='row align-items-center justify-content-end m-5'>
                        <h2 class='main-heading text-center' id="phocket_howItWorks">Review Us</h2>
                        <p className='helper-text text-center'>Any questions or remarks? Just write to us!</p>

                        <div className='d-none d-lg-flex col-lg-5 text-center mb-5'>
                            <img src={contactImg} className="mt-4" width="550" alt="ph-screens" />
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-7 card-form">
                            <div className="contact-form-container">
                                <div className="form">
                                    <UserReviewForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="page_footer ds color section_padding_top_100 section_padding_bottom_10">
                <div className="row py-5 justify-content-center py-5">
                    <div className="col-11">
                        <div className="row ">
                            <div className="line mb-3 mx-auto"></div>
                            <div className="d-md-flex px-5 justify-content-around bd-highlight col-md-12 pt-5 pb-5 mb-3">
                                <div className="p-2 flex-fill bd-highlight mb-5 mb-md-0">
                                    <img src={logo} alt="logo" height="140" width="140" />
                                    <h2>LoanPe</h2></div>
                                <div className="p-2 flex-fill bd-highlight mb-3 mb-md-0">
                                    <h5 className="text-blue-900 font-semibold text-xl mb-3">Quick Links</h5>
                                    <p className="mb-0 ">Home Loan</p>
                                    <p className="mb-0 ">Personal Loan</p>
                                    <p className="mb-0 ">Gold Loan</p>
                                    <p className="mb-0 ">Business Loan</p>
                                    <p className="mb-0 ">Blogs</p>
                                    <p className="mb-0 ">Media</p>
                                </div>
                                <div className="p-2 flex-fill bd-highlight mb-3 mb-md-0">
                                    <h5 className="text-blue-900 font-semibold text-xl mb-3">Calculators</h5>
                                    <p className="mb-0 ">Free Credit Score</p>
                                    <p className="mb-0 ">Business Loan Calculator</p>
                                    <p className="mb-0 ">Gold Loan calculator</p>
                                    <p className="mb-0 ">Home Loan Calculator</p>
                                    <p className="mb-0 ">Personal Loan Calculator</p>
                                </div>
                                <div className="p-2 flex-fill bd-highlight mb-3 mb-md-0">
                                    <h5 className="text-blue-900 font-semibold text-xl mb-3">Finance</h5>
                                    <p className="mb-0 "> Home Loans</p>
                                    <p className="mb-0 ">Gold Loans</p>
                                    <p className="mb-0 ">Personal Loans</p>
                                    <p className="mb-0 ">Business Loans</p>
                                    <p className="mb-0 ">Loan Against Securities</p>
                                    <p className="mb-0 ">Loan Against Property</p>
                                    <p className="mb-0 ">Auction Centres</p>
                                </div>
                                <div className="p-2 flex-fill bd-highlight mb-3 mb-md-0">
                                    <h5 className="text-blue-900 font-semibold text-xl mb-3">NBFC Policies</h5>
                                    <p className="mb-0 ">Interest Rate</p>
                                    <p className="mb-0 ">Vigilance</p>
                                    <p className="mb-0 ">Fair Practices Code</p>
                                    <p className="mb-0 ">KYC Policies</p>
                                    <p className="mb-0 ">Exclusion List</p>
                                    <p className="mb-0 ">Corporate Governance</p>
                                    <p className="mb-0 ">Terms And Conditions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <a href="index.html" className="logo vertical_logo"><img src="images/logobj.png" alt="" /></a>
                            <ul className="topmargin_40 inline-content small-text semibold darklinks">
                                <li><a href="#about">About</a></li>
                                <li><a href="#features">Features</a></li>
                                <li><a href="#benefits">Benefits</a></li>
                                <li><a href="#testimonials">Testimonials</a></li>
                                <li><a href="/terms">Terms And Conditions</a></li>
                                <li><a href="/privacypolicy">Privacy Policy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
            <hr />
            <section className="ds color page_copyright section_padding_top_40 section_padding_bottom_40 with_top_border_container">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-10 text-left">
                            <p>© Copyright 2023 LoanPe. All Rights Reserved.</p>
                        </div>
                        <div className="col-sm-2 text-right">
                            <p><b>Have Questions?</b> <br />
                                <span>
                                    <i>
                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path></svg>
                                    </i>
                                </span>
                                <a href="mailto:help@loanpe.net" className='mx-2' >help@loanpe.net</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </body>
    )
}
