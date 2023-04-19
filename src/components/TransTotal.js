import axios from "axios";
import { useState, useEffect } from "react";
const API = process.env.REACT_APP_API_URL;


export default function TransTotal({ total, setTotal }) {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await axios.get(`${API}/transactions`);
                console.log(res.data);
                setTransactions(res.data);
                calculateTotal(transactions)
            } catch (err) {
                console.log(err);
            }
        }
        fetchTransactions()
    }, [])

    function calculateTotal(transactions) {
        transactions.map((transaction) => {
            if (transaction.deposit) {
                setTotal(total + transaction.amount);
            } else {
                setTotal(total - transaction.amount);
            }
        })
    };
    return (
    <div>${total}</div>
)
};
