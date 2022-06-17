import { Box } from "@mui/material";
import PropTypes from "prop-types";

const ImageInfo = ({author, width, height}) => {
  return (
    <Box p={1}>
      <Box mb={1}>
        Author: {author}
      </Box>
      <Box  mb={1}>
        Width: {width}
      </Box>
      <Box  mb={1}>
        Height: {height}
      </Box>
    </Box>
  )
};

ImageInfo.propTypes = {
  author: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

export default ImageInfo;