const API_URL = "http://localhost:8080/api";

/* ADD MILK ENTRY */

export const addMilkSupply = async (supplyData)=>{


    const loggedUser =
    JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    console.log("Logged User in addMilkSupply:",
        loggedUser
    );

    console.log("Vendor ID:",
        loggedUser.vendorId
    );

    console.log("Token:", loggedUser.token);


    const response = await fetch(

        `${API_URL}/milk-supplies/${loggedUser.vendorId}`,

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json",

                "Authorization":
                `Bearer ${loggedUser.token}`

            },


            body:JSON.stringify(supplyData)

        }

    );


    const data =
    await response.json();


    if(!response.ok){

        throw new Error(
            data.message ||
            "Milk supply failed"
        );

    }


    return data;

};


/* ===========================================
   GET VENDOR DASHBOARD DATA
=========================================== */

export const getVendorDashboard = async () => {

    try {

        const loggedUser = JSON.parse(
            localStorage.getItem("loggedInUser")
        );


        const response = await fetch(
            `${API_URL}/vendor/dashboard`,
            {
                method:"GET",

                headers:{
                    "Authorization":
                    `Bearer ${loggedUser.token}`,

                    "Content-Type":"application/json"
                }
            }
        );


        const data = await response.json();


        if(!response.ok){

            throw new Error(
                data.message || "Dashboard fetch failed"
            );

        }


        return data.data;


    }
    catch(error){

        console.log(
            "Dashboard API Error:",
            error
        );


        throw error;

    }

};

/* ==========================================
   GET VENDOR PROFILE
========================================== */

export const getVendorProfile = async (userId) => {


    const loggedUser = JSON.parse(
        localStorage.getItem("loggedInUser")
    );


    const response = await fetch(

        `${API_URL}/vendors/${userId}`,

        {

            headers:{
                "Authorization":
                `Bearer ${loggedUser.token}`
            }

        }

    );


    if (!response.ok) {

        throw new Error(
            "Failed to fetch vendor profile"
        );

    }


    return await response.json();

};


/* ==========================================
   UPDATE PROFILE
========================================== */

export const updateVendorProfile = async (
    userId,
    vendorData
) => {


    const loggedInUser = JSON.parse(
        localStorage.getItem("loggedInUser")
    );
    
    const response = await fetch(

        `${API_URL}/vendors/${userId}`,

        {

            method:"PUT",

            headers:{

                "Content-Type":"application/json",
                "Authorization":`Bearer ${loggedInUser.token}`

            },

            body:JSON.stringify(vendorData)

        }

    );

    if(!response.ok){

        throw new Error(
            "Failed to update profile"
        );

    }

    return await response.json();

};



/* ==========================================
   GET MILK TYPES
========================================== */

export const getMilkTypes = async()=>{

    const loggedUser = JSON.parse(
        localStorage.getItem("loggedInUser")
    );


    const response = await fetch(

        `${API_URL}/milk-types`,

        {

            method:"GET",

            headers:{
                "Authorization":
                `Bearer ${loggedUser.token}`,
                "Content-Type":"application/json"
            }

        }

    );


    const data = await response.json();


    console.log(
        "Milk Type API Response:",
        data
    );


    if(!response.ok){

        throw new Error(
            data.message ||
            "Failed to fetch milk types"
        );

    }


    return data.data || data;

};


export const getVendorPayments = async()=>{

    const response = await fetch(
        `${API_URL}/payments`
    );


    if(!response.ok){

        throw new Error(
            "Failed to fetch payments"
        );

    }


    return await response.json();

};

export const getMilkHistory = async () => {

    const loggedUser = JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    const response = await fetch(

        `${API_URL}/milk-supplies/vendors/${loggedUser.vendorId}`,

        {
            method: "GET",

            headers: {
                "Authorization": `Bearer ${loggedUser.token}`,
                "Content-Type": "application/json"
            }
        }

    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.message || "Failed to fetch milk history"
        );

    }

    return data.data;
};

export const getVendorByUserId = async (userId) => {

    const loggedUser = JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    console.log("Calling vendor API...");
    console.log("User ID:", userId);
    console.log("Token:", loggedUser.token);

    const response = await fetch(

        `http://localhost:8080/api/vendors/${userId}`,

        {
            method:"GET",

            headers:{
                "Authorization":
                `Bearer ${loggedUser.token}`,

                "Content-Type":"application/json"
            }
        }

    );


    const data = await response.json();


    if(!response.ok){

        throw new Error(
            data.message || "Vendor fetch failed"
        );

    }


    return data.data;

};