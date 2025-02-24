export const validation = (name, value, errors) => {
  let newErrors = { ...errors };

  switch (name) {
    case 'name':
      newErrors.name =
        value.length < 3 ? 'Pet Name must be at least 3 characters' : '';
      break;
    case 'breed':
      newErrors.breed =
        value.length < 3 ? 'Breed must be at least 3 characters' : '';
      break;
    case 'username':
      newErrors.username =
        value.length < 3 ? 'Your Name must be at least 3 characters' : '';
      break;
    case 'email':
      newErrors.email = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? ''
        : 'Invalid email address';
      break;
    case 'phone':
      newErrors.phone = /^\d{10}$/.test(value)
        ? ''
        : 'Please enter a valid 10-digit phone number!';
      break;
    default:
      break;
  }

  return newErrors;
};
