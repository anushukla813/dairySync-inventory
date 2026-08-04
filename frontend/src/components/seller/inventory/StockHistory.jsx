import { useEffect, useState } from "react";

import {
    getStockHistory
} from "../../../services/sellerService";

import "../../../styles/seller/stockHistory.css";


export default function StockHistory() {


    const [search,setSearch] = useState("");

    const [history,setHistory] = useState([]);

    const [loading,setLoading] = useState(true);



    useEffect(()=>{

        loadHistory();

    },[]);




    const loadHistory = async()=>{


        try{


            const data = await getStockHistory();


            setHistory(data);


        }

        catch(error){

            console.error(
                "History Error:",
                error
            );

        }

        finally{

            setLoading(false);

        }

    };





    const filteredHistory = history.filter((item)=>

        item.milkType
        .toLowerCase()
        .includes(
            search.toLowerCase()
        )

    );





    return (

        <div className="stock-history-page">


            <div className="stock-history-header">


                <div>

                    <h1>
                        Stock History
                    </h1>


                    <p>
                        View complete inventory transaction history.
                    </p>

                </div>



                <input

                    type="text"

                    placeholder="Search milk type..."

                    value={search}

                    onChange={(e)=>
                        setSearch(e.target.value)
                    }

                />


            </div>




            {

                loading ?

                <h3>
                    Loading history...
                </h3>

                :


                <div className="history-table-card">


                    <table>


                        <thead>

                            <tr>

                                <th>
                                    Date
                                </th>


                                <th>
                                    Milk Type
                                </th>


                                <th>
                                    Action
                                </th>


                                <th>
                                    Quantity
                                </th>


                                <th>
                                    Updated By
                                </th>


                            </tr>


                        </thead>



                        <tbody>


                        {


                        filteredHistory.length > 0 ?

                        filteredHistory.map((item)=>(


                            <tr key={item.historyId}>


                                <td>

                                    {
                                        new Date(
                                            item.actionDate
                                        )
                                        .toLocaleDateString(
                                            "en-IN"
                                        )
                                    }

                                </td>



                                <td>
                                    {item.milkType}
                                </td>



                                <td>

                                    <span

                                    className={
                                        item.action === "ADDED"
                                        ?
                                        "status added"
                                        :
                                        "status reduced"
                                    }

                                    >

                                        {item.action}

                                    </span>


                                </td>



                                <td>

                                    {item.quantity} L

                                </td>



                                <td>

                                    {item.updatedBy}

                                </td>


                            </tr>


                        ))


                        :


                        <tr>

                            <td colSpan="5">

                                No History Found

                            </td>

                        </tr>


                        }


                        </tbody>


                    </table>


                </div>

            }


        </div>

    );

}