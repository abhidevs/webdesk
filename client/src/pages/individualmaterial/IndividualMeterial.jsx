import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ClassComment from "../../components/classComment/ClassComment";
import DetailedMaterial from "../../components/detailMeterial/DetailedMaterial";
function IndividualMeterial() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="container">
      <DetailedMaterial
        title="Graph theory notes"
        postedBy="Debnarayan Khatua"
        timeOfPosting="9:30 am"
        subject="Discrete Math"
        filename="Graph_theory.pdf"
      />
      
        <ClassComment classtype="class comment" />
        <ClassComment
          type="writtenComment"
          postedBy="Biswanath Bera"
          timeOfPosting="10:20 am"
          profilePic="https://images.unsplash.com/photo-1544168190-79c17527004f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bWFsZSUyMHRlYWNoZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          message="Sir please prrovide notes for bipartite graph"
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
  );
}

export default IndividualMeterial;
