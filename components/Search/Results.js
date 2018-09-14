import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../Shared/Loader";
import Parser from "html-react-parser";

class Results extends Component {
  _renderItemList = itemList => {
    return itemList.map(item => {
      return (
        <a key={item.href} className="nodecor" href={item.href}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-2 text-right nopadding">
                <img className="search_icon" src={item.image} />
              </div>
              <div className="col-10 nopadding">
                <div className="row">
                  <div className="col-12">
                    <div className="search_link_to_result blue bold font-m">
                      {Parser(item.title ? item.title : "")}
                    </div>
                  </div>
                </div>
                {item.text && (
                  <div className="row">
                    <div className="col-12">
                      <p>{Parser(item.text)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <style jsx>{`
              .search_icon {
                height: 50px;
                width: 50px;
                margin-right: 10px;
                border-radius: 50%;
              }
              .search_link_to_result {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            `}</style>
          </div>
        </a>
      );
    });
  };

  render() {
    const {
      activeTab,
      searchResults,
      inifiniteItemListData,
      _loadMoreItems
    } = this.props;
    const itemList = searchResults[activeTab];
    if (!itemList.length) {
      return null;
    }
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={_loadMoreItems}
        hasMore={inifiniteItemListData[activeTab].hasMore}
        loader={<Loader key={"2"} />}
      >
        {this._renderItemList(itemList)}
      </InfiniteScroll>
    );
  }
}

export default Results;
