import SiteLoader from "./core/components/SiteLoader";
import useAuth from "./core/hooks/useAuth";
import RouteComponent from "./routes";

function App() {
  const { isLoading, isInitialized } = useAuth();

  return (
    <div className="App">
      {isInitialized && !isLoading ? <RouteComponent /> : <SiteLoader />}
    </div>
  );
}

export default App;
