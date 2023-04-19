import axios from "axios";
import { useState, useEffect } from "react";
const API = process.env.REACT_APP_API_URL;

// TOTAL CALCULATION & COLOR CODING COMPONENT
export default function TransTotal({ total, setTotal }) {

    const [transactions, setTransactions] = useState([]);
    let totalSum = 0;

    // Initial fetch of data on page render
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

    // Maps through transaction array, checks the deposit boolean value & add/subtracts to total
    useEffect(() => {
        transactions.map((transaction) => {
            if (transaction.deposit) {
                return totalSum += Number(transaction.amount);
            } else {
                return totalSum -= Number(transaction.amount);
            }
        })
        setTotal(totalSum);
    });

    // Color Coding for total state
    function totalColors() {
        if (total <= 0) {
            return { backgroundColor: "red", color: "white" }
        } else if (total <= 100) {
            return { backgroundColor: "yellow", color: "white" }
        } else {
            return { backgroundColor: "green", color: "white" }
        }
    };

    return (
        <h5>Your current budget total: <span style={totalColors()}> ${total}</span></h5>
    )
};
