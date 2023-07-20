import axios from 'axios'
const loginHost: string = "http://localhost:4000/api/users/login";
const registerHost: string = "http://localhost:4000/api/users/register";
const allUsersHost: string = "http://localhost:4000/api/users";

const fetchUsers = async () => {
    const response = await axios.get(allUsersHost);
    if(response.status === 200)
        return response.data;
    return null;
}

export { loginHost, registerHost, allUsersHost,fetchUsers };
