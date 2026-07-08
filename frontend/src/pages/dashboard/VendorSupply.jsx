import { useState } from "react";

import VendorSidebar from "../../components/vendor/VendorSidebar";

import "../../styles/dashboard/VendorDashboard.css";

import { addMilkSupply } from "../../services/vendorService";

export default function VendorSupply() {

  const [formData, setFormData] = useState({

    milkType: "",
    quantity: "",
    fat: "",
    snf: "",
    rate: "",
    totalAmount: "",
    remarks: "",
    shift: "",
    date: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    const updatedData = {
      ...formData,
      [name]: value
    };
    if(
      name === "quantity" ||
      name === "rate"
    ){
      const quantity = parseFloat(updatedData.quantity) || 0;
      const rate = parseFloat(updatedData.rate) || 0;
      updatedData.tot = quantity * rate;
    }
    setFormData(updatedData);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const data = await addMilkSupply(formData);

      console.log(data);

      alert("Milk Entry Added Successfully");

      setFormData({
        milkType: "",
        quantity: "",
        fat: "",
        shift: "",
        date: ""
      });

    } catch (error) {

      console.log(error);

      alert(error.message);
    }
    finally {

      setLoading(false);
    }
  };

  return (

    <div className="vendor-layout">

      <VendorSidebar />

      <main className="vendor-main">

        <div className="vendor-page-header">

          <h1>Milk Supply Entry</h1>

          <p>
            Add your daily milk supply
          </p>

        </div>

        <div className="vendor-form-card">

          <form onSubmit={handleSubmit}>

            <div className="vendor-form-grid">

              <div className="vendor-input-group">

                <label>Milk Type</label>

                <select
                  name="milkType"
                  value={formData.milkType}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Milk Type
                  </option>

                  <option value="Cow">
                    Cow Milk
                  </option>

                  <option value="Buffalo">
                    Buffalo Milk
                  </option>

                </select>

              </div>

              <div className="vendor-input-group">

                <label>Quantity (Liters)</label>

                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Enter Quantity"
                  required
                />

              </div>

              <div className="vendor-input-group">

                <label>Fat (%)</label>

                <input
                  type="number"
                  name="fat"
                  value={formData.fat}
                  onChange={handleChange}
                  placeholder="Enter Fat Percentage"
                  required
                />

              </div>

              <div className="vendor-input-group">

                <label>Shift</label>

                <select
                  name="shift"
                  value={formData.shift}
                  onChange={handleChange}
                  required
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

              <div className="vendor-input-group">

                <label>Date</label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>
            
            <button
              type="submit"
              className="vendor-submit-btn"
            >
              {
                loading
                ? "Saving..."
                : "Add Milk Entry"
              }
            </button>

          </form>

        </div>

      </main>

    </div>
  );
}