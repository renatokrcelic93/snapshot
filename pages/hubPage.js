import React from "react";
import { initStore } from "../store";
import withRedux from "next-redux-wrapper";
import { bindActionCreators } from "redux";
import {
  hubSliderQuery,
  auth,
  setModal,
  bannerSliderQuery,
  followedQuery,
  staticCampaignQuery,
  localQuery,
  disableLoadingIndication
} from "../actions";
import Layout from "../components/Layout";
import BannerSlider from "../components/BannerSlider";
import BannerSlide from "../components/BannerSlider/BannerSlide";
import Slider from "../components/Slider";
import OrgSlider from "../components/OrgSlider";
import Slide from "../components/Slider/Slide";
import OrgSlide from "../components/OrgSlider/OrgSlide";
import Iframe from "../components/Modal/Iframe";
import { getCookie } from "../utility/cookieHandler";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroller";
import Router from "next/router";
import Loader from "../components/Shared/Loader";

// we will need this when we need to seo
// const sliderQueryParams = [
//   {campaign: 'doityourselffamily', limit: 25, page:0, orderby: [{name: 'distance'}], sliderTitle: 'Do It Yourself - Family & Neighbors', queryType: 'static_campaign'},
//   {campaign: 'doityourselfkindness', limit: 25, page:0, orderby: [{name: 'distance'}], sliderTitle: 'Do It Yourself - Acts of Kindness', queryType: 'static_campaign'},
//   {campaign: 'doityourselfstudents', limit: 25, page:0, orderby: [{name: 'distance'}], sliderTitle: 'Do It Yourself - Students', queryType: 'static_campaign'},
//   {limit: 40, page:0, orderby: [{name: 'distance'}], onlyWithAvatars: true, type: ["ORG","NPO","FCO","GOV"], sliderTitle: 'Nearby Organizations', queryType: 'local_org'},
// ]

class Hub extends React.Component {
  static async getInitialProps(context) {
    const { isServer, req, store } = context;

    // try to get token
    let token;
    if (isServer) {
      token = req.cookies.token;
    } else {
      token = getCookie("token");
    }

    // try to auth user by token
    if (token) {
      if (!store.getState().globalReducer.user) {
        await store.dispatch(auth(token));
      }
    }
    return { SSR: "done" };
  }
  state = {
    geolocationData: {
      name: "Dallas, TX",
      geolocation: [32.771868, -96.802791]
    },
    hasMore: true,
    sliderQueryParams: [
      {
        campaign: "doityourselffamily",
        limit: 25,
        page: 0,
        orderby: [{ name: "distance" }],
        sliderTitle: "Do It Yourself - Family & Neighbors",
        queryType: "static_campaign"
      },
      {
        campaign: "doityourselfkindness",
        limit: 25,
        page: 0,
        orderby: [{ name: "distance" }],
        sliderTitle: "Do It Yourself - Acts of Kindness",
        queryType: "static_campaign"
      },
      {
        campaign: "doityourselfstudents",
        limit: 25,
        page: 0,
        orderby: [{ name: "distance" }],
        sliderTitle: "Do It Yourself - Students",
        queryType: "static_campaign"
      },
      {
        limit: 25,
        page: 0,
        orderby: [{ name: "distance" }],
        onlyWithAvatars: true,
        type: ["ORG", "NPO", "FCO", "GOV"],
        sliderTitle: "Nearby Organizations",
        queryType: "nearby_orgs"
      },
      {
        limit: 25,
        page: 0,
        orderby: [{ name: "distance" }],
        max_distance: 100,
        noNear: true,
        sliderTitle: "Local Opportunities",
        queryType: "locals"
      },
      {
        limit: 25,
        page: 0,
        sliderTitle: "PLACEHOLDER",
        queryType: "followed_org_projects"
      },
      {
        limit: 25,
        page: 0,
        caller: "user-frontend",
        sliderTitle: "PLACEHOLDER",
        queryType: "followed_org_campaigns"
      },
      {
        limit: 25,
        page: 0,
        orderby: [{ name: "distance" }],
        max_distance: 100,
        noNear: true,
        sliderTitle: "PLACEHOLDER",
        queryType: "categorized"
      }
    ],
    modalData: {
      openModal: false,
      content: null
    },
    bannerSliderBreakpointHeights: [515, 400, 300, 300, 200]
  };
  async componentDidMount() {
    let { geolocationData, sliderQueryParams } = this.state;
    const geolocation = { ...geolocationData };
    const { auth } = this.props;
    const geo = getCookie("geolocation")
      ? JSON.parse(getCookie("geolocation"))
      : null;

    document.addEventListener("gesturestart", function(e) {
      e.preventDefault();
    });

    // sneaky attempt to log in user, but it is not required
    // IMPORTANT to declare user freshly by this.props.user instead of destructuring, since we want a brand new reference to the state object, not the old one as it should change
    if (!this.props.user) {
      const token = getCookie("token");
      await auth(token);
    }

    // when we have the api to fetch coords on page load in getinitialprops
    // geolocationData.geolocation = this.props.initialProps.coords

    // only works in https secured environment (currently prod or staging), else it will not run
    let position = null;
    try {
      position = await this._getCurrentPosition();
    } catch (e) {}
    if (position) {
      geolocation.geolocation = [
        position.coords.latitude,
        position.coords.longitude
      ];
    }
    if (geo) {
      geolocation.geolocation = [geo.geolocation[0], geo.geolocation[1]];
    }
    await this.props.bannerSliderQuery();
    if (this.props.user) {
      await this.props.followedQuery(this.props.user);
    }

    if (!this.props.user || this.props.user.hubExperience == "FULL") {
      await this.props.staticCampaignQuery(sliderQueryParams);
      await this.props.localQuery(sliderQueryParams, geolocation);
      this.props.hubSliderQuery(
        sliderQueryParams,
        geolocation,
        this.props.user,
        null
      );
    } else {
      await this.props.disableLoadingIndication();
    }
  }

