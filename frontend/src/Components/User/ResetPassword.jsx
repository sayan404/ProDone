import React, { useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../Layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../Actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../Layout/MetaData";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate , useParams } from "react-router-dom";

const ResetPassword = () => {
    const params = useParams()
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate()
    const { error, success, loading } = useSelector(
        (state) => state.forgotPassword
    );

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        // console.log(params);
        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(params.token, myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Password Updated Successfully");

            navigate("/login");
        }
    }, [dispatch, error, alert, navigate, success]);

    return (
        <>
            {
                loading ? (
                    <Loader />
                ) : (
                    <>
                        <MetaData title="Change Password" />
                        <div className="resetPasswordContainer">
                        <div className="circleClipResetPw"></div>
                            <div className="resetPasswordBox">
                                <h2 className="resetPasswordHeading">Update Profile</h2>

                                <form
                                    className="resetPasswordForm"
                                    onSubmit={resetPasswordSubmit}
                                >
                                    <div>
                                        <LockOpenIcon />
                                        <input
                                            type="password"
                                            placeholder="New Password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="loginPassword">
                                        <LockIcon />
                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                    <input
                                        type="submit"
                                        value="Update"
                                        className="resetPasswordBtn"
                                    />
                                </form>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
};

export default ResetPassword;