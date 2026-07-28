import { useEffect, useState } from "react";

import {
    FaRupeeSign,
    FaClock,
    FaCheckCircle,
    FaReceipt
} from "react-icons/fa";

import "../../styles/vendor/payment.css";

import {
    getVendorPayments
} from "../../services/vendorService";


export default function Payment(){


    const [payments,setPayments] = useState([]);

    const [summary,setSummary] = useState({

        totalReceived:0,

        pendingPayment:0,

        completedPayments:0,

        totalTransactions:0

    });



    useEffect(()=>{


        getVendorPayments()

        .then((data)=>{


            console.log(
                "Payment Data:",
                data
            );


            setPayments(
                data.transactions || []
            );


            setSummary(
                data.summary || {}
            );


        })


        .catch((error)=>{


            console.log(
                "Payment Fetch Error:",
                error
            );


        });


    },[]);




    return(


        <div className="payment-page">


            <div className="payment-container">



                {/* HEADER */}


                <div className="payment-header">


                    <div>


                        <h1>
                            Payment History
                        </h1>


                        <p>
                            Track your milk supply payments
                        </p>


                    </div>


                </div>





                {/* SUMMARY */}



                <div className="payment-summary">



                    <div className="payment-card">


                        <FaRupeeSign className="payment-icon"/>


                        <div>

                            <h3>
                                Total Received
                            </h3>


                            <span>
                                ₹{summary.totalReceived}
                            </span>


                        </div>


                    </div>





                    <div className="payment-card">


                        <FaClock className="payment-icon"/>


                        <div>

                            <h3>
                                Pending Payment
                            </h3>


                            <span>
                                ₹{summary.pendingPayment}
                            </span>


                        </div>


                    </div>





                    <div className="payment-card">


                        <FaCheckCircle className="payment-icon"/>


                        <div>

                            <h3>
                                Completed Payments
                            </h3>


                            <span>
                                {summary.completedPayments}
                            </span>


                        </div>


                    </div>





                    <div className="payment-card">


                        <FaReceipt className="payment-icon"/>


                        <div>

                            <h3>
                                Transactions
                            </h3>


                            <span>
                                {summary.totalTransactions}
                            </span>


                        </div>


                    </div>


                </div>






                {/* TABLE */}



                <div className="payment-table-container">



                    <table>


                        <thead>


                            <tr>


                                <th>
                                    Date
                                </th>


                                <th>
                                    Amount
                                </th>


                                <th>
                                    Payment Mode
                                </th>


                                <th>
                                    Transaction ID
                                </th>


                                <th>
                                    Status
                                </th>


                            </tr>


                        </thead>




                        <tbody>



                        {


                            payments.length > 0 ?



                            payments.map((payment)=>(


                                <tr key={payment.id}>


                                    <td>
                                        {payment.date}
                                    </td>


                                    <td>
                                        ₹{payment.amount}
                                    </td>


                                    <td>
                                        {payment.mode}
                                    </td>


                                    <td>
                                        {payment.transactionId}
                                    </td>


                                    <td>


                                        <span

                                        className={
                                            payment.status === "Completed"

                                            ?

                                            "payment-status completed"

                                            :

                                            "payment-status pending"

                                        }

                                        >


                                            {payment.status}


                                        </span>


                                    </td>


                                </tr>


                            ))



                            :



                            <tr>


                                <td
                                colSpan="5"
                                className="empty-payment"
                                >

                                    No payment records found


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