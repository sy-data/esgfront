import DaumPostcode from 'react-daum-postcode';
import { useSetRecoilState } from 'recoil';
import { signupFormState } from '../State';

const AddressModal = ({setIsOpen}) => {
    const setFields = useSetRecoilState(signupFormState);

    return (
        <DaumPostcode
            onComplete={(data) => {
                setFields((prevFields) => ({
                    ...prevFields,
                    zoneCode: { ...prevFields.zoneCode, value: data.zonecode, error: false },
                    address: { ...prevFields.address, value: data.address, error: false },
                }))
                setIsOpen(false);
            }}
            style={{minHeight: '450px'}}
        />
    )
}

export default AddressModal;