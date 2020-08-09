import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios'

const ContactForm = () => {
  const [data, setData] = useState();
  const [postData, setPostData] = useState()
  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data) => {
    setData(data);
  };
  useEffect(() => {
    if(data !== undefined){
      axios.post('https://reqres.in/api/users', data)
      .then(res => {
        setPostData(res.data)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, [data])


  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name*</label>
          <input
          id='firstName'
            name="firstName"
            placeholder="Edd"
            ref={register({ required: true, maxLength: 16 })}
          />
          {errors.firstName && (
            <p>Looks like there was an error: {errors.firstName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName">Last Name*</label>
          <input
          id='lastName'
            name="lastName"
            placeholder="Burke"
            ref={register({ required: true })}
          />
          {errors.lastName && (
            <p>Looks like there was an error: {errors.lastName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="email">
            Email*
          </label>
          <input name="email" id='email' placeholder="bluebill1049@hotmail.com" ref={register({ required: true })} />
          {errors.email && (
            <p>Looks like there was an error: {errors.email.type}</p>
          )}
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea name="message" id='message' ref={register({ required: false })} />
        </div>
        {!postData ? <span data-testid='loading' >loading</span> : (
          <pre data-testid="resolved" style={{ textAlign: "left", color: "white" }}>
            {JSON.stringify(postData, null, 2)}
          </pre>
        )}
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
