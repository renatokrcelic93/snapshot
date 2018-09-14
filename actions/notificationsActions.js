import { request, request2 } from "../utility/Request";
import config from "../config";
import moment from "moment";

export const addNotificationPageInitialProps = initialProps => {
  return async dispatch => {
    return dispatch({
      type: "ADD_USER_NOTIFICATIONS_PAGE_INITIAL_PROPS",
      payload: initialProps
    });
  };
};
export const loadMoreNotifications = (token, infiniteNotificationsData) => {
  return async dispatch => {
    infiniteNotificationsData.page++;
    const notificationData = await request2(
      token,
      config.endpoints.GET_NOTIFICATIONS_URL +
        `?page[size]=10&page[number]=${infiniteNotificationsData.page}`
    );

    const r = notificationData.data.data;
    let hasMore = false;
    const notifications = mapNotifications(r);
    if (
      notificationData.data.meta.current_page ==
      notificationData.data.meta.last_page
    ) {
      hasMore = false;
    } else {
      hasMore = true;
    }
    infiniteNotificationsData.hasMore = hasMore;
    return dispatch({
      type: "ADD_NOTIFICATIONS",
      payload: { infiniteNotificationsData, notifications }
    });
  };
};

export const mapNotifications = r => {
  return r
    .map(n => {
      let href = "";
      let text = "";
      let image = "";
      let target = "";
      let time = moment(n.created_at).format("D MMM YYYY");
      let img_class = "";
      switch (n.type) {
        case "Welcome":
          image = "../static/favicon-256.png";
          img_class = "thumb";
          text = "You joined VOMO";
          break;
        case "MembershipInvitation":
          var i = n.data.organization || {};
          image = i.logo ? i.logo.urls.s : "";
          img_class = "thumb";
          text = `You have been invited to join <b>${i.name}</b>`;
          break;
        case "CampaignRequest":
          var i = n.data.campaign || {};
          text = "<b>" + i.name + "</b> has a new project pending approval.";
          img_class = "avatar";
          target = "_blank";
          href = process.env.BASE_URL + "/campaign/" + i.slug;
          image = i.logo ? i.logo.urls.s : "";
          break;
        case "ProjectGroupApproved":
          var i = n.data || {};
          img_class = "thumb";
          href = "/project/" + i.slug;
          image = i.logo ? i.logo.urls.s : "";
          text =
            "Your group request for <b>" + i.name + "</b> has been approved.";
          break;
        case "ProjectGroupDenied":
          var i = n.data || {};
          img_class = "thumb";
          href = "/project/" + i.slug;
          image = i.logo ? i.logo.urls.s : "";
          text =
            "Your group request for <b>" + i.name + "</b> has been denied.";
          break;
        case "ProjectReminder":
          // TODO timestart kell a visszaadott projectbe
          var i = n.data || {};
          img_class = "thumb";
          href = "/project/" + i.slug;
          image = i.logo ? i.logo.urls.s : "";
          var starts_at = i.next_happening ? i.next_happening.starts_at : "";

          if (starts_at < Date.now()) {
            // Published
            text =
              "<b>" + i.name + "</b> started " + moment(starts_at).fromNow();
          } else {
            // Will publish
            text =
              "<b>" +
              i.name +
              "</b> is starting " +
              moment(starts_at).fromNow();
          }
          break;
        case "ParticipationCreated":
          var i = n.data.happening.project || {};
          img_class = "thumb";
          href = "/project/" + i.slug;
          image = i.thumb ? i.thumb.urls.s : "";
          text = "You are a participant of <b>" + i.name + "</b>";
          break;
        case "ParticipationUpdated":
          var i = n.data.happening.project || {};
          img_class = "thumb";
          href = "/project/" + i.slug;
          image = i.thumb ? i.thumb.urls.s : "";
          text = "A participation has been updated at <b>" + i.name + "</b>";
          break;
        case "ParticipationRequest":
          var i = n.data.happening.project || {};
          img_class = "thumb";
          href = "/project/" + i.slug;
          image = i.thumb ? i.thumb.urls.s : "";
          text = "New participation request for <b>" + i.name + "</b>";
          break;
        case "ParticipationUpdateRequest":
          var i = n.data.happening.project || {};
          img_class = "thumb";
          href = "/project/" + i.slug;
          image = i.thumb ? i.thumb.urls.s : "";
          text = "New participation update request for <b>" + i.name + "</b>";
          break;
        case "ParticipationApproved":
          var i = n.data.happening.project || {};
          img_class = "thumb";
          href = "/project/" + i.slug;
          image = i.thumb ? i.thumb.urls.s : "";
          text = "Participation has been approved for <b>" + i.name + "</b>";
          break;
        case "ParticipationDenied":
          var i = n.data.happening.project || {};
          img_class = "thumb";
          href = "/project/" + i.slug;
          image = i.thumb ? i.thumb.urls.s : "";
          text = "Participation has been denied for <b>" + i.name + "</b>";
          break;
        case "ParticipationRemoved":
          var i = n.data.happening.project || {};
          img_class = "thumb";
          href = "/project/" + i.slug;
          image = i.thumb ? i.thumb.urls.s : "";
          text = "You are not longer a participant of <b>" + i.name + "</b>";
          break;
        case "VolunteerSignedup":
          var i = n.data.happening.project || {};
          img_class = "thumb";
          href = "/project/" + i.slug;
          image = i.thumb ? i.thumb.urls.s : "";
          text = "A new volunteer has signed up to <b>" + i.name + "</b>";
          break;
        case "VolunteerUpdated":
          var i = n.data.happening.project || {};
          img_class = "thumb";
          href = "/project/" + i.slug;
          image = i.thumb ? i.thumb.urls.s : "";
          text = "A volunteer has been updated at <b>" + i.name + "</b>";
          break;
        case "VolunteerSignupRequest":
          var i = n.data.happening.project || {};
          img_class = "thumb";
          href = "/project/" + i.slug;
          image = i.thumb ? i.thumb.urls.s : "";
          text = "A volunteer has requested to join <b>" + i.name + "</b>";
          break;
        case "VolunteerUpdateRequest":
          var i = n.data.happening.project || {};
          img_class = "thumb";
          href = "/project/" + i.slug;
          image = i.thumb ? i.thumb.urls.s : "";
          text = "New request for volunteer update at <b>" + i.name + "</b>";
          break;
        case "VolunteerRemoved":
          var i = n.data.happening.project || {};
          img_class = "thumb";
          href = "/project/" + i.slug;
          image = i.thumb ? i.thumb.urls.s : "";
          text = "A volunteer has been removed from <b>" + i.name + "</b>";
          break;
        case "ProjectCreated":
          var i = n.data.project || {};
          img_class = "thumb";
          href = "/project/" + i.slug;
          var a = i.organization || {};
          image = a.logo ? a.logo.urls.s : "";
          text = "<b>" + a.name + "</b> created <b>" + i.name + "</b>";
          break;
        case "ProjectUpdated":
          var i = n.data.project || {};
          img_class = "thumb";
          href = "/project/" + i.slug;
          image = i.thumb ? i.thumb.urls.s : "";
          text = "<b>" + i.name + "</b> has been updated.";
          break;
        case "ProjectRemoved":
          var i = n.data.project || {};
          img_class = "thumb";
          href = "/project/" + i.slug;
          image = i.thumb ? i.thumb.urls.s : "";
          text = "<b>" + i.name + "</b> has been removed.";
          break;
        case "ProjectUpdateCreated":
          var i = n.data.projectUpdate.project || {};
          img_class = "thumb";
          href = "/project/" + i.slug;
          image = i.thumb ? i.thumb.urls.s : "";
          text = "<b>" + i.name + "</b> has a new update.";
          break;
        case "HappeningUpdated":
          var i = n.data.happening.project || {};
          img_class = "thumb";
          href = "/project/" + i.slug;
          image = i.thumb ? i.thumb.urls.s : "";
          text =
            "Your serving time for <b>" + i.name + "</b> has a new change.";
          break;
        case "HappeningRemoved":
          var i = n.data.happening.project || {};
          img_class = "thumb";
          href = "/project/" + i.slug;
          image = i.thumb ? i.thumb.urls.s : "";
          text = "Your serving time for <b>" + i.name + "</b> has been removed";
          break;
        case "OrganizationCsvImported":
          var i = n.data || {};
          image = "../static/csv.svg";
          img_class = "thumb";
          text = "Your CSV import is complete.";
          href = process.env.BASE_URL + "?entity=" + i.slug;
          target = "_blank";
          break;
        default:
          console.log('Notification "' + n.type + '" is not set.', n);
          return "";
      }
      n.href = href;
      n.text = text;
      n.image = image;
      n.target = target;
      n.time = time;
      n.img_class = img_class;
      return n;
    })
    .filter(element => element != "");
};
