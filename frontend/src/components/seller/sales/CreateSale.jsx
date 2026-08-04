import { useEffect, useState } from "react";

import {
    getInventory,
    createSale
} from "../../../services/sellerService";

import "../../../styles/seller/createSale.css";


export default function CreateSale() {


    const [inventory, setInventory] = useState([]);


    const [formData, setFormData] = useState({

        inventoryId: "",

        quantity: "",

        pricePerLiter: "",

        customerName: "",

        customerPhone: ""

    });

    useEffect(() => {

        loadInventory();

    }, []);

    const loadInventory = async () => {

        try {

            const data = await getInventory();

            setInventory(data);

        }

        catch(error) {

            console.error(
                "Inventory loading error:",
                error
            );

        }

    };

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({

            ...formData,

            [name]: value

        });
    };

    const handleMilkChange = (event) => {

        const inventoryId = event.target.value;

        const selectedItem = inventory.find(

            item =>
            item.inventoryId === Number(inventoryId)

        );

        setFormData({

            ...formData,

            inventoryId: inventoryId,

            pricePerLiter:

                selectedItem
                ? selectedItem.pricePerLiter || ""
                : ""
        });

    };

    const totalAmount =

        Number(formData.quantity || 0) *

        Number(formData.pricePerLiter || 0);

    const handleSubmit = async(event)=>{

        event.preventDefault();

        try {

            const selectedMilk = inventory.find(

                item =>

                item.inventoryId === Number(formData.inventoryId)

            );

            if(!selectedMilk){

                alert(
                    "Please select milk type"
                );

                return;

            }

            const saleRequest = {

                customerName:  formData.customerName,

                customerPhone: formData.customerPhone,

                milkTypeId: selectedMilk.milkTypeId,
                
                quantity: Number(formData.quantity),

                saleDate:

                    new Date()

                    .toISOString()

                    .split("T")[0]

            };

            const response =

                await createSale(saleRequest);

            console.log(
                "SALE RESPONSE:",
                response
            );

            alert(
                "Sale created successfully"
            );

            window.dispatchEvent(
                new Event("inventoryUpdated")
            );

            setFormData({

                inventoryId: "",

                quantity: "",

                pricePerLiter: "",

                customerName: "",

                customerPhone: ""

            });

            loadInventory();

        }

        catch(error){

            console.error(
                "Sale error:",
                error
            );

            alert(

                error.response?.data?.message ||

                "Unable to create sale"

            );

        }

    };

    return(

        <div className="create-sale-page">

            <div className="create-sale-header">

                <h1>
                    Create Sale
                </h1>

                <p>

                    Record milk sales and generate the total bill.

                </p>

            </div>

            <div className="create-sale-card">

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>

                            Milk Type

                        </label>

                        <select

                            name="inventoryId"

                            value={formData.inventoryId}

                            onChange={handleMilkChange}

                            required

                        >

                            <option value="">

                                Select Milk Type

                            </option>

                            {
                                inventory.map(item => (

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

                    <div className="form-group">

                        <label>

                            Customer Name

                        </label>

                        <input

                            type="text"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                            placeholder="Enter customer name"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Customer Phone

                        </label>

                        <input

                            type="text"
                            name="customerPhone"
                            value={formData.customerPhone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            maxLength="10"
                            required

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Quantity (Litre)

                        </label>

                        <input

                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            placeholder="Enter quantity"
                            min="1"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Price Per Litre

                        </label>

                        <input

                            type="number"
                            name="pricePerLiter"
                            value={formData.pricePerLiter}
                            onChange={handleChange}
                            placeholder="Enter price"
                            readOnly
                            required

                        />

                    </div>

                    <div className="sale-total">

                        <span>

                            Total Amount

                        </span>

                        <h2>

                            ₹ {totalAmount.toFixed(2)}

                        </h2>

                    </div>

                    <button

                        className="sale-button"

                        type="submit"

                    >

                        Create Sale

                    </button>

                </form>

            </div>

        </div>

    );

}