import { request, request2 } from "../utility/Request";
import config from "../config";
import moment from "moment";

export const addCampaignPageInitialProps = initialProps => {
  return async dispatch => {
    return dispatch({
      type: "ADD_CAMPAIGN_PAGE_INITIAL_PROPS",
      payload: initialProps
    });
  };
};

// TODO tesztelni minimum 3 projektes campaignnal
export const loadMoreCampaignProjects = (
  token,
  queryData,
  infiniteCampaignProjectsData
) => {
  return async dispatch => {
    try {
      infiniteCampaignProjectsData.page++;
      const slug = queryData.campaign.slug;
      const getProjects = await request2(
        token,
        config.endpoints.GET_CAMPAIGN_PROJECTS_URL +
          `/${slug}/projects?page[size]=6&page[number]=${
            infiniteCampaignProjectsData.page
          }`
      );
      const projects = [];
      getProjects.data.data.map(project => {
        const { anytime, anywhere, thumb, next_happening } = project;
        project.orgName = project.organization.name;
        project.projectTime = anytime
          ? "Anytime"
          : moment(next_happening ? next_happening.starts_at : "").format(
              "ddd, MMM D"
            );
        project.thumb = thumb ? thumb.urls.s : "";
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
      infiniteCampaignProjectsData.hasMore = hasMore;
      return dispatch({
        type: "ADD_CAMPAIGN_PROJECTS",
        payload: {
          infiniteCampaignProjectsData: infiniteCampaignProjectsData,
          projects
        }
      });
    } catch (error) {
      return console.log("error loading more campaign projects", error);
    }
  };
};

export const filterCampaignPageProjects = (token, queryData) => {
  return async dispatch => {
    try {
      queryData.page = 0;
      const data = await request(
        token,
        { ...queryData },
        config.endpoints.EVENT_SEARCH_URL
      );
      const projectD = data.data.dictionary;
      const r = data.data.result;
      const pages = data.data.extras.pages;
      const projects = [];
      let hasMore = false;
      r.map(id => {
        const project = projectD[id];
        project.orgName = projectD[project.author.entity[0]].name;
        if (project.flags.includes("ANYTIME")) {
          project.projectTime = "Anytime";
        } else {
          project.projectTime = moment(project.time_start_str).format(
            "ddd, MMM D"
          );
        }
        project.thumb = project.thumb ? projectD[project.thumb].url.s : "";
        projects.push(project);
      });
      let hasMoreProjects;
      const projectPages = data.data.extras.pages;
      if (projectPages <= 1) {
        hasMoreProjects = false;
      } else {
        hasMoreProjects = true;
      }
      //reset infiniteCampaignProjectsData
      const infiniteCampaignProjectsData = {
        hasMore: hasMoreProjects,
        page: 1
      };
      return dispatch({
        type: "FILTER_CAMPAIGN_PROJECTS",
        payload: {
          infiniteCampaignProjectsData: infiniteCampaignProjectsData,
          projects
        }
      });
    } catch (error) {
      return console.log("error filtering explore projects", error);
    }
  };
};
