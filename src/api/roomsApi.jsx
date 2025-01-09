import { apiClient } from ".";

export const createRoom = (data) => {
    return apiClient.post("/rooms/create-room", data);
};

export const getAllRooms = () => {
    return apiClient.get("/rooms/get-all-rooms");
};