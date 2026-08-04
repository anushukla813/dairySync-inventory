import { useEffect, useState } from "react";

import {
    FaTint,
    FaRupeeSign,
    FaChartLine,
    FaCalendarAlt,
    FaReceipt
} from "react-icons/fa";

import { getMilkHistory } from "../../services/vendorService";

import "../../styles/vendor/supplyHistory.css";


export default function SupplyHistory() {


    const [history, setHistory] = useState([]);


    useEffect(() => {

        loadHistory();

    }, []);



    const loadHistory = async () => {

        try {

            const data = await getMilkHistory();

            console.log("Milk History:", data);

            setHistory(data || []);

        }

        catch(error){

            console.log(error);

            setHistory([]);

        }

    };



    const totalSupply = history.reduce(

        (sum,item)=>
            sum + Number(item.quantity || 0),

        0

    );



    const totalAmount = history.reduce(

        (sum,item)=>
            sum + Number(item.totalAmount || 0),

        0

    );



    const avgFat = history.length

        ?

        (
            history.reduce(

                (sum,item)=>
                    sum + Number(item.fatPercentage || 0),

                0

            ) / history.length

        ).toFixed(2)

        :

        0;



    return (

        <div className="history-page">


            <div className="history-container">


                <div className="history-header">


                    <div>

                        <h1>
                            Supply History
                        </h1>


                        <p>
                            Track your previous milk supply records
                        </p>


                    </div>


                </div>





                <div className="history-summary">


                    <div className="history-card">

                        <FaTint className="history-icon"/>

                        <div>

                            <h3>
                                Total Supply
                            </h3>

                            <span>
                                {totalSupply} L
                            </span>

                        </div>

                    </div>





                    <div className="history-card">

                        <FaRupeeSign className="history-icon"/>

                        <div>

                            <h3>
                                Total Earnings
                            </h3>

                            <span>
                                ₹{totalAmount}
                            </span>

                        </div>

                    </div>





                    <div className="history-card">

                        <FaChartLine className="history-icon"/>

                        <div>

                            <h3>
                                Average Fat
                            </h3>

                            <span>
                                {avgFat}%
                            </span>

                        </div>

                    </div>





                    <div className="history-card">

                        <FaCalendarAlt className="history-icon"/>

                        <div>

                            <h3>
                                Total Entries
                            </h3>

                            <span>
                                {history.length}
                            </span>

                        </div>

                    </div>



                </div>







                <div className="history-table-container">


                    <table>


                        <thead>


                            <tr>

                                <th>Date</th>

                                <th>Milk Type</th>

                                <th>Quantity</th>

                                <th>Fat %</th>

                                <th>SNF %</th>

                                <th>Shift</th>

                                <th>Amount</th>

                                <th>Verification</th>

                                <th>Payment</th>

                                <th>Receipt</th>


                            </tr>


                        </thead>





                        <tbody>


                        {

                            history.length > 0 ?


                            history.map((item)=>(


                                <tr key={item.supplyId}>


                                    <td>
                                        {item.supplyDate}
                                    </td>



                                    <td>
                                        {item.milkType}
                                    </td>



                                    <td>
                                        {item.quantity} L
                                    </td>



                                    <td>
                                        {item.fatPercentage}
                                    </td>



                                    <td>
                                        {item.snfPercentage}
                                    </td>



                                    <td>
                                        {item.shift}
                                    </td>



                                    <td>
                                        ₹{item.totalAmount}
                                    </td>





                                    {/* Verification Status */}

                                    <td>


                                        <span

                                        className={
                                            item.verificationStatus === "Verified"
                                            ?
                                            "status approved"
                                            :
                                            "status pending"
                                        }

                                        >

                                            {item.verificationStatus}

                                        </span>


                                    </td>







                                    {/* Payment Status */}

                                    <td>


                                        {

                                            item.paymentStatus === "Paid"


                                            ?


                                            <span className="status approved">

                                                Paid

                                            </span>


                                            :


                                            <span className="status pending">

                                                Pending

                                            </span>


                                        }


                                    </td>






                                    {/* Receipt Number */}

                                    <td>


                                        {

                                            item.receiptNumber ?


                                            <span>

                                                <FaReceipt/>

                                                {" "}

                                                {item.receiptNumber}

                                            </span>


                                            :


                                            "Not Generated"


                                        }


                                    </td>



                                </tr>



                            ))



                            :


                            <tr>

                                <td colSpan="10">

                                    No supply history found

                                </td>

                            </tr>



                        }



                        </tbody>



                    </table>



                </div>



            </div>



        </div>


    );


}