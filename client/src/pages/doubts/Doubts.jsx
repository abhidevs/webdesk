import React, { useContext, useEffect } from "react";
import "./style.scss";
import Navbar from "../../components/navbar/Navbar";
import HeroSection from "../../components/heroSection/HeroSection";
import Sidebar from "../../components/sidebar/Sidebar";
import ItemLg from "../../components/itemLg/ItemLg";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";
import { DoubtsContext } from "../../context/doubtsContext/DoubtsContext";
import { getAllDoubts } from "../../context/doubtsContext/apiCalls";
import formatDatetime from "../../utils/formatDatetime";
import ItemForm from "../../components/itemForm/ItemForm";

const Doubts = ({ dept, sem }) => {
  const { subject } = useParams();

  const { user } = useContext(AuthContext);
  const { allDoubts, dispatch } = useContext(DoubtsContext);

  useEffect(() => {
    allDoubts?.length === 0 && getAllDoubts(user, dispatch);
  }, [dispatch]);

  // console.log(allDoubts);

  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="container">
        <HeroSection
          small
          dept={dept}
          sem={sem}
          title={
            subject === "all"
              ? subject + " Doubts & Questions"
              : subject + " : Doubts"
          }
        />

        {!user.isTeacher && (
          <ItemForm
            type="doubt"
            profilePic={user.profilePic}
            currentSubject={subject !== "all" ? subject : ""}
          />
        )}

        {allDoubts
          ?.filter(
            (item) => subject === "all" || subject === item.subject?.name
          )
          ?.map((item) => (
            <ItemLg
              type="doubt"
              key={item._id}
              itemId={item._id}
              itemTitle={item.title}
              posterId={item.poster?._id}
              postedBy={item.poster?.fullname}
              subject={item.subject?.name}
              timeOfposting={formatDatetime(item.createdAt)}
              profilePicOfPoster={item.poster?.profilePic}
              votes={item.votes}
              doubtDesc={item.description}
              data={item}
            />
          ))}
      </div>
    </div>
  );
};

export default Doubts;
