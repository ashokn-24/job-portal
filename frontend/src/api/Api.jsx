import axios from "axios";
import { useState } from "react";

const Api = () => {
  const [data, setData] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/auth/profile`);
      setData(response.json);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  return (
    <div>
      <button onClick={fetchWeatherData}></button>
      {data && (
        <div>
          {data._id}
          {data.name}
          {data.role}
          {data.email}
        </div>
      )}
    </div>
  );
};

export default Api;
