import { useState, useEffect } from "react";
import { mockData } from "../../../../apis/mockdata";
import Row from "./Row/Row";
import RowMusic from "./Row/RowMusic";

const listB = ["Sách mới"];
const listM = ["Nhạc mới"];
function ListRow() {
  return (
    <div style={{ marginBottom: 5 }}>
      <Row item={"Sách mới"} />
      <RowMusic item={"Nhạc mới"} />
    </div>
  );
}

export default ListRow;
