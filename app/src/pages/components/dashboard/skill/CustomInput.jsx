import React, { useEffect, useState } from "react";
import { Button, TextField, IconButton, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Delete } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    justifyContent: "space-between",
  },
  addButton: {
    marginLeft: theme.spacing(1),
    borderRadius: "30px",
    boxShadow:
      "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)",
  },
  customButton: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: "30px",
    boxShadow:
      "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)",
  },
}));

export function CustomInput({ inputPlaceholder, onUpdate }) {
  const classes = useStyles();
  const [customInput, setCustomInput] = useState("");
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    if (customInput.trim() !== "") {
      setItems([...items, customInput.trim()]);
      setCustomInput("");
    }
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  useEffect(() => {
    onUpdate(items);
  }, []);

  return (
    <div>
      <div className={classes.inputContainer}>
        <TextField
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder={inputPlaceholder}
        />
        <Button
          className={classes.addButton}
          variant="contained"
          onClick={handleAddItem}
        >
          Add
        </Button>
      </div>
      <div>
        <Paper className={classes.customButton}>
          {items.map((skill, index) => (
            <Button variant="text" key={index}>
              {skill}
              <IconButton onClick={() => handleRemoveItem(index)}>
                <Delete />
              </IconButton>
            </Button>
          ))}
        </Paper>
      </div>
    </div>
  );
}
