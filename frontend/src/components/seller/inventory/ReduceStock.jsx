import { useEffect, useState } from "react";

import {
    getInventory,
    reduceInventory
} from "../../../services/sellerService";


import "../../../styles/seller/reduceStock.css";


export default function ReduceStock(){

    const [inventory,setInventory] = useState([]);

    const [formData,setFormData] = useState({

        inventoryId:"",
        quantity:""

    });

    const [message,setMessage] = useState("");

    const [error,setError] = useState("");

    useEffect(()=>{

        loadInventory();

    },[]);

    const loadInventory = async()=>{

        try{

            const data = await getInventory();

            setInventory(data);

        }

        catch(error){

            console.error(error);

        }

    };

    const handleChange=(event)=>{


        const {

            name,

            value

        } = event.target;

        setFormData({

            ...formData,

            [name]:value

        });


    };

    const handleSubmit=async(event)=>{

        event.preventDefault();

        setMessage("");

        setError("");

        try{

            await reduceInventory(

                formData.inventoryId,

                formData.quantity

            );

            window.dispatchEvent(
                new Event("inventoryUpdated")
            );

            alert(

                "Stock reduced successfully"

            );

            setFormData({

                inventoryId:"",

                quantity:""

            });

            loadInventory();

        }

        catch(error){

            console.error(error);

            alert(

                error.response?.data?.message ||

                "Unable to reduce stock"
            );

        }

    };


    return(

        <div className="reduce-stock-page">

            <div className="reduce-stock-header">

                <h1>

                    Reduce Stock

                </h1>

                <p>

                    Reduce available milk quantity from inventory.

                </p>

            </div>

            <div className="reduce-stock-card">

                {

                    message &&

                    <p className="success-message">

                        {message}

                    </p>

                }

                {

                    error &&

                    <p className="error-message">

                        {error}

                    </p>

                }

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>

                            Milk Type

                        </label>

                        <select

                            name="inventoryId"

                            value={formData.inventoryId}

                            onChange={handleChange}

                            required

                        >

                            <option value="">

                                Select Milk Type

                            </option>

                            {

                                inventory.map(item=>(


                                    <option

                                        key={item.inventoryId}

                                        value={item.inventoryId}

                                    >

                                        {item.milkType}

                                        {" - "}

                                        {item.availableQuantity}

                                        {item.unit}


                                    </option>


                                ))

                            }

                        </select>

                    </div>


                    <div className="form-group">

                        <label>

                            Quantity To Reduce

                        </label>

                        <input

                            type="number"

                            name="quantity"

                            min="1"

                            placeholder="Enter quantity"

                            value={formData.quantity}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    <button

                        type="submit"

                        className="reduce-button"

                    >
                        Reduce Stock


                    </button>

                </form>

            </div>

        </div>

    );

}