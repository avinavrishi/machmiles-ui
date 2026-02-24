import { Platform } from 'react-native';
import { storage } from './storage';
import { analytics } from './analytics';

class Security {
  constructor() {
    this.tokenKey = 'auth_token';
    this.refreshTokenKey = 'refresh_token';
    this.csrfTokenKey = 'csrf_token';
  }

  async setToken(token) {
    try {
      await storage.setItem(this.tokenKey, token);
    } catch (error) {
      console.error('Failed to set token:', error);
      analytics.trackError(error, { type: 'security', action: 'setToken' });
    }
  }

  async getToken() {
    try {
      return await storage.getItem(this.tokenKey);
    } catch (error) {
      console.error('Failed to get token:', error);
      analytics.trackError(error, { type: 'security', action: 'getToken' });
      return null;
    }
  }

  async removeToken() {
    try {
      await storage.removeItem(this.tokenKey);
    } catch (error) {
      console.error('Failed to remove token:', error);
      analytics.trackError(error, { type: 'security', action: 'removeToken' });
    }
  }

  async setRefreshToken(token) {
    try {
      await storage.setItem(this.refreshTokenKey, token);
    } catch (error) {
      console.error('Failed to set refresh token:', error);
      analytics.trackError(error, { type: 'security', action: 'setRefreshToken' });
    }
  }

  async getRefreshToken() {
    try {
      return await storage.getItem(this.refreshTokenKey);
    } catch (error) {
      console.error('Failed to get refresh token:', error);
      analytics.trackError(error, { type: 'security', action: 'getRefreshToken' });
      return null;
    }
  }

  async removeRefreshToken() {
    try {
      await storage.removeItem(this.refreshTokenKey);
    } catch (error) {
      console.error('Failed to remove refresh token:', error);
      analytics.trackError(error, { type: 'security', action: 'removeRefreshToken' });
    }
  }

  async setCsrfToken(token) {
    try {
      await storage.setItem(this.csrfTokenKey, token);
    } catch (error) {
      console.error('Failed to set CSRF token:', error);
      analytics.trackError(error, { type: 'security', action: 'setCsrfToken' });
    }
  }

  async getCsrfToken() {
    try {
      return await storage.getItem(this.csrfTokenKey);
    } catch (error) {
      console.error('Failed to get CSRF token:', error);
      analytics.trackError(error, { type: 'security', action: 'getCsrfToken' });
      return null;
    }
  }

  async removeCsrfToken() {
    try {
      await storage.removeItem(this.csrfTokenKey);
    } catch (error) {
      console.error('Failed to remove CSRF token:', error);
      analytics.trackError(error, { type: 'security', action: 'removeCsrfToken' });
    }
  }

  sanitizeInput(input) {
    if (typeof input !== 'string') return input;

    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  generateSecureToken(length = 32) {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  hashPassword(password) {
    // In a real application, you would use a proper password hashing algorithm
    // like bcrypt, Argon2, or PBKDF2
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(password))
      .then(hash => Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join(''));
  }

  encryptData(data, key) {
    // In a real application, you would use a proper encryption algorithm
    // like AES-GCM or ChaCha20-Poly1305
    return crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: crypto.getRandomValues(new Uint8Array(12)) },
      key,
      new TextEncoder().encode(JSON.stringify(data))
    );
  }

  decryptData(encryptedData, key) {
    // In a real application, you would use a proper decryption algorithm
    // like AES-GCM or ChaCha20-Poly1305
    return crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: new Uint8Array(12) },
      key,
      encryptedData
    ).then(decoded => JSON.parse(new TextDecoder().decode(decoded)));
  }

  validateUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  validatePhoneNumber(phone) {
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    return phoneRegex.test(phone);
  }

  validateCreditCard(cardNumber) {
    // Luhn algorithm
    let sum = 0;
    let isEven = false;

    // Remove spaces and dashes
    cardNumber = cardNumber.replace(/\D/g, '');

    // Loop through values starting from the rightmost
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber[i], 10);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  }

  validateSSN(ssn) {
    const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
    return ssnRegex.test(ssn);
  }

  validateIPAddress(ip) {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipRegex.test(ip)) return false;

    return ip.split('.').every(part => {
      const num = parseInt(part, 10);
      return num >= 0 && num <= 255;
    });
  }

  validateUUID(uuid) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  validateBase64(base64) {
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
    return base64Regex.test(base64);
  }

  validateJWT(token) {
    try {
      const [header, payload, signature] = token.split('.');
      if (!header || !payload || !signature) return false;

      const decodedHeader = JSON.parse(atob(header));
      const decodedPayload = JSON.parse(atob(payload));

      if (!decodedHeader.alg || !decodedPayload.exp) return false;

      // Check if token is expired
      if (decodedPayload.exp * 1000 < Date.now()) return false;

      return true;
    } catch {
      return false;
    }
  }
}

export const security = new Security();

export const useSecurity = () => {
  const setToken = useCallback((token) => {
    return security.setToken(token);
  }, []);

  const getToken = useCallback(() => {
    return security.getToken();
  }, []);

  const removeToken = useCallback(() => {
    return security.removeToken();
  }, []);

  const setRefreshToken = useCallback((token) => {
    return security.setRefreshToken(token);
  }, []);

  const getRefreshToken = useCallback(() => {
    return security.getRefreshToken();
  }, []);

  const removeRefreshToken = useCallback(() => {
    return security.removeRefreshToken();
  }, []);

  const setCsrfToken = useCallback((token) => {
    return security.setCsrfToken(token);
  }, []);

  const getCsrfToken = useCallback(() => {
    return security.getCsrfToken();
  }, []);

  const removeCsrfToken = useCallback(() => {
    return security.removeCsrfToken();
  }, []);

  return {
    setToken,
    getToken,
    removeToken,
    setRefreshToken,
    getRefreshToken,
    removeRefreshToken,
    setCsrfToken,
    getCsrfToken,
    removeCsrfToken,
    sanitizeInput: security.sanitizeInput.bind(security),
    validateEmail: security.validateEmail.bind(security),
    validatePassword: security.validatePassword.bind(security),
    generateSecureToken: security.generateSecureToken.bind(security),
    hashPassword: security.hashPassword.bind(security),
    encryptData: security.encryptData.bind(security),
    decryptData: security.decryptData.bind(security),
    validateUrl: security.validateUrl.bind(security),
    validatePhoneNumber: security.validatePhoneNumber.bind(security),
    validateCreditCard: security.validateCreditCard.bind(security),
    validateSSN: security.validateSSN.bind(security),
    validateIPAddress: security.validateIPAddress.bind(security),
    validateUUID: security.validateUUID.bind(security),
    validateBase64: security.validateBase64.bind(security),
    validateJWT: security.validateJWT.bind(security),
  };
}; 