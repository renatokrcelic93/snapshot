import config from "../config";
import { getCookie } from "../utility/cookieHandler";
import { request, request2 } from "../utility/Request";
import { onlyUnique } from "../utility/onlyUnique";

export const hubSliderQuery = (
  queryParams,
  geolocationData,
  user,
  infiniteData
) => {
  return async dispatch => {
    const token = getCookie("token");
    let categories = await getCategories(token, geolocationData.geolocation);
    let hasMore = false;

    let slidersData = [];

    let categorizedSlider = [];

    if (infiniteData) {
      let breakLoop = false;
      await Promise.all(
        infiniteData.categories.map(async (cat, i) => {
          if (breakLoop == true) {
            return;
          }
          if (i > 2) {
            breakLoop = true;
            return infiniteData.categories.splice(0, i);
          }
          if (i == infiniteData.categories.length - 1) {
            infiniteData.categories = [];
            infiniteData.hasMore = false;
          } else {
            infiniteData.hasMore = true;
          }
          const queryParam = queryParams.find(
            qp => qp.queryType == "categorized"
          );
          queryParam.geolocation = geolocationData.geolocation;
          queryParam.categories = [cat.categoryName];
          try {
            const result = await request2(
              token,
              config.endpoints.LOCAL_PROJECTS_BY_CATEGORIES_URL +
                `/${cat.slug}?lat=${geolocationData.geolocation[0]}&lon=${
                  geolocationData.geolocation[1]
                }`
            );
            const sliderData = {
              ...result.data,
              sliderTitle: cat.name,
              queryType: "categorized",
              cat: cat.slug
            };
            categorizedSlider.push(sliderData);
            return;
          } catch (err) {
            console.log("categorized request error", err);
            return;
          }
        })
      );
      categorizedSlider = categorizedSlider.filter(
        slider => slider.data.length > 0
      );
      return dispatch({
        type: "LOAD_MORE_CATEGORIZED_SLIDERS",
        payload: { categorizedSlider, infiniteData }
      });
    }
    await Promise.all(
      queryParams.map(async queryParam => {
        switch (queryParam.queryType) {
          case "categorized":
            let breakLoop = false;
            return await Promise.all(
              categories.map(async (cat, i) => {
                if (breakLoop == true) {
                  return;
                }
                // if we are past first three items the next batch will be loaded by infinite loading
                if (i > 2) {
                  breakLoop = true;
                  return categories.splice(0, 3);
                }
                if (i == categories.length - 1) {
                  categories = [];
                  hasMore = false;
                } else {
                  hasMore = true;
                }
                try {
                  const result = await request2(
                    token,
                    config.endpoints.LOCAL_PROJECTS_BY_CATEGORIES_URL +
                      `/${cat.slug}?lat=${geolocationData.geolocation[0]}&lon=${
                        geolocationData.geolocation[1]
                      }`
                  );
                  const sliderData = {
                    ...result.data,
                    sliderTitle: cat.name,
                    queryType: "categorized",
                    cat: cat.slug
                  };
                  categorizedSlider.push(sliderData);
                  return;
                } catch (err) {
                  console.log("categorized request error", err);
                  return;
                }
              })
            );
          default:
            return null;
        }
      })
    );

    slidersData = [...categorizedSlider];
    slidersData = slidersData.filter(slider => slider.data.length > 0);
    infiniteData = {
      categories,
      hasMore
    };
    return dispatch({
      type: "LOAD_CATEGORIZED_SLIDERS",
      payload: { slidersData, infiniteData }
    });
  };
};

export const followedQuery = user => {
  return async dispatch => {
    const token = getCookie("token");
    let followedOrgProjectSlider = [];
    let followedOrgCampaignSlider = [];
    let followedOrgs = user ? [...user.followed_orgs] : [];
    let memberships = user ? [...user.membership] : [];

    if (followedOrgs.length > 0 && memberships.length > 0) {
      for (let i = 0; i < followedOrgs.length; i++) {
        for (let j = 0; j < memberships.length; j++) {
          if (followedOrgs[i].slug == memberships[j].slug) {
            followedOrgs.splice(i, 1);
          }
        }
      }
    }

    const merged = [...memberships, ...followedOrgs];

    let mergedForProjects = merged.filter(
      (item, i) => item.active_projects_count > 0
    );
    mergedForProjects.length = 5;
    let mergedForCampaigns = merged.filter(
      (item, i) => item.active_campaigns_count > 0
    );
    mergedForCampaigns.length = 5;

    if (mergedForProjects) {
      await Promise.all(
        mergedForProjects.map(async org => {
          let result = await request2(
            token,
            config.endpoints.FOLLOWED_ORGS_PROJECTS_URL +
              `/${org.slug}/projects`
          );
          const sliderData = {
            ...result.data,
            sliderTitle: `${org.name} projects`,
            queryType: "followed_org_projects",
            org: org.slug
          };
          return followedOrgProjectSlider.push(sliderData);
        })
      );
    }
    if (mergedForCampaigns) {
      await Promise.all(
        mergedForCampaigns.map(async org => {
          let result = await request2(
            token,
            config.endpoints.FOLLOWED_ORGS_CAMPAIGNS_URL +
              `/${org.slug}/campaigns`
          );
          const sliderData = {
            ...result.data,
            sliderTitle: `${org.name} campaigns`,
            queryType: "followed_org_campaigns",
            org: org.slug
          };
          return followedOrgCampaignSlider.push(sliderData);
        })
      );
    }

    return dispatch({
      type: "LOAD_FOLLOWED_SLIDERS",
      payload: [...followedOrgCampaignSlider, ...followedOrgProjectSlider]
    });
  };
};

