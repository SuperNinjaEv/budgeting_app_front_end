
import { useEffect, useState } from "react";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;
console.log(API);


export default function TransIndex() {

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

    return (
        <div className="transactionsIndex">
            <div>
                {transactions.map((transaction, index) => {
                    console.log(transaction);
                    return (
                        
                            <li key={index} className="Transaction">
                                <a href={`/transactions/${index}`}>
                                    {transaction.from}
                                </a>
                            </li>
                        
                    )
                })
                }
            </div>
        </div>
    )
};
