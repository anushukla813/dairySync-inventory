import { useState,useEffect } from "react";

import {
    getMilkTypes,
    addMilkSupply
} from "../../services/vendorService";

import {
    FaTint,
    FaWeight,
    FaCalendarAlt,
    FaClock,
    FaStickyNote,
    FaPercentage,
    FaSun
} from "react-icons/fa";

import "../../styles/vendor/milkSupply.css";

export default function MilkSupply(){

    const [milkTypes,setMilkTypes]=useState([]);

    const [formData,setFormData]=useState({
        milkTypeId:"",
        quantity:"",
        fatPercentage:"",
        snfPercentage:"",
        supplyDate:"",
        supplyTime:"",
        shift:"",
        remarks:""
    });


    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };


    useEffect(()=>{

        getMilkTypes()
        .then((data)=>{
            console.log("Milk Types:",data);
            setMilkTypes(data);
        })
        .catch((error)=>{
            console.log("Milk Type Error:",error);
        });

    },[]);



    const handleReset=()=>{

        setFormData({
            milkTypeId:"",
            quantity:"",
            fatPercentage:"",
            snfPercentage:"",
            supplyDate:"",
            supplyTime:"",
            shift:"",
            remarks:""
        });

    };



    const handleSubmit=async(e)=>{

        e.preventDefault();


        if(!formData.shift){
            alert("Please select shift");
            return;
        }


        if (!formData.milkTypeId) {
            alert("Please select a milk type");
             return;
        }

        if (Number(formData.quantity) <= 0) {
            alert("Quantity should be greater than 0");
            return;
        }
        
        const supplyData={

            milkTypeId:Number(formData.milkTypeId),

            quantity:Number(formData.quantity),

            fatPercentage:Number(formData.fatPercentage),

            snfPercentage:Number(formData.snfPercentage),

            supplyDate:formData.supplyDate,

            supplyTime:formData.supplyTime + ":00",

            shift:formData.shift

        };


        console.log("Sending Payload");

        console.log(JSON.stringify(supplyData, null, 2));


        try{

            const response=await addMilkSupply(supplyData);

            console.log(
                "Supply Added:",
                response
            );


            alert(response.message);

            handleReset();


        }
        catch(error){

            console.log(
                "Milk Supply Error:",
                error
            );


            alert(
                "Failed to add milk supply"
            );

        }

    };



    return(

        <div className="milk-page">

            <div className="milk-card">

                <div className="milk-header">

                    <h1>Add Milk Supply</h1>

                    <p>
                        Enter today's milk supply details.
                    </p>

                </div>


                <form onSubmit={handleSubmit}>


                    <div className="milk-row">


                        <div className="milk-field">

                            <label>
                                <FaTint className="field-icon"/>
                                Milk Type
                            </label>


                            <select
                                name="milkTypeId"
                                value={formData.milkTypeId}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select Milk Type
                                </option>


                                {
                                    milkTypes.map((milk)=>(

                                        <option
                                            key={milk.milkTypeId}
                                            value={milk.milkTypeId}
                                        >
                                            {milk.milkName}
                                        </option>

                                    ))
                                }


                            </select>


                        </div>



                        <div className="milk-field">

                            <label>
                                <FaWeight className="field-icon"/>
                                Quantity (Litres)
                            </label>


                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                placeholder="Enter quantity"
                            />


                        </div>


                    </div>



                    <div className="milk-row">


                        <div className="milk-field">

                            <label>
                                <FaPercentage className="field-icon"/>
                                Fat %
                            </label>


                            <input
                                type="number"
                                name="fatPercentage"
                                value={formData.fatPercentage}
                                onChange={handleChange}
                                placeholder="Enter fat %"
                            />

                        </div>



                        <div className="milk-field">

                            <label>
                                <FaPercentage className="field-icon"/>
                                SNF %
                            </label>


                            <input
                                type="number"
                                name="snfPercentage"
                                value={formData.snfPercentage}
                                onChange={handleChange}
                                placeholder="Enter SNF %"
                            />


                        </div>


                    </div>




                    <div className="milk-row">


                        <div className="milk-field">

                            <label>
                                <FaSun className="field-icon"/>
                                Shift
                            </label>


                            <select
                                name="shift"
                                value={formData.shift}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select Shift
                                </option>

                                <option value="Morning">
                                    Morning
                                </option>

                                <option value="Evening">
                                    Evening
                                </option>

                            </select>


                        </div>



                        <div className="milk-field">


                            <label>
                                <FaCalendarAlt className="field-icon"/>
                                Supply Date
                            </label>


                            <input
                                type="date"
                                name="supplyDate"
                                value={formData.supplyDate}
                                onChange={handleChange}
                            />


                        </div>


                    </div>




                    <div className="milk-row">


                        <div className="milk-field">

                            <label>
                                <FaClock className="field-icon"/>
                                Supply Time
                            </label>


                            <input
                                type="time"
                                name="supplyTime"
                                value={formData.supplyTime}
                                onChange={handleChange}
                            />


                        </div>


                    </div>


                    <div className="milk-actions">


                        <button
                            type="button"
                            className="reset-btn"
                            onClick={handleReset}
                        >
                            Reset
                        </button>



                        <button
                            type="submit"
                            className="submit-btn"
                        >
                            Submit Supply
                        </button>


                    </div>



                </form>


            </div>


        </div>


    );

}