import CryptoJS from 'crypto-js';

// AES Encryption utility for secure password storage
// Using AES-256 encryption with PBKDF2 key derivation for enhanced security

const ENCRYPTION_KEY_ITERATIONS = 10000; // PBKDF2 iterations for key strengthening
const SALT_LENGTH = 16; // Salt length in bytes

/**
 * Generates a random salt for key derivation
 * @returns {string} Base64 encoded salt
 */
function generateSalt(): string {
  return CryptoJS.lib.WordArray.random(SALT_LENGTH).toString(CryptoJS.enc.Base64);
}

/**
 * Derives an encryption key from user's master password using PBKDF2
 * @param {string} masterPassword - User's master password
 * @param {string} salt - Salt for key derivation
 * @returns {CryptoJS.lib.WordArray} Derived key
 */
function deriveKey(masterPassword: string, salt: string): CryptoJS.lib.WordArray {
  const saltWordArray = CryptoJS.enc.Base64.parse(salt);
  return CryptoJS.PBKDF2(masterPassword, saltWordArray, {
    keySize: 256 / 32, // 256-bit key
    iterations: ENCRYPTION_KEY_ITERATIONS,
    hasher: CryptoJS.algo.SHA256
  });
}

/**
 * Encrypts a password using AES-256 encryption
 * @param {string} password - Plain text password to encrypt
 * @param {string} masterPassword - User's master password for key derivation
 * @returns {string} Encrypted password with salt (format: salt:encryptedData)
 */
export function encryptPassword(password: string, masterPassword: string): string {
  try {
    // Generate a unique salt for this encryption
    const salt = generateSalt();
    
    // Derive encryption key from master password and salt
    const key = deriveKey(masterPassword, salt);
    
    // Encrypt the password using AES
    const encrypted = CryptoJS.AES.encrypt(password, key, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    
    // Return salt and encrypted data combined
    return `${salt}:${encrypted.toString()}`;
  } catch (error) {
    throw new Error('Encryption failed: ' + (error as Error).message);
  }
}

/**
 * Decrypts a password using AES-256 decryption
 * @param {string} encryptedData - Encrypted password with salt (format: salt:encryptedData)
 * @param {string} masterPassword - User's master password for key derivation
 * @returns {string} Decrypted plain text password
 */
export function decryptPassword(encryptedData: string, masterPassword: string): string {
  try {
    // Split salt and encrypted data
    const [salt, encrypted] = encryptedData.split(':');
    
    if (!salt || !encrypted) {
      throw new Error('Invalid encrypted data format');
    }
    
    // Derive the same key used for encryption
    const key = deriveKey(masterPassword, salt);
    
    // Decrypt the password
    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    
    // Convert to string and return
    const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
    
    if (!plaintext) {
      throw new Error('Decryption failed - invalid key or corrupted data');
    }
    
    return plaintext;
  } catch (error) {
    throw new Error('Decryption failed: ' + (error as Error).message);
  }
}

/**
 * Generates a cryptographically secure random password
 * @param {number} length - Password length (default: 16)
 * @param {boolean} includeSymbols - Include special characters (default: true)
 * @returns {string} Generated secure password
 */
export function generateSecurePassword(length: number = 16, includeSymbols: boolean = true): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = includeSymbols ? '!@#$%^&*()_+-=[]{}|;:,.<>?' : '';
  
  const allChars = uppercase + lowercase + numbers + symbols;
  const randomBytes = CryptoJS.lib.WordArray.random(length);
  
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.abs(randomBytes.words[i % randomBytes.words.length]) % allChars.length;
    password += allChars[randomIndex];
  }
  
  return password;
}

/**
 * Validates password strength
 * @param {string} password - Password to validate
 * @returns {object} Password strength analysis
 */
export function analyzePasswordStrength(password: string) {
  const analysis = {
    score: 0,
    feedback: [] as string[],
    isStrong: false
  };

  if (password.length < 8) {
    analysis.feedback.push('Password should be at least 8 characters long');
  } else if (password.length >= 12) {
    analysis.score += 2;
  } else {
    analysis.score += 1;
  }

  if (/[a-z]/.test(password)) analysis.score += 1;
  else analysis.feedback.push('Add lowercase letters');

  if (/[A-Z]/.test(password)) analysis.score += 1;
  else analysis.feedback.push('Add uppercase letters');

  if (/\d/.test(password)) analysis.score += 1;
  else analysis.feedback.push('Add numbers');

  if (/[^a-zA-Z0-9]/.test(password)) analysis.score += 2;
  else analysis.feedback.push('Add special characters');

  analysis.isStrong = analysis.score >= 5 && password.length >= 8;
  
  return analysis;
}