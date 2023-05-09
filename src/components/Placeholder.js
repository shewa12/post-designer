import { __ } from '@wordpress/i18n';
import { Placeholder, Spinner } from '@wordpress/components';

const PostPlaceholder = () => {
    return(
        <Placeholder>
            <Spinner />
        </Placeholder>
    )
};
export default PostPlaceholder;