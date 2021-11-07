import { Formik, ErrorMessage } from 'formik'
import * as yup from 'yup';
import { Input, Button, Stack, Box, Text, Spacer } from '@chakra-ui/react'


const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required()
})

export const AddFriendForm = ({
  onSubmit,
  initialValues = { name: '', email: '' },
  buttonText = 'Invite'
}) => {
  return (
    <Box mt="4" backgroundColor="gray.700" p="4" borderRadius="8" boxShadow="lg" borderColor="blue.400" border="1px">
      <Text fontWeight="semibold">Invite Friends</Text>
      <Spacer mb="4" />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing="3">
              <Input borderColor="blue.100" _placeholder={{ color: 'blue.100' }} placeholder="Name" name="name" value={values.name} onChange={handleChange} />
              <ErrorMessage name="name" component="div" />
              <Input borderColor="blue.100" _placeholder={{ color: 'blue.100' }} placeholder="email" type="email" name="email" value={values.email} onChange={handleChange} />
              <ErrorMessage name="email" component="div" />
              <Button colorScheme="blue" disabled={isSubmitting} type="submit">{buttonText}</Button>
            </Stack>
          </form>
        )}
      </Formik>
    </Box>
  )
}