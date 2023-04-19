import { Link } from "react-router-dom"
import TransTotal from "../components/TransTotal"

export default function NavBar({ total, setTotal }) {
    return (
        <div className="NavBar">
            <div>
                <Link to="/transactions">
                    <button>
                        View Budget
                    </button>
                </Link>
                <Link to="/transactions/new">
                    <button>
                        New Entry
                    </button>
                </Link>
            </div>
            <TransTotal total={total} setTotal={setTotal}/>
        </div>
    )
};
