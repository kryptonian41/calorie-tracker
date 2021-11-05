import React, { useCallback } from 'react';
import { useDispatch } from "react-redux";
import { CalorieForm } from './CalorieEntryForm';


const AddEntry: React.FC<any> = ({ onAdd }) => {
  const dispatch = useDispatch()
  const handleAdd = useCallback((values, { setSubmitting, resetForm }) => {
    dispatch(onAdd(values,
      () => {
        setSubmitting(false);
        resetForm()
      }
    ))
  }, [onAdd, dispatch])

  return <CalorieForm onSubmit={handleAdd} />
}


export default AddEntry
