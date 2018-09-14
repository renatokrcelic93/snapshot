import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { auth, loadMoreExploreProjects, setModal } from "../../actions";
import { getCookie, setCookie } from "../../utility/cookieHandler";
import config from "../../config";
import Layout from "../Layout";
import Map from "../Map";
import Geosuggest from "react-geosuggest";
import Slide from "../Slider/Slide";
import OrgSlide from "../OrgSlider/OrgSlide";
import SlideList from "../Shared/SlideList";
import Dropdown from "react-dropdown";
import Iframe from "../Modal/Iframe";
import BannerSlider from "../BannerSlider";
import BannerSlide from "../BannerSlider/BannerSlide";
import Router from "next/router";

class ExploreComponent extends React.Component {
  state = {
    bannerSliderBreakpointHeights: [515, 400, 300, 300, 200]
  };
  async componentDidMount() {
    const {
      explorePageInitialProps: { categories },
      geo
    } = this.props;
    // if we do not have geolocation cookie, we set it from reducer if we have it there
    let geolocation = (await getCookie("geolocation"))
      ? JSON.parse(await getCookie("geolocation"))
      : null;
    if (!geolocation) {
      if (geo) {
        await setCookie("geolocation", JSON.stringify(geo), 1000);
      }
    }
  }
  _compare = (a, b) => {
    if (a.label < b.label) return -1;
    if (a.label > b.label) return 1;
    return 0;
  };

  _loadMoreExploreProjects = ({ infiniteExploreProjectsData, geolocation }) => {
    const token = getCookie("token");
    const { loadMoreExploreProjects, explorePageInitialProps } = this.props;
    const data = {
      infiniteExploreProjectsData
    };
    data.geolocation = geolocation.geolocation;
    data.category = explorePageInitialProps.category;
    loadMoreExploreProjects(token, data);
  };

  _renderBannerSlides = data => {
    return data.map(({ meta, image }, i) => {
      const linkRegex = /youtube|youtu.be/g;
      let cb;
      if (meta.link && linkRegex.test(meta.link)) {
        let urlId = meta.link.split("/")[3];
        const urlRegex = /watch/g;
        urlId = urlRegex.test(urlId) ? urlId.split("=")[1] : urlId;
        const data = {
          type: "video",
          urlId
        };
        cb = () => this._bannerSlideCallback(data);
      } else {
        const data = {
          type: "link",
          url: meta.link
        };
        cb = () => this._bannerSlideCallback(data);
      }
      return (
        <BannerSlide
          i={i}
          heights={this.state.bannerSliderBreakpointHeights}
          onClick={cb}
          image={image}
          key={image}
        />
      );
    });
  };

  _bannerSlideCallback = data => {
    if (data.type == "link") {
      // currently we do not handle click on explore banner pictures
      return null;
    } else {
      // else it is a video
      return this.props.setModal({
        modalData: { openModal: true, content: <Iframe data={data} /> }
      });
      // return this.setState({modalData: {openModal: true, content: <Iframe data={data} />}})
    }
  };

  _renderProjectList = (explorePageInitialProps, user) => {
    const { projects, infiniteExploreProjectsData } = explorePageInitialProps;
    if (projects.length) {
      return (
        <SlideList
          user={user}
          _loadMore={this._loadMoreExploreProjects}
          loadButton={true}
          data={explorePageInitialProps}
          infiniteData={infiniteExploreProjectsData}
        />
      );
    } else {
      return <p className="font-xxl">We couldn't find anything.</p>;
    }
  };

  renderFeaturedProjects = featuredProjects => {
    return featuredProjects.map(({ image, title, org, id }) => {
      const cb = () => window.open(`/project/${id}`, "_self");
      return (
        <Slide
          key={title}
          onClick={cb}
          image={image}
          title={title}
          organizer={org}
          time={""}
          height={275}
          style={{ width: 260 }}
        />
      );
    });
  };
  renderFeaturedOrgs = featuredOrgs => {
    return featuredOrgs.map(({ image, title, id }) => {
      const cb = () => window.open(`/org/${id}`, "_self");
      return (
        <OrgSlide
          key={title}
          onClick={cb}
          image={image}
          title={title}
          style={{ width: 180 }}
        />
      );
    });
  };
  render() {
    const { explorePageInitialProps, user } = this.props;
    const {
      projects,
      infiniteExploreProjectsData,
      bannerData,
      geolocation,
      category,
      featuredOrgs,
      featuredProjects
    } = explorePageInitialProps;
    return (
      <Layout>
        {category && (
          <BannerSlider
            heights={this.state.bannerSliderBreakpointHeights}
            renderSlides={() => this._renderBannerSlides(bannerData)}
          />
        )}
        <div className="container-fluid padding-bottom-30 bg-light">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="light font-xxxl">
                {category ? category.name : "All local opportunities"}
              </h1>
            </div>
            {category && (
              <div className="col-12 text-center">
                <div className="col-12 text-center">
                  <p className="font-xl">Popular Projects</p>
                </div>
                {featuredProjects && (
                  <div className="col-12 text-center">
                    {this.renderFeaturedProjects(featuredProjects)}
                  </div>
                )}
                <div className="col-12 text-center">
                  <p className="font-xl">Popular Organizations</p>
                </div>
                {featuredOrgs && (
                  <div className="col-12 margin-top-30">
                    {this.renderFeaturedOrgs(featuredOrgs)}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="container bg-white margin-top-30">
          <div className="row">
            <div className="col-12 text-center">
              {this._renderProjectList(explorePageInitialProps, user)}
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
          .container-fluid {
            margin-top: ${category ? -40 : 0}px;
          }
          .map_marker_icon {
            width: 16px;
            height: 16px;
            margin-top: 3px;
          }
          .filter_container {
            border-radius: 3px;
            border-bottom: 0.5px solid #1a287f;
            border-top: 0.5px solid #1a287f;
            border-right: 0.5px solid #1a287f;
          }
        `}</style>
      </Layout>
    );
  }
}

const md = dispatch => {
  return {
    auth: bindActionCreators(auth, dispatch),
    loadMoreExploreProjects: bindActionCreators(
      loadMoreExploreProjects,
      dispatch
    ),
    setModal: bindActionCreators(setModal, dispatch)
  };
};

const ms = state => {
  const {
    globalReducer: { user, explorePageInitialProps, geo }
  } = state;
  return {
    user,
    explorePageInitialProps,
    geo
  };
};

export default connect(
  ms,
  md
)(ExploreComponent);
