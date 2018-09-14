import React from "react";
import withRedux from "next-redux-wrapper";
import Parser from "html-react-parser";
import moment from "moment-timezone";
import { initStore } from "../store";
import { auth, addProjectPageInitialProps } from "../actions";
import { getCookie } from "../utility/cookieHandler";
import { request, request2 } from "../utility/Request";
import config from "../config";
import ProjectComponent from "../components/Project";
import { onlyUnique } from "../utility/onlyUnique";

import Head from "next/head";

class ProjectPage extends React.Component {
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

    // get Project data
    const eventGet = await request2(
      token,
      config.endpoints.GET_PROJECT_URL + `/${slug}`
    );
    console.log("event", eventGet);
    const initialProps = {};

    const project = eventGet.data.data;
    initialProps.project = { ...project };
    // ADDRESS
    let project_formatted_address = "";
    try {
      project_formatted_address = project.address.formatted_address;
    } catch (error) {}

    // NEXT SERVING DATE
    const next_happening = project.next_happening
      ? project.next_happening
      : null;

    // GOOGLE MAPS LINK of NEXT HAPPENING
    let maps_link = "";
    try {
      maps_link = `https://maps.google.com/maps/dir//${initialProps.project.coordinates.coordinates
        .reverse()
        .join(",")}`;
    } catch (error) {}
    if (next_happening) {
      initialProps.project.next_happening = {};
      initialProps.project.next_happening.date = moment
        .utc(next_happening.starts_at)
        .tz(
          project.address.timezone
            ? project.address.timezone
            : "America/Chicago"
        )
        .format("ddd, MMM D");
      initialProps.project.next_happening.time =
        moment
          .utc(next_happening.starts_at)
          .tz(
            project.address.timezone
              ? project.address.timezone
              : "America/Chicago"
          )
          .format("hh:mm A") +
        " - " +
        moment
          .utc(next_happening.ends_at)
          .tz(
            project.address.timezone
              ? project.address.timezone
              : "America/Chicago"
          )
          .format("hh:mm A");
      initialProps.project.next_happening.address = project_formatted_address;
      initialProps.project.next_happening.venue = project.venue;
      initialProps.project.next_happening.maps_link = maps_link;
    }

    // AUTHOR

    initialProps.author = {};
    initialProps.author.org = project.organization;
    initialProps.author.avatar = project.organization.logo
      ? project.organization.logo.urls.s
      : "";
    initialProps.author.link = `/org/${project.organization.slug}`;

    // CAMPAIGNS
    initialProps.project.campaigns = [];
    if (project.campaigns) {
      project.campaigns.map(c => {
        const campaign = c;
        let logo = "";
        try {
          logo = campaign.logo.urls.s;
        } catch (e) {}
        campaign.logo = logo;
        initialProps.project.campaigns.push(campaign);
      });
    }

    // CONTACT
    let contact_href = "";
    try {
      contact_href = `mailto:${
        project.organization.email
      }?subject=${encodeURIComponent(project.name)}`;
    } catch (error) {}
    initialProps.project.contact_href = contact_href;

    // SLIDER IMAGES
    initialProps.project.sliderImages = [];
    if (project.media) {
      project.media.map(item => {
        const image = item.urls.s;
        initialProps.project.sliderImages.push(image);
      });
    }

    // DESCRIPTION
    initialProps.project.detailsObject = {};
    initialProps.project.detailsObject.text = initialProps.project.description
      ? initialProps.project.description
      : null;
    initialProps.project.detailsObject.details = project.details
      ? Parser(project.details)
      : null;
    initialProps.project.detailsObject.roles = initialProps.project.roles
      ? initialProps.project.roles.map(role => role.name).filter(onlyUnique)
      : null;
    initialProps.project.detailsObject.categories = initialProps.project
      .categories
      ? initialProps.project.categories.map(category => category.name)
      : null;
    initialProps.project.detailsObject.categories.push(
      `Age ${project.age_limit}+`
    );

    // PROJECT TYPEt
    let projectType;
    if (project.anytime && project.anywhere) {
      projectType = "ANYTIME_ANYWHERE";
    } else if (project.anytime) {
      projectType = "ANYTIME";
    } else if (project.anywhere) {
      projectType = "ANYWHERE";
    } else {
      projectType = null;
    }
    initialProps.project.projectType = projectType;

    initialProps.project.updates = [...project.updates];
    let hasMoreUpdates = false;

    initialProps.project.infiniteUpdatesData = {
      hasMore: hasMoreUpdates,
      page: 1
    };

    // get Serving Dates data
    const eventServingDates = await request2(
      token,
      config.endpoints.GET_PROJECT_HAPPENINGS_URL +
        `/${slug}/happenings?page[size]=6`
    );
    initialProps.project.servingDates = [...eventServingDates.data.data];

    // check if has more serving dates for infinite loading
    let hasMoreServingDates;
    if (
      eventServingDates.data.meta.current_page ==
      eventServingDates.data.meta.last_page
    ) {
      hasMoreServingDates = false;
    } else {
      hasMoreServingDates = true;
    }
    initialProps.project.infiniteServingDatesData = {
      hasMore: hasMoreServingDates,
      page: 1
    };

    // dipatch data to store, Project components gets data by querying the store directly
    store.dispatch(addProjectPageInitialProps(initialProps));

    // need to return something
    return { initialProps };
  }
  componentDidMount() {
    document.addEventListener("gesturestart", function(e) {
      e.preventDefault();
    });
  }

  //
  // Self.first.head["title"] = `<title>${entity.name}</title>`;
  //                       Self.first.head["og:title"] = `<meta property="og:title" content="${entity.name}" />`;
  //                       Self.first.head["og:url"] = `<meta property="og:url" content="${APP.env.domain}/campaign/${entity._name}" />`;
  //                       Self.first.head["og:description"] = `<meta property="og:description" content="${entity.text}" />`;
  //                       Self.first.head["og:type"] = `<meta property="og:type" content="article" />`;
  //                       Self.first.head["og:updated_time"] = `<meta property="og:updated_time" content="${entity.ts_update}" />`;
  //                       Self.first.head["og:image"] = `<meta property="og:image" content="${thumb}" />`;
  //                       Self.first.head["og:image:width"] = `<meta property="og:image:width" content="450" />`;
  //                       Self.first.head["og:image:height"] = `<meta property="og:image:height" content="298" />`;
  render() {
    const {
      description,
      slug,
      name,
      updated_at,
      thumb
    } = this.props.initialProps.project;
    const url = `${config.ROOT_URL}/project/${slug}`;
    return (
      <div>
        <Head>
          <title>{name}</title>
          <meta property="og:description" content={description} />
          <meta property="og:url" content={url} />
          <meta property="og:type" content="article" />
          <meta property="og:updated_time" content={updated_at} />
          <meta property="og:image" content={thumb ? thumb.urls.s : ""} />
          <meta property="og:image:width" content="450" />
          <meta property="og:image:height" content="298" />
        </Head>
        <ProjectComponent />
      </div>
    );
  }
}
export default withRedux(initStore, null)(ProjectPage);
