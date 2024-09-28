import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Col, Container, Row, Stack } from "react-bootstrap";
import RestaurantList from "./components/RestaurantList";
import RestaurantDetails from "./components/RestaurantDetails";
import BookTable from "./components/BookTable";

function App() {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    number | null
  >(null);

  return (
    <Container>
      <Row>
        <Col md={4}>
          <RestaurantList onRestaurantSelect={setSelectedRestaurantId} />
        </Col>
        <Col md={8}>
          {selectedRestaurantId && (
            <Stack gap={4}>
              <RestaurantDetails restaurantId={selectedRestaurantId} />
              <BookTable restaurantId={selectedRestaurantId} />
            </Stack>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
