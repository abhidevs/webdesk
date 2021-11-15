import React, { useContext, useEffect } from "react";
import "./style.scss";
import Navbar from "../../components/navbar/Navbar";
import HeroSection from "../../components/heroSection/HeroSection";
import Sidebar from "../../components/sidebar/Sidebar";
import ItemLg from "../../components/itemLg/ItemLg";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";
import { MaterialsContext } from "../../context/materialsContext/MaterialsContext";
import { getAllMaterials } from "../../context/materialsContext/apiCalls";
import formatDatetime from "../../utils/formatDatetime";
import ItemForm from "../../components/itemForm/ItemForm";

const Materials = ({ dept, sem }) => {
  const { subject } = useParams();

  const { user } = useContext(AuthContext);
  const { allMaterials, dispatch } = useContext(MaterialsContext);

  useEffect(() => {
    allMaterials?.length === 0 && getAllMaterials(user, dispatch);
  }, [dispatch]);

  // console.log(allMaterials);

  return (
    <div className="all-materials">
      <Navbar />
      <Sidebar />

      <div className="container">
        <HeroSection
          small
          dept={dept}
          sem={sem}
          title={
            subject === "all"
              ? subject + " Notes & Materials"
              : subject + " : Notes"
          }
        />

        {(user.isTeacher || user.isAdmin) && (
          <ItemForm
            type="material"
            profilePic={user.profilePic}
            currentSubject={subject !== "all" ? subject : ""}
          />
        )}

        {allMaterials
          ?.filter(
            (item) => subject === "all" || subject === item.subject?.name
          )
          ?.map((item) => (
            <ItemLg
              type="material"
              key={item._id}
              itemId={item._id}
              itemTitle={item.title}
              posterId={item.poster?._id}
              postedBy={item.poster?.fullname}
              subject={item.subject?.name}
              timeOfposting={formatDatetime(item.createdAt)}
              profilePicOfPoster={item.poster?.profilePic}
              data={item}
            />
          ))}
      </div>
    </div>
  );
};

export default Materials;
