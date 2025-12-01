// ============================================
// VELVET HAIR WIGS - AUTHENTICATION JAVASCRIPT
// ============================================

// Validation Utility Functions
const validators = {
    email: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    },
    
    password: (password) => {
        // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
        return password.length >= 8;
    },
    
    fullName: (name) => {
        return name.trim().length >= 2;
    },
    
    passwordsMatch: (password, confirmPassword) => {
        return password === confirmPassword;
    }
};

// Show error message
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorElement = document.getElementById(`${inputId}Error`);
    
    if (input && errorElement) {
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

// Clear error message
function clearError(inputId) {
    const input = document.getElementById(inputId);
    const errorElement = document.getElementById(`${inputId}Error`);
    
    if (input && errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

// Clear all errors
function clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const inputElements = document.querySelectorAll('input');
    
    errorElements.forEach(el => {
        el.textContent = '';
        el.classList.remove('show');
    });
    
    inputElements.forEach(el => {
        el.classList.remove('error');
    });
}

// Show success message
function showSuccess(message) {
    // Create success message element if it doesn't exist
    let successEl = document.querySelector('.success-message');
    
    if (!successEl) {
        successEl = document.createElement('div');
        successEl.className = 'success-message';
        const form = document.querySelector('.auth-form');
        form.insertBefore(successEl, form.firstChild);
    }
    
    successEl.textContent = message;
    successEl.classList.add('show');
    
    // Hide after 4 seconds
    setTimeout(() => {
        successEl.classList.remove('show');
    }, 4000);
}

// ============================================
// LOGIN FORM HANDLING
// ============================================
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    // Real-time validation on input
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            const email = emailInput.value.trim();
            if (email && !validators.email(email)) {
                showError('email', 'Please enter a valid email address');
            } else {
                clearError('email');
            }
        });
        
        emailInput.addEventListener('input', () => {
            if (emailInput.classList.contains('error')) {
                clearError('email');
            }
        });
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('blur', () => {
            const password = passwordInput.value;
            if (password && password.length < 8) {
                showError('password', 'Password must be at least 8 characters');
            } else {
                clearError('password');
            }
        });
        
        passwordInput.addEventListener('input', () => {
            if (passwordInput.classList.contains('error')) {
                clearError('password');
            }
        });
    }
    
    // Form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearAllErrors();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        let hasError = false;
        
        // Validate email
        if (!email) {
            showError('email', 'Email is required');
            hasError = true;
        } else if (!validators.email(email)) {
            showError('email', 'Please enter a valid email address');
            hasError = true;
        }
        
        // Validate password
        if (!password) {
            showError('password', 'Password is required');
            hasError = true;
        } else if (password.length < 8) {
            showError('password', 'Password must be at least 8 characters');
            hasError = true;
        }
        
        if (hasError) {
            return;
        }
        
        // Disable submit button
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Logging in...';
        
        // Simulate API call (replace with actual API endpoint)
        setTimeout(() => {
            // Success case
            showSuccess('Login successful! Redirecting...');
            
            // Redirect to dashboard or home page
            setTimeout(() => {
                window.location.href = '/'; // Change to your dashboard URL
            }, 1500);
            
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Login';
        }, 1000);
        
        /* 
        // Example: Actual API call using fetch
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                showSuccess('Login successful! Redirecting...');
                localStorage.setItem('token', data.token);
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 1500);
            } else {
                showError('password', data.message || 'Invalid credentials');
            }
        } catch (error) {
            showError('password', 'Server error. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Login';
        }
        */
    });
}

// ============================================
// REGISTER FORM HANDLING
// ============================================
const registerForm = document.getElementById('registerForm');

