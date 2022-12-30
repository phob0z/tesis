import React, { Fragment, useEffect, useState } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import classes from "./LongMainContainer.module.css";

function LongMainContainer(props) {
  console.log(props.search);
  const [search, setSearch] = useState(props.search);

  useEffect(() => {
    if (props.onChange) props.onChange(search);
    // eslint-disable-next-line
  }, [search]);

  return (
    <Fragment>
      <div className={classes.mainContainer}> {props.children} </div>
      {props.onSearch && (
        <div className={classes.searchInput}>
          {props.filters &&
            props.filters.map((filter) => {
              return (
                <div className={classes.filter} key={filter.label}>
                  {/* <label className={classes.label} htmlFor={filter.label}>
                  {filter.label}
                </label> */}
                  <Input
                    type="select"
                    label={filter.label}
                    options={filter.options}
                    theme="simple"
                    filter={filter.filter}
                    onChange={(event) => {
                      setSearch((prevState) => {
                        return {
                          ...prevState,
                          [filter.filter]: event.target.value,
                        };
                      });
                    }}
                  />
                </div>
              );
            })}
          <Input
            theme="simple"
            label="Identificación"
            maxLength="10"
            value={props.identification}
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
        <div className={`${classes.containerTitle} ${props.onSearch? "": classes.space}`}> {props.title} </div>
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
