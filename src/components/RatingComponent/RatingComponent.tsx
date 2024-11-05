import Rating from "@mui/material/Rating";
import React from "react";

interface RatingProps {
  handleRating: (rating: number | null) => void;
}

export default function HalfRating({ handleRating }: RatingProps) {
  return (
    <Rating
      name="half-rating"
      size="large"
      defaultValue={0}
      precision={0.5}
      onChange={(e, newValue) => {
        handleRating(newValue);
      }}
    />
  );
}
