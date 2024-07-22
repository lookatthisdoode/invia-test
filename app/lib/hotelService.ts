import axios from "axios";

const BASE_URL = "https://dcontent.inviacdn.net/shared/dev/test-api";

export const getRooms = async (): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/rooms`);
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
  }
};

export const getRoomAvailability = async (id: number): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/room/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching availability for room ${id}:`, error);
  }
};
