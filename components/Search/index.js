import React from "react";
import { connect } from "react-redux";
import Layout from "../Layout";
import config from "../../config";
import { getCookie } from "../../utility/cookieHandler";
import { request } from "../../utility/Request";
import { auth, search, loadMoreItems } from "../../actions";
import { bindActionCreators } from "redux";

import Results from "./Results";

const WAIT_INTERVAL = 500;
const ENTER_KEY = 13;

class SearchComponent extends React.Component {
  state = {
    activeTab: "Projects",
    otherTabs: ["Campaigns", "Organizations"],
    searchQuery: ""
  };

  componentDidMount() {
    this.timer = null;
  }

  _renderTabButton = label => {
    const { searchStats } = this.props;
    if (this.state.activeTab == label) {
      return (
        <div>
          <h3 className="search_tab_button semi-bold active pointer">
            {label}
          </h3>
          <div className="normal pointer">({searchStats[label]})</div>
          <style jsx>{`
            .search_tab_button {
              margin: 0;
              display: inline-block;
              border-bottom: 3px solid #fff;
            }
            .search_tab_button.active {
              border-bottom: 3px solid #56b780;
            }
          `}</style>
        </div>
      );
    } else {
      return (
        <div onClick={() => this.setState({ activeTab: label })}>
          <h3 className="project_tab_button semi-bold pointer">{label}</h3>
          <div className="normal pointer">({searchStats[label]})</div>
          <style jsx>{`
            .project_tab_button {
              margin: 0;
              display: inline-block;
              border-bottom: 3px solid #fff;
            }
          `}</style>
        </div>
      );
    }
  };

  _handleTabClick = activeTab => {
    const { otherTabs } = this.state;
    const newTabs = otherTabs.filter(tab => tab !== activeTab);
    this.setState({ activeTab, newTabs });
  };
  _loadMoreItems = () => {
    const { loadMoreItems, inifiniteItemListData } = this.props;
    const { activeTab, searchQuery } = this.state;
    return loadMoreItems(searchQuery, activeTab, inifiniteItemListData);
  };

  _handleSearchInput = e => {
    clearTimeout(this.timer);
    const searchQuery = e.target.value;
    this.setState({ searchQuery });
    this.timer = setTimeout(this._triggerChange, WAIT_INTERVAL);
  };

  _handleKeyDown = e => {
    if (e.keyCode === ENTER_KEY) {
      this._triggerChange();
    }
  };

  _triggerChange = () => {
    const { activeTab, otherTabs, searchQuery } = this.state;
    const { search, inifiniteItemListData } = this.props;
    const searchRegex = /[a-z]{3}/i;
    if (searchRegex.test(searchQuery)) {
      search(searchQuery, activeTab, otherTabs, inifiniteItemListData);
    }
  };
  render() {
    const { searchQuery, activeTab } = this.state;
    const { searchResults, inifiniteItemListData } = this.props;
    return (
      <Layout>
        <div className="container bg-white">
          <div className="row justify-conetnt-center align-items-center padding-top-30">
            <div className="col-3 text-right nopadding">
              <img
                className="project_icon"
                src="../../static/search-green.svg"
              />
            </div>
            <div className="col-9 nopadding">
              <input
                onKeyDown={e => this._handleKeyDown(e)}
                onChange={e => this._handleSearchInput(e)}
                value={searchQuery}
                placeholder="Search..."
                className="input light font-xxl"
              />
            </div>
          </div>
          <div className="row margin-top-30">
            <div className="col-6 offset-2">
              <p>What are you looking for?</p>
            </div>
          </div>
          <div className="row margin-top-15">
            <div className="col-10 offset-1">
              <div className="row">
                <div className="col-12 col-sm-6 col-md-4 text-center">
                  {this._renderTabButton("Projects")}
                </div>
                <div className="col-12 col-sm-6 col-md-4 text-center">
                  {this._renderTabButton("Campaigns")}
                </div>
                <div className="col-12 col-sm-6 col-md-4 text-center">
                  {this._renderTabButton("Organizations")}
                </div>
                {/* <div className="col-12 col-sm-6 col-md-3 text-center">{this._renderTabButton('Users')}</div> */}
              </div>
            </div>
          </div>
          <div className="row margin-top-30">
            <div className="col-10 offset-1">
              <Results
                activeTab={activeTab}
                searchResults={searchResults}
                inifiniteItemListData={inifiniteItemListData}
                _loadMoreItems={this._loadMoreItems}
              />
            </div>
          </div>
        </div>
        <style jsx>{`
          .project_icon {
            height: 40px;
            width: 40px;
            margin-right: 12px;
            margin-top: 12px;
          }
          .input {
            width: 100%;
            max-width: 550px;
            padding-top: 8px;
            padding-bottom: 8px;
            border-style: none none dotted;
            border-bottom-width: 2px;
            border-bottom-color: #6eca97;
            background-color: transparent;
            color: #5c666f;
            font-family: "Quicksand";
            letter-spacing: -1px;
          }
        `}</style>
      </Layout>
    );
  }
}

const md = dispatch => {
  return {
    auth: bindActionCreators(auth, dispatch),
    search: bindActionCreators(search, dispatch),
    loadMoreItems: bindActionCreators(loadMoreItems, dispatch)
  };
};

const ms = state => {
  const {
    globalReducer: {
      user,
      search: { searchResults, searchStats, inifiniteItemListData }
    }
  } = state;
  return {
    user,
    searchResults,
    searchStats,
    inifiniteItemListData
  };
};

export default connect(
  ms,
  md
)(SearchComponent);
