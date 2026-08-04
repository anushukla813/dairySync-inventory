import axios from "axios";


const api = axios.create({

    baseURL: "http://localhost:8080/api"

});



/* ===========================================
   GET LOGGED USER
=========================================== */

const getLoggedUser = () => {

    const user =
        JSON.parse(
            localStorage.getItem("loggedInUser")
        );

    if(!user){

        throw new Error(
            "User not logged in"
        );

    }

    return user;

};




/* ===========================================
   ADD MILK SUPPLY
=========================================== */

export const addMilkSupply = async(supplyData)=>{


    const user = getLoggedUser();


    const response =
        await api.post(

            `/milk-supplies/${user.vendorId}`,

            supplyData,

            {

                headers:{

                    Authorization:
                    `Bearer ${user.token}`

                }

            }

        );


    return response.data;

};





/* ===========================================
   GET VENDOR DASHBOARD
=========================================== */


export const getVendorDashboard = async()=>{


    const user = getLoggedUser();


    const response =
        await api.get(

            "/vendor/dashboard",

            {

                headers:{

                    Authorization:
                    `Bearer ${user.token}`

                }

            }

        );


    return response.data.data || response.data;

};





/* ===========================================
   GET VENDOR PROFILE
=========================================== */


export const getVendorProfile = async(userId)=>{


    const user = getLoggedUser();


    const response =
        await api.get(

            `/vendors/${userId}`,

            {

                headers:{

                    Authorization:
                    `Bearer ${user.token}`

                }

            }

        );


    return response.data.data || response.data;

};





/* ===========================================
   UPDATE PROFILE
=========================================== */


export const updateVendorProfile =
async(
    userId,
    vendorData
)=>{


    const user = getLoggedUser();


    const response =
        await api.put(

            `/vendors/${userId}`,

            vendorData,

            {

                headers:{

                    Authorization:
                    `Bearer ${user.token}`,

                    "Content-Type":
                    "application/json"

                }

            }

        );


    return response.data;

};






/* ===========================================
   GET MILK TYPES
=========================================== */


export const getMilkTypes = async()=>{


    const user = getLoggedUser();


    const response =
        await api.get(

            "/milk-types",

            {

                headers:{

                    Authorization:
                    `Bearer ${user.token}`

                }

            }

        );


    return response.data.data || response.data;

};

/* ===========================================
   GET LOGGED IN VENDOR PAYMENTS
=========================================== */


export const getVendorPayments = async()=>{


    const user = getLoggedUser();


    const response = await api.get(

        "/payments/vendor",

        {

            headers:{

                Authorization:
                `Bearer ${user.token}`

            }

        }

    );


    return response.data.data || [];

};

/* ===========================================
   GET VENDOR BY USER ID
=========================================== */


export const getVendorByUserId =
async(userId)=>{


    const user = getLoggedUser();


    const response =
        await api.get(

            `/vendors/${userId}`,

            {

                headers:{

                    Authorization:
                    `Bearer ${user.token}`

                }

            }

        );


    return response.data.data || response.data;

};


/* ===========================================
   GET MILK HISTORY
=========================================== */


export const getMilkHistory = async () => {

    const user = getLoggedUser();

    const response = await api.get(
        "/vendor/milk-history",
        {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
    );

    return response.data;
};