import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  auth,
  loadMoreCampaignProjects,
  filterCampaignPageProjects
} from "../../actions";
import { getCookie } from "../../utility/cookieHandler";
import config from "../../config";
import Layout from "../Layout";
import Map from "../Map";
import SlideList from "../Shared/SlideList";
import Parser from "html-react-parser";
import Popup from "reactjs-popup";

class CampaignComponent extends React.Component {
  state = {
    filters: {
      weekend: false,
      weekday: false,
      indoor: false,
      outdoor: false,
      morning: false,
      afternoon: false,
      evening: false,
      child: false,
      teen: false,
      adult: false
    },
    mobileFilterHeight: false,
    activeFilterButton: false,
    filterData: {
      campaign: "",
      flags: [],
      ["age-limit"]: [],
      limit: 6
    }
  };
  componentDidMount() {
    return this.setState({
      filterData: {
        ...this.state.filterData,
        campaign: this.props.campaignPageInitialProps.campaign
      }
    });
  }
  _loadMoreCampaignProjects = ({ infiniteCampaignProjectsData, campaign }) => {
    const token = getCookie("token");
    const { loadMoreCampaignProjects } = this.props;
    const { filterData } = this.state;

    loadMoreCampaignProjects(token, filterData, infiniteCampaignProjectsData);
  };
  _renderProjectList = (campaignPageInitialProps, user) => {
    const { projects, infiniteCampaignProjectsData } = campaignPageInitialProps;
    if (projects.length) {
      return (
        <SlideList
          user={user}
          _loadMore={this._loadMoreCampaignProjects}
          loadButton={true}
          data={campaignPageInitialProps}
          infiniteData={infiniteCampaignProjectsData}
        />
      );
    } else {
      return <p className="font-xxl">We couldn't find anything.</p>;
    }
  };

