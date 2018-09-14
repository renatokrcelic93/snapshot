import React, { Component } from "react";
import IconTextContainer from "../Shared/IconTextContainer";
import SectionWrapper from "./SectionWrapper";

class ComingUp extends Component {
  _renderProjectSignUpButton = (project, buttonText, user) => {
    const { _handleJoinServingDate } = this.props;
    let isParticipant = false;
    if (user) {
      isParticipant = project.servingDates.find(servingDate => {
        return servingDate.participations.find(participation => {
          return participation.user_id === user.id;
        });
      });
    }
    if (isParticipant) {
      return (
        <div className="vomo-button-disabled margin-top-15">Attending</div>
      );
    } else {
      return (
        <div
          id="project_intrested"
          onClick={() => _handleJoinServingDate(project)}
          className="vomo-button margin-top-15"
        >
          {buttonText}
          <style jsx>{`
            @media (max-width: 768px) {
              #project_intrested {
                display: none;
              }
            }
          `}</style>
        </div>
      );
    }
  };
  _renderSectionContent = (project, user) => {
    const { next_happening, projectType } = project;
    const { date, time, address, venue, maps_link } = next_happening;
    switch (projectType) {
      case "ANYTIME":
        return (
          <div>
            <IconTextContainer
              containerType="basic"
              text={"Anytime"}
              src="../static/calendar.svg"
            />
            <IconTextContainer
              containerType="location"
              text={address}
              maps_link={maps_link}
              src="../static/map-marker-blue.svg"
            />
            {this._renderProjectSignUpButton(project, "i'm interested", user)}
          </div>
        );
      case "ANYWHERE":
        return (
          <div>
            <IconTextContainer
              containerType="basic"
              src="../static/calendar.svg"
              text={date}
            />
            <IconTextContainer
              containerType="basic"
              src="../static/clock.svg"
              text={time}
            />
            <IconTextContainer
              containerType="location"
              src="../static/calendar.svg"
              text={"Anywhere"}
            />
            {this._renderProjectSignUpButton(
              project,
              "join a serving date",
              user
            )}
          </div>
        );
      case "ANYTIME_ANYWHERE":
        return (
          <div>
            <IconTextContainer
              containerType="basic"
              src="../static/calendar.svg"
              text={"Anytime"}
            />
            <IconTextContainer
              containerType="location"
              src="../static/map-marker-blue.svg"
              text={"Anywhere"}
            />
            {this._renderProjectSignUpButton(project, "i'm interested", user)}
          </div>
        );
      default:
        return (
          <div>
            <IconTextContainer
              containerType="basic"
              src="../static/calendar.svg"
              text={date}
            />
            <IconTextContainer
              containerType="basic"
              src="../static/clock.svg"
              text={time}
            />
            <IconTextContainer
              containerType="location"
              src="../static/map-marker-blue.svg"
              text={address}
              maps_link={maps_link}
            />
            {this._renderProjectSignUpButton(
              project,
              "join a serving date",
              user
            )}
          </div>
        );
    }
  };
  render() {
    const { project, user } = this.props;
    return (
      <SectionWrapper title="Coming up">
        {this._renderSectionContent(project, user)}
      </SectionWrapper>
    );
  }
}

export default ComingUp;
