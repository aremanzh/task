import { useState } from "react";
import Input from "../components/forms/Input";

export default function Register () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{marginTop: "-100px"}}>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h1 className="f2-bold mb-3">Register</h1>
                        <p>Lorem ipsum dolor sit amet consectetur</p>
                    
                        <form>
                            <Input value/>
                            <div className="mb-3">
                                <label class="form-label">Password</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" class="form-control" />
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>

                    <pre>
                        {JSON.stringify({email, password}, null, 4)}
                    </pre>
                </div>
            </div>
        </div>
    );
}