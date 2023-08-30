import React, { useState } from "react";
import { styled } from "@mui/system";

import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Typography,
  Button,
  Switch,
  CircularProgress,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

interface indexProps {
  item: any;
  children?: React.ReactNode;
}

export const NewsItem: React.FC<indexProps> = ({ item }) => {
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Img src={item.image} />
        <Typography
          variant="h5"
          component="div"
          color="text.primary"
          paddingTop={2}
        >
          {item.title}
        </Typography>
        <Typography color="text.secondary">
          {/* variant="p" */}
          {item.text}
        </Typography>
        {item.link && (
          <Typography
            variant="h5"
            component="div"
            justifyContent="right"
            display="flex"
          >
            <Button
              style={{ minWidth: "100px" }}
              variant="contained"
              href={item.link.path}
            >
              {item.link.text}
            </Button>
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
