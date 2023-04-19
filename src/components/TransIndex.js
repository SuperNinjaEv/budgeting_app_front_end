
import { useEffect, useState } from "react";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;
// console.log(API);


export default function TransIndex({ total, setTotal }) {

    const [transactions, setTransactions] = useState([]);

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
    //             setTotal(total + transaction.amount);
    //         } else {
    //             setTotal(total - transaction.amount);
    //         }
    //     })
    // };


    return (
        <div className="transactionsIndex">
            <ol>
                {transactions.map((transaction, index) => {
                    console.log(transaction);

                    // Cause Infinite Loop...
                    // if (transaction.deposit) {
                    //     setTotal(total + transaction.amount);
                    // } else {
                    //     setTotal(total - transaction.amount);
                    // };

                    return (

                        <li key={index} className="Transaction">
                            <a
                                href={`/transactions/${index}`}
                                style={{ "textTransform": "capitalize" }}
                            >{transaction.from}</a>
                            <div>Amount:
                                {
                                    transaction.deposit
                                        ? <span style={{ color: "green" }}> +${transaction.amount}</span>
                                        : <span style={{ color: "red" }}> -${transaction.amount}</span>
                                }
                            </div>
                        </li>

                    )
                })
                }
            </ol>
        </div>
    )
};
