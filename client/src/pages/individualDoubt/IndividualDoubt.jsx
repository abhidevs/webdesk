import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";
import { useLocation, useParams } from "react-router-dom";
import DetailedItem from "../../components/detailedItem/DetailedItem";
import { AuthContext } from "../../context/authContext/AuthContext";
import { getItemdata } from "../../utils/fetchData";

const IndividualDoubt = () => {
  const { itemData, openEdit } = useLocation();

  const [data, setData] = useState(itemData);

  const { id: itemId } = useParams();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!data) {
      getItemdata("doubt", itemId, user)
        .then((response) => {
          setData(response);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const adjustTextarea = ({ target }) => {
    target.style.height = target.scrollHeight + "px";
    if (target.value === "") target.style.height = 96 + "px";
  };

  return (
    <div className="individual-doubt">
      <Navbar />
      <Sidebar />

      <div className="container">
        <div className="wrapper">
          <DetailedItem type="doubt" data={data} openEdit={openEdit} />

          <div className="writeAnswer">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
              alt="profile"
            />

            <div className="inputSection">
              <textarea
                placeholder="Write your answer to this question"
                spellCheck="false"
                onKeyUp={adjustTextarea}
              ></textarea>
              <button>Submit</button>
            </div>
          </div>

          <div className="comment-heading">
            <CreateRoundedIcon className="icon" />
            <h3>Responses</h3>
          </div>

          {data?.responses?.length === 0 && (
            <DetailedItem type="doubtResponse" data={data} />
          )}
        </div>
      </div>
    </div>
  );
};

export default IndividualDoubt;
