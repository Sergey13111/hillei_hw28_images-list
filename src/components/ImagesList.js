import axios from "../helpers/axios";
import { useEffect, useState } from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Container, Button, CircularProgress, Box } from '@mui/material';
// import { Dialog, DialogTitle } from "@mui/material";

const ImagesList = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  // const [isDialogOpen, setDialogOpen] = useState(false);
  // const [selectedImageData, setSelectedImageData] = useState(null);

  // const handleDialogOpen = ({...imageData}) => () => {
  //   setDialogOpen(true);
  //   setSelectedImageData({...imageData});
  // };
  // console.log(selectedImageData)
 
  // const handleDialogClose = () => {
  //   setDialogOpen(false);
  //   setSelectedImageData(null)
  // };

  useEffect(() => {
    const params = {
      page:`${page+1}`,
      limit:10
    };
    
    axios
    .get("/v2/list",{params})
    .then((newImages) => {
      setImages(prevImages => [...prevImages, ...newImages])
      setLoading(false);
      // setLoadingB(false);
    })
    .catch((error) => {
      console.error(error);
    });
  },[page]);

    const handleClick = () => {
    setPage(page=>page+=1 )
  };

  return (
    <>
      {/* <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Title</DialogTitle>
        <p> </p>
      </Dialog> */}
      <Container maxWidth="md" width="100%" margin="0 auto" sx={{textAlign:"center", padding:"20px"}}>
        <h1>Image Gallery</h1>
      
        <ImageList  cols={2} gap={10} rowHeight={194}>
          {images.map(({ id, author, width, height, download_url }) => (
            <ImageListItem key={id}>
              <img style={{ height: 100, objectFit: "contain" }} 
                // onClick={handleDialogOpen({width,author,height})}
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
    </>
  );
}

export default ImagesList;