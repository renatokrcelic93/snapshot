import React from "react";
import moment from "moment";

export default class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    const { dayLabel, monthLabel, yearLabel, defaultDate } = props;

    this.state = {
      day: null,
      month: null,
      year: null,
      selectDay: dayLabel,
      selectMonth: monthLabel,
      selectYear: yearLabel
    };
  }
  componentWillReceiveProps(nextprops) {
    const { dayLabel, monthLabel, yearLabel, defaultDate, mode } = nextprops;
    this.setState({
      selectDay: defaultDate
        ? moment(defaultDate).date()
        : mode === "TH"
          ? "วันที่"
          : dayLabel,
      selectMonth: defaultDate
        ? moment(defaultDate).month() + 1
        : mode === "TH"
          ? "เดือน"
          : monthLabel,
      selectYear: defaultDate
        ? moment(defaultDate).year()
        : mode === "TH"
          ? "ปี"
          : yearLabel
    });
  }

  changeDate(e, type) {
    this.setState({
      [type]: e.target.value
    });
    this.checkDate(e.target.value, type);
  }

  getDate(date) {
    if (moment(date).isValid()) {
      return moment(date).format();
    } else {
      return undefined;
    }
  }

  checkDate(value, type) {
    let { selectDay, selectMonth, selectYear } = this.state;

    if (type === "selectDay") {
      selectDay = value;
    } else if (type === "selectMonth") {
      selectMonth = value;
    } else if (type === "selectYear") {
      selectYear = value;
    }

    if (this.isSelectedAllDropdowns(selectDay, selectMonth, selectYear)) {
      const dateObject = {
        year: selectYear,
        month: selectMonth - 1,
        day: selectDay
      };
      this.props.dateChange(this.getDate(dateObject));
    } else {
      this.props.dateChange(undefined);
    }
  }

  isSelectedAllDropdowns(selectDay, selectMonth, selectYear) {
    if (selectDay === "" || selectMonth === "" || selectYear === "") {
      return false;
    }
    return this.props.mode === "TH"
      ? selectDay !== "วันที่" && selectMonth !== "เดือน" && selectYear !== "ปี"
      : selectDay !== this.props.dayLabel &&
          selectMonth !== this.props.monthLabel &&
          selectYear !== this.props.yearLabel;
  }

  getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  render() {
    let day = [],
      month = [],
      year = [];

    const pad = n => {
      return n < 10 ? "0" + n : n;
    };

    const daysInMonth = this.getDaysInMonth(
      this.state.selectMonth,
      this.state.selectYear
    );
    for (let i = 1; i <= daysInMonth; i++) {
      day.push(this.props.padDay ? pad(i) : i);
    }

    let monthIndex = 1;
    for (const monthName of moment.localeData().months()) {
      month.push({
        text: this.props.useMonthNames
          ? monthName
          : this.props.padMonth
            ? pad(monthIndex)
            : monthIndex,
        value: monthIndex
      });
      monthIndex++;
    }

    for (let i = this.props.maxYear; i >= this.props.minYear; i--) {
      year.push(i);
    }

    const dayElement = day.map((day, id) => {
      return (
        <option id={`day${id}`} value={day} key={id}>
          {day}
        </option>
      );
    });

    const monthElement = month.map((month, id) => {
      return (
        <option id={`month${id}`} value={month.value} key={id}>
          {month.text}
        </option>
      );
    });
    const yearElement = year.map((year, id) => {
      return (
        <option id={`year${id}`} value={year} key={id}>
          {year}
        </option>
      );
    });

    return (
      <div>
        <select
          id="settings_day"
          className={this.props.className}
          value={this.state.selectDay}
          onChange={e => this.changeDate(e, "selectDay")}
        >
          <option value="">
            {this.props.mode === "TH" ? "วันที่" : this.props.dayLabel}
          </option>
          {dayElement}
        </select>
        <select
          id="settings_month"
          className={this.props.className}
          value={this.state.selectMonth}
          onChange={e => this.changeDate(e, "selectMonth")}
        >
          <option value="">
            {this.props.mode === "TH" ? "เดือน" : this.props.monthLabel}
          </option>
          {monthElement}
        </select>
        <select
          id="settings_year"
          className={this.props.className}
          value={this.state.selectYear}
          onChange={e => this.changeDate(e, "selectYear")}
        >
          <option value="">
            {this.props.mode === "TH" ? "ปี" : this.props.yearLabel}
          </option>
          {yearElement}
        </select>
        <style jsx>{`
          select {
            margin: 0;
          }
          .${this.props.className} {
            width: 33.3333%;
            font-size: 18px;
          }
        `}</style>
      </div>
    );
  }
}

DatePicker.defaultProps = {
  dayLabel: "Day",
  minYear: 1901,
  maxYear: 2018,
  monthLabel: "Month",
  padDay: false,
  padMonth: false,
  selectDay: "",
  selectMonth: "",
  selectYear: "",
  yearLabel: "Year",
  useMonthNames: true
};
