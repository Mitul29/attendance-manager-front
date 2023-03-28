import useAuth from "./core/hooks/useAuth";
import RouteComponent from "./routes";

function App() {
  const { isLoading, isInitialized } = useAuth();

  return (
    <div className="App">
      {isInitialized && !isLoading ? <RouteComponent /> : <>Loading...</>}
    </div>
  );
}

export default App;
