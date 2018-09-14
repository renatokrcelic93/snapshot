import React, { Component } from "react";

class Like extends Component {
  render() {
    const { _handleLike, project, src, direction, user } = this.props;

    return (
      <div>
        <img
          id="project_like"
          onClick={() => _handleLike(direction, project, user)}
          className="project_like pointer"
          src={src}
        />
        <style>{`
          .project_like {
            height: 25px;
            width: 25px;
          }
          @media (max-width: 768px) {
            .project_like {
              display: none;
            }
          }
          `}</style>
      </div>
    );
  }
}

export default Like;
