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
                    zoneCode: { ...prevFields.zoneCode, value: data.zonecode },
                    address: { ...prevFields.address, value: data.address },
                }))
                setIsOpen(false);
            }}
            style={{minHeight: '450px'}}
        />
    )
}

export default AddressModal;