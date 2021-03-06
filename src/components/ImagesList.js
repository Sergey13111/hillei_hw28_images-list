import axios from "../helpers/axios";
import { useEffect, useState } from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Container, Button, CircularProgress, Box, Dialog, DialogTitle } from '@mui/material';

import ImageInfo from "./ImageInfo";

const ImagesList = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedImageData, setSelectedImageData] = useState({ author:null, width:null, height:null });

  const author = selectedImageData.author;
  const width = selectedImageData.width;
  const height = selectedImageData.height;

  const handleDialogOpen = ({ author, width, height }) => () => {
    setDialogOpen(true);
    setSelectedImageData({ author, width, height });
  };
 
  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedImageData({ author:null, width:null, height:null });
  };

  useEffect(() => {
    const params = {
      page:page,
      limit:10
    };
    
    axios
    .get("/v2/list",{params})
    .then((newImages) => {
      setImages(prevImages => [...prevImages, ...newImages])
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
    });
  },[page]);

    const handleClick = () => {
    setPage(page => page += 1)
  };

  return (
    <>
      <Container maxWidth="md" width="100%" margin="0 auto" sx={{textAlign:"center", padding:"20px"}}>
        <h1>Image Gallery</h1>
      
        <ImageList  cols={2} gap={10} rowHeight={194}>
          {images.map(({ author, width, height, id, download_url }) => (
            <ImageListItem key={id}>
              <img style={{ height: 100, objectFit: "contain" }} 
                onClick={handleDialogOpen({ author, width, height })}
                src={`${download_url}?w=144&h=194&fit=crop&auto=format`}
                srcSet={`${download_url}?w=144&h=194&fit=crop&auto=format&dpr=2 2x`}
                alt={author}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>

        {isLoading ? 
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>:
        <Button color="primary" size="large" onClick={handleClick}>Show More</Button>}
      </Container>
      
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle sx={{ fontWeight:600, textAlign:"center" }}>Information</DialogTitle>
          <ImageInfo author={author} width={width} height={height} />
      </Dialog>
    </>
  );
};

export default ImagesList;