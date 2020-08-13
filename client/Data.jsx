import React from 'react';

const Data = (props) => {
  let weightInfo;
  if (props.weight_data.length === 0) {
    weightInfo = '';
  } else {
    weightInfo = JSON.stringify(props.weight_data)
  }
  return (
  <p>{weightInfo}</p>
  )
}

export default Data;
