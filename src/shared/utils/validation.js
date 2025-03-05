import { Platform } from 'react-native';

export const validation = {
  required: (value) => {
    if (value === undefined || value === null || value === '') {
      return 'This field is required';
    }
    return '';
  },

  email: (value) => {
    if (!value) return '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? '' : 'Please enter a valid email address';
  },

  minLength: (value, min) => {
    if (!value) return '';
    return value.length >= min ? '' : `Must be at least ${min} characters`;
  },

  maxLength: (value, max) => {
    if (!value) return '';
    return value.length <= max ? '' : `Must be at most ${max} characters`;
  },

  numeric: (value) => {
    if (!value) return '';
    return /^\d+$/.test(value) ? '' : 'Must be a number';
  },

  alpha: (value) => {
    if (!value) return '';
    return /^[a-zA-Z]+$/.test(value) ? '' : 'Must contain only letters';
  },

  alphanumeric: (value) => {
    if (!value) return '';
    return /^[a-zA-Z0-9]+$/.test(value) ? '' : 'Must contain only letters and numbers';
  },

  phone: (value) => {
    if (!value) return '';
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    return phoneRegex.test(value) ? '' : 'Please enter a valid phone number';
  },

  url: (value) => {
    if (!value) return '';
    try {
      new URL(value);
      return '';
    } catch {
      return 'Please enter a valid URL';
    }
  },

  password: (value) => {
    if (!value) return '';
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(value)
      ? ''
      : 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character';
  },

  match: (value, matchValue) => {
    if (!value) return '';
    return value === matchValue ? '' : 'Values do not match';
  },

  custom: (value, validator) => {
    if (!value) return '';
    return validator(value);
  },

  compose: (...validators) => (value) => {
    for (const validator of validators) {
      const error = validator(value);
      if (error) return error;
    }
    return '';
  },
};

export const useValidation = (initialValues = {}, validationSchema = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = useCallback((name, value) => {
    if (!validationSchema[name]) return '';

    const fieldSchema = validationSchema[name];
    let error = '';

    if (fieldSchema.required && validation.required(value)) {
      error = validation.required(value);
    } else if (fieldSchema.email && validation.email(value)) {
      error = validation.email(value);
    } else if (fieldSchema.minLength && validation.minLength(value, fieldSchema.minLength)) {
      error = validation.minLength(value, fieldSchema.minLength);
    } else if (fieldSchema.maxLength && validation.maxLength(value, fieldSchema.maxLength)) {
      error = validation.maxLength(value, fieldSchema.maxLength);
    } else if (fieldSchema.numeric && validation.numeric(value)) {
      error = validation.numeric(value);
    } else if (fieldSchema.alpha && validation.alpha(value)) {
      error = validation.alpha(value);
    } else if (fieldSchema.alphanumeric && validation.alphanumeric(value)) {
      error = validation.alphanumeric(value);
    } else if (fieldSchema.phone && validation.phone(value)) {
      error = validation.phone(value);
    } else if (fieldSchema.url && validation.url(value)) {
      error = validation.url(value);
    } else if (fieldSchema.password && validation.password(value)) {
      error = validation.password(value);
    } else if (fieldSchema.match && validation.match(value, values[fieldSchema.match])) {
      error = validation.match(value, values[fieldSchema.match]);
    } else if (fieldSchema.custom) {
      error = validation.custom(value, fieldSchema.custom);
    }

    return error;
  }, [validationSchema, values]);

  const handleChange = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [touched, validateField]);

  const handleBlur = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, values[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [values, validateField]);

  const handleSubmit = useCallback((onSubmit) => {
    const newErrors = {};
    Object.keys(values).forEach(name => {
      const error = validateField(name, values[name]);
      if (error) newErrors[name] = error;
    });

    setErrors(newErrors);
    setTouched(Object.keys(values).reduce((acc, name) => ({ ...acc, [name]: true }), {}));

    if (Object.keys(newErrors).length === 0) {
      onSubmit(values);
    }
  }, [values, validateField]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues,
    setErrors,
  };
};

export const ValidationMessage = ({ error, touched }) => {
  if (!touched || !error) return null;

  if (Platform.OS === 'web') {
    return (
      <div className="validation-message">
        {error}
        <style jsx>{`
          .validation-message {
            color: #dc3545;
            font-size: 0.875rem;
            margin-top: 0.25rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <Text style={{ color: '#dc3545', fontSize: 14, marginTop: 4 }}>
      {error}
    </Text>
  );
}; 