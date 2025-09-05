import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApiTestPage from "./presentation/pages/ApiTestPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ApiTestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;