import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { api } from "../../http-common";

const TechnologySelector = ({
  onTechnologySelectChange,
  selectedTechnologies,
}) => {
  const [technologies, setTechnologies] = React.useState([]);
  const [value, setValue] = React.useState([]);

  React.useEffect(() => {
    fetchTechnologies();
  }, []);

  React.useEffect(() => {
    setValue(selectedTechnologies);
  }, [selectedTechnologies]);

  const fetchTechnologies = async () => {
    try {
      const response = await api.get("/technologies");
      const { technologies } = response.data;

      const technologiesAsObjects = technologies.map((tech) => {
        return { label: tech };
      });

      setTechnologies(technologiesAsObjects);
    } catch (error) {
      console.log("Error fetching technologies:", error);
    }
  };

  const handleSelect = (event, values) => {
    setValue(values);
    onTechnologySelectChange(values);
  };

  return (
    <div>
      <Autocomplete
        multiple
        options={technologies}
        value={value}
        disableCloseOnSelect
        getOptionLabel={(option) => option.label}
        onClose={(event, reason) => {
          if (reason === "escape") {
            setValue([]); // Clear the selection on escape
          }
        }}
        onChange={(event, newValue, reason) => {
          if (
            event.type === "keydown" &&
            event.key === "Backspace" &&
            reason === "removeOption"
          ) {
            return;
          }
          handleSelect(event, newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} placeholder="Technology" />
        )}
      />
    </div>
  );
};

export default TechnologySelector;