if (registerForm) {
    // Real-time validation on input
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    if (fullNameInput) {
        fullNameInput.addEventListener('blur', () => {
            const fullName = fullNameInput.value.trim();
            if (fullName && !validators.fullName(fullName)) {
                showError('fullName', 'Please enter your full name');
            } else {
                clearError('fullName');
            }
        });
        
        fullNameInput.addEventListener('input', () => {
            if (fullNameInput.classList.contains('error')) {
                clearError('fullName');
            }
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            const email = emailInput.value.trim();
            if (email && !validators.email(email)) {
                showError('email', 'Please enter a valid email address');
            } else {
                clearError('email');
            }
        });
        
        emailInput.addEventListener('input', () => {
            if (emailInput.classList.contains('error')) {
                clearError('email');
            }
        });
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('blur', () => {
            const password = passwordInput.value;
            if (password && !validators.password(password)) {
                showError('password', 'Password must be at least 8 characters');
            } else {
                clearError('password');
            }
        });
        
        passwordInput.addEventListener('input', () => {
            if (passwordInput.classList.contains('error')) {
                clearError('password');
            }
        });
    }
    
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('blur', () => {
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            if (confirmPassword && !validators.passwordsMatch(password, confirmPassword)) {
                showError('confirmPassword', 'Passwords do not match');
            } else {
                clearError('confirmPassword');
            }
        });
        
        confirmPasswordInput.addEventListener('input', () => {
            if (confirmPasswordInput.classList.contains('error')) {
                clearError('confirmPassword');
            }
        });
    }
    
    // Form submission
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearAllErrors();
        
        const fullName = fullNameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const agreeTerms = document.getElementById('agreeTerms').checked;
        let hasError = false;
        
        // Validate full name
        if (!fullName) {
            showError('fullName', 'Full name is required');
            hasError = true;
        } else if (!validators.fullName(fullName)) {
            showError('fullName', 'Please enter your full name');
            hasError = true;
        }
        
        // Validate email
        if (!email) {
            showError('email', 'Email is required');
            hasError = true;
        } else if (!validators.email(email)) {
            showError('email', 'Please enter a valid email address');
            hasError = true;
        }
        
        // Validate password
        if (!password) {
            showError('password', 'Password is required');
            hasError = true;
        } else if (!validators.password(password)) {
            showError('password', 'Password must be at least 8 characters');
            hasError = true;
        }
        
        // Validate confirm password
        if (!confirmPassword) {
            showError('confirmPassword', 'Please confirm your password');
            hasError = true;
        } else if (!validators.passwordsMatch(password, confirmPassword)) {
            showError('confirmPassword', 'Passwords do not match');
            hasError = true;
        }
        
        // Check terms agreement
        if (!agreeTerms) {
            alert('Please agree to the Terms & Conditions');
            hasError = true;
        }
        
        if (hasError) {
            return;
        }
        
        // Disable submit button
        const submitBtn = registerForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating Account...';
        
        // Simulate API call (replace with actual API endpoint)
        setTimeout(() => {
            // Success case
            showSuccess('Account created successfully! Redirecting to login...');
            
            // Redirect to login page
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
            
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Create Account';
        }, 1000);
        
        /* 
        // Example: Actual API call using fetch
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullName, email, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                showSuccess('Account created successfully! Redirecting...');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                if (data.field) {
                    showError(data.field, data.message);
                } else {
                    showError('email', data.message || 'Registration failed');
                }
            }
        } catch (error) {
            showError('email', 'Server error. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Create Account';
        }
        */
    });
}

// ============================================
// ADDITIONAL FEATURES
// ============================================

// Toggle password visibility (optional enhancement)
function addPasswordToggle() {
    const passwordFields = document.querySelectorAll('input[type="password"]');
    
    passwordFields.forEach(field => {
        const wrapper = field.parentElement;
        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'password-toggle';
        toggleBtn.innerHTML = '👁️';
        toggleBtn.style.cssText = `
            position: absolute;
            right: 14px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
            font-size: 18px;
            opacity: 0.5;
        `;
        
        toggleBtn.addEventListener('click', () => {
            if (field.type === 'password') {
                field.type = 'text';
                toggleBtn.innerHTML = '🙈';
            } else {
                field.type = 'password';
                toggleBtn.innerHTML = '👁️';
            }
        });
        
        wrapper.style.position = 'relative';
        wrapper.appendChild(toggleBtn);
    });
}

// Uncomment to enable password visibility toggle
// addPasswordToggle();

console.log('Velvet Hair Wigs Authentication loaded ✨');
