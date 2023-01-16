import axios from "axios";

const classroomApi = axios.create({
    baseURL: '/api'
});

export default classroomApi;