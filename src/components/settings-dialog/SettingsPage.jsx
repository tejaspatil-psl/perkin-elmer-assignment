import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SettingPage.css";

const SettingsPage = () => {
  let navigate = useNavigate();
  const [settings, setSettings] = useState({
    numnerOfWells: 96,
    numberOfWavelengths: 1,
    lmValues: [0],
  });
  const [lmErrors, setLmErrors] = useState(
    Array(settings.numberOfWavelengths).fill(false)
  );
  const [isOkButtonDisable, setIsOkButtonDisable] = useState();
  const [wellsText, setWellsText] = useState("");
  const [wavelengthText, setWavelengthText] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:5000/api/getsettings")
        .then((response) => {
          if (response.data && response.data.length > 0) {
            setId(response.data[response.data.length - 1]._id);
            console.log(
              "getdata",
              response.data[response.data.length - 1].numnerOfWells
            ); // Handle the response data here
            setSettings({
              numnerOfWells: response.data[response.data.length - 1]?.wells,
              numberOfWavelengths:
                response.data[response.data.length - 1]?.wavelengths,
              lmValues: response.data[response.data.length - 1]?.lms,
            });
          } else {
            console.error("Response data is empty or undefined");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    fetchData();
    setLmErrors(Array(settings.numberOfWavelengths).fill(false));
    console.log("settingsafterfeach", settings);
  }, []);

  useEffect(() => {
    const isLmValuesValid = settings.lmValues.every(
      (value) => value >= 200 && value <= 1000
    );
    const isAnyFieldEmpty = settings.lmValues.some((value) => value === "");

    setIsOkButtonDisable(
      !isLmValuesValid ||
        isAnyFieldEmpty ||
        settings.numnerOfWells === null ||
        settings.numberOfWavelengths === null
    );
  }, [settings.lmValues, settings.numnerOfWells, settings.numberOfWavelengths]);

  const handletextWellsChange = (e, inputV) => {
    console.log("inputcheck", inputV);

    const isvalid =
      (/^[1-9]\d{0,2}$/.test(inputV) && inputV.length <= 4) || inputV === "";
    if (isvalid) {
      setWellsText(inputV);
    }
    if (
      inputV === "96" ||
      inputV === "24" ||
      inputV === "48" ||
      inputV === "384"
    ) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        numnerOfWells: inputV,
      }));
    }
    console.log("text......", inputV);
  };

  const handletextWavelengthChange = (e, inputV) => {
    const isvalid =
      (/^[1-9]\d{0,1}$/.test(inputV) && inputV.length <= 4) || inputV === "";
    if (isvalid) {
      setWavelengthText(inputV);
    }
    if (
      inputV === "1" ||
      inputV === "2" ||
      inputV === "3" ||
      inputV === "4" ||
      inputV === "5" ||
      inputV === "6"
    ) {
      console.log("incide if", inputV);
      const numberOfWavelengths = inputV;
      const lmValues = Array.from(
        { length: numberOfWavelengths },
        (_, index) => settings.lmValues[index] || ""
      );

      setSettings((prevSettings) => ({
        ...prevSettings,
        numberOfWavelengths,
        lmValues,
      }));
      setLmErrors(Array(numberOfWavelengths).fill(false));
    }
    console.log("setting in wave", settings);
  };

  const handleWellsChange = (e, newValue) => {
    console.log("hiiiiii", newValue);
    if (newValue) {
      e.preventDefault();
      const numnerOfWells = newValue;

      setSettings((prevSettings) => ({
        ...prevSettings,
        numnerOfWells,
      }));
    }
  };

  const handleWavelengthChange = (e, newValue) => {
    e.preventDefault();
    if (newValue) {
      console.log("wavelength", typeof newValue);
      const numberOfWavelengths = newValue;
      const lmValues = Array.from(
        { length: numberOfWavelengths },
        (_, index) => settings.lmValues[index] || ""
      );

      setSettings((prevSettings) => ({
        ...prevSettings,
        numberOfWavelengths,
        lmValues,
      }));
      setLmErrors(Array(numberOfWavelengths).fill(false));
    }
  };

  const handleLmValueChange = (index, value) => {
    console.log("heyyy", typeof value);
    const newLmValues = [...settings.lmValues];
    if ((/^[1-9]\d{0,3}$/.test(value) && value.length <= 4) || value === "") {
      newLmValues[index] = value;
    }

    setSettings((prevSettings) => ({
      ...prevSettings,
      lmValues: newLmValues,
    }));

    const isValid = value >= 200 && value <= 1000;
    const updatedLmErrors = [...lmErrors];
    updatedLmErrors[index] = !isValid;
    setLmErrors(updatedLmErrors);
  };

  const onCancelClick = (e) => {
    e.preventDefault();
    navigate("/");
    // setSettings({
    //   numnerOfWells: 96,
    //   numberOfWavelengths: 1,
    //   lmValues: Array(1).fill(),
    // });
  };

  const onOkClick = (e) => {
    e.preventDefault();
    const lmValuesInInt = settings.lmValues.map((str) => parseInt(str));
    const FinalData = {
      wavelengths: parseInt(settings.numberOfWavelengths),
      wells: parseInt(settings.numnerOfWells),
      lms: lmValuesInInt,
    };
    const headers = {
      "Content-Type": "application/json",
      "Allow-Control-Allow-Methods": "PUT", // example header
    };
    console.log("okdata", FinalData);
    console.log("Id is here", id);
    axios
      .put(`http://localhost:5000/api/updatesetting/${id}`, FinalData, {
        headers,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    navigate("/");
    // console.log("oksettings",settings)
  };

  return (
    <div className="outer-container">
      <div className="header"> Settings Page</div>
      <h4 style={{ padding: "10px" }}>Edit Settings</h4>
      <form className="form">
        <div className="form-field">
          <div>Number of wells:</div>
          <Autocomplete
            // freeSolo
            id="wells"
            options={["24", "48", "96", "384"]}
            sx={{ width: 250 }}
            value={settings.numnerOfWells?.toString()}
            onChange={handleWellsChange}
            inputValue={wellsText}
            onInputChange={handletextWellsChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
        <div className="form-field">
          <div>Number of wavelengths:</div>
          <Autocomplete
            // freeSolo
            id="wavelengths"
            value={settings.numberOfWavelengths?.toString()}
            onChange={handleWavelengthChange}
            inputValue={wavelengthText}
            onInputChange={handletextWavelengthChange}
            options={["1", "2", "3", "4", "5", "6"]}
            sx={{ width: 250 }}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
        {settings.lmValues.map((lmValues, index) => (
          <div key={index} className="form-field">
            <div>{`Lm${index + 1}:`}</div>
            <TextField
              value={lmValues === 0 ? "" : lmValues}
              onChange={(e) => handleLmValueChange(index, e.target.value)}
              sx={{ width: 250 }}
              error={lmErrors[index]}
              helperText={
                lmErrors[index] ? "Value must be between 200 nad 1000" : ""
              }
              id="outlined-basic"
              variant="outlined"
              autoComplete="off"
            />
          </div>
        ))}
        <div style={{ marginTop: "15%" }}>
          <button
            className="styled-buttons"
            onClick={onOkClick}
            disabled={isOkButtonDisable}
          >
            Ok
          </button>
          <button className="styled-buttons" onClick={onCancelClick}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
