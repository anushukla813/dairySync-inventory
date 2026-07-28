import { useEffect, useState } from "react";

import {
    FaTint,
    FaRupeeSign,
    FaChartLine,
    FaCalendarAlt
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

            setHistory(data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const totalSupply = history.reduce(

        (sum, item) => sum + Number(item.quantity),

        0

    );

    const totalAmount = history.reduce(

        (sum, item) => sum + Number(item.totalAmount),

        0

    );

    const avgFat = history.length

        ? (
            history.reduce(
                (sum, item) =>
                    sum + Number(item.fatPercentage),
                0
            ) / history.length
        ).toFixed(2)

        : 0;

    return (

        <div className="history-page">

            <div className="history-container">

                <div className="history-header">

                    <div>

                        <h1>Supply History</h1>

                        <p>
                            Track your previous milk supply records
                        </p>

                    </div>

                </div>

                <div className="history-summary">

                    <div className="history-card">

                        <FaTint className="history-icon"/>

                        <div>

                            <h3>Total Supply</h3>

                            <span>{totalSupply} L</span>

                        </div>

                    </div>

                    <div className="history-card">

                        <FaRupeeSign className="history-icon"/>

                        <div>

                            <h3>Total Earnings</h3>

                            <span>₹{totalAmount}</span>

                        </div>

                    </div>

                    <div className="history-card">

                        <FaChartLine className="history-icon"/>

                        <div>

                            <h3>Average Fat</h3>

                            <span>{avgFat}%</span>

                        </div>

                    </div>

                    <div className="history-card">

                        <FaCalendarAlt className="history-icon"/>

                        <div>

                            <h3>Total Entries</h3>

                            <span>{history.length}</span>

                        </div>

                    </div>

                </div>

                <div className="history-table-container">

                    <table>

                        <thead>

                            <tr>

                                <th>Date</th>

                                <th>Time</th>

                                <th>Milk Type</th>

                                <th>Quantity</th>

                                <th>Fat %</th>

                                <th>SNF %</th>

                                <th>Shift</th>

                                <th>Amount</th>

                                <th>Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                history.map((item) => (

                                    <tr key={item.supplyId}>

                                        <td>{item.supplyDate}</td>

                                        <td>{item.supplyTime}</td>

                                        <td>{item.milkType}</td>

                                        <td>{item.quantity} L</td>

                                        <td>{item.fatPercentage}</td>

                                        <td>{item.snfPercentage}</td>

                                        <td>{item.shift}</td>

                                        <td>₹{item.totalAmount}</td>

                                        <td>

                                            <span

                                                className={
                                                    item.verificationStatus === "Verified"
                                                        ? "status approved"
                                                        : "status pending"
                                                }

                                            >

                                                {item.verificationStatus}

                                            </span>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}