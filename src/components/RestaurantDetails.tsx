import React from "react";
import { Card, Container, ListGroup, ListGroupItem } from "react-bootstrap";
import { useRestaurantDetails } from "../hooks";

type RestaurantDetailsProps = {
  restaurantId: number;
};

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({
  restaurantId,
}) => {
  const { restaurantDetails } = useRestaurantDetails(restaurantId);

  if (!restaurantId || !restaurantDetails) return null;

  const { address, reviewScore, contactEmail, openingHours } =
    restaurantDetails;

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Restaurant Details</Card.Title>
          <Card.Text>Address: {address}</Card.Text>
          <Card.Text>Review Score: {reviewScore}</Card.Text>
          <Card.Text>Contact: {contactEmail}</Card.Text>
          <Card.Text>Opening Hours:</Card.Text>

          <ListGroup>
            <ListGroupItem>Weekday: {openingHours.weekday}</ListGroupItem>
            <ListGroupItem>Weekend: {openingHours.weekend}</ListGroupItem>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RestaurantDetails;
