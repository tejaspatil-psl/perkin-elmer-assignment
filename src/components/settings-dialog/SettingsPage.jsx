import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SettingPage.css";

const SettingsPage = () => {
  let navigate = useNavigate();
  const [settings, setSettings] = useState({
    numnerOfWells: "96",
    numberOfWavelengths: "1",
    lmValues: [0],
  });
  const [lmErrors, setLmErrors] = useState(
    Array(settings.numberOfWavelengths).fill(false)
  );
  const [isOkButtonDisable, setIsOkButtonDisable] = useState();

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:3000/data")
        .then((response) => {
          if (response.data && response.data.length > 0) {
            console.log("getdata", response.data[0]); // Handle the response data here
            setSettings(response.data[0])
            // setSettings((prevSettings) => ({
            //   ...prevSettings,
            //   numnerOfWells: response.data[0].numberOfWells,
            //   numberOfWavelengths: response.data[0].numberOfWavelengths,
            //   lmValues: Array(1).fill(),
            //   // lmValues
            // }));
          } else {
            console.error("Response data is empty or undefined");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    fetchData();
    if (settings.numberOfWavelengths === "1") {
      setSettings((prevSettings) => ({
        ...prevSettings,
        lmValues: Array(1).fill(),
        // lmValues
      }));
    }
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

  // console.log('isanyfieldempty', isAnyFieldEmpty)
  const handleWellsChange = (e, newValue) => {
    console.log("hiiiiii", newValue);
    e.preventDefault();
    const numnerOfWells = newValue;

    setSettings((prevSettings) => ({
      ...prevSettings,
      numnerOfWells,
      // lmValues
    }));
  };

  const handleWavelengthChange = (e, newValue) => {
    e.preventDefault();
    console.log("hiiiii", newValue);
    const numberOfWavelengths = newValue;
    const lmValues = Array.from(
      { length: numberOfWavelengths },
      (_, index) => settings.lmValues[index] || ''
    );

    setSettings((prevSettings) => ({
      ...prevSettings,
      numberOfWavelengths,
      lmValues,
    }));
    setLmErrors(Array(numberOfWavelengths).fill(false));
  };

  const handleLmValueChange = (index, value) => {
    console.log("heyyy", value);
    const newLmValues = [...settings.lmValues];
    newLmValues[index] = value;
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
    navigate("/");
    setSettings((prevSettings) => ({
      ...prevSettings,
    }));
  };

  return (
    <div className="outer-container">
      <div className="header"> Settings Page</div>
      <h4 style={{ padding: "10px" }}>Edit Settings</h4>
      <form className="form">
        <div className="form-field">
          <div>Number of wells:</div>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={["24", "48", "96", "384"]}
            sx={{ width: 250 }}
            value={settings.numnerOfWells}
            onChange={handleWellsChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
        <div className="form-field">
          <div>Number of wavelengths:</div>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={settings.numberOfWavelengths}
            onChange={handleWavelengthChange}
            options={["1", "2", "3", "4", "5", "6"]}
            sx={{ width: 250 }}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
        {settings.lmValues.map((lmValues, index) => (
          <div key={index} className="form-field">
            <div>{`Lm${index + 1}:`}</div>
            <TextField
              value={lmValues===0?'':lmValues}
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
