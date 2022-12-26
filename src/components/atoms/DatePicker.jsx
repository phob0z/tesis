import React, { Fragment, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import classes from "./DatePicker.module.css";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";

function DatePicker(props) {
  const [date, setDate] = useState(new Date());
  const ref = useRef();

  const thisYear = new Date().getFullYear();
  const min = thisYear - 40;

  var years = [];
  for (var year = min; year <= thisYear; year++) {
    years.push(year);
  }

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  useEffect(() => {
    if (props.value !== "") {
      setDate(new Date(props.value.replace(/-/g, "/")));
    }
  }, [props.value]);

  registerLocale("es", es);

  const openDatePicker = () => {
    ref.current.input.focus();
  };

  return (
    <Fragment>
      <ReactDatePicker
        ref={ref}
        dateFormat="dd/MM/yyyy"
        selected={date}
        onChange={(date) => setDate(date)}
        locale="es"
        className={classes.inputDate}
        minDate={new Date("1980/01/01")}
        maxDate={new Date()}
        fixedHeight
        disabled={props.disabled}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div
            style={{
              margin: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span
              onClick={(event) => {
                event.preventDefault();
                decreaseMonth();
              }}
              className={`material-symbols-outlined ${classes.navigationArrows}`}
              disabled={prevMonthButtonDisabled}
            >
              navigate_before
            </span>
            <select
              value={date.getFullYear(date)}
              onChange={({ target: { value } }) => {
                changeYear(value);
              }}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              value={months[date.getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span
              onClick={(event) => {
                event.preventDefault();
                increaseMonth();
              }}
              className={`material-symbols-outlined ${classes.navigationArrows}`}
              disabled={nextMonthButtonDisabled}
            >
              navigate_next
            </span>
          </div>
        )}
      />
      <div className={classes.datePicker}>
        <span className="material-symbols-outlined" onClick={openDatePicker}>
          calendar_month
        </span>
      </div>
    </Fragment>
  );
}

DatePicker.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
};

DatePicker.defaultProps = {
  value: "",
  disabled: false,
};

export default DatePicker;
