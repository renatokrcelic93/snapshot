import React from "react";
import { connect } from "react-redux";
import Layout from "../Layout";
import { getCookie } from "../../utility/cookieHandler";
import { auth, loadMoreNotifications } from "../../actions";
import { bindActionCreators } from "redux";
import Notification from "./Notification";
import Parser from "html-react-parser";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../Shared/Loader";

class UserNotificationsComponent extends React.Component {
  _renderNotifications = notifications => {
    return notifications.map(notification => {
      return <Notification key={notification.id} notification={notification} />;
    });
  };
  _loadMoreNotifications = infiniteNotificationsData => {
    const token = getCookie("token");
    const { loadMoreNotifications } = this.props;
    loadMoreNotifications(token, infiniteNotificationsData);
  };
  render() {
    const {
      userNotificationsPageInitialProps: {
        notifications,
        infiniteNotificationsData
      }
    } = this.props;
    return (
      <Layout>
        <div className="container bg-white">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="font-l semi-bold">
                Here are your latest notifications
              </h1>
            </div>
          </div>
          <div className="row margin-top-30">
            <div className="col-12">
              <InfiniteScroll
                pageStart={0}
                loadMore={() =>
                  this._loadMoreNotifications(infiniteNotificationsData)
                }
                hasMore={infiniteNotificationsData.hasMore}
                loader={<Loader />}
              >
                {this._renderNotifications(notifications)}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

const md = dispatch => {
  return {
    auth: bindActionCreators(auth, dispatch),
    loadMoreNotifications: bindActionCreators(loadMoreNotifications, dispatch)
  };
};

const ms = state => {
  const {
    globalReducer: { user, userNotificationsPageInitialProps }
  } = state;
  return {
    user,
    userNotificationsPageInitialProps
  };
};

export default connect(
  ms,
  md
)(UserNotificationsComponent);
