import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import {PersonalInfoStep} from './PersonalInfoStep'

const errorHandlerStub = jest.fn()
const dispatchStub = jest.fn()
const onSubmitStub = jest.fn()

test('renders Personal info component', () => {
  render(<PersonalInfoStep 
    fullname={''} 
    phoneNumber={''} 
    email={''} 
    onSubmit={onSubmitStub} 
    errorHandler={errorHandlerStub} 
    dispatch={dispatchStub} />);
  const submitBtn = screen.getByText("Submit");
  const nameInput = screen.getByTestId("input_fullname");
  const phoneInput = screen.getByTestId("input_phoneNumber");
  const emailInput = screen.getByTestId("input_email");
  expect(submitBtn).toBeInTheDocument();

  submitBtn.click()

  expect(errorHandlerStub).toBeCalled()

  // Email is invalid, should return error
  fireEvent.change(nameInput, {target: {value: "testUser"}})
  fireEvent.change(phoneInput, {target: {value: "28472342"}})
  fireEvent.change(emailInput, {target: {value: "testUser"}})

  expect(errorHandlerStub).toBeCalled()


  fireEvent.change(emailInput, {target: {value: "test@hotmail.com"}})

  expect(dispatchStub).toBeCalled()
});


test('should submit the personal info if all of them are correct', () => {
    render(<PersonalInfoStep 
      fullname={'test'} 
      phoneNumber={'234324234'} 
      email={'test@hotmail.com'} 
      onSubmit={onSubmitStub} 
      errorHandler={errorHandlerStub} 
      dispatch={dispatchStub} />);

    const submitBtn = screen.getByText("Submit");
    expect(submitBtn).toBeInTheDocument();
  
    submitBtn.click()
  
    expect(onSubmitStub).toBeCalled()
  });


  test('Should return error if email is invalid', () => {
    render(<PersonalInfoStep 
      fullname={'test'} 
      phoneNumber={'23432423'} 
      email={'test'} 
      onSubmit={onSubmitStub} 
      errorHandler={errorHandlerStub} 
      dispatch={dispatchStub} />);
    const submitBtn = screen.getByText("Submit");
    expect(submitBtn).toBeInTheDocument();
  
    submitBtn.click()
  
    expect(errorHandlerStub).toBeCalled()
  });