export const staticCampaignQuery = queryParams => {
  return async dispatch => {
    const token = getCookie("token");

    let doityourselffamilySlider = [];
    let doityourselfkindnessSlider = [];
    let doityourselfstudentsSlider = [];

    await Promise.all(
      queryParams.map(async queryParam => {
        switch (queryParam.queryType) {
          case "static_campaign":
            try {
              const result = await request2(
                token,
                config.endpoints.GET_CAMPAIGN_PROJECTS_URL +
                  `/${queryParam.campaign}/projects?page[size]=25`
              );
              const sliderData = {
                ...result.data,
                campaign: queryParam.campaign,
                sliderTitle: queryParam.sliderTitle,
                queryType: queryParam.queryType
              };
              switch (sliderData.campaign) {
                case "doityourselffamily":
                  doityourselffamilySlider.push(sliderData);
                  break;
                case "doityourselfkindness":
                  doityourselfkindnessSlider.push(sliderData);
                  break;
                case "doityourselfstudents":
                  doityourselfstudentsSlider.push(sliderData);
                  break;
                default:
                  return null;
              }
              return;
            } catch (err) {
              console.log("static campaign request error", err);
              return;
            }
          default:
            return null;
        }
      })
    );

    return dispatch({
      type: "LOAD_STATIC_CAMPAIGN_SLIDERS",
      payload: [
        ...doityourselffamilySlider,
        ...doityourselfkindnessSlider,
        ...doityourselfstudentsSlider
      ].filter(slider => slider.data.length > 0)
    });
  };
};
export const bannerSliderQuery = () => {
  return async dispatch => {
    const token = getCookie("token");
    let sliderData = null;
    try {
      const result = await request2(token, config.endpoints.BANNER_SLIDER_URL);
      sliderData = {
        ...result.data,
        sliderTitle: `None`,
        queryType: "banner"
      };
    } catch (err) {
      console.log("banner request error", err);
    }
    return dispatch({ type: "LOAD_BANNER_SLIDER", payload: sliderData });
  };
};

export const disableLoadingIndication = () => {
  return async dispatch => {
    return dispatch({ type: "DISABLE_LOADING_INDICATION" });
  };
};

export const localQuery = (queryParams, geolocationData) => {
  return async dispatch => {
    const token = getCookie("token");
    let nearbyOrgsSlider = [];
    let localSlider = [];
    await Promise.all(
      queryParams.map(async queryParam => {
        switch (queryParam.queryType) {
          case "nearby_orgs":
            try {
              const result = await request2(
                token,
                config.endpoints.NEARBY_ORGS_URL +
                  `?lat=${geolocationData.geolocation[0]}&lon=${
                    geolocationData.geolocation[1]
                  }`
              );
              const sliderData = {
                data: [...result.data.data, ...result.data.data],
                sliderTitle: queryParam.sliderTitle,
                queryType: queryParam.queryType
              };
              console.log("sliderdata", sliderData);
              nearbyOrgsSlider.push(sliderData);
              return;
            } catch (err) {
              console.log("nearby orgs request error", err);
            }
          case "locals":
            try {
              const result = await request2(
                token,
                config.endpoints.LOCAL_PROJECTS_URL +
                  `?lat=${geolocationData.geolocation[0]}&lon=${
                    geolocationData.geolocation[1]
                  }`
              );

              const sliderData = {
                ...result.data,
                sliderTitle: queryParam.sliderTitle,
                queryType: queryParam.queryType
              };
              localSlider.push(sliderData);
              return;
            } catch (err) {
              console.log("nearby orgs request error", err);
              return;
            }
          default:
            return null;
        }
      })
    );
    return dispatch({
      type: "LOAD_LOCAL_CAMPAIGN_SLIDERS",
      payload: [...nearbyOrgsSlider, ...localSlider].filter(
        slider => slider.data.length > 0
      )
    });
  };
};

const getFollowedOrgs = async (token, user) => {
  if (!user) {
    return;
  }
  const result = await request2(token, config.endpoints.FOLLOWED_ORGS_URL);
  return result.data.data;
};

const getCategories = async (token, geolocation) => {
  const cats = await request2(
    token,
    config.endpoints.LOCAL_CATEGORIES_URL +
      `?lat=${geolocation[0]}&lon=${geolocation[1]}`
  );
  const filteredCats = cats.data.data.filter(cat => cat.projects_count >= 3);
  return filteredCats;
};
