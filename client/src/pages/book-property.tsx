import { useGetIdentity } from '@pankod/refine-core';
import { useForm, FieldValues } from '@pankod/refine-react-hook-form';
import { useNavigate } from '@pankod/refine-react-router-v6';


import BookingForm from 'components/common/BookingForm';

const BookProperty = () => {
    const navigate = useNavigate();
    const { data: user } = useGetIdentity();
    const {refineCore: {onFinish, formLoading}, register, handleSubmit} = useForm();
  
    const onFinishHandler = async (data: FieldValues) => {
      await onFinish({...data, email: user.email})
    };

    return (
        <BookingForm type="Book" register={register} onFinish={onFinish} formLoading={formLoading} handleSubmit={handleSubmit} onFinishHandler={onFinishHandler}/>
    )
  }

export default BookProperty