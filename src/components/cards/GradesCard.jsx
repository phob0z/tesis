import React, { /* useContext, */ useEffect, useState } from "react";
// import AlertContext from "../../contexts/alert/AlertContext";

import Grade from "../../components/cards/Grade";
import classes from "./GradesCard.module.css";

function GradesCard(props) {
  // const { setIsLoading, setModal } = useContext(AlertContext);
  const [grades, setGrades] = useState({
    id: props.id,
    q1p1: props.q1p1,
    q1p2: props.q1p2,
    q1p3: props.q1p3,
    q1f: 0,
    q2p1: props.q2p1,
    q2p2: props.q2p2,
    q2p3: props.q2p3,
    q2f: 0,
    supletory: props.supletory,
    remedial: props.remedial,
    grace: props.grace,
    final: 0,
  });
  const [errorq1p1, setErrorq1p1] = useState(false);
  const [errorq1p2, setErrorq1p2] = useState(false);
  const [errorq1p3, setErrorq1p3] = useState(false);
  const [errorq2p1, setErrorq2p1] = useState(false);
  const [errorq2p2, setErrorq2p2] = useState(false);
  const [errorq2p3, setErrorq2p3] = useState(false);
  const [errorSupletory, setErrorSupletory] = useState(false);
  const [errorRemedial, setErrorRemedial] = useState(false);
  const [errorGrace, setErrorGrace] = useState(false);
  const [supletoryDisabled, setSupletoryDisabled] = useState(true);
  const [remedialDisabled, setRemedialDisabled] = useState(true);
  const [graceDisabled, setGraceDisabled] = useState(true);

  const [error, setError] = useState(false);

  useEffect(() => {
    setGrades((prevState) => {
      return {
        ...prevState,
        final: prom([grades.q1f, grades.q2f]),
      };
    });
    if (prom([grades.q1f, grades.q2f]) < 7) {
      setSupletoryDisabled(false);
    } else {
      setGrades((prevState) => {
        return {
          ...prevState,
          supletory: "",
          remedial: "",
          grace: "",
        };
      });
      setSupletoryDisabled(true);
    }
  }, [grades.q1f, grades.q2f]);

  useEffect(() => {
    if (
      grades.supletory.trim() !== "" &&
      grades.supletory >= 0 &&
      grades.supletory < 7
    ) {
      setRemedialDisabled(false);
      setGrades((prevState) => {
        return {
          ...prevState,
          final: prom([grades.q1f, grades.q2f]),
        };
      });
    } else {
      if (grades.supletory.trim() === "") {
        setGrades((prevState) => {
          return {
            ...prevState,
            final: prom([grades.q1f, grades.q2f]),
          };
        });
      } else {
        setGrades((prevState) => {
          return { ...prevState, final: 7, remedial: "", grace: "" };
        });
      }
      setRemedialDisabled(true);
      setGraceDisabled(true);
    }
  }, [grades.supletory]);

  useEffect(() => {
    if (
      grades.remedial.trim() !== "" &&
      grades.remedial >= 0 &&
      grades.remedial < 7
    ) {
      setGraceDisabled(false);
      setGrades((prevState) => {
        return {
          ...prevState,
          final: prom([grades.q1f, grades.q2f]),
        };
      });
    } else {
      if (grades.remedial.trim() === "") {
        setGrades((prevState) => {
          return {
            ...prevState,
            final: prom([grades.q1f, grades.q2f]),
          };
        });
      } else {
        setGrades((prevState) => {
          return { ...prevState, final: 7, grace: "" };
        });
      }
      setGraceDisabled(true);
    }
  }, [grades.remedial]);

  useEffect(() => {
    props.onFinalChange(grades.id, grades.final);
  }, [grades.final]);

  useEffect(() => {
    setGrades((prevState) => {
      return {
        ...prevState,
        q1f: prom([grades.q1p1, grades.q1p2, grades.q1p3]),
      };
    });
  }, [grades.q1p1, grades.q1p2, grades.q1p3]);

  useEffect(() => {
    setGrades((prevState) => {
      return {
        ...prevState,
        q2f: prom([grades.q2p1, grades.q2p2, grades.q2p3]),
      };
    });
  }, [grades.q2p1, grades.q2p2, grades.q2p3]);

  const prom = (array) => {
    var sum = 0;
    array.forEach((grade) => {
      if (grade) sum += Number.isNaN(parseFloat(grade)) ? 0 : parseFloat(grade);
    });
    const result = (sum / array.length).toFixed(2);
    if (result.isNaN) return 0;
    else return (sum / array.length).toFixed(2);
  };

  useEffect(() => {
    errorq1p1.error
      ? setError(errorq1p1)
      : errorq1p2.error
      ? setError(errorq1p2)
      : errorq1p3.error
      ? setError(errorq1p3)
      : errorq2p1.error
      ? setError(errorq2p1)
      : errorq2p2.error
      ? setError(errorq2p2)
      : errorq2p3.error
      ? setError(errorq2p3)
      : errorSupletory.error
      ? setError(errorSupletory)
      : errorRemedial.error
      ? setError(errorRemedial)
      : errorGrace.error
      ? setError(errorGrace)
      : setError(false);
  }, [
    errorq1p1,
    errorq1p2,
    errorq1p3,
    errorq2p1,
    errorq2p2,
    errorq2p3,
    errorSupletory,
    errorRemedial,
    errorGrace,
    error,
  ]);

  return (
    <div className={classes.subject}>
      <div className={classes.name}>{props.name}</div>
      <div>
        <div className={classes.subquimester}>
          <div className={classes.grade}>
            <Grade
              type="grade"
              value={grades.q1p1}
              theme="blue"
              onChange={(event) => {
                setGrades((prevState) => {
                  return { ...prevState, q1p1: event.target.value };
                });
              }}
              validation="grade"
              maxLength="5"
              setError={setErrorq1p1}
              disabled={false}
            />
          </div>
          <div className={classes.grade}>
            <Grade
              type="grade"
              value={grades.q1p2}
              theme="blue"
              onChange={(event) => {
                setGrades((prevState) => {
                  return { ...prevState, q1p2: event.target.value };
                });
              }}
              validation="grade"
              maxLength="5"
              setError={setErrorq1p2}
              disabled={false}
            />
          </div>
          <div className={classes.grade}>
            <Grade
              type="grade"
              value={grades.q1p3}
              theme="blue"
              onChange={(event) => {
                setGrades((prevState) => {
                  return { ...prevState, q1p3: event.target.value };
                });
              }}
              validation="grade"
              maxLength="5"
              setError={setErrorq1p3}
              disabled={false}
            />
          </div>
          <div className={classes.grade}>
            <Grade
              type="grade"
              value={grades.q1f}
              theme="blue"
              disabled={true}
            />
          </div>
        </div>
      </div>
      <div>
        <div className={classes.subquimester}>
          <div className={classes.grade}>
            <Grade
              type="grade"
              value={grades.q2p1}
              theme="blue"
              onChange={(event) => {
                setGrades((prevState) => {
                  return { ...prevState, q2p1: event.target.value };
                });
              }}
              validation="grade"
              maxLength="5"
              setError={setErrorq2p1}
              disabled={false}
            />
          </div>
          <div className={classes.grade}>
            <Grade
              type="grade"
              value={grades.q2p2}
              theme="blue"
              onChange={(event) => {
                setGrades((prevState) => {
                  return { ...prevState, q2p2: event.target.value };
                });
              }}
              validation="grade"
              maxLength="5"
              setError={setErrorq2p2}
              disabled={false}
            />
          </div>
          <div className={classes.grade}>
            <Grade
              type="grade"
              value={grades.q2p3}
              theme="blue"
              onChange={(event) => {
                setGrades((prevState) => {
                  return { ...prevState, q2p3: event.target.value };
                });
              }}
              validation="grade"
              maxLength="5"
              setError={setErrorq2p3}
              disabled={false}
            />
          </div>
          <div className={classes.grade}>
            <Grade
              type="grade"
              value={grades.q2f}
              theme="blue"
              disabled={true}
              className={classes.green}
            />
          </div>
        </div>
      </div>
      <div className={classes.extra}>
        <Grade
          type="grade"
          value={grades.supletory}
          theme="blue"
          onChange={(event) => {
            setGrades((prevState) => {
              return { ...prevState, supletory: event.target.value };
            });
          }}
          validation="grade"
          maxLength="5"
          setError={setErrorSupletory}
          disabled={supletoryDisabled}
        />
      </div>
      <div className={classes.extra}>
        <Grade
          type="grade"
          value={grades.remedial}
          theme="blue"
          onChange={(event) => {
            setGrades((prevState) => {
              return { ...prevState, remedial: event.target.value };
            });
          }}
          validation="grade"
          maxLength="5"
          setError={setErrorRemedial}
          disabled={remedialDisabled}
        />
      </div>
      <div className={classes.extra}>
        <Grade
          type="grade"
          value={grades.grace}
          theme="blue"
          onChange={(event) => {
            setGrades((prevState) => {
              return { ...prevState, grace: event.target.value };
            });
          }}
          validation="grade"
          maxLength="5"
          setError={setErrorGrace}
          disabled={graceDisabled}
        />
      </div>
      <div className={`${classes.final}`}>{grades.final}</div>
    </div>
  );
}

export default GradesCard;
