import React from 'react';

const Update = ({ updateDate, updateWeight, updateData, date, weight }) => {
  return (
    <div>
      <form
      id="updateForm"
      onSubmit={(e) => {
        e.preventDefault();
        updateData(date, weight);
      }}
      >
        <label htmlFor="date">Today's Date: </label>
        <input
          type="text"
          id="date"
          onChange={(e) => updateDate(e.target.value)}
        />
        <label htmlFor="weight">Weight: </label>
        <input
          type="text"
          id="weight"
          onChange={(e) => updateWeight(e.target.value)}
        />
        <input type="submit" value="Upload" />
      </form>
    </div>
  )
};

export default Update;
