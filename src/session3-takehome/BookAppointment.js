import { useState } from "react";
import axios from "axios";

export default function BookAppointment() {
  let [showDiv, setShowDiv] = useState(false);
  let [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  let [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    doctor: "",
    place: "",
    time: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === "doctor") {
      setShowDiv(value !== "");
    }
  }
  async function handleFormSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        formData
      );
      console.log("API Response:", response.data);
      setSuccess(true);
    } catch (error) {
      alert("Something went wrong!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  if (loading) {
    return (
      <div>
        <h1> Book a session</h1>
        <p> Fill in the form below to book virtual session with your doctor</p>
        <h2>Submitting your request...</h2>
      </div>
    );
  }
  if (success) {
    return (
      <div>
        <h1>Appointment booked successfully</h1>
        <button onClick={() => setSuccess(false)}>Cancel appointment</button>
      </div>
    );
  }
  return (
    <div>
      <h1> Book a session</h1>
      <p> Fill in the form below to book virtual session with your doctor</p>
      <form onSubmit={handleFormSubmit}>
        <h3> Basic info</h3>
        <label htmlFor="firstName"> First Name</label>
        <input id="lastName" type="text" onChange={handleChange} />
        <br />
        <br />
        <label htmlFor="lastName"> Last Name</label>
        <input id="lastname" type="text" onChange={handleChange} />
        <br />
        <br />
        <label htmlFor="email"> Email</label>
        <input id="email" type="email" onChange={handleChange} />
        <br />
        <br />
        <h3> Doctor</h3>
        <select name="doctor" onChange={handleChange}>
          <option value="">Select your Doctor</option>
          <option value="hopkins">Dr. John Hopkins</option>
          <option value="shavali">Dr. Bad Shavali</option>
        </select>
        <br />
        <br />
        {showDiv && (
          <div>
            <h4>where?</h4>
            <div>
              <input
                type="radio"
                id="g-meet"
                name="place"
                value="google-meet"
                onChange={handleChange}
              />
              <label htmlFor="g-meet">Google Meet</label>
              <br />
              <input
                type="radio"
                id="phone"
                name="place"
                value="phone"
                onChange={handleChange}
              />
              <label htmlFor="phone">Phone</label>
              <br />
            </div>

            <h4> When?</h4>
            <div>
              <input
                name="time"
                type="datetime-local"
                onChange={handleChange}
              />
            </div>
            <br />
          </div>
        )}
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
}
