import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import classes from "./LongMainContainer.module.css";

function LongMainContainer(props) {
  const navigate = useNavigate();
  return (
    <Fragment>
      <div
        className={`${classes.mainContainer} ${props.big ? classes.big : ""} ${classes[props.className]}`}
      >
        {props.children}
      </div>
      {props.onSearch && (
        <div className={classes.searchInput}>
          {props.filters && (
            <Fragment>
              <div className={classes.filter}>
                <Input
                  value={props.search.course}
                  type="select"
                  label="Cursos"
                  options={props.filters.courses}
                  theme="simple"
                  onChange={(event) => {
                    props.onChange({ course: event.target.value });
                  }}
                />
              </div>
              <div className={classes.filter}>
                <Input
                  value={props.search.parallel}
                  type="select"
                  label="Paralelos"
                  options={props.filters.parallels}
                  theme="simple"
                  onChange={(event) => {
                    props.onChange({ parallel: event.target.value });
                  }}
                />
              </div>
              <div className={classes.filter}>
                <Input
                  value={props.search.specialty}
                  type="select"
                  label="Especialidades"
                  options={props.filters.specialties}
                  theme="simple"
                  onChange={(event) => {
                    props.onChange({ specialty: event.target.value });
                  }}
                />
              </div>
              <div className={classes.filter}>
                <Input
                  value={props.search.academicYear}
                  type="select"
                  label="Periodos"
                  options={props.filters.academicYears}
                  theme="simple"
                  onChange={(event) => {
                    props.onChange({ academicYear: event.target.value });
                  }}
                />
              </div>
            </Fragment>
          )}
          {!props.hideSearchInput && (
            <Input
              theme="simple"
              className="search"
              label={props.searchBarLabel}
              maxLength="15"
              value={props.search.identification}
              onChange={(event) => {
                props.onChange({ identification: event.target.value });
              }}
            />
          )}
          <div style={{ zIndex: "-1" }}>
            <Button className="searchButton" onClick={props.onSearch}>
              {props.searchButtonTitle ?? "Buscar"}
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

      <div className={classes.buttons}>
        {props.buttonBack && (
          <Button
            type="submit"
            onClick={() => {
              navigate(props.buttonBack === true ? "./../" : props.buttonBack);
            }}
          >
            Volver
          </Button>
        )}
        {props.buttonTitle && (
          <Button type="submit" onClick={props.onClick}>
            {props.buttonTitle}
          </Button>
        )}
        {props.onSave && (
          <Button type="submit" onClick={props.onSave}>
            Guardar
          </Button>
        )}
      </div>
    </Fragment>
  );
}

export default LongMainContainer;
