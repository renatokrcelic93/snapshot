import config from "../config";
import { getCookie } from "../utility/cookieHandler";
import { request, request2 } from "../utility/Request";

export const search2 = query => {
  return async dispatch => {
    const stats = await request2(
      null,
      config.endpoints.SEARCH_STATISTICS_URL + `?query=${query}`
    );
    const mappedStats = {
      projects: stats.data.projects,
      orgs: stats.data.organizations,
      campaigns: stats.data.campaigns
    };

    const projectResults = await request2(
      null,
      config.endpoints.PROJECT_SEARCH_URL +
        `/project?query=${query}&page[size]=25&page[number]=1`
    );
    const projectSilderData = {
      ...projectResults.data,
      sliderTitle: `Projects (${mappedStats.projects})`,
      sliderType: "project"
    };
    const projectsData = projectResults.data.data;
    const infiniteProjectsData = {
      hasMore: false,
      page: 1
    };
    let hasMoreProjects;
    if (
      projectResults.data.meta.current_page ==
        projectResults.data.meta.last_page ||
      infiniteProjectsData.page == projectResults.data.meta.last_page
    ) {
      hasMoreProjects = false;
    } else {
      hasMoreProjects = true;
    }
    infiniteProjectsData.hasMore = hasMoreProjects;
    infiniteProjectsData.query = query;

    const campaignResults = await request2(
      null,
      config.endpoints.CAMPAIGN_SEARCH_URL +
        `/campaign?query=${query}&page[size]=25&page[number]=1`
    );
    const campaignSliderData = {
      ...campaignResults.data,
      sliderTitle: `Cammpaigns (${mappedStats.campaigns})`,
      sliderType: "campaign"
    };
    const campaignsData = campaignResults.data.data;
    const infiniteCampaignsData = {
      hasMore: false,
      page: 1
    };
    let hasMoreCampaigns;
    if (
      campaignResults.data.meta.current_page ==
        campaignResults.data.meta.last_page ||
      infiniteCampaignsData.page == campaignResults.data.meta.last_page
    ) {
      hasMoreCampaigns = false;
    } else {
      hasMoreCampaigns = true;
    }
    infiniteCampaignsData.hasMore = hasMoreCampaigns;
    infiniteCampaignsData.query = query;

    const orgResults = await request2(
      null,
      config.endpoints.ORG_SEARCH_URL +
        `/organization?query=${query}&page[size]=25&page[number]=1`
    );
    const orgSliderData = {
      ...orgResults.data,
      sliderTitle: `Organizations (${mappedStats.orgs})`,
      sliderType: "org"
    };
    const orgsData = orgResults.data.data;
    const infiniteOrgsData = {
      hasMore: false,
      page: 1
    };
    let hasMoreOrgs;
    if (
      orgResults.data.meta.current_page == orgResults.data.meta.last_page ||
      infiniteOrgsData.page == orgResults.data.meta.last_page
    ) {
      hasMoreOrgs = false;
    } else {
      hasMoreOrgs = true;
    }
    infiniteOrgsData.hasMore = hasMoreOrgs;
    infiniteOrgsData.query = query;
    const sliderData = [campaignSliderData, projectSilderData, orgSliderData];
    dispatch({
      type: "LOAD_SEARCH_RESULTS",
      payload: {
        projectsData,
        infiniteProjectsData,
        campaignsData,
        infiniteCampaignsData,
        orgsData,
        infiniteOrgsData
      }
    });
    return dispatch({ type: "LOAD_SEARCH_SLIDERS", payload: sliderData });
  };
};

export const searchMoreProjects = infiniteProjectsData => {
  return async dispatch => {
    try {
      infiniteProjectsData.page++;
      const projectResults = await request2(
        null,
        config.endpoints.PROJECT_SEARCH_URL +
          `/project?query=${
            infiniteProjectsData.query
          }&page[size]=25&page[number]=${infiniteProjectsData.page}`
      );
      const projectsData = projectResults.data.data;
      let hasMoreProjects;
      if (
        projectResults.data.meta.current_page ==
          projectResults.data.meta.last_page ||
        infiniteProjectsData.page == projectResults.data.meta.last_page
      ) {
        hasMoreProjects = false;
      } else {
        hasMoreProjects = true;
      }
      infiniteProjectsData.hasMore = hasMoreProjects;
      return dispatch({
        type: "LOAD_MORE_SEARCH_PROJECTS",
        payload: { projectsData, infiniteProjectsData }
      });
    } catch (err) {
      console.log(`error in load more search projects`, err);
    }
  };
};

