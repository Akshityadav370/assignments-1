import { useState } from 'react';
import AdopterData from '../components/AdopterData';
import { validation } from '../utils/validation';

const PetAdoptionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    breed: '',
    username: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  const [showData, setShowData] = useState(false);
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => validation(name, value, prevErrors));
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();

    let validationErrors = {};
    Object.keys(formData).forEach((field) => {
      validationErrors = validation(field, formData[field], validationErrors);
    });

    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error)) {
      return;
    }

    setData([...data, formData]);
    setShowData(true);
  };

  return !showData ? (
    <>
      <form onSubmit={handleFormSubmission}>
        <div>
          <label>Pet Name</label>
          <input
            type='text'
            name='name'
            placeholder='Pet Name'
            onChange={handleChange}
          />
          {errors.name && <small>{errors.name}</small>}
        </div>

        <div>
          <label>Pet Type</label>
          <select name='type' onChange={handleChange}>
            <option value=''>Select a type</option>
            <option value='dog'>Dog</option>
            <option value='fish'>Fish</option>
            <option value='cow'>Cow</option>
            <option value='turtle'>Turtle</option>
          </select>
        </div>

        <div>
          <label>Breed</label>
          <input type='text' name='breed' onChange={handleChange} />
          {errors.breed && <small>{errors.breed}</small>}
        </div>

        <div>
          <label>Your Name</label>
          <input type='text' name='username' onChange={handleChange} />
          {errors.username && <small>{errors.username}</small>}
        </div>

        <div>
          <label>Email</label>
          <input type='email' name='email' onChange={handleChange} />
          {errors.email && <small>{errors.email}</small>}
        </div>

        <div>
          <label>Phone</label>
          <input type='text' name='phone' onChange={handleChange} />
          {errors.phone && <small>{errors.phone}</small>}
        </div>

        <button type='submit'>Submit</button>
      </form>
    </>
  ) : (
    <AdopterData data={data} setShowData={setShowData} />
  );
};

export default PetAdoptionForm;
