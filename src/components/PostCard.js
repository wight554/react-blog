import React from 'react';

import { Link } from 'react-router-dom';

const PostCard = ({ title, author, date, _id }) => {
  const { firstName, lastName } = author || {};
  return (
    <div className="PostCard">
      <div className="card-header">
        <span className="title">{title}</span>
        <span>
          {firstName} {lastName}, {date.toString().slice(0, 10)}
        </span>
      </div>
      <Link to={`/posts/${_id}`}>(Read more...)</Link>
    </div>
  );
};

export default PostCard;
