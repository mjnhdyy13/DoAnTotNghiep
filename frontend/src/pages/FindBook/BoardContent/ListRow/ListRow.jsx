import { useState, useEffect } from "react";

import Row from "../../../Dashboard/BoardContent/ListRow/Row/Row";

const list = ["Kết quả tìm kiếm"];
function ListRow() {
  return (
    <div style={{ marginBottom: 5 }}>
      {list.map((item, index) => (
        <Row item={item} key={index} />
      ))}
    </div>
  );
}

export default ListRow;
