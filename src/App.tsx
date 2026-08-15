import { Route, Routes } from "react-router-dom";
import GuestRoute from "@/modules/GuestRoute.tsx";
import ProtectedRoute from "@/modules/ProtectedRoute.tsx";
import Home from "@/pages/Home/Home.tsx";
import Login from "@/pages/Login/Login.tsx";
import Signup from "@/pages/Signup/Signup.tsx";
import MealLogPage from "@/pages/MealLog/MealLogPage.tsx";
import FoodDetailPage from "@/pages/FoodDetail/FoodDetailPage.tsx";
import WaterLogPage from "@/pages/WaterLog/WaterLogPage.tsx";

const App = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/mealLog/:mealType" element={<MealLogPage />} />
        <Route path="/mealLog/:mealType/foods/:offId" element={<FoodDetailPage />} />
        <Route path="/water" element={<WaterLogPage />} />
      </Route>
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
};

export default App;

