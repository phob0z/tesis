import React, { useEffect, useState } from "react";

import Grade from "../../components/cards/Grade";
import classes from "./GradesCard.module.css";

function GradesCard(props) {
  const [grades, setGrades] = useState({
    subject_id: props.subject_id,
    p1q1: props.p1q1.toString(),
    p2q1: props.p2q1.toString(),
    p3q1: props.p3q1.toString(),
    q1f: 0,
    p1q2: props.p1q2.toString(),
    p2q2: props.p2q2.toString(),
    p3q2: props.p3q2.toString(),
    q2f: 0,
    supletorio: props.supletorio.toString(),
    remedial: props.remedial.toString(),
    gracia: props.gracia.toString(),
    final: 0,
  });
  const [errorp1q1, setErrorp1q1] = useState(false);
  const [errorp2q1, setErrorp2q1] = useState(false);
  const [errorp3q1, setErrorp3q1] = useState(false);
  const [errorp1q2, setErrorp1q2] = useState(false);
  const [errorp2q2, setErrorp2q2] = useState(false);
  const [errorp3q2, setErrorp3q2] = useState(false);
  const [errorSupletory, setErrorSupletory] = useState(false);
  const [errorRemedial, setErrorRemedial] = useState(false);
  const [errorGrace, setErrorGrace] = useState(false);
  const [error, setError] = useState(false);
  const [supletorioDisabled, setSupletoryDisabled] = useState(true);
  const [remedialDisabled, setRemedialDisabled] = useState(true);
  const [graciaDisabled, setGraceDisabled] = useState(true);

  useEffect(() => {
    props.onGradesChange(grades);
    // eslint-disable-next-line
  }, [grades.supletorio, grades.remedial, grades.gracia, grades.final]);

  useEffect(() => {
    if (grades.supletorio < 7 && grades.remedial < 7 && grades.gracia < 7) {
      setGrades((prevState) => {
        return {
          ...prevState,
          final: prom([grades.q1f, grades.q2f]),
        };
      });
    }
    if (prom([grades.q1f, grades.q2f]) < 7) {
      setSupletoryDisabled(false);
    } else {
      setGrades((prevState) => {
        return {
          ...prevState,
          supletorio: "",
          remedial: "",
          gracia: "",
        };
      });
      setSupletoryDisabled(true);
    }
    // eslint-disable-next-line
  }, [grades.q1f, grades.q2f]);

  useEffect(() => {
    if (
      grades.supletorio.trim() !== "" &&
      grades.supletorio >= 0 &&
      grades.supletorio < 7
    ) {
      setRemedialDisabled(false);
      setGrades((prevState) => {
        return {
          ...prevState,
          final: prom([grades.q1f, grades.q2f]),
        };
      });
    } else {
      if (grades.supletorio.trim() === "") {
        setGrades((prevState) => {
          return {
            ...prevState,
            final: prom([grades.q1f, grades.q2f]),
          };
        });
      } else if (grades.supletorio >= 7) {
        setGrades((prevState) => {
          return { ...prevState, final: "7.00", remedial: "", gracia: "" };
        });
      }
      setRemedialDisabled(true);
      setGraceDisabled(true);
    }
    // eslint-disable-next-line
  }, [grades.supletorio]);

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
      } else if (grades.remedial >= 7) {
        setGrades((prevState) => {
          return { ...prevState, final: "7.00", gracia: "" };
        });
      }
      setGraceDisabled(true);
    }
    // eslint-disable-next-line
  }, [grades.remedial]);

  useEffect(() => {
    if (
      grades.gracia.trim() !== "" &&
      grades.gracia >= 0 &&
      grades.gracia < 7
    ) {
      setGrades((prevState) => {
        return {
          ...prevState,
          final: prom([grades.q1f, grades.q2f]),
        };
      });
    } else {
      if (grades.gracia.trim() === "") {
        setGrades((prevState) => {
          return {
            ...prevState,
            final: prom([grades.q1f, grades.q2f]),
          };
        });
      } else if (grades.gracia >= 7) {
        setGrades((prevState) => {
          return { ...prevState, final: "7.00" };
        });
      }
    }
    // eslint-disable-next-line
  }, [grades.gracia]);

  useEffect(() => {
    setGrades((prevState) => {
      return {
        ...prevState,
        q1f: prom([grades.p1q1, grades.p2q1, grades.p3q1]),
      };
    });
  }, [grades.p1q1, grades.p2q1, grades.p3q1]);

  useEffect(() => {
    setGrades((prevState) => {
      return {
        ...prevState,
        q2f: prom([grades.p1q2, grades.p2q2, grades.p3q2]),
      };
    });
  }, [grades.p1q2, grades.p2q2, grades.p3q2]);

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
    errorp1q1.error
      ? setError(errorp1q1)
      : errorp2q1.error
      ? setError(errorp2q1)
      : errorp3q1.error
      ? setError(errorp3q1)
      : errorp1q2.error
      ? setError(errorp1q2)
      : errorp2q2.error
      ? setError(errorp2q2)
      : errorp3q2.error
      ? setError(errorp3q2)
      : errorSupletory.error
      ? setError(errorSupletory)
      : errorRemedial.error
      ? setError(errorRemedial)
      : errorGrace.error
      ? setError(errorGrace)
      : setError(false);
    props.setError(error);
    // eslint-disable-next-line
  }, [
    errorp1q1,
    errorp2q1,
    errorp3q1,
    errorp1q2,
    errorp2q2,
    errorp3q2,
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
              label="Prueba 1 Q1"
              type="grade"
              value={grades.p1q1}
              theme="blue"
              onChange={(event) => {
                setGrades((prevState) => {
                  return { ...prevState, p1q1: event.target.value };
                });
              }}
              validation="grade"
              maxLength="5"
              setError={setErrorp1q1}
              disabled={props.role !== "teacher" || props.blockq1}
            />
          </div>
          <div className={classes.grade}>
            <Grade
              label="Prueba 2 Q1"
              type="grade"
              value={grades.p2q1}
              theme="blue"
              onChange={(event) => {
                setGrades((prevState) => {
                  return { ...prevState, p2q1: event.target.value };
                });
              }}
              validation="grade"
              maxLength="5"
              setError={setErrorp2q1}
              disabled={props.role !== "teacher" || props.blockq1}
            />
          </div>
          <div className={classes.grade}>
            <Grade
              label="Prueba 3 Q1"
              type="grade"
              value={grades.p3q1}
              theme="blue"
              onChange={(event) => {
                setGrades((prevState) => {
                  return { ...prevState, p3q1: event.target.value };
                });
              }}
              validation="grade"
              maxLength="5"
              setError={setErrorp3q1}
              disabled={props.role !== "teacher" || props.blockq1}
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
              label="Prueba 1 Q2"
              type="grade"
              value={grades.p1q2}
              theme="blue"
              onChange={(event) => {
                setGrades((prevState) => {
                  return { ...prevState, p1q2: event.target.value };
                });
              }}
              validation="grade"
              maxLength="5"
              setError={setErrorp1q2}
              disabled={props.role !== "teacher" || props.blockq2}
            />
          </div>
          <div className={classes.grade}>
            <Grade
              label="Prueba 2 Q2"
              type="grade"
              value={grades.p2q2}
              theme="blue"
              onChange={(event) => {
                setGrades((prevState) => {
                  return { ...prevState, p2q2: event.target.value };
                });
              }}
              validation="grade"
              maxLength="5"
              setError={setErrorp2q2}
              disabled={props.role !== "teacher" || props.blockq2}
            />
          </div>
          <div className={classes.grade}>
            <Grade
              label="Prueba 3 Q2"
              type="grade"
              value={grades.p3q2}
              theme="blue"
              onChange={(event) => {
                setGrades((prevState) => {
                  return { ...prevState, p3q2: event.target.value };
                });
              }}
              validation="grade"
              maxLength="5"
              setError={setErrorp3q2}
              disabled={props.role !== "teacher" || props.blockq2}
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
          label="Supletorio"
          type="grade"
          value={grades.supletorio}
          theme="blue"
          onChange={(event) => {
            setGrades((prevState) => {
              return { ...prevState, supletorio: event.target.value };
            });
          }}
          validation="grade"
          maxLength="5"
          setError={setErrorSupletory}
          disabled={props.role !== "teacher" || supletorioDisabled}
        />
      </div>
      <div className={classes.extra}>
        <Grade
          label="Remedial"
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
          disabled={props.role !== "teacher" || remedialDisabled}
        />
      </div>
      <div className={classes.extra}>
        <Grade
          label="Gracia"
          type="grade"
          value={grades.gracia}
          theme="blue"
          onChange={(event) => {
            setGrades((prevState) => {
              return { ...prevState, gracia: event.target.value };
            });
          }}
          validation="grade"
          maxLength="5"
          setError={setErrorGrace}
          disabled={props.role !== "teacher" || graciaDisabled}
        />
      </div>
      <div className={`${classes.final}`}>
        <div>{grades.final}</div>
        <div className={grades.final >= 7? classes.aproved: classes.failed}>{grades.final >= 7? "APRUEBA": "REPRUEBA"}</div>
      </div>
    </div>
  );
}

export default GradesCard;
