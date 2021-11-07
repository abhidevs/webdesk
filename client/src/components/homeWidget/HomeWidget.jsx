import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";
import KeyboardArrowRightOutlinedIcon from "@material-ui/icons/KeyboardArrowRightOutlined";
import ItemMd from "../itemMd/ItemMd";
import ItemSm from "../itemSm/ItemSm";
import { Link } from "react-router-dom";
import { allClassesArray } from "../../dummydata";

const HomeWidget = ({
  title,
  type,
  forLargeItems,
  forSmallItems,
  noSeeAll,
}) => {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    getRecentItems(type).then((data) => {
      type === "schedules" &&
        data.sort(
          (a, b) =>
            new Date("1970/01/01 " + a.time) - new Date("1970/01/01 " + b.time)
        );

      setItemList(data);
    });
  }, []);

  const getRecentItems = async (type) => {
    let url;
    if (type === "schedules") url = `/${type.slice(0, -1)}/all?course=BCA`;
    else if (type === "all-classes") url = `/subject/all?course=BCA`;
    else url = `/${type.slice(0, -1)}/recent`;

    try {
      const res = await axios.get(url, {
        headers: {
          token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODNmYmM0ZWQ3YTJmYTFmOTllM2NiMiIsImlzVGVhY2hlciI6ZmFsc2UsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNjIwNDM1MSwiZXhwIjoxNjM4Nzk2MzUxfQ.k-sIkJcXojewq5UqkE2ne0Xt0huotWz6uMj-L2cCznc",
        },
      });

      // console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={"widget-container " + type}>
      <div className="topSection">
        <h2>{title}</h2>

        {!noSeeAll && (
          <Link
            to={`/${type === "schedules" ? "#classes" : type}/all`}
            className="link"
          >
            see all
            <KeyboardArrowRightOutlinedIcon />
          </Link>
        )}
      </div>

      {forLargeItems &&
        type === "all-classes" &&
        itemList.map((item, index) => (
          <ItemMd
            type="class"
            key={index}
            data={item}
            bgColor={allClassesArray[index].bgColor}
            textColor={allClassesArray[index].textColor}
          />
        ))}

      {forLargeItems &&
        type !== "all-classes" &&
        itemList.map((item, index) => (
          <ItemMd
            index={index}
            type={type.slice(0, -1)}
            key={index}
            data={item}
          />
        ))}

      {forSmallItems &&
        itemList.map((item, index) => (
          <ItemSm
            index={index}
            type={type.slice(0, -1)}
            key={index}
            data={item}
            noLink={type === "schedules"}
          />
        ))}
    </div>
  );
};

export default HomeWidget;
