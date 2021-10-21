import React from "react";
import { Link } from "react-router-dom";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import "./style.scss";

const ItemLg = ({
  type,
  itemTitle,
  postedBy,
  subject,
  timeOfposting,
  profilePicOfPoster,
  status,
  dueDate,
  votes,
  doubtDesc,
  noHover,
  noLink,
}) => {
  return (
    <>
      {noLink ? (
        <div className={"itemLg " + type + (noHover ? " noHover" : "")}>
          {(type === "doubt" || type === "doubtResponse") && (
            <div className="votes">
              <ArrowUpwardRoundedIcon className="icon" />
              <p>{votes}</p>
              <ArrowDownwardRoundedIcon className="icon" />
            </div>
          )}

          <div className="itemContent">
            {type !== "doubtResponse" && (
              <div className="topSection">
                <Link to={`/${type}s/${subject}`} className="link">
                  <h4 className="subject">{subject}</h4>
                </Link>

                {type === "task" && (
                  <p className={"dueDate " + status}>
                    {status === "submitted" ? status : dueDate}
                  </p>
                )}
              </div>
            )}

            <div className="bottomSection">
              <img src={profilePicOfPoster} alt="profile" />
              <div className="textContent">
                <div className="titleSection">
                  <h4 className="itemTitle">
                    {postedBy +
                      (type === "doubtResponse"
                        ? " answered to this question"
                        : (type === "material"
                            ? " shared "
                            : type === "task"
                            ? " assigned "
                            : " asked ") + itemTitle)
                    }
                  </h4>
                  <p>{timeOfposting}</p>
                </div>

                {(type === "doubt" || type === "doubtResponse") && (
                  <p className="doubtDesc">{doubtDesc}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Link to={`/${type}`} className="link">
          <div className={"itemLg " + type + (noHover ? " noHover" : "")}>
            {(type === "doubt" || type === "doubtResponse") && (
              <div className="votes">
                <ArrowUpwardRoundedIcon className="icon" />
                <p>{votes}</p>
                <ArrowDownwardRoundedIcon className="icon" />
              </div>
            )}

            <div className="itemContent">
              <div className="topSection">
                {type !== "doubtResponse" && (
                  <Link to={`/${type}s/${subject}`} className="link">
                    <h4 className="subject">{subject}</h4>
                  </Link>
                )}

                {type === "task" && (
                  <p className={"dueDate " + status}>
                    {status === "submitted" ? status : dueDate}
                  </p>
                )}
              </div>

              <div className="bottomSection">
                <img src={profilePicOfPoster} alt="profile" />
                <div className="textContent">
                  <div className="titleSection">
                    <h4 className="itemTitle">
                      {postedBy +
                        (type === "material"
                          ? " shared "
                          : type === "task"
                          ? " assigned "
                          : " asked ") +
                        itemTitle}
                    </h4>
                    <p>{timeOfposting}</p>
                  </div>

                  {(type === "doubt" || type === "doubtResponse") && (
                    <p className="doubtDesc">{doubtDesc}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default ItemLg;