import { useState, useContext } from "react";
import Input from "../components/forms/Input";
import toast from 'react-hot-toast';
import axios from 'axios';
import { AuthContext } from "../context/auth";
import { saveInLocalStorage } from "../helpers/auth";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/forms/Button";

export default function Login() {

    // context
    const [auth, setAuth] = useContext(AuthContext);
    // state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // hook
    const navigate = useNavigate();

    // console.log("context => ", auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // Do something with the form data
            const { data } = await axios.post(`/signin`, { email, password })
            if (data.error) {
                toast.error(data.error, { duration: 4000 });
                setLoading(false);
                return;
            } else {
                // context
                setAuth(data);

                // save in local storage
                saveInLocalStorage("auth", data);

                setLoading(false);

                navigate("/dashboard");
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
                        <h1 className="f2-bold mb-3">Login</h1>
                        <p>Lorem ipsum dolor sit amet consectetur</p>

                        <form onSubmit={handleSubmit}>
                            <Input label="Email" value={email} setValue={setEmail} type="email" />
                            <Input label="Password" value={password} setValue={setPassword} type="password" />

                            <Button email={email} password={password} loading={loading} />
                        </form>
                        <p className="mt-3"><Link to="/forgot-password">Forgot password</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}