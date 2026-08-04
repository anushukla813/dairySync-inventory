import { useEffect, useState } from "react";
import { FaArrowUp, FaWarehouse } from "react-icons/fa";

import {
    getInventory,
    updateInventory
} from "../../../services/sellerService";


import "../../../styles/seller/updateStock.css";



export default function UpdateStock(){

    const [inventory,setInventory]=useState([]);

    const [selectedInventory,setSelectedInventory]=useState("");

    const [selectedItem,setSelectedItem]=useState(null);

    const [quantity,setQuantity]=useState("");

    const [loading,setLoading]=useState(false);

    const [message,setMessage]=useState("");

    useEffect(()=>{
        loadInventory();
    },[]);


    const loadInventory=async()=>{
        try{

            const data = await getInventory();

            console.log("SELLER INVENTORY:", data);

            setInventory(data);

        }

        catch(error){

            console.error(error);

        }

    };

    const handleInventoryChange=(e)=>{

        const id = Number(e.target.value);

        setSelectedInventory(id);

        const item = inventory.find(

            item=>item.inventoryId===id

        );

        setSelectedItem(item);

        setMessage("");

    };

    const handleSubmit=async(e)=>{

        e.preventDefault();

        if(!selectedInventory || !quantity){

            return;
        }

        try{

            setLoading(true);

            await updateInventory(

                selectedInventory,

                quantity

            );

            window.dispatchEvent(
                new Event("inventoryUpdated")
            );

            setMessage(

                "Inventory updated successfully"

            );

            setQuantity("");

            await loadInventory();

            const updatedItem = inventory.find(

                item=>item.inventoryId===selectedInventory

            );

            setSelectedItem(updatedItem);

        }

        catch(error){

            console.error(error);
            setMessage(

                "Failed to update inventory"

            );

        }

        finally{

            setLoading(false);

        }

    };

    return(

        <div className="update-stock-page">

            <div className="update-stock-container">

                <div className="page-title">

                    <h1>
                        Update Inventory
                    </h1>

                    <p>
                        Increase the available quantity of milk inventory.
                    </p>

                </div>

                <div className="update-stock-card">

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">

                            <label>
                                Milk Type
                            </label>

                            <select

                                value={selectedInventory}

                                onChange={handleInventoryChange}

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

                                        </option>

                                    ))

                                }

                            </select>

                        </div>

                        {

                            selectedItem &&

                            <div className="current-stock-card">

                                <div className="stock-icon">

                                    <FaWarehouse/>

                                </div>

                                <div>

                                    <span>

                                        Current Stock

                                    </span>

                                    <h2>

                                        {selectedItem.availableQuantity}

                                        {" "}

                                        {selectedItem.unit}

                                    </h2>

                                </div>

                            </div>

                        }

                        <div className="form-group">

                            <label>

                                New Quantity

                            </label>

                            <input

                                type="number"

                                placeholder="Enter updated quantity"

                                value={quantity}

                                onChange={(e)=>

                                    setQuantity(e.target.value)

                                }

                                required

                            />

                        </div>

                        <button

                            type="submit"

                            className="update-button"

                            disabled={loading}

                        >

                            <FaArrowUp/>

                            {

                                loading

                                ?

                                "Updating..."

                                :

                                "Update Inventory"

                            }

                        </button>

                        {

                            message &&

                            <p className="success-message">

                                {message}

                            </p>

                        }

                    </form>

                </div>

            </div>

        </div>

    );

}