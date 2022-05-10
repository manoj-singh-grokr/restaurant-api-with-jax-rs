import { Grid, Paper, styled } from "@mui/material";
import React from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  height: 500,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  padding: theme.spacing(1),
  textAlign: "center",
  textTransform: "uppercase",
  fontSize: "1.5rem",
  color: "#F7F5F2",
}));

const menu = [
  {
    size: 6,
    image:
      "https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_960_720.jpg",
    content: "Salmon with Salad",
  },
  {
    size: 6,
    image:
      "https://cdn.pixabay.com/photo/2016/01/22/02/13/meat-1155132_960_720.jpg",
    content: "Grilled Venison",
  },
  {
    size: 5,
    image:
      "https://cdn.pixabay.com/photo/2020/02/28/12/40/bibimbap-4887394_960_720.jpg",
    content: "Bimbimbap",
  },
  {
    size: 7,
    image:
      "https://cdn.pixabay.com/photo/2018/07/18/19/12/pasta-3547078_960_720.jpg",
    content: "Pasta",
  },

  {
    size: 6,
    image:
      "https://cdn.pixabay.com/photo/2017/11/17/16/05/duck-2957809_960_720.jpg",
    content: "Roasted Duck",
  },

  {
    size: 3,
    image:
      "https://cdn.pixabay.com/photo/2016/04/04/17/22/meal-1307604_960_720.jpg",
    content: "Asparagus with eggs and tomatoes",
  },

  {
    size: 3,
    image:
      "https://cdn.pixabay.com/photo/2020/09/21/14/07/meal-5590186_960_720.jpg",
    content: "Momos",
  },
];

const FoodMenu = () => {
  return (
    <Grid container spacing={2}>
      {menu.map(({ size, image, content }) => (
        <Grid key={content} item xs={12} md={size}>
          <Item
            sx={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${image})`,
            }}
          >
            {content}
          </Item>
        </Grid>
      ))}
    </Grid>
  );
};

export {menu};
export default FoodMenu;
