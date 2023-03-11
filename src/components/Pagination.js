import "../scss/pagination.scss";

const Pagination = () => {
    return (
        <div className="pd-pagination">
            <button className="prev">« Previous</button>
            <button className="page active">1</button>
            <button className="page">2</button>
            <button className="page">3</button>
            <button className="page">4</button>
            <button className="page">5</button>
            <button className="next">Next »</button>
        </div>
    );
}
export default Pagination;