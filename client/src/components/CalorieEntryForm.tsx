import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Input, Button, Stack } from '@chakra-ui/react'
import { Formik, ErrorMessage } from 'formik'
import { forwardRef } from "react";
import * as yup from 'yup';
import { isBefore } from 'date-fns'

//@ts-ignore
export const DateInput = forwardRef(({ value, onClick }, ref) => <Input value={value} isReadOnly onClick={onClick} ref={ref} />)

const calorieFormValidationSchema = yup.object().shape({
  itemName: yup.string().required(),
  calorieAmount: yup.number().required().positive(),
  timestamp: yup.date().required().test('is-valid-date', 'Date cannot be greater than today\'s date', value => isBefore(value as Date, new Date())
  )
})


export const CalorieForm = ({
  onSubmit,
  initialValues = { itemName: '', calorieAmount: '', timestamp: new Date() },
  buttonText = 'Add'
}) => {
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
            <Button colorScheme="teal" disabled={isSubmitting} type="submit">{buttonText}</Button>
          </Stack>
        </form>
      )}
    </Formik>
  )
}
