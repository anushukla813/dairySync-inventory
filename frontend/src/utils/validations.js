export const validateRegister = (data) => {
    let errors = {};

    if (!data.name){
        errors.name = "name is reqquired";
    }

    if (!data.email){
        errors.email = "Email is required";
    }

    if (!data.password){
        errors.password = "Password is required";
    }

    else if (data.password.length < 6){
        errors.password = "Password must be at least 6 characters";
    }

    return errors;
};

export const validateLogin = (data) => {
    let errors = {};

    if (!data.email){
        errors.email = "Email is required";
    }
    
    if (!data.password){
        errors.password = "Password is required";
    }

    return errors;
};