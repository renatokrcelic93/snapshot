import React from "react";
import withRedux from "next-redux-wrapper";
import moment from "moment";
import { initStore } from "../store";
import { auth, addCampaignPageInitialProps } from "../actions";
import { getCookie } from "../utility/cookieHandler";
import { request, request2 } from "../utility/Request";
import config from "../config";
import CampaignComponent from "../components/Campaign";

class CampaignPage extends React.Component {
  static async getInitialProps(context) {
    const {
      query: { slug },
      isServer,
      req,
      store
    } = context;

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

    // get Campaign data
    const campaignGet = await request2(
      token,
      config.endpoints.GET_CAMPAIGN_URL + `/${slug}`
    );

    const initialProps = {};
    const campaign = campaignGet.data.data;
    initialProps.campaign = { ...campaign };
    initialProps.campaign.cover = campaign.cover ? campaign.cover.urls.s : "";

    // get Project data
    let getProjects = {};
    try {
      getProjects = await request2(
        token,
        config.endpoints.GET_CAMPAIGN_PROJECTS_URL +
          `/${slug}/projects?page[size]=6`
      );
      // eventSearch = await request(token, {campaign:id, "categories":[null], limit:6, page:0}, config.endpoints.EVENT_SEARCH_URL)
    } catch (e) {
      return console.log("error laoding projects", e);
    }
    const projects = [];
    getProjects.data.data.map(project => {
      const { anytime, anywhere, thumb, next_happening } = project;
      project.orgName = project.organization.name;
      project.projectTime = anytime
        ? "Anytime"
        : moment(next_happening.starts_at).format("ddd, MMM D");
      project.thumb = thumb ? thumb.urls.s : "";
      projects.push(project);
    });

    initialProps.projects = [...projects];

    // check if has more projects for infinite loading
    let hasMoreProjects;
    if (getProjects.data.meta.current_page == getProjects.data.meta.last_page) {
      hasMoreProjects = false;
    } else {
      hasMoreProjects = true;
    }
    initialProps.infiniteCampaignProjectsData = {
      hasMore: hasMoreProjects,
      page: 1
    };

    // dipatch data to store, Campaign components gets data by querying the store directly
    store.dispatch(addCampaignPageInitialProps(initialProps));

    // need to return something
    return { SSR: "done" };
  }
  componentDidMount() {
    document.addEventListener("gesturestart", function(e) {
      e.preventDefault();
    });
  }
  render() {
    return <CampaignComponent />;
  }
}
export default withRedux(initStore, null)(CampaignPage);
