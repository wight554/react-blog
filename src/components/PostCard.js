import React from 'react';

import {Link} from 'react-router-dom';

const PostCard = ({title, author, date, _id}) => {
  return (
    <div className="PostCard">
      <img src="https://via.placeholder.com/400x300" alt="" />
      <div className="card-header">
        <span className="title">{title}</span>
        <span>{author}, {date.toString ().slice (0, 10)}</span>
      </div>
      <Link to={`/posts/${_id}`}>
        READ MORE...
      </Link>
    </div>
  );
};

export default PostCard;
