import config from "../config";
import { getCookie } from "../utility/cookieHandler";
import { request, request2 } from "../utility/Request";
import { onlyUnique } from "../utility/onlyUnique";
import moment from "moment";

export const follow = (entity, token) => {
  return async dispatch => {
    try {
      const slug = entity.slug;
      const resp = await request2(
        token,
        config.endpoints.FOLLOW_ORG_URL + `/${slug}/follow`,
        null,
        "post"
      );
      return;
    } catch (err) {
      console.log("error when trying to follow", err);
      return;
    }
  };
};
export const unfollow = (entity, token) => {
  return async dispatch => {
    try {
      const slug = entity.slug;
      const resp = await request2(
        token,
        config.endpoints.FOLLOW_ORG_URL + `/${slug}/unfollow`,
        null,
        "post"
      );
      return;
    } catch (err) {
      console.log("error when trying to unfollow", err);
      return;
    }
  };
};

export const acceptInvitation = (verification_token, token) => {
  return async dispatch => {
    try {
      const resp = await request2(
        token,
        config.endpoints.ACCEPT_INVITATION_URL +
          `/${verification_token}/accept`,
        null,
        "post"
      );
      return;
    } catch (err) {
      console.log("error when trying to accept inv", err);
      return;
    }
  };
};

export const rejectInvitation = (verification_token, token) => {
  return async dispatch => {
    try {
      const resp = await request2(
        token,
        config.endpoints.REJECT_INVITATION_URL +
          `/${verification_token}/reject`,
        null,
        "post"
      );
      return;
    } catch (err) {
      console.log("error when trying to reject inv", err);
      return;
    }
  };
};

export const addOrgPageInitialProps = initialProps => {
  return async dispatch => {
    return dispatch({
      type: "ADD_ORG_PAGE_INITIAL_PROPS",
      payload: initialProps
    });
  };
};

export const loadMoreOrgProjects = (token, org) => {
  return async dispatch => {
    try {
      org.infiniteOrgProjectsData.page++;
      const getProjects = await request2(
        token,
        config.endpoints.GET_ORG_PROJECTS_URL +
          `/${org.organization.slug}/projects?page[size]=6&page[number]=${
            org.infiniteOrgProjectsData.page
          }`
      );
      const projects = [];
      getProjects.data.data.map(project => {
        // const {anytime, anywhere, thumb, next_happening} = project
        // project.orgName = project.organization.name
        // project.projectTime = anytime ? 'Anytime' : moment(next_happening ? next_happening.starts_at : '').format("ddd, MMM D")
        // project.thumb = thumb ? thumb.urls.s : ''
        projects.push(project);
      });
      let hasMore = false;
      if (
        getProjects.data.meta.current_page == getProjects.data.meta.last_page
      ) {
        hasMore = false;
      } else {
        hasMore = true;
      }
      org.infiniteOrgProjectsData.hasMore = hasMore;
      return dispatch({
        type: "ADD_ORG_PROJECTS",
        payload: {
          infiniteOrgProjectsData: org.infiniteOrgProjectsData,
          projects
        }
      });
    } catch (error) {
      return console.log("error loading more projects", error);
    }
  };
};
