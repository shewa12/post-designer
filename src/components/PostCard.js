import { __ } from '@wordpress/i18n';

const PostCard = ({post}) => {
    console.log(post);
    const { ID, display_name, avatar, user_login, description } = post.author;
    return(
	    <div className="pd-card">
	        <div className="pd-post-thumbnail">
	            <a href="#" className="pd-d-block">
	                <div className="pd-ratio pd-ratio-16x9">
	                    <img className="pd-card-image-top" src={post.thumbnail} alt="" loading="lazy" />
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
					<span>{ __( 'In:', 'post-designer' ) } </span>
					<div dangerouslySetInnerHTML={ { __html: post.categories } }></div>
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
						<img src={ avatar } alt={ display_name } />
					</a>
					<div className="pd-post-author-info">
						<strong>
                            { display_name ? display_name : user_login }
                        </strong>
						<p>
						{ description }
						</p>
					</div>
				</div>
	        </div>
	    </div>
    );
}
export default PostCard;