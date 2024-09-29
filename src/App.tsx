import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import RestaurantsProvider from "./providers/RestaurantsProvider";
import Home from "./pages/Home";

function App() {
  return (
    <RestaurantsProvider>
      <Home />
    </RestaurantsProvider>
  );
}

export default App;
