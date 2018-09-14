import React, { Component } from "react";
import Participant from "./Participant";
import { globalStyles } from "../../utility/GlobalStyles";
const {
  fontSizes,
  lineHeights,
  colors: {
    vomo_black,
    vomo_light_bg,
    vomo_dkblack,
    vomo_grey,
    vomo_green,
    vomo_blgrey,
    vomo_ltblue
  }
} = globalStyles;

class ServingDate extends Component {
  _renderButtons = (project, servingDate, user) => {
    const { _handleJoinProject, _handleEditProject } = this.props;
    let participation = null;
    if (user) {
      participation = servingDate.participations.find(
        participation => participation.user.id == user.id
      );
    }
    if (participation) {
      if (participation.status == "APPROVED") {
        return (
          <div>
            <div>
              <div className="attending font-m bold vomo-grey">Attending</div>
              <div
                id="project_edit_time_attending"
                onClick={() => _handleEditProject(project, servingDate)}
                className="edit blue font-xxs bold"
              >
                Edit My Time
              </div>
            </div>
            <style jsx>{`
              .attending {
                text-align: right;
              }
              .edit {
                text-align: right;
              }
            `}</style>
          </div>
        );
      } else if (participation.status == "DENIED") {
        return (
          <div>
            <div>
              <div className="attending font-m bold vomo-red">Denied</div>
              <div
                id="project_edit_time_attending"
                onClick={() => _handleEditProject(project, servingDate)}
                className="edit blue font-xxs bold"
              >
                Edit My Request
              </div>
            </div>
            <style jsx>{`
              .attending {
                text-align: right;
              }
              .edit {
                text-align: right;
              }
            `}</style>
          </div>
        );
      } else {
        return (
          <div>
            <div className="pending font-m bold vomo-grey">Pending</div>
            <div
              id="project_edit_time_pending"
              onClick={() => _handleEditProject(project, servingDate)}
              className="pending blue font-xxs bold"
            >
              Edit My Time
            </div>
            <style>{`
              .pending {
                text-align: right;
              }
              `}</style>
          </div>
        );
      }
    } else {
      return (
        <div
          id="project_join_date"
          onClick={() => _handleJoinProject(project, servingDate)}
          className="vomo-button"
        >
          Join
        </div>
      );
    }
  };

  _renderParticipants = (servingDate, dictionary) => {
    let capacity = 0;
    servingDate.roles.map(role => {
      capacity += role.capacity;
    });
    if (capacity > 10) {
      capacity = 10;
    }
    const participantSlots = [];
    for (let i = 0; i < capacity; i++) {
      if (servingDate.participations[i]) {
        try {
          var u = servingDate.participations[i].user;
          var avatar = u.profile_pic ? u.profile_pic.urls.s : "";
          let participant = true;
          if (avatar == "") {
            participant = false;
          }
          participantSlots.push(
            <Participant
              key={i}
              text={"Taken"}
              avatar={avatar}
              participant={participant}
            />
          );
        } catch (error) {
          participantSlots.push(
            <Participant text="Taken" key={i} participant={false} />
          );
        }
      } else {
        if (i < servingDate.participations.length) {
          participantSlots.push(
            <Participant text="Taken" key={i} participant={false} />
          );
        } else {
          participantSlots.push(
            <Participant text="Open" key={i} participant={false} />
          );
        }
      }
    }
    return participantSlots;
  };

  render() {
    const {
      date,
      time,
      remainingSpots,
      servingDate,
      i,
      project,
      servingDatesDictionary,
      user
    } = this.props.data;
    return (
      <div key={servingDate._id} className={`container serving_date item${i}`}>
        <div className="row">
          <div id="project_serving_date" className="col-md-10 col-sm-12">
            <div className="row">
              <div className="col-12 col-sm-4">
                <p className="font-s bold">{date}</p>
              </div>
              <div className="col-12 col-sm-4">
                <p className="font-s">{time}</p>
              </div>
              <div className="col-12 col-sm-4">
                <p id="project_spots_remain" className="font-s">
                  <b>{remainingSpots}</b> Spots remain
                </p>
              </div>
            </div>
            <div
              id="project_participants"
              className="row participants_container"
            >
              <div className="col-12">
                {this._renderParticipants(servingDate, servingDatesDictionary)}
              </div>
            </div>
          </div>
          <div className="col-md-2 col-sm-12 text-center align-self-center">
            {this._renderButtons(project, servingDate, user)}
          </div>
        </div>
        <style jsx>{`
          .serving_date {
            padding-top: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #e9e9e9;
          }
          .item0 {
            border-top: 1px solid #e9e9e9;
          }
          @media (max-width: 768px) {
            .item0,
            .serving_date {
              border: 0 none;
            }
            #project_serving_date .row:first-child {
              display: block;
              margin-right: 0;
              margin-left: 0;
              border-radius: 5px;
              background-color: ${vomo_green};
              color: #fff;
              text-align: center;
              position: relative;
              margin-right: 1px;
              margin-left: 1px;
              padding: 16px 20px;
              -webkit-transition: background-color 200ms ease;
              transition: background-color 200ms ease;
              font-size: ${fontSizes.xxs};
              line-height: ${lineHeights.xs};
              font-weight: 400;
              letter-spacing: 1px;
              text-transform: uppercase;
              cursor: pointer;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default ServingDate;
