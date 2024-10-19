import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useRef } from "react";
import app from "../Firebase/firebase.config";
import { Link } from "react-router-dom";
import './login.css'



const ForgetPassword = () => {
    const emailRef = useRef(null);
    const auth = getAuth(app)

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            alert('please Provide an Email')
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            alert('please write a valid email')
        }

        // Send a password reset email
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('please check your email')
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div >

            <div className="background h-96 py-7">
                <div className=" border mx-auto md:w-[500px] py-12 rounded-lg bg-white bg-opacity-20">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text  flex mx-auto text-white font-bold ">Please Enter Valid Email address</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            ref={emailRef}
                            placeholder="Enter Valid Email"
                            className="input input-bordered md:w-96 flex mx-auto" required />
                    </div>
                    <button onClick={handleForgetPassword} className="btn btn-primary flex justify-center mx-auto mt-6">Submit</button>
                </div>
                <Link to={'/login'}><button className="btn flex mx-auto mt-6">Go to login</button></Link>
            </div>
        </div>
    );
};

export default ForgetPassword;