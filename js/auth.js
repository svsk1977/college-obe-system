// auth.js

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Sign in with Firebase Auth
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in successfully
                    const user = userCredential.user;
                    console.log("User signed in:", user.email);
                    
                    // Get user role from Firestore
                    db.collection('users').doc(user.uid).get()
                        .then((doc) => {
                            if (doc.exists) {
                                const userData = doc.data();
                                const role = userData.role;
                                
                                // Redirect based on role
                                switch(role) {
                                    case 'admin':
                                        window.location.href = '/pages/admin/dashboard.html';
                                        break;
                                    case 'faculty':
                                        window.location.href = '/pages/faculty/dashboard.html';
                                        break;
                                    case 'coordinator':
                                        window.location.href = '/pages/coordinator/dashboard.html';
                                        break;
                                    case 'principal':
                                        window.location.href = '/pages/principal/dashboard.html';
                                        break;
                                    default:
                                        alert('Role not assigned. Please contact administrator.');
                                }
                            } else {
                                alert('User data not found. Please contact administrator.');
                            }
                        })
                        .catch((error) => {
                            console.error("Error getting user data:", error);
                            alert('Error retrieving user role. Please try again.');
                        });
                })
                .catch((error) => {
                    // Handle errors
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error("Login error:", errorCode, errorMessage);
                    
                    if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
                        alert('Invalid email or password. Please try again.');
                    } else {
                        alert('Login failed: ' + errorMessage);
                    }
                });
        });
    }
});
