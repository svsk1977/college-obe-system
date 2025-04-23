// auth.js

document.addEventListener('DOMContentLoaded', function() {
    console.log("Auth.js loaded");
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    
    // Check if user is already logged in
    firebase.auth().onAuthStateChanged(function(user) {
        console.log("Auth state changed:", user ? "User logged in" : "No user");
        if (user) {
            // User is already signed in, get role and redirect
            redirectBasedOnRole(user);
        }
    });
    
    if (loginForm) {
        console.log("Login form found");
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log("Login form submitted");
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            console.log("Attempting login with:", email);
            
            // Show loading state
            document.querySelector('button[type="submit"]').innerHTML = 'Logging in...';
            document.querySelector('button[type="submit"]').disabled = true;
            
            // Sign in with Firebase Auth
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in successfully
                    console.log("Login successful");
                    const user = userCredential.user;
                    redirectBasedOnRole(user);
                })
                .catch((error) => {
                    // Handle errors
                    console.error("Login error:", error.code, error.message);
                    
                    // Reset button
                    document.querySelector('button[type="submit"]').innerHTML = 'Login';
                    document.querySelector('button[type="submit"]').disabled = false;
                    
                    // Show error message
                    if (loginError) {
                        loginError.style.display = 'block';
                        
                        if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                            loginError.textContent = 'Invalid email or password. Please try again.';
                        } else {
                            loginError.textContent = 'Login failed: ' + error.message;
                        }
                    } else {
                        alert('Login failed: ' + error.message);
                    }
                });
        });
    } else {
        console.error("Login form not found!");
    }
    
    function redirectBasedOnRole(user) {
        console.log("Getting user role for:", user.email);
        
        // Get user role from Firestore
        firebase.firestore().collection('users').doc(user.uid).get()
            .then((doc) => {
                if (doc.exists) {
                    const userData = doc.data();
                    const role = userData.role;
                    console.log("User role:", role);
                    
                    // Redirect based on role
                    switch(role) {
                        case 'admin':
                            window.location.href = 'pages/admin/dashboard.html';
                            break;
                        case 'faculty':
                            window.location.href = 'pages/faculty/dashboard.html';
                            break;
                        case 'coordinator':
                            window.location.href = 'pages/coordinator/dashboard.html';
                            break;
                        case 'principal':
                            window.location.href = 'pages/principal/dashboard.html';
                            break;
                        default:
                            console.error("Unknown role:", role);
                            loginError.style.display = 'block';
                            loginError.textContent = 'Role not assigned. Please contact administrator.';
                    }
                } else {
                    console.error("User document not found");
                    loginError.style.display = 'block';
                    loginError.textContent = 'User data not found. Please contact administrator.';
                }
            })
            .catch((error) => {
                console.error("Error getting user data:", error);
                loginError.style.display = 'block';
                loginError.textContent = 'Error retrieving user role. Please try again.';
            });
    }
});
