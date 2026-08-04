import {useEffect,useState} from "react";

import {
    getAllMilkSupplies,
    verifyMilkSupply
}
from "../../../services/sellerService";


export default function MilkSupplyVerification(){


    const [supplies,setSupplies]=useState([]);


    const loadSupplies=async()=>{


        try{


            const data =
            await getAllMilkSupplies();


            setSupplies(data);


        }
        catch(error){

            console.error(error);

        }


    };



    useEffect(()=>{

        loadSupplies();

    },[]);



    const handleVerify=async(id)=>{


        try{


            await verifyMilkSupply(id);


            alert(
                "Milk Supply Verified Successfully"
            );


            loadSupplies();


        }
        catch(error){


            alert(
                "Verification Failed"
            );


        }


    };



    return(

        <div>


            <h2>
                Milk Supply Verification
            </h2>


            <table>


                <thead>

                    <tr>

                        <th>
                            Vendor
                        </th>

                        <th>
                            Milk
                        </th>

                        <th>
                            Quantity
                        </th>

                        <th>
                            Status
                        </th>

                        <th>
                            Action
                        </th>


                    </tr>

                </thead>


                <tbody>


                {

                supplies.map(item=>(


                    <tr key={item.supplyId}>


                        <td>
                            {item.vendorName}
                        </td>


                        <td>
                            {item.milkType}
                        </td>


                        <td>
                            {item.quantity} L
                        </td>


                        <td>

                            {item.verificationStatus}

                        </td>


                        <td>


                        {
                            item.verificationStatus === "Verified"

                            ?

                            <span>
                                Verified
                            </span>

                            :

                            <button

                            onClick={()=>
                                handleVerify(
                                    item.supplyId
                                )
                            }

                            >

                                Verify

                            </button>

                        }


                        </td>


                    </tr>


                ))

                }


                </tbody>


            </table>


        </div>


    );

}