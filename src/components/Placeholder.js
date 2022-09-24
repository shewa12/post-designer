import { __ } from '@wordpress/i18n';
import { Placeholder, Spinner } from '@wordpress/components';

const PostPlaceholder = () => {
    return(
        <Placeholder label={ __( 'Please wait...', 'post-designer' ) }>
            <Spinner />
        </Placeholder>
    )
};
export default PostPlaceholder;