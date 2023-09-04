import { ReactComponent as Back } from '../assets/back.svg';

function BackButton(props) {
    return (
        <>
            <a href="/" {...props}>
                <Back />
            </a>
        </>
    )
};

export default BackButton;