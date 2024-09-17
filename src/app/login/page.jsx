'use client'
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link"; 
import re from "../../Assets/IMG/register.svg"
import lo from "../../Assets/IMG/log.svg"
import axios from "axios";
import Image from "next/image";

export default function LoginAndRegister() {
  const [error, setError] = useState("");
  const [registerData, setRegisterData] = useState({
    StdName: "",
    StdEmail: "",
    StdPassword: "",
    StdConfirmPassword : ""
  });

  // Handle registration form submission
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!registerData.StdName || !registerData.StdEmail || !registerData.StdPassword) {
      setError("Please fill all required fields.");
      return;
    } else if (registerData.StdPassword !== registerData.StdConfirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    try {
      // Prepare data in the desired order
      const data = {
        StudentName: registerData.StdName,
        StudentEmail: registerData.StdEmail,
        StudentPassword: registerData.StdPassword,
      };

      // Send data via axios
      const response = await axios.post("http://localhost:3000/api/StudentRegistration", data, {
        headers: { 
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      // Handle response
      alert(response.data.message);
    } catch (error) {
      console.error("There was an error submitting the registration:", error);
      alert("Failed to register. Please try again.");
    }


    if (typeof window !== "undefined") {
      const container = containerRef.current;
      const signInBtn = document.getElementById("sign-in-btn");
      const signUpBtn = document.getElementById("sign-up-btn");

        container.classList.add("sign-up-mode");
        container.classList.remove("sign-up-mode");
      

      return () => {
        signUpBtn.removeEventListener("click", () => container.classList.add("sign-up-mode"));
        signInBtn.removeEventListener("click", () => container.classList.remove("sign-up-mode"));
      };
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const containerRef = useRef(null);

  // Toggle between sign-in and sign-up mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      const container = containerRef.current;
      const signInBtn = document.getElementById("sign-in-btn");
      const signUpBtn = document.getElementById("sign-up-btn");

      signUpBtn.addEventListener("click", () => {
        container.classList.add("sign-up-mode");
      });

      signInBtn.addEventListener("click", () => {
        container.classList.remove("sign-up-mode");
      });

      return () => {
        signUpBtn.removeEventListener("click", () => container.classList.add("sign-up-mode"));
        signInBtn.removeEventListener("click", () => container.classList.remove("sign-up-mode"));
      };
    }
  }, []);

  return (
    <div className="containerlog" ref={containerRef}>
      <div className="forms-container">
        <div className="signin-signup">
          {/* Sign In Form */}
          <form action="" className="sign-in-form">
            <h2 className="title">Sign In</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Login" className="btn solid" />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmitRegister} className="sign-up-form">
            <h2 className="title">Sign Up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="StdName"
                placeholder="Username"
                value={registerData.StdName}
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="StdEmail"
                placeholder="Email"
                value={registerData.StdEmail}
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="StdPassword"
                placeholder="Password"
                value={registerData.StdPassword}
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input 
                type="password"
                name="StdConfirmPassword"  
                placeholder="Confirm password" 
                value={registerData.StdConfirmPassword}
                onChange={handleChange}
              />
            </div>
            <input type="submit" value="Sign Up" className="btn solid" />
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* Panels */}
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio minus natus est.</p>
            <button className="btn transparent" id="sign-up-btn">
              Sign Up
            </button>
          </div>
          <Image src={lo} className="image" alt="Login Image" />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio minus natus est.</p>
            <button className="btn transparent" id="sign-in-btn">
              Sign In
            </button>
          </div>
          <Image src={re} className="image" alt="Register Image" />
        </div>
      </div>
    </div>
  );
}
