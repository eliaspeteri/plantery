import React from 'react';

interface Props {
  item: any;
}

const ListItem = ({ item }: Props) => {
  return (
    <div>
      {Object.keys(item).map((key) => (
        <div key={key}>
          {key}: {item[key]}
        </div>
      ))}
    </div>
  );
};

export default ListItem;
