
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CockpitLayout from "./components/CockpitLayout";

// Import PatternFly CSS
import '@patternfly/react-core/dist/styles/base.css';

const App = () => (
  <BrowserRouter>
    <CockpitLayout>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CockpitLayout>
  </BrowserRouter>
);

export default App;
