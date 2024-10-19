import { useRef } from 'react';
import './contract.css'
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
 
import NavBar from '../Navber/NavBar';
const Contract = () => {
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
        const emailForm = e.target

        emailjs.sendForm("service_2ul2fj9", "template_buh6uzh", form.current, "T1A6m0Z1y5m4h0YXj")
            .then((result) => {
                console.log(result.text);
                toast.success('Successfully sent!')
                emailForm.reset()

            }, (error) => {
                console.log(error.text);
                toast.error("Sorry, Something went wrong")
            });
    };
    return (
        <div >

            <NavBar></NavBar>
            <div className='bg-[#3a1f5e]'>


                <div className=''>
                    <div className='text-center'>
                        <div className='md:text-2xl font-bold text-white pt-6'>
                            <h1>CONTACT WITH SCHOOL MANAGEMENT</h1>
                        </div>
                    </div>
                    <div>
                        <div className="background1">
                            <div className="contactContainer">
                                <div className="screen">
                                    <div className="screen-header">
                                        <div className="screen-header-left">
                                            <div className="screen-header-button close"></div>
                                            <div className="screen-header-button maximize"></div>
                                            <div className="screen-header-button minimize"></div>
                                        </div>
                                        <div className="screen-header-right">
                                            <div className="screen-header-ellipsis"></div>
                                            <div className="screen-header-ellipsis"></div>
                                            <div className="screen-header-ellipsis"></div>
                                        </div>
                                    </div>
                                    <div className="screen-body">
                                        <div className="screen-body-item left">
                                            <div className="app-title">
                                                <span>CONTACT</span>

                                            </div>
                                            <div className="app-contact">ahshanhabibatik25@gmail.com</div>
                                        </div>
                                        <div className="screen-body-item">
                                            <form ref={form} onSubmit={sendEmail} className="app-form">
                                                <div className="app-form-group">
                                                    <input name='user_name' className="app-form-control" placeholder="NAME" required />
                                                </div>
                                                <div className="app-form-group">
                                                    <input name='user_email' className="app-form-control" placeholder="EMAIL" required />
                                                </div>
                                                <div className="app-form-group">
                                                    <input name="subject" className="app-form-control" placeholder="subject" required />
                                                </div>
                                                <div className="app-form-group message">
                                                    <textarea name="message" className="app-form-control h-14" placeholder="MESSAGE" required />
                                                </div>
                                                <div className="app-form-group buttons">

                                                    <input type="submit" className="app-form-button" value="SEND" />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="credits">
                                    Rowmari C.G Zaman Govt. High School

                                </div>
                            </div>
                            <Toaster></Toaster>
                        </div>
                    </div>
                </div>
            </div>
             
        </div>
    );
};

export default Contract;