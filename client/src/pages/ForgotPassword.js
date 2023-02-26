import { useState } from "react";
import Input from "../components/forms/Input";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Button from "../components/forms/Button";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [resetCode, setResetCode] = useState("");

  // hook
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      // Do something with the form data
      const { data } = await axios.post(`/forgot-password`, { email })
      if (data.error) {
        toast.error(data.error, { duration: 4000 });
        setLoading(false);
        return;
      } else {
        setVisible(true);
        toast.success("Enter the code you received in your email", { duration: 4000 });
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (password !== confirmPassword) {
        toast.error("Passwords do not match", { duration: 4000 });
        setLoading(false);
        return;
      }
      const { data } = await axios.post(`/reset-password`, { email, password, resetCode })
      if (data.error) {
        toast.error(data.error, { duration: 4000 });
        setLoading(false);
        return;
      } else {
        toast.success("Password successfully changed! Now you can login with your new password.", { duration: 4000 });
        setLoading(false);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong, please try again");
      setLoading(false);
    }
  }

  return (

    <div className="d-flex justify-content-center align-items-center vh-100" style={{ marginTop: "-100px" }}>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="f2-bold mb-3">Forgot Password</h1>
            <p>Lorem ipsum dolor sit amet consectetur</p>

            <form onSubmit={visible ? handleReset : handleSubmit}>
              <Input label="Email" value={email} setValue={setEmail} type="email" />

              {visible && (
                <>
                  <Input label="Enter Reset Code" value={resetCode} setValue={setResetCode} type="text" />
                  <Input label="New Password" value={password} setValue={setPassword} type="password" />
                  <Input label="Confirm new password" value={confirmPassword} setValue={setConfirmPassword} type="password" />
                </>
              )}

              <Button email={email} password={password} loading={loading} />
            </form>

            <p className="mt-3"><Link to="/login">Back to Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}