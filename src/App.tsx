import { RouterProvider } from "react-router";
import routes from "./routes";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <main>
      <RouterProvider router={routes} />;
      <Toaster />
    </main>
  );
};

export default App;
