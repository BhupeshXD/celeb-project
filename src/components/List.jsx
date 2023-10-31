import { useState } from "react";
import CelebJSON from "../db/celebrities.json";
import SearchBar from "./SearchBar";
import Item from "./Item";

const List = () => {
  
  const [celebData, setCelebData] = useState([ ...CelebJSON ]);

  const searchHandler = (event) => {
    if (event.target.value) {
      setCelebData(
        CelebJSON.filter((i) =>
          i.first.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
    }

    if (event.target.value === "") {
      setCelebData([...CelebJSON]);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>List View</h1>
      <SearchBar onChange={searchHandler} />
      {celebData.length === 0 && (
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
            setCelebData((prevVal) => prevVal.filter((i) => i.id !== id));
          }}
          onEdit={(obj) => {
            setCelebData((prevVal) =>
              prevVal.map((currentVal) => (currentVal.id === obj.id ? obj : currentVal))
            );
          }}
        />
      ))}
    </div>
  );
};

export default List;
