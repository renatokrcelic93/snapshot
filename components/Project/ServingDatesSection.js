import React, { Component } from "react";
import moment from "moment-timezone";
import InfiniteScroll from "react-infinite-scroller";
import ServingDate from "./ServingDate";
import Loader from "../Shared/Loader";
import { globalStyles } from "../../utility/GlobalStyles";
const {
  fontSizes,
  lineHeights,
  colors: {
    vomo_black,
    vomo_light_bg,
    vomo_dkblack,
    vomo_grey,
    vomo_blgrey,
    vomo_ltblue
  }
} = globalStyles;

class ServingDates extends Component {
  _renderServingDates = project => {
    const { servingDates, servingDatesDictionary, projectType } = project;
    const { _handleJoinProject, _handleEditProject, user } = this.props;
    return servingDates.map((servingDate, i) => {
      const date = moment
        .utc(servingDate.starts_at)
        .tz(
          project.address.timezone
            ? project.address.timezone
            : "America/Chicago"
        )
        .format("ddd, MMM D");
      const time =
        moment
          .utc(servingDate.starts_at)
          .tz(
            project.address.timezone
              ? project.address.timezone
              : "America/Chicago"
          )
          .format("hh:mm A") +
        " - " +
        moment
          .utc(servingDate.ends_at)
          .tz(
            project.address.timezone
              ? project.address.timezone
              : "America/Chicago"
          )
          .format("hh:mm A");
      let capacity = 0;
      servingDate.roles.map(role => {
        capacity += role.capacity;
      });
      let rejectedCounter = 0;
      servingDate.participations.map(participation => {
        if (participation.status == "DENIED") {
          return rejectedCounter++;
        }
        return;
      });
      const remainingSpots =
        capacity - servingDate.participations.length + rejectedCounter;
      return (
        <ServingDate
          key={servingDate.id}
          _handleJoinProject={_handleJoinProject}
          _handleEditProject={_handleEditProject}
          data={{
            user,
            date,
            time,
            remainingSpots,
            servingDate,
            i,
            project,
            servingDatesDictionary
          }}
        />
      );
    });
  };
  render() {
    const { project, _loadMoreServingDates } = this.props;
    const { projectType } = project;
    if (projectType == "ANYTIME" || projectType == "ANYTIME_ANYWHERE") {
      return null;
    }
    return (
      <div className="serving_dates padding-top-30">
        <div className="container">
          <div className="row">
            <div className="col-12 serving-dates-title">
              <p className="font-xxl">
                <em />Serving Dates
              </p>
            </div>
            <div id="project_dates_container" className="col-12">
              <InfiniteScroll
                pageStart={0}
                loadMore={_loadMoreServingDates}
                hasMore={project.infiniteServingDatesData.hasMore}
                loader={<Loader key={"1"} />}
              >
                {this._renderServingDates(project)}
              </InfiniteScroll>
            </div>
          </div>
        </div>
        <style jsx>{`
          .serving_dates {
            background: #fff;
          }
          @media (max-width: 768px) {
            .serving_dates .col-12,
            .serving_dates .container {
              padding-left: 0;
              padding-right: 0;
            }
            .serving_dates .row {
              margin-left: 0;
              margin-right: 0;
            }
            .serving_dates .serving-dates-title.col-12 {
              background-color: #f0f0f0;
              margin-bottom: 15px;
              padding: 15px;
            }
            .serving_dates p {
              color: ${vomo_blgrey};
              font-size: 0.85rem;
              font-weight: 700;
              letter-spacing: 0.015em;
              margin-bottom: 0;
              text-transform: uppercase;
            }
            .serving-dates-title em {
              background: url(../static/calendar-gray.svg) 0 0 no-repeat;
              display: block;
              height: 23px;
              width: 27px;
              float: left;
              margin-right: 15px;
              position: relative;
              top: -2px;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default ServingDates;
