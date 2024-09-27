import React from "react";
import { Card, Container } from "react-bootstrap";
import { useRestaurantDetails } from "../hooks";

type RestaurantDetailsProps = {
  restaurantId: number;
};

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({
  restaurantId,
}) => {
  const { restaurantDetails } = useRestaurantDetails(restaurantId);

  if (!restaurantId || !restaurantDetails) return null;

  const { address, reviewScore, contactEmail } = restaurantDetails;

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Restaurant Details</Card.Title>
          <Card.Text>Address: {address}</Card.Text>
          <Card.Text>Review Score: {reviewScore}</Card.Text>
          <Card.Text>Contact: {contactEmail}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RestaurantDetails;
