import React, { useCallback } from 'react';
import { useDispatch } from "react-redux";
import { CalorieForm } from './CalorieEntryForm';
import { CalorieFormAdmin } from './CalorieEntryFormAdmin';

export const AddEntryAdmin: React.FC<any> = ({ onAdd }) => {
  const dispatch = useDispatch()
  const handleAdd = useCallback((values, { setSubmitting, resetForm }) => {
    dispatch(onAdd(values,
      () => {
        setSubmitting(false);
        resetForm()
      }
    ))
  }, [onAdd, dispatch])

  return <CalorieFormAdmin onSubmit={handleAdd} />
}


