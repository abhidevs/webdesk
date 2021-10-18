import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DetailedMaterial from "../../components/detailMeterial/DetailedMaterial";
import ClassComment from "../../components/classComment/ClassComment";
import YourWork from "../../components/yourWork/YourWork"

function IndividualTask() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="container">
        <DetailedMaterial
          title="Ca1 Assignment"
          postedBy="Debnarayan Khatua"
          timeOfPosting="9:30 am"
          subject="Data Structure & Algorithms"
          filename="Stack assignment.pdf"
        />
        <ClassComment classtype="Private comments" />

        <ClassComment
          type="writtenComment"
          postedBy="Soumen Sau"
          timeOfPosting="10:20 am"
          profilePic="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
          message="Sir can you please elaborate question no. 3?"
        />
        <YourWork
          title="Your Work"
          specify="Assigned"
          create="Add or Create"
          marked="Marked as Done"
        />
        <ClassComment classtype="Class comments" />

        <ClassComment
          type="writtenComment"
          postedBy="Soumen Jana"
          timeOfPosting="9:20 am"
          profilePic="https://images.unsplash.com/photo-1573496774379-b930dba17d8b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGZlbWFsZSUyMHRlYWNoZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          message="Sir how many marks for each question?"
        />
      </div>
    </div>
  );
}

export default IndividualTask;
