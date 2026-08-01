import { useState,useEffect } from "react";
import "../../styles/vendor/profile.css";
import {
    getVendorProfile,
    updateVendorProfile
} from "../../services/vendorService";
import {
    FaUser,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaHome,
    FaUniversity,
    FaCreditCard,
    FaMoneyCheckAlt,
    FaUserCircle,
    FaBuilding
} from "react-icons/fa";

export default function Profile() {

const loggedUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);

const userId = loggedUser?.userId;

console.log(loggedUser);
console.log("Profile User ID:", userId);

    const [formData, setFormData] = useState({

        fullName: "",
        email: "",
        phoneNumber: "",
        address: "",
        bankHolderName: "",
        bankAccount: "",
        ifscCode: "",
        branchName: ""

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    useEffect(() => {


    if(userId){


        getVendorProfile(userId)

        .then((data)=>{


            console.log(
                "Vendor Profile:",
                data
            );


            setFormData({

                fullName: data.fullName || "",

                email: data.email || "",

                phoneNumber: data.phoneNumber || "",

                address: data.address || "",

                bankHolderName: data.bankHolderName || "",

                bankAccount: data.bankAccount || "",

                ifscCode: data.ifscCode || "",

                branchName: data.branchName || ""

            });


        })


        .catch((error)=>{


            console.log(
                "Profile Fetch Error:",
                error
            );


        });


    }


}, [userId]);

const handleSubmit = (e)=>{


    e.preventDefault();


    updateVendorProfile(
        userId,
        formData
    )

    .then((response)=>{


        console.log(
            "Profile Updated:",
            response
        );


        alert(
            "Profile Updated Successfully"
        );


    })


    .catch((error)=>{


        console.log(
            "Update Error:",
            error
        );


        alert(
            "Failed to Update Profile"
        );


    });


};

    return (

        <div className="profile-page">

            <div className="profile-card">

                {/* =========================
                    PROFILE HEADER
                ========================= */}

                <div className="profile-header">

                    <FaUserCircle className="profile-avatar" />

                    <p>

                        Manage your personal and bank information

                    </p>

                </div>


                {/* =========================
                    PERSONAL INFORMATION
                ========================= */}

                <div className="profile-section">

                    <h2>Personal Information</h2>

                    <div className="profile-row">

                        <div className="profile-field">

                            <label>
                                 <FaUser className="label-icon"/>
                                 Full Name
                            </label>

                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter full name"
                            />

                        </div>

                        <div className="profile-field">

                            <label>
                                <FaEnvelope className="label-icon"/>
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                            />

                        </div>

                    </div>

                    <div className="profile-row">

                        <div className="profile-field">

                            <label>
                                <FaPhoneAlt className="label-icon" />
                                Phone Number
                            </label>

                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                            />

                        </div>

                        <div className="profile-field">

                            <label>
                                <FaMapMarkerAlt className="label-icon" />
                                Location
                            </label>

                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="Enter location"
                            />

                        </div>

                    </div>

                    <div className="profile-row">

                        <div className="profile-field full-width">

                            <label>
                                <FaHome className="label-icon" />
                                Address
                            </label>

                            <textarea

                                rows="3"

                                name="address"

                                value={formData.address}

                                onChange={handleChange}

                                placeholder="Enter address"

                            />

                        </div>

                    </div>

                </div>


                {/* =========================
                    BANK INFORMATION
                ========================= */}

                <div className="profile-section">

                    <h2>Bank Information</h2>

                    <div className="profile-row">

                        <div className="profile-field">

                            <label>
                                <FaUniversity className="label-icon" />
                                Bank Holder Name
                            </label>

                            <input
                                type="text"
                                name="bankHolderName"
                                value={formData.bankHolderName}
                                onChange={handleChange}
                                placeholder="Enter bank holder name"
                            />

                        </div>

                        <div className="profile-field">

                            <label>
                                <FaCreditCard className="label-icon" />
                                Account Number
                            </label>

                            <input
                                type="text"
                                name="bankAccount"
                                value={formData.bankAccount}
                                onChange={handleChange}
                                placeholder="Enter account number"
                            />

                        </div>

                    </div>

                    <div className="profile-row">

                        <div className="profile-field">

                            <label>
                                <FaMoneyCheckAlt className="label-icon" />
                                IFSC Code
                            </label>

                            <input
                                type="text"
                                name="ifscCode"
                                value={formData.ifscCode}
                                onChange={handleChange}
                                placeholder="Enter IFSC code"
                            />

                        </div>

                        <div className="profile-field">

                            <label>
                                <FaBuilding className="label-icon"/>
                                Branch Name
                            </label>

                            <input
                                type="text"
                                name="branchName"
                                value={formData.branchName}
                                onChange={handleChange}
                                placeholder="Enter branch name"
                            />

                        </div>

                    </div>

                </div>


                {/* =========================
                    BUTTONS
                ========================= */}

                <form className="profile-actions"
                      onSubmit={handleSubmit}
                >

                    <button
                        type="button"
                        className="cancel-btn"
                    >

                        Cancel

                    </button>

                    <button
                        type="submit"
                        className="save-btn"
                    >

                        Save Changes

                    </button>

                </form>

            </div>

        </div>

    );

}