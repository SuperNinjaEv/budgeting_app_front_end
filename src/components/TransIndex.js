
import { useEffect, useState } from "react";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;
// console.log(API);


export default function TransIndex({ total, setTotal }) {

    const [transactions, setTransactions] = useState([]);
    let totalSum = 0;

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await axios.get(`${API}/transactions`);
                console.log(res.data);
                setTransactions(res.data);

            } catch (err) {
                console.log(err);
            }
        }
        fetchTransactions()
    }, [])

    // function calculateTotal(transactions) {
    //     transactions.map((transaction) => {
    //         if (transaction.deposit) {
    //             return totalSum += transaction.amount;
    //         } else {
    //             return totalSum -= transaction.amount;
    //         };
    //     })
    //     setTotal(totalSum)
    // };

    // calculateTotal(transactions)

    function getDate(transaction) {
        const date = new Date(transaction.date);
        const options = { month: "short", day: "numeric", year: "numeric" }
        return (date.toLocaleString("en-US", options));
    };


    return (
        <div className="transactionsIndex">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Transaction Name</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>

                    {transactions.map((transaction, index) => {
                        console.log(transaction);

                        return (

                            <tr key={index} className="Transaction">
                                <td>{getDate(transaction)}</td>

                                <a
                                    href={`/transactions/${index}`}
                                    style={{ "textTransform": "capitalize" }}
                                >
                                    <td>{transaction.from}</td>
                                </a>
                                <td>
                                    {
                                        transaction.deposit
                                            ? <span style={{ color: "green" }}> +${transaction.amount}</span>
                                            : <span style={{ color: "red" }}> -${transaction.amount}</span>
                                    }
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    )
};
