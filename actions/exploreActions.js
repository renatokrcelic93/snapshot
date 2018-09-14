import { request, request2 } from "../utility/Request";
import config from "../config";
import moment from "moment";

export const addExplorePageInitialProps = initialProps => {
  return async dispatch => {
    return dispatch({
      type: "ADD_EXPLORE_PAGE_INITIAL_PROPS",
      payload: initialProps
    });
  };
};

export const loadMoreExploreProjects = (token, payload) => {
  return async dispatch => {
    try {
      payload.infiniteExploreProjectsData.page++;
      let getProjects;
      if (payload.category) {
        const slug = payload.category.slug;
        getProjects = await request2(
          token,
          config.endpoints.LOCAL_PROJECTS_BY_CATEGORIES_URL +
            `/${slug}?lat=${payload.geolocation[0]}&lon=${
              payload.geolocation[1]
            }&page[size]=16&page[number]=${
              payload.infiniteExploreProjectsData.page
            }`
        );
      } else {
        // in case of explore/all
        getProjects = await request2(
          token,
          config.endpoints.LOCAL_PROJECTS_URL +
            `?lat=${payload.geolocation[0]}&lon=${
              payload.geolocation[1]
            }&page[size]=16&page[number]=${
              payload.infiniteExploreProjectsData.page
            }`
        );
      }
      const projects = [];
      getProjects.data.data.map(project => {
        const { anytime, anywhere, thumb, next_happening } = project;
        // project.orgName = project.organization.name
        // project.projectTime = anytime ? 'Anytime' : moment(next_happening ? next_happening.starts_at : '').format("ddd, MMM D")
        // project.thumb = thumb ? thumb.urls.s : ''
        projects.push(project);
      });
      let hasMore;
      if (
        getProjects.data.meta.current_page == getProjects.data.meta.last_page
      ) {
        hasMore = false;
      } else {
        hasMore = true;
      }
      payload.infiniteExploreProjectsData.hasMore = hasMore;
      return dispatch({
        type: "ADD_EXPLORE_PROJECTS",
        payload: {
          infiniteExploreProjectsData: payload.infiniteExploreProjectsData,
          projects
        }
      });
    } catch (error) {
      return console.log("error loading more explore projects", error);
    }
  };
};
