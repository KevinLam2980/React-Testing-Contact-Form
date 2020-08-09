import React, { useReducer } from "react";
import { render, screen, fireEvent, act, cleanup, getByTestId, waitFor  } from "@testing-library/react";
// import 'jest-dom/extend-expect'
import ContactForm from "./ContactForm";
import axiosMock from 'axios'
import axios from "../__mocks__/axios";

test("renders App without crashing", () => {
  render(<ContactForm />);
});

test("Fills out and specific inputs in the form", async () => {
    act(() => {
        render(<ContactForm />);
    })

    const nameInput = screen.getByPlaceholderText(/Edd/i) 
    const lastNameInput = screen.getByPlaceholderText(/Burke/i) 
    const emailInput = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i) 
    const messageInput = screen.getByLabelText(/message/i) 
    
    // fireEvent.change(nameInput, { target: { value: 'po'}})
    // fireEvent.change(lastNameInput, { target: { value: 'po'}})
    // fireEvent.change(emailInput, { target: { value: 'po@po.com'}})
    // fireEvent.change(messageInput, { target: { value: 'This be a message'}})
    
    act(() => { 
            fireEvent.change(nameInput, { target: { value: 'Kevin'}})
            fireEvent.change(lastNameInput, { target: { value: 'Lam'}})
            fireEvent.change(emailInput, { target: { value: 'kev2980@gmail.com'}})
            fireEvent.change(messageInput, { target: { value: 'This be an message'}})
        })
        const submitBtn = screen.getByRole('button', { name: /submit/i})
        
       await act( async () => {
           fireEvent.click(submitBtn)
       }) 
    //    await expect(await screen.getByText(/"firstName": "Kevin"/i)).toBeInTheDocument()
    //    await expect(await screen.getByText(/"lastName": "Lam"/i)).toBeInTheDocument()
    //    await expect(await screen.getByText(/"email": "kev2980@gmail.com"/i)).toBeInTheDocument()
    //    await expect(await screen.getByText(/"message": "this be an message"/i)).toBeInTheDocument()

    axiosMock.post.mockResolvedValueOnce({
        data: {
            "firstName": "Kevin",
            "lastName": "Lam",
            "email": "kev2980@gmail.com",
            "message": "This be an message",
        }
    })

    //  expect(screen.getByTestId('loading')).toHaveTextContent('loading')
     
     const resolvedSpan = await waitFor(() => screen.getByTestId('resolved'))
     expect(resolvedSpan).toHaveTextContent('{ "firstName": "Kevin", "lastName": "Lam", "email": "kev2980@gmail.com", "message": "This be an message" }')
  });


  