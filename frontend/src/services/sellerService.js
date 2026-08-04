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

        throw new Error(
            "User not logged in"
        );

    }


    return user;

};





/* ===========================================
   GET AUTH TOKEN
=========================================== */


const getAuthHeader = () => {


    const user = getLoggedUser();


    return {

        Authorization:
        `Bearer ${user.token}`

    };

};





/* ===========================================
   GET INVENTORY
=========================================== */


export const getInventory = async () => {


    try {


        const response = await api.get(

            "/inventory",

            {

                headers:

                getAuthHeader()

            }

        );


        return response.data.data || response.data;


    }

    catch(error){


        console.error(
            "Get Inventory Error:",
            error
        );


        throw error;


    }


};

/* ===========================================
   GET SELLER DASHBOARD
=========================================== */


export const getSellerDashboard = async () => {


    try {


        const response = await api.get(

            "/seller/dashboard",

            {

                headers:

                getAuthHeader()

            }

        );


        return response.data.data || response.data;


    }

    catch(error){


        console.error(
            "Seller Dashboard Error:",
            error
        );


        throw error;


    }


};

/* ===========================================
   UPDATE INVENTORY
=========================================== */


export const updateInventory = async (

    inventoryId,

    availableQuantity

) => {


    try {


        const response = await api.put(


            `/inventory/${inventoryId}`,


            {


                availableQuantity:

                Number(availableQuantity)


            },


            {


                headers:

                getAuthHeader()


            }


        );



        return response.data.data || response.data;



    }

    catch(error){


        console.error(

            "Update Inventory Error:",

            error

        );


        throw error;


    }


};

/* ===========================================
   REDUCE INVENTORY
=========================================== */

export const reduceInventory = async (
    inventoryId,
    quantity
) => {


    const response = await api.put(

        `/inventory/${inventoryId}/reduce`,

        {
            quantity: Number(quantity)
        },

        {
            headers: getAuthHeader()
        }

    );


    return response.data.data || response.data;

};

/* ===========================================
   CREATE SALE
=========================================== */

export const createSale = async (saleData) => {

    const user = getLoggedUser();


    const response = await api.post(

        "/sales",

        saleData,

        {

            headers: {

                Authorization: `Bearer ${user.token}`

            }

        }

    );


    return response.data;

};

/* ===========================================
   GET ALL SALES
=========================================== */

export const getAllSales = async () => {

    const user = getLoggedUser();

    const response = await api.get(

        "/sales",

        {

            headers: {

                Authorization: `Bearer ${user.token}`

            }

        }

    );

    return response.data;

};

/* ===========================================
   GET STOCK HISTORY
=========================================== */

export const getStockHistory = async () => {


    const response = await api.get(

        "/inventory-history",

        {
            headers: getAuthHeader()
        }

    );


    return response.data.data || response.data;


};

/* ==========================================
   GET SALES HISTORY
========================================== */

export const getSalesHistory = async () => {


    const user = getLoggedUser();


    const response = await api.get(

        "/sales",

        {

            headers:{

                Authorization:
                `Bearer ${user.token}`

            }

        }

    );


    return response.data.data || response.data;


};

// =====================================
// PAYMENT MANAGEMENT
// =====================================


export const getAllMilkSupplies = async () => {

    try {

        const response = await api.get(
            "/milk-supplies",
            {
                headers: getAuthHeader()
            }
        );


        return response.data.data || [];


    }
    catch(error){

        console.error(
            "Get Milk Supplies Error:",
            error
        );

        throw error;

    }

};


// =====================================
// PAYMENT MANAGEMENT
// =====================================


export const createPayment = async (paymentData) => {

    try {

        const response = await api.post(

            "/payments",

            paymentData,

            {
                headers: getAuthHeader()
            }

        );


        return response.data.data;


    } catch(error){

        console.error(
            "Create Payment Error:",
            error
        );

        throw error;

    }

};



export const getVendorPayments = async (vendorId) => {

    try {

        const response = await api.get(
            `/payments/vendors/${vendorId}`,
            {
                headers: getAuthHeader()
            }
        );


        return response.data.data;


    } catch(error){

        console.error(
            "Vendor Payments Error:",
            error
        );

        throw error;
    }

};