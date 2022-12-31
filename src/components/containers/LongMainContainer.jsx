import React, { Fragment } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import classes from "./LongMainContainer.module.css";

function LongMainContainer(props) {
  return (
    <Fragment>
      <div className={classes.mainContainer}> {props.children} </div>
      {props.onSearch && (
        <div className={classes.searchInput}>
          {props.filters && (
            <Fragment>
              <div className={classes.filter}>
                {/* <label className={classes.label} htmlFor={filter.label}>
                  {filter.label}
                </label> */}
                <Input
                  value={props.search.course}
                  type="select"
                  label="Cursos"
                  options={props.filters.course}
                  theme="simple"
                  onChange={(event) => {
                    props.onChange({ course: event.target.value });
                  }}
                />
              </div>
              <div className={classes.filter}>
                {/* <label className={classes.label} htmlFor={filter.label}>
                  {filter.label}
                </label> */}
                <Input
                  value={props.search.parallel}
                  type="select"
                  label="Paralelos"
                  options={props.filters.parallel}
                  theme="simple"
                  onChange={(event) => {
                    props.onChange({ parallel: event.target.value });
                  }}
                />
              </div>
              <div className={classes.filter}>
                {/* <label className={classes.label} htmlFor={filter.label}>
                  {filter.label}
                </label> */}
                <Input
                  value={props.search.specialty}
                  type="select"
                  label="Especialidad"
                  options={props.filters.specialty}
                  theme="simple"
                  onChange={(event) => {
                    props.onChange({ specialty: event.target.value });
                  }}
                />
              </div>
              <div className={classes.filter}>
                {/* <label className={classes.label} htmlFor={filter.label}>
                  {filter.label}
                </label> */}
                <Input
                  value={props.search.academicYear}
                  type="select"
                  label="Periodo"
                  options={props.filters.academicYear}
                  theme="simple"
                  onChange={(event) => {
                    props.onChange({ academicYear: event.target.value });
                  }}
                />
              </div>
            </Fragment>
          )}
          <Input
            theme="simple"
            label={props.searchBarLabel}
            maxLength="10"
            value={props.searchBar}
            onChange={props.onIdentificationChange}
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
