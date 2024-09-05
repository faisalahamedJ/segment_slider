import { Box, Link, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import SelectComponent from "./SelectComponent";

const SCHEMA_OPTIONS = [
  { label: "First Name", value: "first_name " },
  { label: "Last Name", value: "last_name " },
  { label: "Gender", value: "gender " },
  { label: "Age", value: "age " },
  { label: "City", value: "city " },
  { label: "Account Name", value: "account_name " },
  { label: "State", value: "state " },
];

const AddSchemaContainer = ({ schemas, setSchemas }) => {
  const [selectedSchema, setSelectedSchema] = useState("");

  const handleCheckBoxChange = useCallback(
    (val, option) => {
      if (!val) {
        setSchemas(schemas?.filter((ea) => ea?.value !== option?.value));
      }
    },
    [schemas]
  );

  const handleChange = useCallback(
    (val) => {
      const value = val.target.value;
      const isExist = schemas?.some((so) => so.value === value?.value);
      if (!isExist) {
        setSelectedSchema(value);
      } else {
        handleCheckBoxChange(false, value);
      }
    },
    [schemas]
  );

  const handleChangeExistingSchema = useCallback(
    (e, val) => {
      const selectedValue = e.target.value;
      const tmp = schemas.map((each) => {
        if (each?.value === val?.value) {
          return selectedValue;
        }
        return each;
      });
      setSchemas(tmp);
    },
    [schemas]
  );

  const handleAddSchemas = useCallback(() => {
    if (selectedSchema) {
      setSchemas([...schemas, selectedSchema]);
      setSelectedSchema("");
    }
  }, [schemas, selectedSchema]);

  return (
    <Box sx={{ padding: "0 2rem" }}>
      <Typography variant="h6" sx={{ fontSize: "16px" }}>
        To Save your segment, You need to add the schemas to build the query
      </Typography>
      {Boolean(schemas?.length) && (
        <Box
          sx={{
            width: "95%",
            minHeight: "5vh",
            border: "2px solid #229799",
            padding: "1rem",
            margin: "1rem 0",
            borderRadius: "10px",
          }}
        >
          {schemas?.map((each) => (
            <Box
              key={each.value}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                margin: "0.5rem 0",
              }}
            >
              <SelectComponent
                value={each}
                onChange={(e) => handleChangeExistingSchema(e, each)}
                Options={SCHEMA_OPTIONS?.filter(
                  (option) => !schemas.some((so) => so?.value === option?.value)
                )}
              />
              <Box
                sx={{
                  bgcolor: "#48CFCB",
                  color: "#F5F5F5",
                  padding: "0.3rem 1.3rem",
                  borderRadius: "8px",
                  margin: "0.5rem auto",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: 32,
                }}
                onClick={() => handleCheckBoxChange(false, each)}
              >
                -
              </Box>
            </Box>
          ))}
        </Box>
      )}

      <Box sx={{ position: "relative", margin: "1rem 0" }}>
        {!selectedSchema && (
          <Typography
            variant="h6"
            sx={{
              fontSize: "16px",
              position: "absolute",
              top: "1.5rem",
              left: "1rem",
              color: "#A9A9A9",
            }}
          >
            Add Schema to segment
          </Typography>
        )}
        <SelectComponent
          value={selectedSchema}
          onChange={handleChange}
          Options={SCHEMA_OPTIONS}
          showCheckbox
          checkBoxValue={schemas}
          handleCheckBoxChange={handleCheckBoxChange}
        />
      </Box>

      <Link
        component="button"
        variant="body2"
        sx={{ fontWeight: 600 }}
        onClick={handleAddSchemas}
      >
        + Add New Schema
      </Link>
    </Box>
  );
};

export default AddSchemaContainer;

AddSchemaContainer.propTypes = {
  schemas: PropTypes.array,
  setSchemas: PropTypes.func,
};
