import React, { useReducer } from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import ContactForm from "./ContactForm";

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
            fireEvent.change(emailInput, { target: { value: 'po@po.com'}})
            fireEvent.change(messageInput, { target: { value: 'This be an message'}})
        })
        const submitBtn = screen.getByRole('button', { name: /submit/i})
        
       await act( async () => {
           fireEvent.click(submitBtn)
       }) 
       await expect(await screen.getByText(/kevin/i)).toBeInTheDocument()
       await expect(await screen.getByText(/lam/i)).toBeInTheDocument()
       await expect(await screen.getByText(/po@po.com/i)).toBeInTheDocument()
       await expect(await screen.getByText(/this be an message/i)).toBeInTheDocument()

  });
  