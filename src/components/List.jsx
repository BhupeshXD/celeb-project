import { useEffect, useState } from "react";
import CelebJSON from "../db/celebrities.json";
import SearchBar from "./SearchBar";
import Item from "./Item";

const List = () => {
  const [celebData, setCelebData] = useState(CelebJSON);
  const [empty, setEmpty] = useState(false);

  console.log("CelebJSON", CelebJSON);

  useEffect(() => {
    if (celebData.length === 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [celebData]);

  const searchHandler = (event) => {
    if (event.target.value) {
      setCelebData(
        CelebJSON.filter((item) =>
          item.first.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
    }

    if (event.target.value === "") {
      setCelebData(CelebJSON);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>List View</h1>
      <SearchBar onChange={searchHandler} />
      {empty && (
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
        >
          No data found !
        </div>
      )}
      {celebData?.map((item) => (
        <Item
          key={item.id}
          data={item}
          onDelete={(id) => {
            setCelebData((prevVal) => prevVal.filter((item) => item.id !== id));
          }}
          onEdit={(obj) => {
            setCelebData((prevVal) =>
              prevVal.map((prevVal) => (prevVal.id === obj.id ? obj : prevVal))
            );
          }}
        />
      ))}
    </div>
  );
};

export default List;
