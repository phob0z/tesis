import React, { Fragment } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import classes from "./LongMainContainer.module.css";

function LongMainContainer(props) {
  return (
    <Fragment>
      <div className={`${classes.mainContainer} ${props.big? classes.big: ""}`}> {props.children} </div>
      {props.onSearch && (
        <div className={classes.searchInput}>
          {props.filters && (
            <Fragment>
              <div className={classes.filter}>
                {/* <label className={classes.label} htmlFor={filter.label}>
                  {filter.label}
                </label> */}
                <Input
                  value={props.search.courses}
                  type="select"
                  label="Cursos"
                  options={props.filters.courses}
                  theme="simple"
                  onChange={(event) => {
                    props.onChange({ courses: event.target.value });
                  }}
                />
              </div>
              <div className={classes.filter}>
                {/* <label className={classes.label} htmlFor={filter.label}>
                  {filter.label}
                </label> */}
                <Input
                  value={props.search.parallels}
                  type="select"
                  label="Paralelos"
                  options={props.filters.parallels}
                  theme="simple"
                  onChange={(event) => {
                    props.onChange({ parallels: event.target.value });
                  }}
                />
              </div>
              <div className={classes.filter}>
                {/* <label className={classes.label} htmlFor={filter.label}>
                  {filter.label}
                </label> */}
                <Input
                  value={props.search.specialties}
                  type="select"
                  label="Especialidad"
                  options={props.filters.specialties}
                  theme="simple"
                  onChange={(event) => {
                    props.onChange({ specialties: event.target.value });
                  }}
                />
              </div>
              <div className={classes.filter}>
                {/* <label className={classes.label} htmlFor={filter.label}>
                  {filter.label}
                </label> */}
                <Input
                  value={props.search.academicYears}
                  type="select"
                  label="Periodo"
                  options={props.filters.academicYears}
                  theme="simple"
                  onChange={(event) => {
                    props.onChange({ academicYears: event.target.value });
                  }}
                />
              </div>
            </Fragment>
          )}
          <Input
            theme="simple"
            label={props.searchBarLabel}
            maxLength="15"
            value={props.search.identification}
            onChange={(event) => {
              props.onChange({ identification: event.target.value });
            }}
          />
          <div style={{ zIndex: "-1" }}>
            <Button className="searchButton" onClick={props.onSearch}>
              Buscar
            </Button>
          </div>
        </div>
      )}
      {props.title && (
        <div
          className={`${classes.containerTitle} ${
            props.onSearch ? "" : classes.space
          }`}
        >
          {props.title}
        </div>
      )}

      {props.buttonTitle && (
        <div className={classes.button}>
          <Button type="submit" onClick={props.onClick}>
            {props.buttonTitle}
          </Button>
        </div>
      )}
    </Fragment>
  );
}

export default LongMainContainer;
