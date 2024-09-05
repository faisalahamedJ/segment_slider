import { useCallback, useState } from "react";
import { Box, Button } from "@mui/material";
import SegmentDrawerContainer from "./components/SegmentSliderComponent";

function App() {
  const [showSlider, setShowSlider] = useState(false);

  const toggleSlider = useCallback(() => {
    setShowSlider(!showSlider);
  }, [showSlider]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button
        variant="contained"
        sx={{ bgcolor: "#48CFCB", color: "#F5F5F5", fontWeight: 500 }}
        onClick={toggleSlider}
      >
        Save Segment
      </Button>
      {showSlider && (
        <SegmentDrawerContainer
          showSlider={showSlider}
          toggleSlider={toggleSlider}
        />
      )}
    </Box>
  );
}

export default App;
