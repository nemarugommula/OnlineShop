import React, { useState, useRef, useEffect } from "react";
import { DeviceMobileIcon } from "@heroicons/react/outline";
import Toast from "../../components/utils/Toast";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";

import { LoginIcon } from "@heroicons/react/solid";

function Spin() {
  return (
    <svg
      className="animate-spin h-5 w-5 mr-3  bg-white"
      viewBox="0 0 24 24"
    ></svg>
  );
}
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function Login() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    color: null,
    message: null,
    show: false,
  });
  const email = useRef();
  const password = useRef();
  const router = useRouter();

  function validateValues(email, password) {
    if (!email || !password) {
      setToast((toast) => {
        return {
          color: "bg-orange-400",
          message: "Please enter both fields !!",
          show: true,
        };
      });
      return true;
    } else if (!validateEmail(email)) {
      setToast((toast) => {
        return {
          color: "bg-orange-400",
          message: "Enter valid email !!",
          show: true,
        };
      });
      return true;
    }

    return false;
  }

  useEffect(() => {
    const { status } = router.query;
    if (status == "success") {
      setToast((toast) => {
        return {
          color: "bg-green-400",
          message: "Account created Successfully !! you can login Now ",
          show: true,
        };
      });
    } else if (status == "reason") {
      setToast((toast) => {
        return {
          color: "bg-primary",
          message: router.query.reason,
          show: true,
        };
      });
    }
  }, [router.query]);

  function clickHandler() {
    if (validateValues(email.current.value, password.current.value)) return;
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.current.value,
        password: password.current.value,
      }),
    };
    if (loading) return;
    fetch("http://localhost:5000/api/auth/email/login", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 200) {
          localStorage.setItem("authorization", "Bearer " + data.accessToken);
          localStorage.setItem("userId", data.id);
          if (data.role == "ADMIN") Router.push("/admin");
          else Router.push("/");
        } else {
          setToast((toast) => {
            return {
              color: "bg-orange-500",
              message: data.reason,
              show: true,
            };
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setToast((toast) => {
          return {
            color: "bg-red-500",
            message: "Something Went wrong",
            show: true,
          };
        });
      });
  }

  return (
    <div className="flex relative items-center justify-center w-screen h-screen bg-stone-200">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className=" bg-primary rounded-lg  shadow-lg shadow-primary py-5 px-8 "
      >
        <div className="text-slate-50  border-b py-2 ">
          <Link href="/">
            <a className="justify-center items-center flex">
              <h1 className="text-3xl font-semibold tracking-widest ">FORTY</h1>
              <h1 className="text-4xl tracking-widest rotate-12 font-extrabold text-orange-500">
                5
              </h1>
            </a>
          </Link>
        </div>
        <div className=" py-7  flex flex-col gap-3">
          <input
            ref={email}
            placeholder="Email"
            className=" leading-7 tracking-widest outline-none px-3 py-2 rounded-sm shadow-lg bg-blue-50  focus:bg-white"
          />
          <input
            ref={password}
            placeholder="Password"
            type="password"
            className="leading-7 tracking-widest outline-none px-3 py-2 rounded-sm shadow-lg bg-blue-50  focus:bg-white"
          />
          <button
            onClick={clickHandler}
            className="tracking-widest  bg-orange-500 p-2 mt-3  rounded-sm hover:bg-orange-600 active:bg-orange-700 shadow-sm"
          >
            {loading ? (
              <p className="flex justify-center items-center">
                <Spin /> {"Processing..."}
              </p>
            ) : (
              <div className="flex justify-center items-center gap-2">
                <p>Login </p>

                <LoginIcon className="w-5 h-5 text-gray-800" />
              </div>
            )}
          </button>
        </div>
        <div className="flex items-center justify-center tracking-wide gap-2 py-5">
          <Link href="/account/mobile_login">
            <a className="shadow-sm bg-slate-50 p-2 items-center flex gap-1 rounded-md outline-none text-grey-50 hover:bg-slate-200 active:bg-slate-300">
              <p className="font-light">Sign In with Mobile</p>{" "}
              <DeviceMobileIcon className="w-5 h-5 text-primary" />
            </a>
          </Link>
          <Link href="/account/mobile_login">
            <a className="shadow-sm  bg-slate-50 p-2 items-center flex gap-1 rounded-md outline-none text-grey-50 hover:bg-slate-200 active:bg-slate-300">
              <p className="font-light">Sign In with Google</p>{" "}
              <img src="/google.png" className="inline-block w-4 h-4" />
            </a>
          </Link>
        </div>
        <div className="text-center text-teal-400 font-semibold">or</div>
        <div className="text-center py-5 flex justify-center ">
          <Link href="/account/register">
            <a className="rounded-md tracking-widest bg-teal-500 px-4 py-2 w-2/4 hover:bg-teal-600 active:bg-teal-700">
              Register Now
            </a>
          </Link>
        </div>
      </motion.div>
      <Toast toast={toast} setToast={setToast} />
    </div>
  );
}

export default Login;
