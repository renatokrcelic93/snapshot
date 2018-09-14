import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

class DateFilter extends Component {
  render() {
    const { title, onChange, date } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-2">
            <img
              src="../../static/calendar-admin.svg"
              className="icon"
              alt=""
            />
          </div>
          <div className="col-10">{title}</div>
        </div>
        <div className="row">
          <div className="col-12">
            <DatePicker
              className="red-border"
              selected={date}
              onChange={onChange}
              showYearDropdown
              dateFormatCalendar="MMMM"
              scrollableYearDropdown
              minDate={moment("2000-01-01")}
              maxDate={moment()}
              yearDropdownItemNumber={30}
              placeholderText="Click to select a date"
            />
          </div>
        </div>
        <style>{`
          .icon {
            height: 25px;
            width: 25px;
          }

          .red-border {
            border-radius: 3px;
            border: 1px solid #c9c9c9;
            padding: 5px;
            font-size: 14px;
          }
          `}</style>
      </div>
    );
  }
}

export default DateFilter;
