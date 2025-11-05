import React, { useEffect, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';

const Contact = () => {
  const [state, handleSubmit] = useForm("xyzyenww"); 
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  if (state.succeeded) {
    return <p>Thanks for reaching out! I will get back to you soon.</p>;
  }

  return (
    <section id="contact" className="section contact" ref={sectionRef}>
      <div className="container">
        <h2>Contact</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input 
            id="name" 
            type="text" 
            name="name" 
            required 
          />
          <ValidationError 
            prefix="Name" 
            field="name" 
            errors={state.errors} 
          />
          
          <label htmlFor="email">Email:</label>
          <input 
            id="email" 
            type="email" 
            name="email" 
            required 
          />
          <ValidationError 
            prefix="Email" 
            field="email" 
            errors={state.errors} 
          />

          <label htmlFor="message">Message:</label>
          <textarea 
            id="message" 
            name="message" 
            required 
          />
          <ValidationError 
            prefix="Message" 
            field="message" 
            errors={state.errors} 
          />

          <button type="submit" disabled={state.submitting}>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