  _getCurrentPosition = (options = {}) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  _renderSliders = () => {
    let { sliders } = this.props;
    return sliders.map((slider, i) => {
      if (slider.queryType == "banner") {
        return;
      }
      let slickTrackHeight = 285;
      if (slider.queryType == "nearby_orgs") {
        return (
          <OrgSlider
            seeAllCallback={this._renderSeeAllButtons(slider)}
            renderSlides={this._renderSlides}
            slickTrackHeight={180}
            key={`${slider.sliderTitle}+${i}`}
            data={slider}
          />
        );
      }
      return (
        <Slider
          seeAllCallback={this._renderSeeAllButtons(slider)}
          renderSlides={this._renderSlides}
          slickTrackHeight={slickTrackHeight}
          key={`${slider.sliderTitle}+${i}`}
          data={slider}
        />
      );
    });
  };
  _renderInfiniteSliders = () => {
    let { infiniteSliders } = this.props;
    return infiniteSliders.map((slider, i) => {
      return (
        <Slider
          seeAllCallback={this._renderSeeAllButtons(slider)}
          renderSlides={this._renderSlides}
          key={`${slider.sliderTitle}+${i}`}
          data={slider}
        />
      );
    });
  };

  _renderBannerSlider = () => {
    const { bannerSlider } = this.props;
    if (!bannerSlider) {
      return;
    }
    return (
      <BannerSlider
        heights={this.state.bannerSliderBreakpointHeights}
        renderSlides={this._renderBannerSlides}
        data={bannerSlider}
      />
    );
  };

  _bannerSlideCallback = data => {
    if (data.type == "link") {
      // meta.link can be null
      if (!data.link) {
        return;
      }
      let page;
      switch (data.link.split("/")[0]) {
        case "campaign":
          page = "campaignPage";
          break;
        case "explore":
          page = "explorePage";
          break;
        case "project":
          page = "projectPage";
          break;
        case "org":
          page = "organizationPage";
          break;
        default:
          page = "notfound";
          break;
      }
      const slug = data.link.split("/")[1];

      return Router.push(`/${page}?slug=${slug}`, `/${data.link}`);
    } else {
      // else it is a video
      return this.props.setModal({
        modalData: { openModal: true, content: <Iframe data={data} /> }
      });
    }
  };

