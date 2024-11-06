import Rating from "@mui/material/Rating";

interface RatingProps {
  handleRating?: (rating: number | null) => void;
  value: number;
}

export default function HalfRating({ handleRating, value }: RatingProps) {
  if (!handleRating) {
    console.log("small");

    return (
      <Rating
        name="read-only"
        size="small"
        defaultValue={value}
        precision={0.5}
        readOnly
      />
    );
  } else {
    return (
      <Rating
        name="half-rating"
        size="large"
        defaultValue={value}
        precision={0.5}
        onChange={(e, newValue) => {
          if (newValue === null) {
            handleRating(0);
          } else {
            handleRating(newValue);
          }
        }}
      />
    );
  }
}
