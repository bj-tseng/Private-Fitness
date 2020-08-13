import React from 'react';
import { parse } from 'path';

const Data = (props) => {
  let weightInfo;
  if (props.weight_data.length === 0) {
    weightInfo = 'No current weight information is stored.';
  } else {
    const reordered = props.weight_data.map(obj => {
      obj.order = Date.parse(obj.date);
      return obj;
    })
    reordered.sort((a, b) => {
      return b.order - a.order;
    })
    weightInfo = [];
    reordered.forEach((record, i) => {
      weightInfo.push(<p key={i}><strong>Date :</strong> {record.date}<strong>Recorded Weight :</strong> {record.weight}</p>)
    });
  }

  return (
    <div id="weight_container">
      {weightInfo}
    </div>
  )
}

export default Data;
