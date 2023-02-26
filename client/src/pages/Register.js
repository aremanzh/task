import { useState, useContext } from "react";
import Input from "../components/forms/Input";
import toast from 'react-hot-toast';
import axios from 'axios';
import { AuthContext } from "../context/auth";
import { saveInLocalStorage } from "../helpers/auth";
import { useNavigate } from "react-router-dom";
import Button from "../components/forms/Button";
import { Link } from "react-router-dom";

export default function Register() {

    // context
    const [auth, setAuth] = useContext(AuthContext);
    // state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // hook
    const navigate = useNavigate();

    // console.log("context => ", auth);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            if (password !== confirmPassword) {
                toast.error("Passwords do not match", { duration: 4000 });
                setLoading(false);
                return;
            }

            // Do something with the form data
            const { data } = await axios.post(`/signup`, { name, email, password })
            if (data.error) {
                toast.error(data.error, { duration: 4000 });
                setLoading(false);
                return;
            } else {
                // context
                setAuth(data);

                // save in local storage
                saveInLocalStorage("auth", data);

                toast.success("Successfully registered", { duration: 4000 });

                navigate("/");
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    return (

        <div className="d-flex justify-content-center align-items-center vh-100" style={{ marginTop: "-100px" }}>

            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h1 className="f2-bold mb-3">Register</h1>
                        <p>Lorem ipsum dolor sit amet consectetur</p>

                        <form onSubmit={handleSubmit}>
                            <Input label="Name" value={name} setValue={setName} type="text" />
                            <Input label="Email" value={email} setValue={setEmail} type="email" />
                            <Input label="Password" value={password} setValue={setPassword} type="password" />
                            <Input label="Confirm Password" value={confirmPassword} setValue={setConfirmPassword} type="password" />

                            <Button name={name} email={email} password={password} loading={loading} />
                        </form>

                        <p className="mt-3">Already registered? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}