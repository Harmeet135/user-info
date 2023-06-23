import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adddata } from "./ContextProvider";
import validator from "email-validator";

const Register = () => {
  const { udata, setUdata } = useContext(adddata);
  const navigate = useNavigate();

  const [inpval, setInpval] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const setdata = (e) => {
    const { name, value } = e.target;
    setInpval((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const addInput = async (e) => {
    e.preventDefault();
    const { name, email, mobile } = inpval;

    if (!validator.validate(email)) {
      alert("Invalid email format");
      return;
    }

    const res = await fetch("https://users-info-uzyg.onrender.com/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        mobile,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 400 || res.status === 404 || !data) {
      alert("Please fill all the fields");
    } else if (res.status === 402) {
      alert("Email is already Registered");
    } else {
      setUdata(data);
      navigate("/");
    }
  };

  return (
    <div className="container">
      {/* <NavLink to="/">home</NavLink> */}
      <form className="mt-4">
        <div className="row">
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" class="form-label">
              Name
            </label>
            <input
              type="text"
              value={inpval.name}
              onChange={setdata}
              name="name"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Email
            </label>
            <input
              type="email"
              value={inpval.email}
              onChange={setdata}
              name="email"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
      
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Mobile
            </label>
            <input
              type="number"
              value={inpval.mobile}
              onChange={setdata}
              name="mobile"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button onClick={addInput} type="submit" class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
