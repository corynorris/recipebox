import React from "react";
import PropTypes from "prop-types";

const GridLayout = ({ items, columns }) => {
  const row = (item, idx) => (
    <div key={idx} className="row">
      {item}
    </div>
  );

  const col = (item, idx) => {
    const sizeName = "col-" + 12 / columns;
    return (
      <div key={idx} className={sizeName}>
        {item}
      </div>
    );
  };

  const rows = [];
  let group = [];
  items.forEach((element, idx) => {
    if (idx > 0 && idx % columns === 0) {
      rows.push(row(group, idx));
      group = [];
    }
    group.push(col(element, idx));
  });
  if (group.length > 0) {
    rows.push(row(group, items.length));
  }

  return <div>{rows}</div>;
};

GridLayout.propTypes = {
  columns: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.object)
};

export default GridLayout;
