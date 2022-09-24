
const PostCard = (props) => {
    console.log(props.post);
    return(
        <div className="pd-card pd-course-card">
        <div className="pd-course-thumbnail">
            <a href="#" className="pd-d-block">
                <div className="pd-ratio pd-ratio-16x9">
                    <img className="pd-card-image-top" src="http://localhost/pmpro/wp-content/uploads/2022/08/logo-1.jpg" alt="" loading="lazy" />
                </div>
            </a>
        </div>
        <div className="pd-card-body">
            <h3 className="pd-course-name pd-fs-5 pd-fw-medium" title="Woocommerce Auto Cancel">
                <a href="#" target="_parent">
                    Course title
                </a>
            </h3>

            <div className="pd-meta pd-mt-12 pd-mb-20">
                <div>
                    <span className="pd-meta-icon pd-icon-user-line" area-hidden="true"></span>
                    <span className="pd-meta-value"></span>
                </div>
                <div>
                    <span className="pd-icon-clock-line pd-meta-icon" area-hidden="true"></span>
                    <span className="pd-meta-value"></span>
                </div>
            </div>
        </div>
        <div className="pd-card-footer">
            <a href="#" className="pd-btn pd-btn-outline-primary pd-btn-md pd-btn-block " target="_self" onClick={() => {setAttributes({postType: 'abc'})}}>
                View Details
            </a>
        </div>
    </div>
    );
}
export default PostCard;