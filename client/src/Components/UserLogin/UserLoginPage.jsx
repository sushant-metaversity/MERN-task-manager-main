import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { postLogin } from '../../APIStore/Features/auth/authActions';
import "./UserLoginPage.css"
import { useNavigate } from 'react-router-dom';
const UserLoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { postLoginData } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(postLoginData?.data, "hguytfyrde")
    if (postLoginData?.data?.status === true) {
      navigate("/Add-List")
      localStorage.setItem("token", postLoginData?.data?.token)
      localStorage.setItem("user", JSON.stringify(postLoginData?.data?.user))

    }
  }, [postLoginData])
  const [userEmail, setUserEmail] = useState()
  const [userPaaword, setUserPassword] = useState()

  const handleApi = (e) => {
    e.preventDefault();
    // navigate("/Add-List")
    dispatch(postLogin({
      "email": userEmail,
      "password": userPaaword
    }))
    // dispatch(postLogin("dsfsdf"));

  }
  const handleSingupRoute = (e) => {

    navigate("/auth/signUp")


  }

  return (

    <div class="container">
      <div class="screen">
        <div class="screen__content">
          <form class="login" onSubmit={handleApi}>
            <div class="login__field">
              <i class="login__icon fas fa-user"></i>
              <input type="text" class="login__input" placeholder="User Email" onChange={(e) => setUserEmail(e.target.value)} />
            </div>
            <div class="login__field">
              <i class="login__icon fas fa-lock"></i>
              <input type="password" class="login__input" placeholder="Password" onChange={(e) => setUserPassword(e.target.value)} />
            </div>
            <button class="button login__submit" >
              <span class="button__text">Log in</span>
            </button>
            <button class="login__submit" onClick={handleSingupRoute}>
              <span class="button__text">Sign Up</span>
            </button>
          </form>
        </div>
        <div class="screen__background">
          <span class="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>

  )
}

export default UserLoginPage