  _renderBannerSlides = data => {
    return data.data.map((result, i) => {
      const media = result.meta;
      const image = result.urls.l;
      const linkRegex = /youtube|youtu.be/g;
      let cb;
      if (media.link && linkRegex.test(media.link)) {
        let urlId = media.link.split("/")[3];
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
          link: media.link
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

  _renderSeeAllButtons = data => {
    switch (data.queryType) {
      case "static_campaign":
        return () =>
          Router.push(
            `/campaignPage?slug=${data.campaign}`,
            `/campaign/${data.campaign}`
          ).then(() => window.scrollTo(0, 0));
      case "nearby_orgs":
        return null;
      case "locals":
        return () => window.open("/explore/all", "_self");
      case "followed_org_projects":
        return () =>
          Router.push(
            `/organizationPage?slug=${data.org}`,
            `/org/${data.org}`
          ).then(() => window.scrollTo(0, 0));
      case "followed_org_campaigns":
        return () =>
          Router.push(
            `/organizationPage?slug=${data.org}`,
            `/org/${data.org}`
          ).then(() => window.scrollTo(0, 0));
      case "categorized":
        return () => window.open(`/explore/${data.cat}`, "_self");
        return null;
      default:
        return null;
    }
  };
  _renderSlides = data => {
    const d = data.dictionary;
    let cb;
    switch (data.queryType) {
      case "static_campaign":
        return data.data.map(result => {
          const {
            name,
            thumb,
            id,
            anytime,
            anywhere,
            next_happening,
            organization
          } = result;
          const image = thumb ? thumb.urls.s : "";
          const eventTime = anytime
            ? "Anytime"
            : moment(next_happening ? next_happening.starts_at : "").format(
                "ddd, MMM D"
              );
          const isHidden = this._checkHidden(result);
          cb = () => this._projectSlideCallback(result, isHidden);
          return (
            <Slide
              onClick={cb}
              key={id}
              image={image}
              title={name}
              organizer={organization.name}
              time={eventTime}
              height={275}
              style={{ width: 260 }}
            />
          );
        });
      case "nearby_orgs":
        return data.data.map(result => {
          const { id, logo, name } = result;
          const image = logo ? logo.urls.s : "";
          cb = () => this._orgSlideCallback(result);
          return (
            <OrgSlide
              onClick={cb}
              key={id}
              image={image}
              title={name}
              style={{ width: 180 }}
            />
          );
        });
      case "locals":
        return data.data.map(result => {
          const {
            name,
            thumb,
            id,
            anytime,
            anywhere,
            next_happening,
            organization
          } = result;
          const image = thumb ? thumb.urls.s : "";
          const eventTime = anytime
            ? "Anytime"
            : moment(next_happening ? next_happening.starts_at : "").format(
                "ddd, MMM D"
              );
          const isHidden = this._checkHidden(result);
          cb = () => this._projectSlideCallback(result, isHidden);
          return (
            <Slide
              hidden={isHidden}
              onClick={cb}
              key={id}
              image={image}
              title={name}
              organizer={organization.name}
              time={eventTime}
              height={275}
              style={{ width: 260 }}
            />
          );
        });
      case "followed_org_projects":
        return data.data.map(result => {
          const {
            name,
            thumb,
            id,
            anytime,
            anywhere,
            next_happening,
            organization
          } = result;
          const image = thumb ? thumb.urls.s : "";
          const eventTime = anytime
            ? "Anytime"
            : moment(next_happening ? next_happening.starts_at : "").format(
                "ddd, MMM D"
              );
          const isHidden = this._checkHidden(result);
          cb = () => this._projectSlideCallback(result, isHidden);
          return (
            <Slide
              hidden={isHidden}
              onClick={cb}
              key={id}
              image={image}
              title={name}
              organizer={organization ? organization.name : ""}
              time={eventTime}
              height={275}
              style={{ width: 260 }}
            />
          );
        });
      case "followed_org_campaigns":
        return data.data.map(result => {
          const { name, cover, id } = result;
          const image = cover ? cover.urls.s : "";
          cb = () => this._campaignSlideCallback(result);
          return (
            <Slide
              onClick={cb}
              key={id}
              image={image}
              title={name}
              organizer={""}
              time={""}
              height={275}
              style={{ width: 260 }}
            />
          );
        });
      case "categorized":
        return data.data.map(result => {
          const {
            name,
            thumb,
            id,
            anytime,
            anywhere,
            next_happening,
            organization
          } = result;
          const image = thumb ? thumb.urls.s : "";
          const eventTime = anytime
            ? "Anytime"
            : moment(next_happening ? next_happening.starts_at : "").format(
                "ddd, MMM D"
              );
          const isHidden = this._checkHidden(result);
          cb = () => this._projectSlideCallback(result, isHidden);
          return (
            <Slide
              hidden={isHidden}
              onClick={cb}
              key={id}
              image={image}
              title={name}
              organizer={organization.name}
              time={eventTime}
              height={275}
              style={{ width: 260 }}
            />
          );
        });
      default:
        return null;
    }
  };

  // geci jó megnézni mi változott propokban
  // componentWillReceiveProps(nextProps) {
  //   for (const index in nextProps) {
  //     if (nextProps[index] !== this.props[index]) {
  //       console.log(index, this.props[index], '-->', nextProps[index]);
  //     }
  //   }
  // }
  _loadMoreSliders = () => {
    const { sliderQueryParams, geolocationData } = this.state;
    const { user, infiniteData } = this.props;
    this.props.hubSliderQuery(
      sliderQueryParams,
      geolocationData,
      user,
      infiniteData
    );
  };

  _projectSlideCallback = (data, isHidden) => {
    if (isHidden) {
      const slug = data.organization.slug;
      return Router.push(`/organizationPage?slug=${slug}`, `/org/${slug}`).then(
        () => window.scrollTo(0, 0)
      );
    } else {
      const slug = data.slug;
      return Router.push(`/projectPage?slug=${slug}`, `/project/${slug}`).then(
        () => window.scrollTo(0, 0)
      );
    }
  };

  _campaignSlideCallback = data => {
    const slug = data.slug;
    return Router.push(`/campaignPage?slug=${slug}`, `/campaign/${slug}`).then(
      () => window.scrollTo(0, 0)
    );
  };
  _orgSlideCallback = data => {
    const slug = data.slug;
    return Router.push(`/organizationPage?slug=${slug}`, `/org/${slug}`).then(
      () => window.scrollTo(0, 0)
    );
  };

  _checkHidden = project => {
    if (project.privacy == "PRIVATE") {
      if (this.props.user === null) return true;
      const followingProjectsOrg = this.props.user.followed_orgs.find(
        org => org.slug == project.organization.slug
      );
      if (followingProjectsOrg) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  render() {
    if (this.props.loadingPage) {
      return (
        <Layout>
          <Loader />
        </Layout>
      );
    } else if (this.props.loadingSliders) {
      return (
        <Layout>
          {this._renderBannerSlider()}
          {this._renderSliders()}
          <Loader />
        </Layout>
      );
    } else {
      return (
        <Layout>
          {this._renderBannerSlider()}
          {this._renderSliders()}
          <InfiniteScroll
            pageStart={0}
            loadMore={this._loadMoreSliders}
            hasMore={this.props.infiniteData.hasMore}
            loader={<Loader key={"i"} />}
          >
            {this._renderInfiniteSliders()}
          </InfiniteScroll>
          {this.props.infiniteData.hasMore == false ? <div /> : null}
        </Layout>
      );
    }
  }
}

const md = dispatch => {
  return {
    hubSliderQuery: bindActionCreators(hubSliderQuery, dispatch),
    bannerSliderQuery: bindActionCreators(bannerSliderQuery, dispatch),
    followedQuery: bindActionCreators(followedQuery, dispatch),
    staticCampaignQuery: bindActionCreators(staticCampaignQuery, dispatch),
    localQuery: bindActionCreators(localQuery, dispatch),
    auth: bindActionCreators(auth, dispatch),
    setModal: bindActionCreators(setModal, dispatch),
    disableLoadingIndication: bindActionCreators(
      disableLoadingIndication,
      dispatch
    )
  };
};

const ms = store => {
  const {
    globalReducer: {
      sliders,
      infiniteSliders,
      infiniteData,
      user,
      loadingPage,
      loadingSliders,
      modalData,
      bannerSlider
    }
  } = store;
  return {
    sliders,
    bannerSlider,
    infiniteSliders,
    infiniteData,
    user,
    loadingSliders,
    loadingPage,
    modalData
  };
};

export default withRedux(initStore, ms, md)(Hub);
