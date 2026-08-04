import {
    useEffect,
    useMemo,
    useState
} from "react";


import {
    FaSearch,
    FaWallet,
    FaMoneyBillWave,
    FaUsers,
    FaReceipt,
    FaEye
} from "react-icons/fa";


import {
    getAllMilkSupplies,
    createPayment
} from "../../../services/sellerService";


import "../../../styles/seller/vendorPayment.css";


export default function VendorPaymentList() {


    const [search,setSearch] = useState("");

    const [payments,setPayments] = useState([]);

    const [loading,setLoading] = useState(true);

    const [payingId,setPayingId] = useState(null);



    useEffect(()=>{

        loadPayments();

    },[]);



    const loadPayments = async()=>{

        try{

            const response = await getAllMilkSupplies();

            console.log(
                "Milk Supply Response:",
                response
            );


            setPayments(
                response || []
            );


        }
        catch(error){

            console.error(
                "Payment Fetch Error:",
                error
            );

            setPayments([]);

        }
        finally{

            setLoading(false);

        }

    };



    const handlePayment = async(item)=>{


        const confirmPayment = window.confirm(

            `Pay ₹${item.totalAmount} to ${item.vendorName}?`

        );


        if(!confirmPayment){

            return;

        }



        try{


            setPayingId(item.supplyId);



            const paymentData = {


                vendorId:item.vendorId,


                supplyId:item.supplyId,


                amount:item.totalAmount,


                paymentDate:
                new Date()
                .toISOString()
                .split("T")[0]

            };



            const response =
                await createPayment(paymentData);



            alert(

                `Payment Successful\n\nReceipt No: ${response.receiptNumber}`

            );



            loadPayments();


        }
        catch(error){


            console.error(

                "Payment Creation Error:",
                error

            );


            alert(
                "Payment failed"
            );


        }
        finally{


            setPayingId(null);


        }


    };




    const filteredPayments =
        (payments || [])
        .filter(item=>

            item.vendorName
            ?.toLowerCase()
            .includes(
                search.toLowerCase()
            )

        );




    const summary = useMemo(()=>{


        const totalAmount =

            payments.reduce(

                (sum,item)=>

                    sum +
                    Number(
                        item.totalAmount || 0
                    ),

                0

            );



        const vendors =

            new Set(

                payments.map(
                    item=>item.vendorId
                )

            ).size;



        return {

            totalAmount,

            paidAmount:0,

            pendingAmount:totalAmount,

            vendors

        };


    },[payments]);




    return (


        <div className="vendor-payment-page">



            <div className="payment-page-header">


                <div>

                    <h1>
                        Vendor Payments
                    </h1>


                    <p>
                        Monitor vendor milk supply payments and transactions.
                    </p>


                </div>



                <div className="payment-search">


                    <FaSearch/>


                    <input

                        type="text"

                        placeholder="Search vendor..."

                        value={search}


                        onChange={(e)=>

                            setSearch(
                                e.target.value
                            )

                        }

                    />


                </div>


            </div>





            <div className="payment-summary-grid">


                <div className="payment-summary-card">


                    <div className="summary-icon">

                        <FaWallet/>

                    </div>


                    <div>

                        <h3>

                            ₹ {summary.totalAmount.toLocaleString()}

                        </h3>


                        <span>
                            Total Amount
                        </span>


                    </div>


                </div>





                <div className="payment-summary-card">


                    <div className="summary-icon">

                        <FaMoneyBillWave/>

                    </div>


                    <div>

                        <h3>

                            ₹ {summary.paidAmount.toLocaleString()}

                        </h3>


                        <span>
                            Paid
                        </span>


                    </div>


                </div>





                <div className="payment-summary-card">


                    <div className="summary-icon">

                        <FaReceipt/>

                    </div>


                    <div>

                        <h3>

                            ₹ {summary.pendingAmount.toLocaleString()}

                        </h3>


                        <span>
                            Pending
                        </span>


                    </div>


                </div>





                <div className="payment-summary-card">


                    <div className="summary-icon">

                        <FaUsers/>

                    </div>


                    <div>

                        <h3>

                            {summary.vendors}

                        </h3>


                        <span>
                            Vendors
                        </span>


                    </div>


                </div>



            </div>






            <div className="payment-table-card">


                <div className="payment-table-header">

                    <h2>
                        Vendor Milk Supplies
                    </h2>

                </div>





                {
                    loading ?

                    <h3>
                        Loading payments...
                    </h3>


                    :


                    <table>


                        <thead>


                            <tr>

                                <th>
                                    Vendor
                                </th>


                                <th>
                                    Milk Type
                                </th>


                                <th>
                                    Quantity
                                </th>


                                <th>
                                    Amount
                                </th>


                                <th>
                                    Date
                                </th>


                                <th>
                                    Action
                                </th>


                            </tr>


                        </thead>





                        <tbody>


                        {

                        filteredPayments.length > 0 ?


                        filteredPayments.map(item=>(


                            <tr key={item.supplyId}>


                                <td>

                                    <strong>
                                        {item.vendorName}
                                    </strong>

                                </td>



                                <td>
                                    {item.milkType}
                                </td>



                                <td>
                                    {item.quantity} L
                                </td>



                                <td>
                                    ₹ {Number(item.totalAmount).toLocaleString()}
                                </td>



                                <td>

                                    {
                                        new Date(
                                            item.supplyDate
                                        )
                                        .toLocaleDateString(
                                            "en-IN"
                                        )
                                    }

                                </td>



                                <td>


                                    <button

                                        className="view-button"


                                        disabled={
                                            payingId === item.supplyId
                                        }


                                        onClick={()=>
                                            handlePayment(item)
                                        }

                                    >

                                        <FaEye/>


                                        {
                                            payingId === item.supplyId
                                            ?
                                            "Processing..."
                                            :
                                            "Pay"
                                        }


                                    </button>


                                </td>



                            </tr>


                        ))


                        :


                        <tr>

                            <td colSpan="6">

                                No milk supply found

                            </td>

                        </tr>


                        }



                        </tbody>


                    </table>

                }


            </div>



        </div>


    );

}