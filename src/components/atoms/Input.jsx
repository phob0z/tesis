import React, { Fragment, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import classes from "./Input.module.css";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";

const Input = (props) => {
  const [focused, setFocussed] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [type, setType] = useState(props.type);
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
    if (props.type === "date" && props.value) {
      setDate(new Date(props.value.replace(/-/g, "/")));
    }
  }, [props.value, props.type]);

  registerLocale("es", es);

  const onFocus = () => {
    setFocussed(true);
  };

  const onBlur = () => {
    setFocussed(false);
    props.onBlur();
  };

  const openDatePicker = () => {
    ref.current.input.focus();
  };

  const onSetVisibility = () => {
    type === "password" ? setType("text") : setType("password");
    setVisibility(!visibility);
  };

  var theme;

  if (props.theme === "red") theme = classes.red;
  else if (props.theme === "blue") theme = classes.blue;
  else theme = classes.simple;

  return (
    <Fragment>
      <div
        className={`${classes.container} ${theme} ${
          focused ? classes.focused : ""
        }`}
      >
        {(props.children !== undefined && (
          <div className={classes.imageBox}>{props.children}</div>
        )) ||
          (props.disabled && (
            <div className={classes.imageBox}>
              <div className={classes.imageBoxIcon}>
                <span className="material-symbols-outlined">lock</span>
              </div>
            </div>
          ))}
        <div
          className={`${classes.inputContainer} ${theme} ${
            focused ? classes.focused : ""
          }`}
        >
          {props.type === "date" ? (
            <Fragment>
              {/* <DatePicker
                ref={ref}
                dateFormat="dd/MM/yyyy"
                selected={date}
                onChange={(date) => setDate(date)}
                locale="es"
                className={classes.inputDate}
                minDate={new Date("1950", "06", "06")}
                maxDate={new Date()}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"

              />
              <div className={classes.datePicker}>
                <span
                  className="material-symbols-outlined"
                  onClick={openDatePicker}
                >
                  calendar_month
                </span>
              </div> */}
              <DatePicker
                ref={ref}
                dateFormat="dd/MM/yyyy"
                selected={date}
                onChange={(date) => setDate(date)}
                locale="es"
                className={classes.inputDate}
                minDate={new Date("1950/01/01")}
                maxDate={new Date()}
                fixedHeight
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
                      disabled={nextMonthButtonDisabled}
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
                <span
                  className="material-symbols-outlined"
                  onClick={openDatePicker}
                >
                  calendar_month
                </span>
              </div>
            </Fragment>
          ) : (
            <input
              id={props.label}
              type={type}
              placeholder={`${focused ? "" : props.label}`}
              value={props.value}
              onChange={props.onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              maxLength={props.maxLength}
              disabled={props.disabled}
            />
          )}
          {props.theme === "red" ? (
            <label htmlFor={props.label}>{props.label}</label>
          ) : (
            ""
          )}
        </div>
        {props.showRevealPassword && (
          <div
            className={`${classes.revealPassword} ${theme}`}
            onClick={onSetVisibility}
          >
            <span className="material-symbols-outlined">
              {type === "password" ? "visibility" : "visibility_off"}
            </span>
          </div>
        )}
      </div>
    </Fragment>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  maxLength: PropTypes.string,
  showRevealPassword: PropTypes.bool,
  disabled: PropTypes.bool,
  theme: PropTypes.string,
};

Input.defaultProps = {
  type: "text",
  value: "",
  onChange: () => "",
  label: "default label",
  onBlur: () => "",
  maxLength: "10",
  showRevealPassword: false,
  disabled: false,
  theme: "red",
};

export default Input;
