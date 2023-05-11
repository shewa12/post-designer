import { __ } from '@wordpress/i18n';

const PostCard = ( {post, attributes} ) => {

    const { ID, display_name, avatar, user_login, description } = post.author;
    return(
	    <div className="pd-card">

			{
				attributes.showThumbnail ?
				<div className="pd-post-thumbnail">
					<a href="#" className="pd-d-block">
						<div className="pd-ratio pd-ratio-16x9">
							<img className="pd-card-image-top" src={post.thumbnail} alt="" loading="lazy" />
						</div>
					</a>
				</div>
				: ''
			}
	        <div className="pd-card-body">

				{
					attributes.showTitle ?
					<h3 className="pd-post-title" title={ post.post_title }>
						<a href="#" target="_parent" style={ {color: attributes.titleColor} } dangerouslySetInnerHTML={ {__html: post.post_title} }>
						</a>
	            	</h3>
				: ''
				}

				{
					attributes.showMeta ?
					<div className="pd-post-meta">
						<span className='pd-post-meta-key'>
							{ __( 'Post Date: ', 'post-designer' ) }
						</span>
						<span className='pd-post-meta-value'>
							{ post.post_date }
						</span>
					</div>
					: ''
				}

				{
					attributes.showCategory ?
					<div className="pd-post-categories">
						<span className='pd-post-category-key'>{ __( 'In:', 'post-designer' ) } </span>
						<div className='pd-post-category-value' dangerouslySetInnerHTML={ { __html: post.categories } }></div>
					</div>
					: ''
				}

				{
					attributes.showExcerpt ?
					<div className="pd-post-content">
						<p dangerouslySetInnerHTML={ {__html: post.post_excerpt} }>
							
						</p>
					</div>
					: ''
				}

	        </div>
			{
				attributes.showAvatar || attributes.showAuthor ?
				<div className="pd-card-footer">
					<div className="pd-post-author">
						{
							attributes.showAvatar ?
							<a href="#" className="pd-btn pd-btn-outline-primary pd-btn-md pd-btn-block " target="_self">
								<img src={ avatar } alt={ display_name } />
							</a>
							: ''
						}
						{
							attributes.showAuthor ?
							<div className="pd-post-author-info">
								<span>{ __( 'By ', 'post-designer' ) }</span>
								<strong>
									{ display_name ? display_name : user_login }
								</strong>
								<p>
								{ description }
								</p>
							</div>
							:''
						}
					</div>
				</div>
			: ''
			}

			{
				post.after_footer ?
				<div dangerouslySetInnerHTML={ {__html: post.after_footer} }></div>
				: ''
			}

	    </div>
    );
}
export default PostCard;