import { request } from "../utility/Request";
import config from "../config";
import moment from "moment";

export const addUserPageInitialProps = initialProps => {
  return async dispatch => {
    return dispatch({
      type: "ADD_USER_PAGE_INITIAL_PROPS",
      payload: initialProps
    });
  };
};

export const loadMoreUserProjects = (token, user) => {
  return async dispatch => {
    try {
      user.infiniteUserProjectsData.page++;
      const data = await request(
        token,
        {
          _id: user._id,
          status: "PAST",
          limit: 6,
          page: user.infiniteUserProjectsData.page
        },
        config.endpoints.USER_GET_PARTICIPANT_OF_URL
      );
      const projectD = data.data.dictionary;
      const r = data.data.result;
      const pages = data.data.extras.pages;
      const projects = [];
      let hasMore = false;
      r.map(id => {
        const project = projectD[id];
        project.orgName = projectD[project.author.entity[0]].name;
        project.projectTime = project.flags
          ? project.flags.includes("ANYTIME")
            ? "Anytime"
            : moment(project.time_start_str).format("ddd, MMM D")
          : moment(project.time_start_str).format("ddd, MMM D");
        project.thumb = project.thumb ? projectD[project.thumb].url.s : "";
        projects.push(project);
      });
      if (user.infiniteUserProjectsData.page == pages - 1) {
        hasMore = false;
      } else {
        hasMore = true;
      }
      user.infiniteUserProjectsData.hasMore = hasMore;
      return dispatch({
        type: "ADD_USER_PROJECTS",
        payload: {
          infiniteUserProjectsData: user.infiniteUserProjectsData,
          projects
        }
      });
    } catch (error) {
      return console.log("error loading more user projects", error);
    }
  };
};
