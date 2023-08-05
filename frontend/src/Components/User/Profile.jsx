import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../Layout/MetaData";
import Loader from "../Layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
const Profile = () => {
    const navigate = useNavigate()
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);
    const picReplace = "/Profile.png"
    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }
    }, [navigate, isAuthenticated]);
    return (
        <>
            {loading ? (
                <Loader />
            ) : (user ?
                <>
                    <MetaData title={`${user.name}'s Profile`} />
                    <div className="mainProfileContainer">
                        <div className="clipPathProfile"></div>
                        <div className="profileContainer">
                            <div className="leftProfile">
                                {user.avatar.url ? <>
                                    <img src={user.avatar.url} alt={user.name} />
                                    <Link to="/me/update">EDIT PROFILE</Link>
                                </> : <>
                                    <img src={picReplace} alt="fake-pic" />
                                    <Link to="/me/update">EDIT PROFILE</Link>
                                </>
                                }
                            </div>
                            <div className="rightProfile">
                                <div>
                                    <h4 style={{ padding: '2px', borderBottom: '1.5px solid #0a000043' }}>FULL NAME</h4>
                                    <p style={{ padding: '5px' }}>{user.name}</p>
                                </div>
                                <div>
                                    <h4 style={{ padding: '2px', borderBottom: '1.5px solid #0a000043' }}>EMAIL</h4>
                                    <p style={{ padding: '5px' }}>{user.email}</p>
                                </div>
                                <div>
                                    <h4 style={{ padding: '2px', borderBottom: '1.5px solid #0a000043' }}>JOINED ON</h4>
                                    <p style={{ padding: '5px' }}>{String(user.createdAt).substr(0, 10)}</p>
                                </div>

                                <div className="profileButtons">
                                    <Link to="/orders">MY ORDERS</Link>
                                    <Link to="/password/update">CHANGE PASSWORDS</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </> : <></>
            )}
        </>
    );
};

export default Profile;


// content: "";
//         position: absolute;
//         left: 0;
//         top: 0;
//         height: 5px;
//         width: 50%;
//         border-top: 3px solid #000;