export const searchMoreCampaigns = infiniteCampaignsData => {
  return async dispatch => {
    try {
      infiniteCampaignsData.page++;
      const campaignResults = await request2(
        null,
        config.endpoints.CAMPAIGN_SEARCH_URL +
          `/campaign?query=${
            infiniteCampaignsData.query
          }&page[size]=25&page[number]=${infiniteCampaignsData.page}`
      );
      const campaignsData = campaignResults.data.data;
      let hasMoreCampaigns;
      if (
        campaignResults.data.meta.current_page ==
          campaignResults.data.meta.last_page ||
        infiniteCampaignsData.page == campaignResults.data.meta.last_page
      ) {
        hasMoreCampaigns = false;
      } else {
        hasMoreCampaigns = true;
      }
      infiniteCampaignsData.hasMore = hasMoreCampaigns;
      return dispatch({
        type: "LOAD_MORE_SEARCH_CAMPAIGNS",
        payload: { campaignsData, infiniteCampaignsData }
      });
    } catch (err) {
      console.log(`error in load more search campaigns`, err);
    }
  };
};

export const searchMoreOrgs = infiniteOrgsData => {
  return async dispatch => {
    try {
      infiniteOrgsData.page++;
      const orgResults = await request2(
        null,
        config.endpoints.ORG_SEARCH_URL +
          `/organization?query=${
            infiniteOrgsData.query
          }&page[size]=25&page[number]=${infiniteOrgsData.page}`
      );
      const orgsData = orgResults.data.data;
      let hasMoreOrgs;
      if (
        orgResults.data.meta.current_page == orgResults.data.meta.last_page ||
        infiniteOrgsData.page == orgResults.data.meta.last_page
      ) {
        hasMoreOrgs = false;
      } else {
        hasMoreOrgs = true;
      }
      infiniteOrgsData.hasMore = hasMoreOrgs;
      return dispatch({
        type: "LOAD_MORE_SEARCH_ORGS",
        payload: { orgsData, infiniteOrgsData }
      });
    } catch (err) {
      console.log(`error in load more search orgs`, err);
    }
  };
};

export const search = (
  searchQuery,
  activeTab,
  otherTabs,
  inifiniteItemListData
) => {
  return async dispatch => {
    const token = getCookie("token");
    const stats = await searchStats(token, searchQuery);

    let activeResultData;
    try {
      activeResultData = await requests[activeTab](
        token,
        searchQuery,
        inifiniteItemListData[activeTab]
      );
      dispatch({
        type: "ADD_SEARCH_RESULTS",
        payload: {
          tab: activeTab,
          data: {
            list: activeResultData.list,
            inifiniteItemListData: activeResultData.inifiniteItemListData,
            searchStats: stats
          }
        }
      });
    } catch (err) {
      console.log(`error in search ${activeTab}`, err);
    }
    return await Promise.all(
      otherTabs.map(async tab => {
        let otherResultData;
        try {
          otherResultData = await requests[tab](
            token,
            searchQuery,
            inifiniteItemListData[tab]
          );
          return dispatch({
            type: "ADD_SEARCH_RESULTS",
            payload: {
              tab: tab,
              data: {
                list: otherResultData.list,
                inifiniteItemListData: otherResultData.inifiniteItemListData,
                searchStats: stats
              }
            }
          });
        } catch (err) {
          return console.log(`error in search ${tab}`, err);
        }
      })
    );
  };
};
export const loadMoreItems = (
  searchQuery,
  activeTab,
  inifiniteItemListData
) => {
  return async dispatch => {
    const token = getCookie("token");
    inifiniteItemListData[activeTab].page++;
    let infiniteResultData;
    try {
      infiniteResultData = await requests[activeTab](
        token,
        searchQuery,
        inifiniteItemListData[activeTab]
      );
      return dispatch({
        type: "ADD_MORE_SEARCH_RESULTS",
        payload: {
          tab: activeTab,
          data: {
            list: infiniteResultData.list,
            inifiniteItemListData: infiniteResultData.inifiniteItemListData
          }
        }
      });
    } catch (err) {
      return console.log(`error in search infinite ${activeTab}`, err);
    }
  };
};

