import { useCallback } from "react";
import { Box, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";

const InputContainer = ({ value, setValue }) => {
  const handleOnChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h6" sx={{ fontSize: "16px" }}>
        Enter the Name of the Segment
      </Typography>
      <TextField
        sx={{ marginTop: "0.6rem", width: "90%" }}
        variant="outlined"
        placeholder="Name of the Segment"
        value={value}
        size="small"
        onChange={handleOnChange}
      />
    </Box>
  );
};

export default InputContainer;

InputContainer.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
};
