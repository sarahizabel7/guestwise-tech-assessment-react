import React from "react";
import {
  ListGroup,
  Stack,
  Form,
  Row,
  Col,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { Restaurant } from "../../types";
import { filterRestaurants, Sort, sortRestaurants } from "../../utils";

type RestaurantListProps = {
  restaurants: Restaurant[];
  onRestaurantSelect: (restaurant: Restaurant) => void;
};

const RestaurantList: React.FC<RestaurantListProps> = ({
  restaurants,
  onRestaurantSelect,
}) => {
  const [sortedBy, setSortedBy] = React.useState<Sort>("rating");
  const [filter, setFilter] = React.useState<string>("");

  const onSortChange = (sortBy: Sort) => {
    setSortedBy(sortBy);
  };

  const filteredList = restaurants
    .sort(sortRestaurants(sortedBy))
    .filter(filterRestaurants(filter));

  return (
    <Stack gap={2}>
      <h2>Restaurants</h2>
      <Stack gap={2}>
        <FormControl
          type="text"
          id="search"
          name="search"
          placeholder="Search..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <Row>
          <Col>
            <FormLabel>Filter by:</FormLabel>
          </Col>

          <Col>
            <Form.Check
              type="radio"
              label="Rating"
              onChange={() => onSortChange("rating")}
              checked={sortedBy === "rating"}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              onChange={() => onSortChange("name")}
              checked={sortedBy === "name"}
              label="Name"
            />
          </Col>
        </Row>
      </Stack>
      <ListGroup>
        {filteredList.length
          ? filteredList.map((restaurant) => (
              <ListGroup.Item
                key={restaurant.id}
                action
                onClick={() => onRestaurantSelect(restaurant)}
              >
                <h5>{restaurant.name}</h5>
                <p>{restaurant.shortDescription}</p>
              </ListGroup.Item>
            ))
          : "No restaurants found"}
      </ListGroup>
    </Stack>
  );
};

export { RestaurantList };
