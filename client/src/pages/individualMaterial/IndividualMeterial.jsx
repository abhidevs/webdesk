import React from "react";
import "./style.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ClassComment from "../../components/classComment/ClassComment";
import QuestionAnswerRoundedIcon from "@material-ui/icons/QuestionAnswerRounded";
import { useLocation } from "react-router-dom";
import DetailedItem from "../../components/detailedItem/DetailedItem";

function IndividualMeterial() {
  const { itemData, openEdit } = useLocation();

  return (
    <div className="individual-material">
      <Navbar />
      <Sidebar />
      <div className="container">
        <div className="wrapper">
          <DetailedItem type="material" data={itemData} openEdit={openEdit} />

          <div className="comment-heading">
            <QuestionAnswerRoundedIcon className="icon" />
            <h3>Class comments</h3>
          </div>

          <ClassComment type="writeComment" />
          <ClassComment
            type="writtenComment"
            postedBy="Biswanath Bera"
            timeOfPosting="10:20 am"
            profilePic="https://images.unsplash.com/photo-1544168190-79c17527004f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bWFsZSUyMHRlYWNoZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            message="Sir please provide notes for bipartite graph"
          />
          <ClassComment
            type="writtenComment"
            postedBy="Abhik Das"
            timeOfPosting="9:20 am"
            profilePic="https://images.unsplash.com/photo-1573496774379-b930dba17d8b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGZlbWFsZSUyMHRlYWNoZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            message="Sir can you please give some notes on complete graph, cyclic graph, acyclic graph, connected graph, disconnected graph, weighted graph, directed graph, undirected graph, trivial graph, bipartite graph, star graph, multi graph"
          />
        </div>
      </div>
    </div>
  );
}

export default IndividualMeterial;
