import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className='section contact'>
      <div className='container'>
        <h2>Contact</h2>
        <form>
          <label>Name:</label>
          <input type="text" />
          <label>Email:</label>
          <input type="email" />
          <label>Message:</label>
          <textarea></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
