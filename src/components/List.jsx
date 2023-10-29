import { useEffect, useState } from "react";
import CelebJSON from "../db/celebrities.json";
import SearchBar from "./SearchBar";
import Item from "./Item";

const List = () => {
  const [celebData, setCelebData] = useState(CelebJSON);
  const [search, setSearch] = useState("");
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    if (celebData.length === 0) {
      //setEmpty(true)
    }
  }, [celebData]);

  const searchHandler = (event) => {
    setSearch(event.target.value);
    if (event.target.value) {
      setCelebData(
        CelebJSON.filter((i) =>
          i.first.toLowerCase().includes(event.target.value.toLowerCase())
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
      <SearchBar onChange={searchHandler} />
      {/* {empty && emptybox} */}
      {celebData?.map((item) => (
        <Item
          key={item.id}
          data={item}
          onDelete={(id) => {
            setCelebData((prevVal) => prevVal.filter((i) => i.id !== id));
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
