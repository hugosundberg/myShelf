import Rating from "@mui/material/Rating";

interface RatingProps {
  handleRating?: (rating: number) => void;
  value: number;
}

const HalfRating = ({ handleRating, value }: RatingProps) => {
  return (
    <Rating
      name={handleRating ? "half-rating" : "read-only"}
      size={handleRating ? "large" : "small"}
      value={value} // Use `value` to make this a controlled component
      precision={0.5}
      readOnly={!handleRating} // Set `readOnly` if no handleRating function is provided
      onChange={(_e, newValue) => {
        if (newValue !== null && handleRating) {
          handleRating(newValue);
        }
      }}
    />
  );
};

export default HalfRating;
