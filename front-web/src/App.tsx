import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ApiTestPage from "./presentation/pages/ApiTestPage";
import Top from "./presentation/pages/Top";
import CallbackPage from "./presentation/pages/callbackpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/top" element={<Top />} />
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="/scores" element={<ApiTestPage />} />
        <Route path="*" element={<Navigate to="/top" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
