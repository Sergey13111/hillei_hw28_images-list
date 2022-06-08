import { useEffect, useState } from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Container, Button, CircularProgress, Box } from '@mui/material';
import axios from "../helpers/axios";

const ImagesList = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    axios
    .get(`/v2/list?page=1&limit=${limit}`)
    .then((data) => {
      setImages(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
    });
  }, [limit]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "150px" }}>
        <CircularProgress />
      </Box>
    );
  };

  const handleClick = () => {
    setLimit((limit)=>limit+=10)
  };

  return (
    <>
      <Container maxWidth="md" width="100%" margin="0 auto" sx={{textAlign:"center", padding:"20px"}}>
        <h1>Image Gallery</h1>
        <ImageList  cols={2} gap={10} rowHeight={194}>
          {images.map(({ id, author, download_url }) => (
            <ImageListItem key={id}>
              <img style={{ height: 100, objectFit: "contain" }}
                src={`${download_url}?w=144&h=194&fit=crop&auto=format`}
                srcSet={`${download_url}?w=144&h=194&fit=crop&auto=format&dpr=2 2x`}
                alt={author}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
        <Button variant="contained" onClick={handleClick}>Show more</Button>
      </Container>
    </>
  );
}

export default ImagesList;