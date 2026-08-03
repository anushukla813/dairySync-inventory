import axios from "axios";

const api = axios.create({

    baseURL: "http://localhost:8080/api"

});

/* ===========================================
   GET LOGGED USER
=========================================== */

const getLoggedUser = () => {

    const user = JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    if (!user) {

        throw new Error("User not logged in");

    }

    return user;

};

/* ===========================================
   GET SELLER DASHBOARD INVENTORY
=========================================== */

export const getInventory = async () => {

    const user = getLoggedUser();

    const response = await api.get(

        "/inventory",

        {

            headers: {

                Authorization: `Bearer ${user.token}`

            }

        }

    );

    return response.data.data || response.data;

};