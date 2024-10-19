import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import useAxiosPublic from "../Hook/UseAxiosPublic";
import { AuthContext } from "../Provider/AuthProvider";
import './register.css'; // Import custom CSS for styling
 
const Register = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            // Create user in Firebase Authentication
            const result = await createUser(data.email, data.password);
            const loggedUser = result.user;
            console.log(loggedUser);

            // Update user profile
            await updateUserProfile(data.name, data.photoURL);

            // Create user entry in the database
            const userInfo = {
                name: data.name,
                email: data.email,
                role: 'user'
            };
            const response = await axiosPublic.post('/users', userInfo);

            // Check if user was successfully added to the database
            if (response.data.insertedId) {
                console.log('User added to the database');
                reset(); // Reset the form
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User created successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/login'); // Redirect to the login page
            }
        } catch (error) {
            console.error(error);
            // Handle errors appropriately, such as displaying an error message to the user
        }
    };

    return (
        <div className="register-container">
            <div className="register-content">
                <h2 className="register-title">Sign Up</h2>
                <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group">
                        <input id="name" name="name" type="text" {...register("name", { required: true })} autoComplete="name" required className="input-field" placeholder="Name" />
                        {errors.name && <p className="error-message">Name is required</p>}
                    </div>
                    <div className="input-group">
                        <input id="photoURL" name="photoURL" type="text" {...register("photoURL", { required: true })} autoComplete="photoURL" required className="input-field" placeholder="Photo URL" />
                        {errors.photoURL && <p className="error-message">Photo URL is required</p>}
                    </div>
                    <div className="input-group">
                        <input id="email" name="email" type="email" {...register("email", { required: true })} autoComplete="email" required className="input-field" placeholder="Email address" />
                        {errors.email && <p className="error-message">Email is required</p>}
                    </div>
                    <div className="input-group">
                        <input id="password" name="password" type="password" {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[A-Z])/ })} autoComplete="new-password" required className="input-field" placeholder="Password" />
                        {errors.password?.type === 'required' && <p className="error-message">Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="error-message">Password must be at least 6 characters</p>}
                        {errors.password?.type === 'maxLength' && <p className="error-message">Password must be at most 20 characters</p>}
                        {errors.password?.type === 'pattern' && <p className="error-message">Password must contain at least one uppercase letter</p>}
                    </div>
                    <button type="submit" className="register-button">Sign Up</button>
                </form>
                <p className="login-link">Already have an account? <Link to="/login" className="login-link-text">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;
