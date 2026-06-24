export const registerUser = (userData) => {
    const users = 
       JSON.parse(localStorage.getItem("users")) || [];
 
    const existingUser = users.find(
        (user) => user.email === userData.email
    );

    if (existingUser){
        return{
            success: false,
            message: "User already exists"
        };
    }

    users.push(userData);

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    return{
        success: true,
        message: "Registration successful"
    };
};

export const loginUser = (email, password) => {

    const users =
       JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
        (u) =>
            u.email === email &&
        u.password === password
    );

    if (!user){
        
        return{
            success: false,
            message: "Invalid email or password"
        };
    }

    localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
    );

    return{
        success: true,
        user
    };
};

export const logoutUser = () => {
    localStorage.removeItem("loggedInUser");
};