  render() {
    const { campaignPageInitialProps, user } = this.props;
    const { projects, details, campaign } = campaignPageInitialProps;
    const { filters } = this.state;
    return (
      <Layout>
        <div className="container-fluid bg-light">
          <div className="row banner_wrapper padding-top-15 padding-bottom-15 align-items-center">
            <div className="col-12 col-md-6">
              <div className="banner" />
            </div>
            <div className="col-12 col-md-6 text-xs-center text-md-left">
              <h1 id="campaign_name" className="normal">
                {Parser(campaign.name ? campaign.name : "")}
              </h1>
              <p id="campaign_description" className="details">
                {Parser(campaign.text ? campaign.text : "")}
              </p>
              {/* <p id="campaign_spots" className="details light margin-top-15">Volunteer spots</p>
              <p id="campaign_spot_numbers" className="details font-xl blue data">{details.total_volunteer_spots}</p>
              <p id="campaign_events" className="details light">Active events</p>
              <p id="campaign_event_numbers" className="details font-xl blue data">{details.active_events_number}</p>
              <p id="campaign_orgs" className="details light">Participant orgs</p>
              <p id="campaign_org_numbers" className="details font-xl blue data">{details.entities_number}</p> */}
            </div>
          </div>
          {/* <div className="row mobile_filter padding-top-8">
            <div className="col-12">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-12 offset-0 col-sm-3 offset-sm-9 text-center">
                        <div id="campaign_filters" className="filters_button bold" onClick={this._showMobileFilters}>Filters</div>
                      </div>
                    </div>
                    <div className="mobile_filter_wrapper margin-top-8">
                      {this._renderFilters(filters)}
                      <div className="row margin-top-10">
                        <div className="col-12 nopadding">
                          <p>Sort by</p>
                          <p onClick={() => this._handleSortClick([{"name":"time_start","direction":"ASC"}])} className="font-s bold blue pointer">Date</p>
                          <p onClick={() => this._handleSortClick([{"name":"distance","direction":"ASC"}])} className="font-s bold blue pointer">Distance</p>
                          <p onClick={() => this._handleSortClick([{"name":"name","direction":"ASC"}])} className="font-s bold blue pointer">Name (A-Z)</p>
                          <p onClick={() => this._handleSortClick([{"name":"name","direction":"DESC"}])} className="font-s bold blue pointer">Name (Z-A)</p>
                        </div>
                        <div className="col-12 nopadding">
                          <p onClick={this._resetFilters} id="campaigns_reset_nopadding" className="font-s bold vomo-grey pointer">Reset</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="row padding-top-8 padding-bottom-8 desktop_filter">
            <div className="col-2 offset-10 text-center" onClick={this._setActiveFilterButton}>
              <Popup
                trigger={<div className="filters_button bold">Filters</div>}
                position="bottom right"
                on="click"
                arrow={false}
                contentStyle={{width: '450px'}}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-4">
                      <div className="row max_height">
                        <div className="col-12">
                          <p >Sort by</p>
                          <p onClick={() => this._handleSortClick([{"name":"time_start","direction":"ASC"}])} className="font-s bold blue pointer">Date</p>
                          <p onClick={() => this._handleSortClick([{"name":"distance","direction":"ASC"}])} className="font-s bold blue pointer">Distance</p>
                          <p onClick={() => this._handleSortClick([{"name":"name","direction":"ASC"}])} className="font-s bold blue pointer">Name (A-Z)</p>
                          <p onClick={() => this._handleSortClick([{"name":"name","direction":"DESC"}])} className="font-s bold blue pointer">Name (Z-A)</p>
                        </div>
                        <div className="col-12 align-self-end">
                          <p onClick={this._resetFilters} id="campaigns_reset_align" className="font-s bold vomo-grey pointer">Reset</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-8">
                      <div className="row">
                        <div className="col-12 nopadding">
                          <p>Filters</p>
                        </div>
                      </div>
                      {this._renderFilters(filters)}
                    </div>
                  </div>
                </div>
              </Popup>
            </div>
          </div> */}
        </div>
        <div
          id="campaign_content_projects"
          className="container bg-white margin-top-15"
        >
          <div className="row">
            <div className="col-12">
              {this._renderProjectList(campaignPageInitialProps, user)}
            </div>
          </div>
        </div>
        <div className="margin-top-30">
          <Map
            isMarkerShown
            googleMapURL={config.endpoints.GOOGLE_MAPS_URL}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            multiMarker={true}
            data={projects}
          />
        </div>
        <style jsx>{`
          .banner_wrapper {
            border: 1px solid #b7bfc5;
          }
          .filters_button {
            border: 1px solid #b7bfc5;
            padding: 8px;
            background: ${this.state.activeFilterButton == true
              ? "#84D8A8"
              : "white"};
            border-radius: 3px;
            cursor: pointer;
          }
          .mobile_filter {
            display: none;
            border: 1px solid #b7bfc5;
            border-top: none;
          }
          .desktop_filter {
            border: 1px solid #b7bfc5;
            border-top: none;
          }
          @media (max-width: 768px) {
            .mobile_filter {
              display: block;
            }
            .desktop_filter {
              display: none;
            }
          }
          .mobile_filter_wrapper {
            padding-left: 15px;
            padding-right: 15px;
            height: ${this.state.mobileFilterHeight ? 410 : 0}px;
            transition: all 0.3s ease-in;
            overflow: hidden;
          }
          .max_height {
            height: 100%;
          }

          .banner {
            height: 25vw;
            min-height: 150px;
            background-image: url(${campaign.cover ? campaign.cover : ""});
            background-position: 50% 50%;
            background-size: cover;
            position: relative;
          }
          .details {
            margin-bottom: 5px;
          }
          .data {
            line-height: 16px;
          }
        `}</style>
      </Layout>
    );
  }
}

const md = dispatch => {
  return {
    auth: bindActionCreators(auth, dispatch),
    loadMoreCampaignProjects: bindActionCreators(
      loadMoreCampaignProjects,
      dispatch
    ),
    filterCampaignPageProjects: bindActionCreators(
      filterCampaignPageProjects,
      dispatch
    )
  };
};

const ms = state => {
  const {
    globalReducer: { user, campaignPageInitialProps }
  } = state;
  return {
    user,
    campaignPageInitialProps
  };
};

export default connect(
  ms,
  md
)(CampaignComponent);
