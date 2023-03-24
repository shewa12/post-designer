import { useEffect, useRef } from 'react';
import "../scss/pagination.scss";

const Pagination = ({pages, currentPage, setCurrentPage}) => {
    // Ref
    const prevBtnRef = useRef();
    const nextBtnRef = useRef();

    const pageMarkups = () => {
        let i = 1;
        let paginationMarkup = [];
        while (i <= pages) {
            paginationMarkup.push(<button key={i} data-current-page={i} className={`page ${currentPage == i ? 'active' : ''}`} onClick={(e) => {setCurrentPage(e.target.dataset.currentPage)}}>{i}</button>);
            i++;
        }
        return paginationMarkup;
    }

    useEffect(() => {
        // Enable/disable prev btn
        if (currentPage == 1) {
            prevBtnRef.current.setAttribute('disabled', true);
        } else {
            prevBtnRef.current.removeAttribute('disabled');
        }

        // Enable/disable next btn
        if (currentPage >= pages) {
            nextBtnRef.current.setAttribute('disabled', true);
        } else {
            nextBtnRef.current.removeAttribute('disabled');
        }
    }, [currentPage]);
      
    return (
       
        <div className="pd-pagination">
            <button className="prev" ref={prevBtnRef} onClick={() => {setCurrentPage(currentPage - 1)}}>« Previous</button>
            { pageMarkups() }
            <button className="next" ref={nextBtnRef} onClick={() => {setCurrentPage(currentPage + 1)}}>Next »</button>
        </div>
    );
}
export default Pagination;