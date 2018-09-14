const API_URL = "http://devbackend.vomo.org";

const dev = process.env.NODE_ENV === "development";
const API_URL2 = process.env.API_URL || "http://backend.vomo.localhost/api/v1/";
const ACCOUNTS_URL =
  process.env.ACCOUNTS_URL || "http://accounts.vomo.localhost";
const ADMIN_URL = process.env.ADMIN_URL || "http://admin.vomo.localhost";
const ROOT_URL = process.env.ROOT_URL || "https://luke.vomo.org";

module.exports = {
  ROOT_URL,
  endpoints: {
    AUTH_URL: API_URL + "/user/me",

    EVENT_SEARCH_URL: API_URL + "/event/search",

    NEARBY_PROJECTS_BY_CAMPAIGN_URL:
      API_URL2 + "/projects/nearbyProjectsByCampaign", // ?lat=x&lon=y
    NEARBY_ORGS_URL: API_URL2 + "/organizations/nearby", // ?lat=x&lon=y
    LOCAL_PROJECTS_URL: API_URL2 + "/projects/nearby", // ?lat=x&lon=y
    FOLLOWED_ORGS_URL: API_URL2 + "/organizations/followed",
    FOLLOWED_ORGS_PROJECTS_URL: API_URL2 + "/organizations", // /slug/projects
    FOLLOWED_ORGS_CAMPAIGNS_URL: API_URL2 + "/organizations", // /slug/campaigns
    LOCAL_CATEGORIES_URL: API_URL2 + "/categories/nearby", // ?lat=x&lon=y
    LOCAL_PROJECTS_BY_CATEGORIES_URL:
      API_URL2 + "/projects/nearbyProjectsByCategory", // /slug?lat=x&lon=y
    BANNER_SLIDER_URL: API_URL2 + "/media/banners",

    GET_CAMPAIGN_URL: API_URL2 + "/campaigns", // /slug
    GET_CAMPAIGN_PROJECTS_URL: API_URL2 + "/campaigns", // /slug/projects

    GET_CATEGORIES_URL2: API_URL2 + "/categories",

    GET_ORG_URL: API_URL2 + "/organizations", // /slug
    GET_ORG_CAMPAIGNS_URL: API_URL2 + "/organizations", // '/slug/campaigns'
    GET_ORG_PROJECTS_URL: API_URL2 + "/organizations", // '/slug/projects'
    FOLLOW_ORG_URL: API_URL2 + "/organizations", // /slug/follow' -> post
    UNFOLLOW_ORG_URL: API_URL2 + "/organizations", // /slug/unfollow' -> post

    // TODO innentől tesztelni

    GET_PROJECT_URL: API_URL2 + "/projects", // '/slug'
    GET_PROJECT_HAPPENINGS_URL: API_URL2 + "/projects", // '/slug/happenings'
    LIKE_PROJECT_URL: API_URL2 + "/projects", // '/slug/like' -> post
    DISLIKE_PROJECT_URL: API_URL2 + "/projects", // '/slug/dislike' -> post

    JOIN_HAPPENING_URL: API_URL2 + "/happenings", // /happeningId/join' -> post
    LEAVE_HAPPENING_URL: API_URL2 + "/happenings", // /happeningId/leave' -> post

    GET_NOTIFICATIONS_URL: API_URL2 + "/notifications",

    GET_USER_URL: API_URL2 + "/users/me",
    GET_USER_PARTICIPATIONS_URL: API_URL2 + "/users/me/participations",

    UPDATE_USER_URL: API_URL2 + "/users/me", // -> post 'first_name', 'last_name', 'name_format', 'gender', 'phone', 'twitter', 'instagram', 'birthday', 'language', 'coordinates', 'address'
    UPDATE_USER_EMAIL_URL: API_URL2 + "/users/me/updateEmail", // -> post 'first_name', 'last_name', 'name_format', 'gender', 'phone', 'twitter', 'instagram', 'birthday', 'language', 'coordinates', 'address'
    UPDATE_USER_PW_URL: API_URL2 + "/users/me/updatePassword", // -> post 'first_name', 'last_name', 'name_format', 'gender', 'phone', 'twitter', 'instagram', 'birthday', 'language', 'coordinates', 'address'
    UPDATE_USER_PROFILE_PIC_URL: API_URL2 + "/media/profilePic", // -> post'

    ORG_SEARCH_URL: API_URL2 + "/search", // -> /organization?query=first
    PROJECT_SEARCH_URL: API_URL2 + "/search", // -> /project?query=first
    CAMPAIGN_SEARCH_URL: API_URL2 + "/search", // -> /campaign?query=first
    SEARCH_STATISTICS_URL: API_URL2 + "/search/stats", // -> ?query=first

    GET_FEATURED_ITEMS:
      "https://s3.amazonaws.com/vomo-web/categories/featured-json/cat-featured-items.json",

    ACCEPT_INVITATION_URL: API_URL2 + "/invitations", // -> /{verification_token}/accept
    REJECT_INVITATION_URL: API_URL2 + "/invitations", // -> /{verification_token}/reject

    ENTITY_SEARCH_URL: API_URL + "/entity/search",

    // old API

    CAMPAIGN_GET_URL: API_URL + "/campaign/get",
    USER_SEARCH_URL: API_URL + "/user/search",
    USER_GET_URL: API_URL + "/user/get",
    UPDATE_USER_DATA_URL: API_URL + "/user/update",
    UPDATE_USER_PASSWORD_URL: API_URL + "/user/changePassword",
    USER_GET_PARTICIPANT_OF_URL: API_URL + "/user/getParticipantOf",
    ENTITY_GET_URL: API_URL + "/entity/get",
    ENTITY_GET_CAMPAIGNS_URL: API_URL + "/entity/getCampaigns",
    GET_LOCAL_CATEGORIES_URL: API_URL + "/category/getLocal",
    GET_CATEGORY_URL: API_URL + "/category/get",
    GET_CATEGORIES_URL: API_URL + "/getCategories",
    HUB_BANNER_LIST_URL: API_URL + "/banner/list",
    ENTITY_FOLLOW_URL: API_URL + "/entity/follow",
    ENTITY_UNFOLLOW_URL: API_URL + "/entity/unfollow",
    EVENT_GET_URL: API_URL + "/event/get",
    EVENT_LIKE_URL: API_URL + "/event/",
    EVENT_UPDATES_URL: API_URL + "/event/getUpdates",
    EVENT_SERVING_DATES_URL: API_URL + "/event/getHappeningsParticipants",
    EVENT_JOIN_URL: API_URL + "/happening/join",
    EVENT_LEAVE_URL: API_URL + "/happening/leave",
    SEARCH_STATS_URL: API_URL + "/searchStats",
    UPLOAD_URL: API_URL + "/upload",
    NOTIFICATION_LIST_URL: API_URL + "/notification/list",

    ACCOUNTS_URL: ACCOUNTS_URL,
    ADMIN_URL: ADMIN_URL,

    BLOG_URL: "https://blog.vomo.org/",
    CONTACT_URL: "https://www.vomo.org/contact/",
    CHURCH_URL: "https://www.vomo.org/church/",
    BUSINESS_URL: "https://www.vomo.org/business/",
    SCHOOL_URL: "https://www.vomo.org/school/",
    FAQ_URL: "https://vomo.zendesk.com/hc/en-us",
    TERMS_URL: "https://www.vomo.org/terms-of-service/",
    PRIVACY_URL: "https://www.vomo.org/privacy-policy/",

    FB_URL: "https://www.facebook.com/vomoapp",
    TWITTER_URL: "http://twitter.com/vomoapp",
    INSTAGRAM_URL: "http://instagram.com/vomoapp",
    LINKEDIN_URL: "https://www.linkedin.com/company/24431553/",

    APPSTORE_URL: "https://itunes.apple.com/us/app/vomo-app/id1260727773?mt=8",
    PLAYSTORE_URL:
      "https://play.google.com/store/apps/details?id=com.vomo.app&hl=en",

    GOOGLE_MAPS_URL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBRsDNV7R6BuWefhiLKlARKOuWF2NW3KC0&v=3.exp&libraries=geometry,drawing,places"
  }
};
