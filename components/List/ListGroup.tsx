import React from 'react';
import ListItem from './ListItem';

interface Props {
  data: any;
}

const ListGroup = ({ data }: Props) => {
  return (
    <div>
      {data.map((item: any, index: number) => (
        <ListItem key={index} item={item} />
      ))}
    </div>
  );
};

export default ListGroup;
