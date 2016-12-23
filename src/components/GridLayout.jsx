import React from 'react';


class GridLayout extends React.Component {

  static propTypes = {
    columns: React.PropTypes.number,
    items: React.PropTypes.arrayOf(React.PropTypes.object)
  }

  row(item, idx) {
    return <div key={idx} className="row">{item}</div>;
  }

  col(item, idx) {
    const sizeName = 'col-' + (12 / this.props.columns);
    return (<div key={idx}
      className={sizeName}>
      {item}
    </div>);
  }

  render() {
    let rows = [];
    let group = [];
    this.props.items.forEach((element, idx) => {
      if (idx % this.props.columns === 0) {
        rows.push(this.row(group, idx));
        group = [];
      }
      group.push(this.col(element, idx));
    })
    rows.push(this.row(group, this.props.items.length));

    return <div>{rows}</div>
  }
}

export default GridLayout;

