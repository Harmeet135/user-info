import { useEffect, useState, useContext } from "react";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { HiUserAdd } from "react-icons/hi";
import { adddata, deldata, updatedata } from "../ContextProvider";

import "./home.css";

const Home = () => {
  const [getdata, setgetData] = useState([]);

  const { udata, setUdata } = useContext(adddata);

  const { updata, setUPdata } = useContext(updatedata);

  const { dltdata, setDLTdata } = useContext(deldata);

  const getInput = async (e) => {
    const res = await fetch("https://users-info-uzyg.onrender.com/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    // console.log(data.id);

    if (res.status === 400 || res.status === 404 || !data) {
      console.log("error");
    } else {
      setgetData(data);
      // console.log(data.id, "get data is here");
    }
  };

  useEffect(() => {
    getInput();
  }, []);

  const deleteData = async (id) => {
    const deleted = await fetch(
      `https://users-info-uzyg.onrender.com/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const deletedata = await deleted.json();
    if (deletedata) {
      getInput();
      setDLTdata(deletedata);
    }
  };

  const handlesearch = async (event) => {
    const key = event.target.value;
    if (key === "") {
      getInput();
    }
    const search = await fetch(
      `https://users-info-uzyg.onrender.com/search/${key}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const searched = await search.json();

    if (searched) {
      setgetData(searched);
      console.log(searched);
    }
  };

  return (
    <>
      {udata ? (
        <>
          <div
            class="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>{udata.name}</strong> added succesfully!
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}
      {updata ? (
        <>
          <div
            class="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>{updata.name}</strong> updated succesfully!
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}

      {dltdata ? (
        <>
          <div
            class="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>{dltdata.name}</strong> deleted succesfully!
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}

      <div className="home-container">
        <div>
          <input
            type="text"
            placeholder="Search User"
            onChange={handlesearch}
          />
          <Link to={"/register"}>
            <button type="button" class="btn btn-primary mb-3 float-end">
              <HiUserAdd />
            </button>
          </Link>
        </div>
        <div>
          <div class="table-container">
            <table class="table ">
              <thead>
                <tr className="headings">
                  <th scope="col">No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Gmail</th>
                  <th scope="col">Phone No</th>
                  <th scope="col">Options</th>
                </tr>
              </thead>
              <tbody>
                {getdata.map((data, id) => {
                  return (
                    <tr>
                      <th key={id} scope="row">
                        {id + 1}
                      </th>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.mobile}</td>
                      <td className="butons">
                        <Link to={`/update/${data._id}`}>
                          <button type="button" class="btn btn-success">
                            <BsFillPencilFill />
                          </button>
                        </Link>

                        <button
                          onClick={() => deleteData(data._id)}
                          type="button"
                          class="btn btn-danger"
                        >
                          <AiFillDelete />
                        </button>

                        <Link to={`/view/${data._id}`}>
                          <button type="button" class="btn btn-info">
                            <AiOutlineEye />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