const searchStats = async (token, searchQuery) => {
  const res = await request2(
    token,
    config.endpoints.SEARCH_STATISTICS_URL + `?query=${searchQuery}`
  );
  const stats = res.data;
  const mappedStats = {
    Projects: stats.projects,
    Organizations: stats.organizations,
    Campaigns: stats.campaigns
  };
  return mappedStats;
};

const projectSearch = async (token, searchQuery, inifiniteItemListData) => {
  const res = await request2(
    token,
    config.endpoints.PROJECT_SEARCH_URL +
      `/project?query=${searchQuery}&page[size]=25&page[number]=${
        inifiniteItemListData.page
      }`
  );
  const r = res.data.data;
  let hasMore;
  const list = r.map(project => {
    const listItem = {};
    listItem.image = project.thumb ? project.thumb.urls.s : "";
    listItem.title = project.name;
    listItem.text =
      project.address && project.address.formatted_short
        ? project.address.formatted_short
        : "";
    listItem.href = "/project/" + project.slug;
    return listItem;
  });
  if (
    res.data.meta.current_page == res.data.meta.last_page ||
    inifiniteItemListData.page == res.data.meta.last_page
  ) {
    hasMore = false;
  } else {
    hasMore = true;
  }
  inifiniteItemListData.hasMore = hasMore;
  const data = {
    list,
    inifiniteItemListData
  };
  return data;
};
const campaignSearch = async (token, searchQuery, inifiniteItemListData) => {
  const res = await request2(
    token,
    config.endpoints.CAMPAIGN_SEARCH_URL +
      `/campaign?query=${searchQuery}&page[size]=25&page[number]=${
        inifiniteItemListData.page
      }`
  );
  const r = res.data.data;
  let hasMore;
  const list = r.map(campaign => {
    const listItem = {};
    listItem.image = campaign.cover ? campaign.cover.urls.s : "";
    listItem.title = campaign.name;
    listItem.text =
      campaign.address && campaign.address.formatted_short
        ? campaign.address.formatted_short
        : "";
    listItem.href = "/campaign/" + campaign.slug;
    return listItem;
  });
  if (
    res.data.meta.current_page == res.data.meta.last_page ||
    inifiniteItemListData.page == res.data.meta.last_page
  ) {
    hasMore = false;
  } else {
    hasMore = true;
  }
  inifiniteItemListData.hasMore = hasMore;
  const data = {
    list,
    inifiniteItemListData
  };
  return data;
};

const organizationSearch = async (
  token,
  searchQuery,
  inifiniteItemListData
) => {
  const res = await request2(
    token,
    config.endpoints.ORG_SEARCH_URL +
      `/organization?query=${searchQuery}&page[size]=25&page[number]=${
        inifiniteItemListData.page
      }`
  );
  const r = res.data.data;
  let hasMore;
  const list = r.map(org => {
    const listItem = {};
    listItem.image = org.logo ? org.logo.urls.s : "";
    listItem.title = org.name;
    listItem.text =
      org.address && org.address.formatted_short
        ? org.address.formatted_short
        : "";
    listItem.href = "/org/" + org.slug;
    return listItem;
  });
  if (
    res.data.meta.current_page == res.data.meta.last_page ||
    inifiniteItemListData.page == res.data.meta.last_page
  ) {
    hasMore = false;
  } else {
    hasMore = true;
  }
  inifiniteItemListData.hasMore = hasMore;
  const data = {
    list,
    inifiniteItemListData
  };
  return data;
};

const requests = {
  Projects: projectSearch,
  Campaigns: campaignSearch,
  Organizations: organizationSearch
};
