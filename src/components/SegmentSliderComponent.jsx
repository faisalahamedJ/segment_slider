import { Box, Button, Drawer, Typography } from "@mui/material";
import PropTypes from "prop-types";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import InputContainer from "./InputContainer";
import { useCallback, useState } from "react";
import AddSchemaContainer from "./AddSchemaContainer";
import { postSaveSegment } from "../service/service";

const SegmentDrawerContainer = ({ showSlider, toggleSlider }) => {
  const [segmentName, setSegmentName] = useState("");
  const [schemas, setSchemas] = useState([]);

  const handleSave = useCallback(async () => {
    const newSchema = schemas.reduce((acc, val) => {
      acc[val.value] = val.label;
      return acc;
    }, {});
    const payload = {
      segment_name: segmentName,
      schema: [newSchema],
    };
    await postSaveSegment(payload);
    toggleSlider();
  }, [segmentName, schemas]);
  return (
    <Drawer anchor="right" open={showSlider} onClose={toggleSlider}>
      <Box
        sx={{
          width: "50vw",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <span>
          <Box
            sx={{
              paddingLeft: "2rem",
              height: "5rem",
              display: "flex ",
              alignItems: "center",
              bgcolor: "#48CFCB",
              color: "#F5F5F5",
            }}
          >
            <ArrowBackIosIcon
              fontSize="24px"
              sx={{ cursor: "pointer" }}
              onClick={toggleSlider}
            />
            <Typography
              sx={{ cursor: "pointer" }}
              onClick={toggleSlider}
              variant="h6"
            >
              Saving Segment
            </Typography>
          </Box>

          <InputContainer value={segmentName} setValue={setSegmentName} />
          <AddSchemaContainer schemas={schemas} setSchemas={setSchemas} />
        </span>
        <Box sx={{ padding: "2rem", bgcolor: "#EEEDEB" }}>
          <Button
            variant="contained"
            sx={{ bgcolor: "#48CFCB", color: "#F5F5F5", fontWeight: 500 }}
            onClick={handleSave}
            disabled={!segmentName || !schemas?.length}
          >
            Save the Segment
          </Button>
          <Button
            variant="outlined"
            sx={{
              marginLeft: "1rem",
              bgcolor: "#fff",
              color: "#B31312",
              border: "none",
              fontWeight: 500,
            }}
            onClick={toggleSlider}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default SegmentDrawerContainer;

SegmentDrawerContainer.propTypes = {
  showSlider: PropTypes.bool,
  toggleSlider: PropTypes.func,
};
