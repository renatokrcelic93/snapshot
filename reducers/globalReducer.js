const initialState = {
  sliders: [],
  bannerSlider: {},
  showSearchInput: false,
  infiniteData: { categories: null, hasMore: false },
  infiniteSliders: [],
  user: null,
  loadingPage: true,
  loadingSliders: true,
  orgPageProjects: [],
  modalData: { content: null, openModal: false, hideClose: false },
  joinProjectData: {
    capacity: Infinity,
    participantsCounter: 1,
    description: "",
    roles: [],
    selectedRole: null,
    project: {},
    servingDate: {},
    volunteerAnswer: ""
  },
  projectPageInitialProps: null,
  orgPageInitialProps: null,
  userPageInitialProps: null,
  userSettingsPageInitialProps: null,
  userSettingsPageError: null,
  headerData: {
    categories: []
  },
  geo: null,
  userNotificationsPageInitialProps: {
    notifications: [],
    infiniteNotificationsData: { hasMore: false, page: 1 }
  },
  campaignPageInitialProps: { campaign: null, categories: [] },
  explorePageInitialProps: {
    bannerData: [],
    projects: [],
    categories: [],
    geolocation: {},
    infiniteExploreProjectsData: { hasMore: false, page: 1 }
  },
  searchSliders: [],
  searchResults: {},
  search: {
    searchResults: {
      Projects: [],
      Organizations: [],
      Campaigns: [],
      Users: []
    },
    searchStats: { Projects: 0, Organizations: 0, Campaigns: 0, Users: 0 },
    inifiniteItemListData: {
      Projects: { page: 1, hasMore: false },
      Organizations: { page: 1, hasMore: false },
      Campaigns: { page: 1, hasMore: false },
      Users: { page: 1, hasMore: false }
    }
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    //hubActions
    case "LOAD_CATEGORIZED_SLIDERS":
      return {
        ...state,
        sliders: [...state.sliders, ...action.payload.slidersData],
        infiniteData: action.payload.infiniteData,
        loadingSliders: false
      };
    case "LOAD_FOLLOWED_SLIDERS":
      return { ...state, sliders: [...state.sliders, ...action.payload] };
    case "LOAD_STATIC_CAMPAIGN_SLIDERS":
      return { ...state, sliders: [...state.sliders, ...action.payload] };
    case "LOAD_LOCAL_CAMPAIGN_SLIDERS":
      return { ...state, sliders: [...state.sliders, ...action.payload] };
    case "LOAD_BANNER_SLIDER":
      return { ...state, bannerSlider: action.payload, loadingPage: false };
    case "LOAD_MORE_CATEGORIZED_SLIDERS":
      return {
        ...state,
        infiniteSliders: [
          ...state.infiniteSliders,
          ...action.payload.categorizedSlider
        ],
        infiniteData: action.payload.infiniteData,
        loading: false
      };
    case "DISABLE_LOADING_INDICATION":
      return { ...state, loadingPage: false, loadingSliders: false };
    // authActions
    case "SET_USER":
      return { ...state, user: action.payload };
    // orgActions
    case "ADD_ORG_PAGE_INITIAL_PROPS":
      return { ...state, orgPageInitialProps: action.payload };
    case "ADD_ORG_PROJECTS":
      return {
        ...state,
        orgPageInitialProps: {
          ...state.orgPageInitialProps,
          org: {
            ...state.orgPageInitialProps.org,
            projects: [
              ...state.orgPageInitialProps.org.projects,
              ...action.payload.projects
            ],
            infiniteOrgProjectsData: action.payload.infiniteOrgProjectsData
          }
        }
      };
    //modalActions
    case "SET_MODAL":
      return { ...state, modalData: action.payload.modalData };
    // searchActions
    case "LOAD_SEARCH_SLIDERS":
      return { ...state, searchSliders: action.payload };
    case "LOAD_SEARCH_RESULTS":
      return { ...state, searchResults: action.payload };
    case "LOAD_MORE_SEARCH_PROJECTS":
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          projectsData: [
            ...state.searchResults.projectsData,
            ...action.payload.projectsData
          ]
        }
      };
    case "LOAD_MORE_SEARCH_CAMPAIGNS":
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          campaignsData: [
            ...state.searchResults.campaignsData,
            ...action.payload.campaignsData
          ]
        }
      };
    case "LOAD_MORE_SEARCH_ORGS":
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          orgsData: [
            ...state.searchResults.orgsData,
            ...action.payload.orgsData
          ]
        }
      };
    // case 'ADD_SEARCH_RESULTS':
    //   return {
    //     ...state,
    //     search: {
    //       ...state.search,
    //       searchResults:{
    //         ...state.search.searchResults,
    //         [action.payload.tab]: action.payload.data.list
    //       },
    //       searchStats: action.payload.data.searchStats,
    //       inifiniteItemListData: {
    //         ...state.search.inifiniteItemListData,
    //         [action.payload.tab]: action.payload.data.inifiniteItemListData
    //       }
    //     }
    //   }
    // case 'ADD_MORE_SEARCH_RESULTS':
    //   return {
    //     ...state,
    //     search: {
    //       ...state.search,
    //       searchResults:{
    //         ...state.search.searchResults,
    //         [action.payload.tab]: [...state.search.searchResults[action.payload.tab], ...action.payload.data.list]
    //       },
    //       inifiniteItemListData: {
    //         ...state.search.inifiniteItemListData,
    //         [action.payload.tab]: action.payload.data.inifiniteItemListData
    //       }
    //     }
    //   }
    // userActions
    case "ADD_USER_PAGE_INITIAL_PROPS":
      return { ...state, userPageInitialProps: action.payload };
    case "ADD_USER_PROJECTS":
      return {
        ...state,
        userPageInitialProps: {
          ...state.userPageInitialProps,
          user: {
            ...state.userPageInitialProps.user,
            projects: [
              ...state.userPageInitialProps.user.projects,
              ...action.payload.projects
            ],
            infiniteUserProjectsData: action.payload.infiniteUserProjectsData
          }
        }
      };

    //notificationsActions
    case "ADD_USER_NOTIFICATIONS_PAGE_INITIAL_PROPS":
      return { ...state, userNotificationsPageInitialProps: action.payload };
    case "ADD_NOTIFICATIONS":
      return {
        ...state,
        userNotificationsPageInitialProps: {
          ...state.userNotificationsPageInitialProps,
          notifications: [
            ...state.userNotificationsPageInitialProps.notifications,
            ...action.payload.notifications
          ],
          infiniteNotificationsData: action.payload.infiniteNotificationsData
        }
      };
    // userSettingsActions
    case "ADD_USER_SETTINGS_PAGE_INITIAL_PROPS":
      return { ...state, userSettingsPageInitialProps: action.payload };
    case "UPDATE_USER_DATA":
      return {
        ...state,
        userSettingsPageInitialProps: {
          ...state.userSettingsPageInitialProps,
          user: {
            ...state.userSettingsPageInitialProps.user,
            ...action.payload
          }
        },
        user: { ...state.user, ...action.payload },
        userSettingsPageError: null
      };
    case "USER_SETTINGS_ERROR":
      return { ...state, userSettingsPageError: action.payload };
    // projectActions
    case "ADD_JOIN_PROJECT_DATA":
      return { ...state, joinProjectData: action.payload };
    case "MOD_PARTICIPANT":
      let guestCounter = state.joinProjectData.guestCounter;
      let participantsCounter = state.joinProjectData.participantsCounter;
      if (action.payload == "add") {
        guestCounter++;
      } else {
        guestCounter--;
      }
      if (action.payload == "add") {
        participantsCounter++;
      } else {
        participantsCounter--;
      }
      return {
        ...state,
        joinProjectData: {
          ...state.joinProjectData,
          participantsCounter,
          guestCounter
        }
      };
    // return {...state, joinProjectData: {...state.joinProjectData, participantsCounter }}
    case "UPDATE_DESCRIPTION":
      return {
        ...state,
        joinProjectData: {
          ...state.joinProjectData,
          description: action.payload
        }
      };
    case "SET_ROLE":
      return {
        ...state,
        joinProjectData: {
          ...state.joinProjectData,
          selectedRole: action.payload
        }
      };
    case "SET_VOLUNTEER_ANSWER":
      return {
        ...state,
        joinProjectData: {
          ...state.joinProjectData,
          volunteerAnswer: action.payload
        }
      };
    case "UPDATE_PROJECT":
      return {
        ...state,
        projectPageInitialProps: {
          ...state.projectPageInitialProps,
          project: {
            ...state.projectPageInitialProps.project,
            // update only the serving date that has changed
            servingDates: state.projectPageInitialProps.project.servingDates.map(
              sd =>
                sd._id == action.payload.servingDate._id
                  ? action.payload.servingDate
                  : sd
            ),
            servingDatesDictionary: action.payload.servingDatesDictionary,
            // update project with response
            ...action.payload.project
          }
        }
      };
    case "UPDATE_SERVING_DATE":
      return {
        ...state,
        projectPageInitialProps: {
          ...state.projectPageInitialProps,
          project: {
            ...state.projectPageInitialProps.project,
            // update only the serving date that has changed
            servingDates: state.projectPageInitialProps.project.servingDates.map(
              sd =>
                sd.id == action.payload.servingDate.id
                  ? action.payload.servingDate
                  : sd
            )
          }
        }
      };
    case "ADD_PROJECT_PAGE_INITIAL_PROPS":
      return { ...state, projectPageInitialProps: action.payload };
    case "PROJECT_LIKE":
      return { ...state, user: action.payload };
    case "ADD_UPDATES":
      return {
        ...state,
        projectPageInitialProps: {
          ...state.projectPageInitialProps,
          project: {
            ...state.projectPageInitialProps.project,
            updates: [
              ...state.projectPageInitialProps.project.updates,
              ...action.payload.updates
            ],
            infiniteUpdatesData: action.payload.infiniteUpdatesData
          }
        }
      };
    case "ADD_SERVING_DATES":
      return {
        ...state,
        projectPageInitialProps: {
          ...state.projectPageInitialProps,
          project: {
            ...state.projectPageInitialProps.project,
            servingDates: [
              ...state.projectPageInitialProps.project.servingDates,
              ...action.payload.servingDates
            ],
            infiniteServingDatesData: action.payload.infiniteServingDatesData
          }
        }
      };
    // campaignActions
    case "ADD_CAMPAIGN_PAGE_INITIAL_PROPS":
      return { ...state, campaignPageInitialProps: action.payload };
    case "ADD_CAMPAIGN_PROJECTS":
      return {
        ...state,
        campaignPageInitialProps: {
          ...state.campaignPageInitialProps,
          projects: [
            ...state.campaignPageInitialProps.projects,
            ...action.payload.projects
          ],
          infiniteCampaignProjectsData:
            action.payload.infiniteCampaignProjectsData
        }
      };
    case "FILTER_CAMPAIGN_PROJECTS":
      return {
        ...state,
        campaignPageInitialProps: {
          ...state.campaignPageInitialProps,
          projects: [...action.payload.projects],
          infiniteCampaignProjectsData:
            action.payload.infiniteCampaignProjectsData
        }
      };
    // exploreActions
    case "ADD_EXPLORE_PAGE_INITIAL_PROPS":
      return {
        ...state,
        explorePageInitialProps: action.payload,
        geo: action.payload.geolocation
      };
    case "ADD_EXPLORE_PROJECTS":
      return {
        ...state,
        explorePageInitialProps: {
          ...state.explorePageInitialProps,
          projects: [
            ...state.explorePageInitialProps.projects,
            ...action.payload.projects
          ],
          infiniteExploreProjectsData:
            action.payload.infiniteExploreProjectsData
        }
      };
    case "FILTER_EXPLORE_PROJECTS":
      return {
        ...state,
        explorePageInitialProps: {
          ...state.explorePageInitialProps,
          projects: [...action.payload.projects],
          infiniteExploreProjectsData:
            action.payload.infiniteExploreProjectsData
        }
      };
    // headerActions
    case "ADD_HEADER_CATEGORIES":
      return {
        ...state,
        headerData: { ...state.headerData, categories: action.payload }
      };
    case "SET_SHOW_SEARCH_INPUT":
      return { ...state, showSearchInput: action.payload };

    // global
    case "LOADING":
      return { ...state, loading: action.payload };
    case "SET_GEO":
      return { ...state, geo: action.payload };
    default:
      return state;
  }
};
