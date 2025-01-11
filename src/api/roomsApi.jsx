import { apiClient } from ".";

export const createRoom = (data) => {
    return apiClient.post("/rooms/create-room", data);
};

export const getAllRooms = () => {
    return apiClient.get("/rooms/get-all-rooms");
};

export const getRoom = (roomId) => {
    return apiClient.get(`/rooms/${roomId}`);
}