import { useEffect, useRef } from 'react';
import "../scss/pagination.scss";
import { Fragment } from '@wordpress/element';

const Pagination = ({pages, currentPage, setCurrentPage}) => {
    // Ref
    const prevBtnRef = useRef();
    const nextBtnRef = useRef();

    const pageMarkups = () => {
        let i = 1;
        let paginationMarkup = [];
        while (i <= pages) {
            // paginationMarkup.push(<a key={i} data-current-page={i} className={`page-numbers ${currentPage == i ? 'page-numbers current' : ''}`} onClick={(e) => {setCurrentPage(e.target.dataset.currentPage)}}>{i}</a>);
            let markup = currentPage == i ?
                <span key={i} data-current-page={i} className="page-numbers current">
                    {i}
                </span>:
                <a key={i} data-current-page={i} className="page-numbers" onClick={(e) => {setCurrentPage(e.target.dataset.currentPage)}}>
                    {i}
                </a>;
            paginationMarkup.push(markup);
            i++;
        }
        return paginationMarkup;
    }

    useEffect(() => {
        // Enable/disable prev btn
        if (pages > 1) {
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
        }
    }, [currentPage]);
      
    return (

        <Fragment>
            {
                pages > 1 ? 
                <div className="pd-pagination">
                    <a className="prev page-numbers" ref={prevBtnRef} onClick={() => {setCurrentPage(currentPage - 1)}}>« Previous</a>
                    { pageMarkups() }
                    <a className="next page-numbers" ref={nextBtnRef} onClick={() => {setCurrentPage(currentPage + 1)}}>Next »</a>
                </div>
                : ''
            }
            
        </Fragment>
    );
}
export default Pagination;