import React, { useEffect, useState } from "react";
import { Button, TextField, IconButton, Paper } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  justifyContent: "space-between",
}));
const AddButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  borderRadius: "30px",
  boxShadow:
    "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)",
}));
const CustomPaper = styled(Paper)(({ theme }) => ({
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
  borderRadius: "30px",
  boxShadow:
    "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)",
}));

export function CustomInput({ inputPlaceholder, onUpdate }) {
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
      <Wrapper>
        <TextField
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder={inputPlaceholder}
        />
        <AddButton variant="contained" onClick={handleAddItem}>
          Add
        </AddButton>
      </Wrapper>
      <div>
        <CustomPaper>
          {items.map((skill, index) => (
            <Button variant="text" key={index}>
              {skill}
              <IconButton onClick={() => handleRemoveItem(index)}>
                <Delete />
              </IconButton>
            </Button>
          ))}
        </CustomPaper>
      </div>
    </div>
  );
}
