import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Input, Button, Stack, Select } from '@chakra-ui/react'
import { Formik, ErrorMessage } from 'formik'
import { forwardRef } from "react";
import * as yup from 'yup';
import { isBefore } from 'date-fns'
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { UserList } from "../types";

//@ts-ignore
export const DateInput = forwardRef(({ value, onClick }, ref) => <Input value={value} isReadOnly onClick={onClick} ref={ref} />)

const calorieFormValidationSchema = yup.object().shape({
  userId: yup.string().required(),
  itemName: yup.string().required(),
  calorieAmount: yup.number().required().positive(),
  timestamp: yup.date().required().test('is-valid-date', 'Date cannot be greater than today\'s date', value => isBefore(value as Date, new Date())
  )
})


export const CalorieFormAdmin = ({
  onSubmit,
  initialValues = { itemName: '', calorieAmount: '', timestamp: new Date(), userId: '' },
  buttonText = 'Add'
}) => {
  const isLoadingUsersList = useSelector<RootState, boolean>(state => state.meta.loadingUsersList)
  const userList = useSelector<RootState, UserList[]>(state => state.admin.users)

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={calorieFormValidationSchema}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <Stack spacing="3">
            <Select colorScheme="teal" disabled={isLoadingUsersList} variant="outline" placeholder="Select User" value={values.userId} onChange={handleChange} name="userId">
              {userList.map(user => (
                <option key={user._id} value={user._id}>{user.name} | {user.email}</option>
              ))}
            </Select>
            <Input placeholder="Item Name" name="itemName" value={values.itemName} onChange={handleChange} focusBorderColor="cyan.200" />
            <ErrorMessage name="itemName" component="div" />
            <Input placeholder="Calorie Amount" type="number" name="calorieAmount" value={values.calorieAmount} onChange={handleChange} />
            <ErrorMessage name="calorieAmount" component="div" />
            <DatePicker
              selected={values.timestamp}
              onChange={(date) => setFieldValue('timestamp', date)}
              customInput={<DateInput />}
              dateFormat="do MMM y"
            />
            <ErrorMessage name="timestamp" component="div" />
            <Button disabled={isLoadingUsersList || isSubmitting} colorScheme="teal" type="submit">{buttonText}</Button>
          </Stack>
        </form>
      )}
    </Formik>
  )
}
