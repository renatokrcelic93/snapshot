import React from "react";
import { initStore } from "../store";
import withRedux from "next-redux-wrapper";
import config from "../config";
import { getCookie } from "../utility/cookieHandler";
import { auth, addOrgPageInitialProps } from "../actions";
import { request, request2 } from "../utility/Request";
import moment from "moment";

import OrgComponent from "../components/Organization";

class OrgPage extends React.Component {
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

    const initialProps = {};

    // get Org data
    let entityGet = {};
    try {
      entityGet = await request2(
        token,
        config.endpoints.GET_ORG_URL + `/${slug}`
      );
      // entityGet = await request(token, {_id:id}, config.endpoints.ENTITY_GET_URL)
    } catch (e) {
      return console.log("error laoding org", e);
    }
    // const entityGet = await request(token, {_id:id}, config.endpoints.ENTITY_GET_URL)
    // const entityD = entityGet.data.dictionary
    const organization = entityGet.data.data;
    // const organization = entityD[entityGet.data.result]
    initialProps.org = {};
    initialProps.org.organization = { ...organization };

    initialProps.org.logo = organization.logo ? organization.logo.urls.s : "";
    // initialProps.org.cover = entityD[organization.cover] ? entityD[organization.cover].url.s : ''
    // initialProps.org.avatar = entityD[organization.avatar] ? entityD[organization.avatar].url.s : ''

    // get Campaigns data
    let entityGetCampaigns = {};
    try {
      entityGetCampaigns = await request2(
        token,
        config.endpoints.GET_ORG_CAMPAIGNS_URL + `/${slug}/campaigns`
      );
    } catch (e) {
      return console.log("error laoding campaigns", e);
    }
    initialProps.org.campaigns = [];
    entityGetCampaigns.data.data.map(campaign => {
      campaign.cover = campaign.cover ? campaign.cover.urls.s : "";
      initialProps.org.campaigns.push(campaign);
    });

    // get Project data
    let getProjects = {};
    try {
      getProjects = await request2(
        token,
        config.endpoints.GET_ORG_PROJECTS_URL + `/${slug}/projects?page[size]=6`
      );
    } catch (e) {
      return console.log("error laoding projects", e);
    }
    const projects = [];
    getProjects.data.data.map(project => {
      // const {anytime, anywhere, thumb, next_happening} = project
      // project.orgName = project.organization.name
      // project.projectTime = anytime ? 'Anytime' : moment(next_happening.starts_at).format("ddd, MMM D")
      // project.thumb = thumb ? thumb.urls.s : ''
      projects.push(project);
    });
    initialProps.org.projects = [...projects];

    // check if has more projects for infinite loading
    let hasMoreProjects;
    if (getProjects.data.meta.current_page == getProjects.data.meta.last_page) {
      hasMoreProjects = false;
    } else {
      hasMoreProjects = true;
    }
    initialProps.org.infiniteOrgProjectsData = {
      hasMore: hasMoreProjects,
      page: 1
    };

    // dipatch data to store, Org components gets data by querying the store directly
    store.dispatch(addOrgPageInitialProps(initialProps));

    // need to return something
    return { SSR: "done" };
  }
  componentDidMount() {
    document.addEventListener("gesturestart", function(e) {
      e.preventDefault();
    });
  }
  render() {
    return <OrgComponent />;
  }
}

export default withRedux(initStore, null)(OrgPage);
