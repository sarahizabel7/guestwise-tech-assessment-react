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
          <Card.Title data-testid="restaurant-name">
            {restaurant.name}
          </Card.Title>
          <Card.Text data-testid="restaurant-address">
            📍 <b>Address:</b> {address}
          </Card.Text>
          <Card.Text data-testid="restaurant-review">
            ⭐️ <b>Review Score:</b> {reviewScore}
          </Card.Text>
          <Card.Text data-testid="restaurant-email">
            📩 <b>Contact:</b> {contactEmail}
          </Card.Text>
          <Card.Text>
            🕑 <b>Opening Hours:</b>
          </Card.Text>

          <ListGroup>
            <ListGroupItem data-testid="restaurant-weekday-hours">
              Weekday: {openingHours.weekday}
            </ListGroupItem>
            <ListGroupItem data-testid="restaurant-weekend-hours">
              Weekend: {openingHours.weekend}
            </ListGroupItem>
          </ListGroup>
        </Card.Body>
      </Card>
    </Stack>
  );
};

export { RestaurantDetails };
