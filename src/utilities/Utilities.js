import { __ } from '@wordpress/i18n';

const defaultOrders = [
    { label: __('Latest', 'post-designer'), value: 'DESC' },
    { label: __('Oldest', 'post-designer'), value: 'ASC' },
    
];

const defaultOrderBy =  [
    { label: __('ID', 'post-designer'), value: 'ID' },
    { label: __('Title', 'post-designer'), value: 'title' },
    { label: __('Date', 'post-designer'), value: 'date' },
    { label: __('Random', 'post-designer'), value: 'rand' },
    { label: __('Comments Count', 'post-designer'), value: 'comment_count' },
];

// Default layouts & columns
const layouts = [
    { label: __('Card', 'post-designer'), value: 'card' }, 
    // { label: __('Overlay', 'post-designer'), value: 'overlay' },
    // { label: __('Masonry', 'post-designer'), value: 'masonry' },
];
const rows = [1,2,3,4,5,6,7,8,9,10];

const showColumnPerRow = [];
rows.forEach(row => showColumnPerRow.push({value: row, label: row}));

export default defaultOrders;
export {defaultOrderBy, layouts, showColumnPerRow}