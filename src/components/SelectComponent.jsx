import { Checkbox, MenuItem, OutlinedInput, Select } from "@mui/material";
import PropTypes from "prop-types";

const SelectComponent = ({
  value,
  onChange,
  Options = [],
  showCheckbox = false,
  checkBoxValue = [],
  handleCheckBoxChange,
}) => {
  return (
    <>
      <Select
        sx={{ width: "90%", margin: "0.5rem 0" }}
        size="medium"
        value={value}
        onChange={onChange}
        input={<OutlinedInput />}
        renderValue={(selected) => selected?.label}
      >
        {Options.map((option) => (
          <MenuItem key={option.value} value={option}>
            {showCheckbox && (
              <Checkbox
                checked={checkBoxValue?.some((so) => so.value === option.value)}
                onChange={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleCheckBoxChange(e.target.checked, option);
                }}
              />
            )}
            {option?.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default SelectComponent;

SelectComponent.propTypes = {
  value: PropTypes.oneOfType(Object, Array),
  onChange: PropTypes.func,
  handleCheckBoxChange: PropTypes.func,
  Options: PropTypes.array,
  showCheckbox: PropTypes.bool,
  checkBoxValue: PropTypes.array,
};
