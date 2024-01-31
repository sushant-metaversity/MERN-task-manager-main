import React from 'react'
import "./Header.css"
import { useNavigate } from 'react-router-dom';
const Header = () => {
    let navigate = useNavigate();

    const handleLoginPage = () => {
        navigate("/auth/Login")
    }
    const handleSingUpPage = () => {
        navigate("/auth/signup")
    }
    const handleHome = () => {
        navigate("/add-list")
    }
    // localStorage.getItem("token")

    return (
        <div className="header">
            <div className='logo_img'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrT3F63P8GltZSSWYWhPJrxuTHo_QagFSkf2JJSCb-ikgKS35j8kUB-N-TDdywXE-GGSk&usqp=CAU" alt="" style={{ width: "100%" }} onClick={() => navigate("Home")} />
            </div>
            <div className="header-right">
                <button className='header_btn' onClick={handleHome}>Home</button>
                {!localStorage.getItem("token") &&
                    <>
                    <button className='header_btn' onClick={handleLoginPage}>Log in </button>
                    <button className='header_btn' onClick={handleSingUpPage}>Sign Up</button>
                    </>
                }
            </div>
        </div>
    )
}

export default Header