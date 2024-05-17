import React from "react";
import "./Comments.css";
import { abbrevationTime, avatarColor } from "../../Utils/Utils";

function Comments(props) {
  const { data } = props;

  const bgColor = avatarColor(data.name[0]);

  const createdAt = abbrevationTime(data.createdAt);

  return (
    <li className="comment-list-item">
      <div className="comment-avatar-card" style={{ backgroundColor: bgColor }}>
        <span className="avatar-name">{data.name[0]}</span>
      </div>
      <div className="comment-content-card">
        <div className="name-time-card">
          <h1 className="user-name">{data.name}</h1>
          <p className="user-time">{createdAt}</p>
        </div>
        <p className="comment">{data.comment}</p>
      </div>
    </li>
  );
}

export default Comments;
