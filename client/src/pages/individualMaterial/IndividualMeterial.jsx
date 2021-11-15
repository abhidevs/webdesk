import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ClassComment from "../../components/classComment/ClassComment";
import QuestionAnswerRoundedIcon from "@material-ui/icons/QuestionAnswerRounded";
import { useLocation, useParams } from "react-router-dom";
import DetailedItem from "../../components/detailedItem/DetailedItem";
import { getItemdata } from "../../utils/fetchData";
import { AuthContext } from "../../context/authContext/AuthContext";
import formatDatetime from "../../utils/formatDatetime";

function IndividualMeterial() {
  const { itemData, openEdit } = useLocation();
  const [data, setData] = useState(itemData);

  const { id: itemId } = useParams();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!data) {
      getItemdata("material", itemId, user)
        .then((response) => {
          setData(response);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className="individual-material">
      <Navbar />
      <Sidebar />
      <div className="container">
        <div className="wrapper">
          <DetailedItem type="material" data={data} openEdit={openEdit} />

          <div className="comment-heading">
            <QuestionAnswerRoundedIcon className="icon" />
            <h3>Class comments</h3>
          </div>

          <ClassComment
            inputMode
            parentType="material"
            itemId={data?._id}
            setDataChanged={setData}
          />

          {data?.comments?.map((comment) => (
            <ClassComment
              parentType="material"
              key={comment?._id}
              commentId={comment?._id}
              posterId={comment?.poster?._id}
              postedBy={comment?.poster?.fullname}
              timeOfPosting={formatDatetime(comment?.createdAt)}
              profilePic={comment?.poster?.profilePic}
              message={comment?.comment}
              itemId={data?._id}
              setDataChanged={setData}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default IndividualMeterial;
