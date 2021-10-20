import React from "react";
import "./style.scss";
import ItemLg from "../../components/itemLg/ItemLg";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import CreateRoundedIcon from "@material-ui/icons/CreateRounded";

const IndividualDoubt = () => {
  const adjustTextarea = ({ target }) => {
    target.style.height = target.scrollHeight + "px";
    if (target.value === "") target.style.height = 96 + "px";
  };

  return (
    <div className="individual-doubt">
      <Navbar />
      <Sidebar />

      <div className="container">
        <ItemLg
          type="doubt"
          itemTitle="How to implement queue using only stack?"
          postedBy="Soumen Sau"
          subject="Data Structure"
          timeOfposting="11:25 am"
          profilePicOfPoster="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNH_jexwW6aIkgREpZhBZPe0oaNpYY8uTENh9INrWDR6ndB0aRS4iAYsk35aYWmByUDw4&usqp=CAU"
          votes="21"
          doubtDesc="Can anyone tell me how to how to implement a queue data structure using only stack. Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty). You must use only standard operations of a stack, which means only push to top, peek/pop from top, size, and is empty operations are valid. Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack's standard operations."
          noHover
          noLink
        />

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

        <ItemLg
          type="doubtResponse"
          itemTitle="How to implement queue using only stack?"
          postedBy="Samiran Pal"
          timeOfposting="2:45 pm"
          profilePicOfPoster="https://images.unsplash.com/photo-1544168190-79c17527004f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bWFsZSUyMHRlYWNoZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          votes="12"
          doubtDesc="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae quod consequuntur explicabo quos, voluptatem voluptatum, beatae eius deleniti tempora error deserunt distinctio. Dolore adipisci asperiores ipsum doloremque nam quia iste cum, repellendus minus deleniti unde libero fugiat sunt hic voluptates natus nihil iusto mollitia itaque soluta rem. Ipsa incidunt neque repellendus possimus dignissimos placeat quam molestias et! Autem error in neque qui inventore natus sunt, praesentium eaque ad maxime accusantium nesciunt commodi officia asperiores nisi ex veritatis placeat animi! Id, deserunt? Libero excepturi dolore nam! Quidem eum culpa consequuntur. Accusantium ratione rem doloremque explicabo, incidunt vero distinctio eos unde totam, sequi illum harum odio quasi, facere enim fugiat! Omnis autem doloribus reiciendis, itaque velit, et sit commodi nihil aliquam nisi impedit quae corporis nemo distinctio officia exercitationem delectus! Ex, beatae! Tempore voluptates dicta repudiandae laborum nostrum fugiat veniam quaerat possimus."
          noHover
          noLink
        />
        <ItemLg
          type="doubtResponse"
          itemTitle="How to implement queue using only stack?"
          postedBy="Biswanath Bera"
          timeOfposting="12:20 pm"
          profilePicOfPoster="https://www.socialsciencespace.com/wp-content/uploads/student-3500990_960_720_opt.jpg"
          votes="7"
          doubtDesc="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum laborum reprehenderit nostrum dolor ad quas repudiandae aperiam libero eaque. Eius, accusamus nulla doloribus dolorum ratione veritatis? Obcaecati repellendus accusamus distinctio. Rem earum exercitationem, quo explicabo animi consequatur eum officiis perferendis libero nisi, illum, minus adipisci nostrum. Et repellat quo nobis."
          noHover
          noLink
        />
      </div>
    </div>
  );
};

export default IndividualDoubt;
