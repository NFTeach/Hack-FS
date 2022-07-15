import React from 'react';

const SubmitTest = (props) => {
    const { data } = props;
    const listItems = Object.entries(data).map(([key, value]) => (
        <li>
            <strong>{key}:</strong> {value}
        </li>
    ));
    console.log(listItems)
  return (
    <div>
      <ul>{listItems}</ul>
      <button type="submit">Need to wire up this Button</button>
    </div>
  )
}

export default SubmitTest