import { Link } from "react-router-dom"

export default function NavBar() {
    return (
        <div className="NavBar">
            <Link to="/transactions">View Budget</Link>
            <br></br>
            <Link to="/transactions/new">New Entry</Link>
        </div>
    )
};
