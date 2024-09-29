import { Col, Container, Row, Stack } from "react-bootstrap";
import { RestaurantList } from "../components/RestaurantList/RestaurantList";
import { RestaurantDetails } from "../components/RestaurantDetails/RestaurantDetails";
import { BookTable } from "../components/BookTable/BookTable";
import { useRestaurants } from "../hooks";

const Home = () => {
  const { restaurants, selectedRestaurant, setSelectedRestaurant } =
    useRestaurants();

  return (
    <Container style={{ padding: 10 }}>
      <Row>
        <Col md={4}>
          <RestaurantList
            restaurants={restaurants}
            onRestaurantSelect={setSelectedRestaurant}
          />
        </Col>
        <Col md={8}>
          {selectedRestaurant && (
            <Stack gap={4}>
              <RestaurantDetails restaurant={selectedRestaurant} />
              <BookTable restaurant={selectedRestaurant} />
            </Stack>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export { Home };
