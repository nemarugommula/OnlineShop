import React, { useState, useRef } from "react";
import Toast from "../../components/utils/Toast";
import Router from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/solid";

function Register() {
  const firstName = useRef(null);
  const lastName = useRef(null);
  const userName = useRef(null);
  const password = useRef(null);
  const email = useRef(null);
  const mobile = useRef(null);

  const [toast, setToast] = useState({
    show: false,
    message: null,
    color: null,
  });

  const [loading, setLoading] = useState(false);

  function checkIndianMobileNumber(mobile) {
    var regex = /^[6-9]\d{9}$/;
    return String(mobile.trim()).match(regex);
  }

  function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  function validatePasswordStrength(password) {
    const regex =
      "(?=^.{8,}$)(?=.*d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$";
    return String(password).match(regex);
  }

  function validateRequestBody({
    first_name,
    last_name,
    username,
    password,
    email,
    mobile,
  }) {
    let message = "";
    if (!(first_name && last_name && username && password && email && mobile)) {
      message = "Please fill out all fields!!";
    } else if (!validateEmail(email)) {
      message = "Plese Enter a Valid Email adress!!";
    } else if (!validatePasswordStrength(password)) {
      message =
        "Password should be atlease 8 characters along with  1 Upper,1 Lower ,1 special character  and a digit";
    } else if (!checkIndianMobileNumber(mobile)) {
      message = "Enter a valid mobile number!!";
    }

    if (message) {
      setToast((toast) => {
        return {
          show: true,
          message,
          color: "bg-orange-600",
        };
      });
      return false;
    }
    return true;
  }

  const requestOptions = (body) => {
    return {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body }),
    };
  };

  const registerHandler = () => {
    const body = {
      first_name: firstName.current.value,
      last_name: lastName.current.value,
      username: userName.current.value,
      password: password.current.value,
      email: email.current.value,
      mobile: mobile.current.value,
    };
    if (loading || !validateRequestBody(body)) return;

    setLoading(true);
    const request = requestOptions(body);
    fetch("http://localhost:5000/api/auth/email/register", request)
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 201) {
          Router.push({
            pathname: "/account/login",
            query: { status: "success" },
          });
        } else {
          setToast((toast) => {
            return {
              show: true,
              message: data.reason,
              color: "bg-red-400",
            };
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        setToast((toast) => {
          return {
            show: true,
            message: "Something Went wrong try again !!",
            color: "bg-orange-400",
          };
        });
      });
  };
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-stone-200">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className=" bg-primary rounded-lg  shadow-xl py-2 shadow-primary max-w-screen-xl "
      >
        <Link href="/account/login" passHref>
          <a className="flex   text-slate-300 items-center justify-start">
            <ChevronLeftIcon className="h-10 w-10" />
            <button className="inline-block tracking-widest font-xl">
              BACK
            </button>
          </a>
        </Link>

        <div className="p-5 py-3 w-96 flex flex-col tracking-widest gap-3">
          <div>
            <label className="pb-2 px-2 font-light text-xl  ">First Name</label>
            <input
              ref={firstName}
              placeholder="Your name"
              className="leading-7 w-full tracking-widest outline-none px-3 py-2 rounded-sm shadow-lg bg-blue-50  focus:bg-white"
            />
          </div>
          <div>
            <label className="pb-2 px-2 font-light text-xl  ">Last Name</label>
            <input
              ref={lastName}
              placeholder="Family name"
              className="leading-7 w-full tracking-widest outline-none px-3 py-2 rounded-sm shadow-lg bg-blue-50  focus:bg-white"
            />
          </div>

          <div>
            <label className="pb-2 px-2 font-light text-xl  ">Username</label>
            <input
              ref={userName}
              placeholder="Username"
              className="leading-7 w-full tracking-widest outline-none px-3 py-2 rounded-sm shadow-lg bg-blue-50  focus:bg-white"
            />
          </div>
          <div>
            <label className="pb-2 px-2 font-light text-xl  ">Password</label>
            <input
              ref={password}
              placeholder="*********"
              type="password"
              className="leading-7 w-full tracking-widest outline-none px-3 py-2 rounded-sm shadow-lg bg-blue-50  focus:bg-white"
            />
          </div>

          <div>
            <label className="pb-2 px-2 font-light text-xl  ">Email</label>
            <input
              ref={email}
              placeholder="abc@gmail.com"
              type="email"
              className="leading-7 w-full tracking-widest outline-none px-3 py-2 rounded-sm shadow-lg bg-blue-50  focus:bg-white"
            />
          </div>

          <div>
            <label className="pb-2 px-2 font-light text-xl  ">Mobile</label>
            <input
              ref={mobile}
              placeholder="91234567891"
              type="number"
              className="leading-7 w-full tracking-widest outline-none px-3 py-2 rounded-sm shadow-lg bg-blue-50  focus:bg-white"
            />
          </div>

          <div className="p-2 flex items-center justify-center gap-2 mt-3">
            <button
              onClick={registerHandler}
              className="active:bg-orange-700 tracking-widest hover:bg-orange-600 rounded-md bg-orange-500 p-2 flex-1"
            >
              {loading ? "Processing" : "Register"}
            </button>
          </div>
        </div>
      </motion.div>
      <Toast toast={toast} setToast={setToast} />
    </div>
  );
}

export default Register;
