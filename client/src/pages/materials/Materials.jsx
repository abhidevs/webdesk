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

const Materials = ({ dept, sem }) => {
  const { subject } = useParams();

  const { user } = useContext(AuthContext);
  const { allMaterials, dispatch } = useContext(MaterialsContext);

  useEffect(() => {
    allMaterials?.length === 0 && getAllMaterials(user, dispatch);
  }, [dispatch]);

  console.log(allMaterials);

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
              ? subject + " Notes & Materials"
              : subject + " : Notes"
          }
        />

        {allMaterials
          ?.filter((item) => subject === "all" || subject === item.subject?.name)
          ?.map((item) => (
            <ItemLg
              type="material"
              itemTitle={item.title}
              postedBy={item.poster?.fullname}
              subject={item.subject?.name}
              timeOfposting={formatDatetime(item.createdAt)}
              profilePicOfPoster={item.poster?.profilePic}
            />
          ))}
      </div>
    </div>
  );
};

export default Materials;
