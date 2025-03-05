import { useState, useCallback } from 'react';
import { Platform } from 'react-native';

export const useForm = (initialValues = {}, validationSchema = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = useCallback((name, value) => {
    if (!validationSchema[name]) return '';

    const fieldSchema = validationSchema[name];
    let error = '';

    if (fieldSchema.required && !value) {
      error = 'This field is required';
    } else if (fieldSchema.pattern && !fieldSchema.pattern.test(value)) {
      error = fieldSchema.message || 'Invalid format';
    } else if (fieldSchema.validate) {
      error = fieldSchema.validate(value);
    }

    return error;
  }, [validationSchema]);

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

export const FormField = ({ 
  name, 
  label, 
  value, 
  onChange, 
  onBlur, 
  error, 
  touched,
  type = 'text',
  placeholder,
  required,
  ...props 
}) => {
  if (Platform.OS === 'web') {
    return (
      <div className="form-field">
        <label htmlFor={name}>
          {label}
          {required && <span className="required">*</span>}
        </label>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          onBlur={() => onBlur(name)}
          placeholder={placeholder}
          className={touched && error ? 'error' : ''}
          {...props}
        />
        {touched && error && <span className="error-message">{error}</span>}
        <style jsx>{`
          .form-field {
            margin-bottom: 1rem;
          }
          label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
          }
          .required {
            color: #dc3545;
            margin-left: 0.25rem;
          }
          input {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #ced4da;
            border-radius: 4px;
            font-size: 1rem;
          }
          input.error {
            border-color: #dc3545;
          }
          .error-message {
            color: #dc3545;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: block;
          }
        `}</style>
      </div>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <TextInput
        style={[
          styles.input,
          touched && error && styles.inputError,
        ]}
        value={value}
        onChangeText={(text) => onChange(name, text)}
        onBlur={() => onBlur(name)}
        placeholder={placeholder}
        type={type}
        {...props}
      />
      {touched && error && (
        <Text style={styles.errorMessage}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  required: {
    color: '#dc3545',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#dc3545',
  },
  errorMessage: {
    color: '#dc3545',
    fontSize: 14,
    marginTop: 4,
  },
}); 