import React from "react";
import withRedux from "next-redux-wrapper";
import Parser from "html-react-parser";
import moment from "moment";
import { initStore } from "../store";
import { auth, addExplorePageInitialProps } from "../actions";
import { getCookie } from "../utility/cookieHandler";
import { request, request2, request3 } from "../utility/Request";
import config from "../config";
import ExploreComponent from "../components/Explore";

class ExplorePage extends React.Component {
  static async getInitialProps(context) {
    const {
      query: { slug },
      isServer,
      req,
      res,
      store
    } = context;

    // try to get token
    let token;
    let geolocation;
    if (isServer) {
      geolocation = req.cookies.geolocation
        ? JSON.parse(req.cookies.geolocation)
        : null;

      if (geolocation) {
        // if geolocation object is not IP based, it will have a geometry prop
        if (geolocation.geometry) {
          // parse lat lng to array for query data of projects below
          geolocation.geolocation = [
            geolocation.geometry.location.lat,
            geolocation.geometry.location.lng
          ];
        }
      } else {
        // if there is not token try to get geo from server side ip geolocation
        geolocation = res.geolocation ? res.geolocation : null;
      }
      token = req.cookies.token;
    } else {
      geolocation = (await getCookie("geolocation"))
        ? JSON.parse(await getCookie("geolocation"))
        : null;
      if (geolocation) {
        // if geolocation object is not IP based, it will have a geometry prop
        if (geolocation.geometry) {
          // parse lat lng to array for query data of projects below
          geolocation.geolocation = [
            geolocation.geometry.location.lat,
            geolocation.geometry.location.lng
          ];
        }
      } else {
        geolocation = null;
      }
      token = getCookie("token");
    }

    // try to auth user by token
    if (token) {
      if (!store.getState().globalReducer.user) {
        await store.dispatch(auth(token));
      }
    }

    const initialProps = {};
    initialProps.geolocation = { ...geolocation };

    const featured = await request3(null, config.endpoints.GET_FEATURED_ITEMS);
    initialProps.featuredOrgs = null;
    initialProps.featuredProjects = null;

    // get Categories data
    const categoriesGet = await request2(
      token,
      config.endpoints.GET_CATEGORIES_URL2
    );
    const categories = categoriesGet.data.data;
    initialProps.categories = { ...categories };

    const category = categories.filter(k => k.slug === slug)[0];
    initialProps.category = category;
    // get Banner data
    initialProps.bannerData = [];
    if (category) {
      category.banners.map(banner => {
        initialProps.bannerData.push({
          image: banner.urls.s,
          meta: banner.meta
        });
      });
      initialProps.featuredOrgs = featured.data[category.slug]
        ? featured.data[category.slug].orgs
        : null;
      initialProps.featuredProjects = featured.data[category.slug]
        ? featured.data[category.slug].projects
        : null;
    }

    // get Project data
    let getProjects = {};
    const queryData = {
      categories: [category],
      limit: 6,
      page: 0
    };
    if (geolocation) {
      queryData.geolocation = geolocation.geolocation;
    }
    if (slug == "all") {
      try {
        getProjects = await request2(
          token,
          config.endpoints.LOCAL_PROJECTS_URL +
            `?lat=${geolocation ? geolocation.geolocation[0] : ""}&lon=${
              geolocation ? geolocation.geolocation[1] : ""
            }&page[size]=16`
        );
        const projects = [];
        getProjects.data.data.map(project => {
          const { anytime, anywhere, thumb, next_happening } = project;
          // project.orgName = project.organization.name
          // project.projectTime = anytime ? 'Anytime' : moment(next_happening ? next_happening.starts_at : '').format("ddd, MMM D")
          // project.thumb = thumb ? thumb.urls.s : ''
          projects.push(project);
        });
        initialProps.projects = [...projects];
      } catch (e) {
        return console.log("error laoding projects", e);
      }
    } else {
      try {
        getProjects = await request2(
          token,
          config.endpoints.LOCAL_PROJECTS_BY_CATEGORIES_URL +
            `/${slug}?lat=${
              geolocation ? geolocation.geolocation[0] : ""
            }&lon=${
              geolocation ? geolocation.geolocation[1] : ""
            }&page[size]=16`
        );
        const projects = [];
        getProjects.data.data.map(project => {
          const { anytime, anywhere, thumb, next_happening } = project;
          // project.orgName = project.organization.name
          // project.projectTime = anytime ? 'Anytime' : moment(next_happening ? next_happening.starts_at : '').format("ddd, MMM D")
          // project.thumb = thumb ? thumb.urls.s : ''
          projects.push(project);
        });
        initialProps.projects = [...projects];
      } catch (e) {
        return console.log("error laoding projects", e);
      }
    }

    // check if has more projects for infinite loading
    let hasMoreProjects;
    if (getProjects.data.meta.current_page == getProjects.data.meta.last_page) {
      hasMoreProjects = false;
    } else {
      hasMoreProjects = true;
    }
    initialProps.infiniteExploreProjectsData = {
      hasMore: hasMoreProjects,
      page: 1
    };

    // dipatch data to store, Campaign components gets data by querying the store directly
    store.dispatch(addExplorePageInitialProps(initialProps));

    // need to return something
    return { SSR: "done" };
  }
  componentDidMount() {
    document.addEventListener("gesturestart", function(e) {
      e.preventDefault();
    });
  }
  render() {
    return <ExploreComponent />;
  }
}
export default withRedux(initStore, null)(ExplorePage);
