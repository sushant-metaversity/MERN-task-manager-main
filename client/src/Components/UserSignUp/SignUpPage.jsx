import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { postSignUp } from '../../APIStore/Features/auth/authActions'

const SignUpPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const { postSignUpData } = useSelector((state) => state.auth);

  const [userName, setUserName] = useState()
  const [userEmail, setUserEmail] = useState()
  const [userPaaword, setUserPassword] = useState()

  useEffect(() => {
    console.log(postSignUpData?.data, "hguytfyrde")
    if (postSignUpData?.data?.status === true) {
      navigate("/Add-List")
      localStorage.setItem("token", postSignUpData?.data?.token)
      localStorage.setItem("user", JSON.stringify(postSignUpData?.data?.user))

    }
  }, [postSignUpData])
  
  const handleSignUp = (e) => {
    e.preventDefault();

    console.log("hello")

    dispatch(postSignUp({
      "name": userName,
      "email": userEmail,
      "password": userPaaword
    }))

  }

  const handleLoginRoute = () => {
    navigate("/auth/Login")

  }
  
  return (

    <div class="container">
      <div class="screen">
        <div class="screen__content">
          <form class="login" onSubmit={handleSignUp}>
            <div class="login__field">
              <input type="text" class="login__input" placeholder="User name" onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div class="login__field">
              <input type="text" class="login__input" placeholder="Email" onChange={(e) => setUserEmail(e.target.value)} />
            </div>
            <div class="login__field">
              <input type="password" class="login__input" placeholder="Password" onChange={(e) => setUserPassword(e.target.value)} />
            </div>
            <button class="button login__submit" >
              <span class="button__text">Sign Up</span>
            </button>
            <button class="button login__submit" onClick={handleLoginRoute}>
              <span class="button__text">Log in</span>
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

export default SignUpPage