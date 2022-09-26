import { __ } from '@wordpress/i18n';

const PostCard = ({post}) => {
    return(
	    <div className="pd-card">
	        <div className="pd-post-thumbnail">
	            <a href="#" className="pd-d-block">
	                <div className="pd-ratio pd-ratio-16x9">
	                    <img className="pd-card-image-top" src="post.jpeg" alt="" loading="lazy" />
	                </div>
	            </a>
	        </div>
	        <div className="pd-card-body">
	            <h3 className="pd-post-title" title="Woocommerce Auto Cancel">
	                <a href="#" target="_parent">
	                    { post.post_title }
	                </a>
	            </h3>
				<div className="pd-post-meta">
					<span>
						{ __( 'Post Date:', 'post-designer' ) } { post.post_date }
					</span>
				</div>
				<div className="pd-post-categories">
					<span>In: </span>
					<a href="#">Technology</a>,
					<a href="#">Development</a>,
					<a href="#">Software</a>,
					<a href="#">Dev Ops</a>
				</div>
				<div className="pd-post-content">
					<p dangerouslySetInnerHTML={ {__html: post.post_content} }>
                        
					</p>
					<a href="#">
                        { __( 'Read more...', 'post-designer' ) }
                    </a>
				</div>
	        </div>
	        <div className="pd-card-footer">
				<div className="pd-post-author">
					<a href="#" className="pd-btn pd-btn-outline-primary pd-btn-md pd-btn-block " target="_self">
						<img src="author.png" alt="" />
					</a>
					<div className="pd-post-author-info">
						<strong>SK Ahmed</strong>
						<p>
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
						</p>
					</div>
				</div>
	        </div>
	    </div>
    );
}
export default PostCard;