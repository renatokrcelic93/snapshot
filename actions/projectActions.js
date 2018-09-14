import { request, request2 } from "../utility/Request";
import config from "../config";

export const modParticipant = mod => {
  return async dispatch => {
    return dispatch({ type: "MOD_PARTICIPANT", payload: mod });
  };
};
export const updateDescription = description => {
  return async dispatch => {
    return dispatch({ type: "UPDATE_DESCRIPTION", payload: description });
  };
};
export const setRole = role => {
  return async dispatch => {
    return dispatch({ type: "SET_ROLE", payload: role });
  };
};
export const setVolunteerQuestionAnswer = answer => {
  return async dispatch => {
    return dispatch({ type: "SET_VOLUNTEER_ANSWER", payload: answer });
  };
};
export const addProjectPageInitialProps = initialProps => {
  return async dispatch => {
    return dispatch({
      type: "ADD_PROJECT_PAGE_INITIAL_PROPS",
      payload: initialProps
    });
  };
};
export const handleLike = (direction, project, user, token) => {
  return async dispatch => {
    try {
      const slug = project.slug;
      const result = await request2(
        token,
        config.endpoints.LIKE_PROJECT_URL + `/${slug}/${direction}`,
        null,
        "post"
      );
      let newUser = { ...user };
      if (direction == "like") {
        newUser.liked_projects.push(project);
      } else {
        newUser.liked_projects = user.liked_projects.filter(
          p => p.slug !== project.slug
        );
      }
      return dispatch({ type: "PROJECT_LIKE", payload: newUser });
    } catch (err) {
      console.log("like error", err);
      return;
    }
  };
};
export const getJoinProjectData = (project, servingDate, user, mode) => {
  console.log("project", project);
  return async dispatch => {
    let participation = false;
    if (user) {
      participation = servingDate.participations.find(
        p => p.user.id == user.id
      );
    }

    const roles = servingDate.roles;
    let selectedRole = participation ? participation.role.name : roles[0];
    let description = participation
      ? participation.message
        ? participation.message
        : ""
      : "";
    let volunteerAnswer = participation
      ? participation.volunteer_answer
        ? participation.volunteer_answer
        : ""
      : "";
    let rejectedCounter = 0;
    servingDate.participations.map(participation => {
      if (participation.status == "REJECTED") {
        return rejectedCounter++;
      }
      return;
    });
    const participantsCounter = servingDate.participations.length + 1;
    const guestCounter = participation ? participation.guests_count + 1 : 1;
    let capacity = 0;
    servingDate.roles.map(role => {
      capacity += role.capacity;
    });
    const remainingSpots =
      capacity - servingDate.participations.length + rejectedCounter;

    const joinProjectData = {
      capacity,
      participantsCounter,
      description,
      roles,
      selectedRole,
      project,
      servingDate,
      guestCounter,
      remainingSpots,
      volunteerAnswer
    };
    return dispatch({
      type: "ADD_JOIN_PROJECT_DATA",
      payload: joinProjectData
    });
  };
};
export const joinProject = (joinProjectData, token) => {
  return async dispatch => {
    let {
      selectedRole,
      description,
      participantsCounter,
      servingDate,
      guestCounter,
      volunteerAnswer
    } = joinProjectData;
    selectedRole = selectedRole
      ? selectedRole
      : joinProjectData.servingDate.roles[0];
    const guests = [];
    for (let i = 0; i < guestCounter - 1; i++) {
      const guest = {
        email: "",
        first_name: "User",
        last_name: i,
        happening_role_id: selectedRole.id
      };
      guests.push(guest);
    }

    const data = {
      happening_role_id: selectedRole.id,
      message: description,
      volunteer_answer: volunteerAnswer,
      guests
    };

    try {
      const payload = {};
      console.log("data", data);
      const result = await request2(
        token,
        config.endpoints.JOIN_HAPPENING_URL + `/${servingDate.id}/join`,
        data,
        "post"
      );
      const updatedServingDate = result.data.happening;
      payload.servingDate = updatedServingDate;
      return dispatch({ type: "UPDATE_SERVING_DATE", payload });
    } catch (err) {
      console.log("join error", err);
      return;
    }
  };
};
export const leaveProject = (joinProjectData, token) => {
  return async dispatch => {
    const { servingDate } = joinProjectData;
    try {
      const payload = {};
      const result = await request2(
        token,
        config.endpoints.LEAVE_HAPPENING_URL + `/${servingDate.id}/leave`,
        null,
        "post"
      );
      const updatedServingDate = result.data.happening;
      payload.servingDate = updatedServingDate;
      return dispatch({ type: "UPDATE_SERVING_DATE", payload });
    } catch (err) {
      console.log("leave error", err);
      return;
    }
  };
};

export const loadMoreUpdates = (token, project) => {
  return async dispatch => {
    project.infiniteUpdatesData.page++;
    const data = await request(
      token,
      { _id: project._id, limit: 6, page: project.infiniteUpdatesData.page },
      config.endpoints.EVENT_UPDATES_URL
    );
    const d = data.data.dictionary;
    const r = data.data.result;
    const pages = data.data.extras.pages;
    const updates = [];
    let hasMore = false;
    r.map(updateId => {
      const u = d[updateId];

      updates.push(u);
    });
    if (project.infiniteUpdatesData.page == pages - 1) {
      hasMore = false;
    } else {
      hasMore = true;
    }
    project.infiniteUpdatesData.hasMore = hasMore;
    return dispatch({
      type: "ADD_UPDATES",
      payload: { infiniteUpdatesData: project.infiniteUpdatesData, updates }
    });
  };
};
export const loadMoreServingDates = (token, project) => {
  return async dispatch => {
    project.infiniteServingDatesData.page++;
    const slug = project.slug;
    const eventServingDates = await request2(
      token,
      config.endpoints.GET_PROJECT_HAPPENINGS_URL +
        `/${slug}/happenings?page[size]=6&page[number]=${
          project.infiniteServingDatesData.page
        }`
    );
    const servingDates = [...eventServingDates.data.data];
    let hasMore;
    if (
      eventServingDates.data.meta.current_page ==
      eventServingDates.data.meta.last_page
    ) {
      hasMore = false;
    } else {
      hasMore = true;
    }
    project.infiniteServingDatesData.hasMore = hasMore;
    return dispatch({
      type: "ADD_SERVING_DATES",
      payload: {
        infiniteServingDatesData: project.infiniteServingDatesData,
        servingDates
      }
    });
  };
};
