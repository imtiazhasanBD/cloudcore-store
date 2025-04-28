const validateBangladeshiPhone = (phone) => {
    // Remove any non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Bangladeshi phone number regex pattern
    const regex = /^(?:\+?88|0088)?01[3-9]\d{8}$/;
    
    return regex.test(cleaned);
  };