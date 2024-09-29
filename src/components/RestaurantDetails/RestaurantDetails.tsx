import React from "react";
import { Card, Stack, ListGroup, ListGroupItem } from "react-bootstrap";
import { Restaurant } from "../../types";

type RestaurantDetailsProps = {
  restaurant: Restaurant;
};

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({
  restaurant,
}) => {
  const { address, reviewScore, contactEmail, openingHours } =
    restaurant.details;

  return (
    <Stack>
      <Card>
        <Card.Body>
          <Card.Title>{restaurant.name}</Card.Title>
          <Card.Text>
            📍 <b>Address:</b> {address}
          </Card.Text>
          <Card.Text>
            ⭐️ <b>Review Score:</b> {reviewScore}
          </Card.Text>
          <Card.Text>
            📩 <b>Contact:</b> {contactEmail}
          </Card.Text>
          <Card.Text>
            🕑 <b>Opening Hours:</b>
          </Card.Text>

          <ListGroup>
            <ListGroupItem>Weekday: {openingHours.weekday}</ListGroupItem>
            <ListGroupItem>Weekend: {openingHours.weekend}</ListGroupItem>
          </ListGroup>
        </Card.Body>
      </Card>
    </Stack>
  );
};

export { RestaurantDetails };
