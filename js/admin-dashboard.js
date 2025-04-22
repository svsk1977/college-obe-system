document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            console.log("User is signed in:", user.email);
            
            // Check if user is admin
            db.collection('users').doc(user.uid).get()
                .then((doc) => {
                    if (doc.exists && doc.data().role === 'admin') {
                        // User is admin, load dashboard data
                        loadDashboardData();
                    } else {
                        // Not an admin, redirect to login
                        alert('You do not have admin privileges.');
                        window.location.href = '../../index.html';
                    }
                })
                .catch((error) => {
                    console.error("Error getting user data:", error);
                    alert('Error verifying user role. Please try again.');
                    window.location.href = '../../index.html';
                });
        } else {
            // No user is signed in, redirect to login
            window.location.href = '../../index.html';
        }
    });
    
    // Handle logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            firebase.auth().signOut().then(() => {
                window.location.href = '../../index.html';
            }).catch((error) => {
                console.error("Error signing out:", error);
            });
        });
    }
    
    // Load dashboard data
    function loadDashboardData() {
        // Count users
        db.collection('users').get().then((snapshot) => {
            document.getElementById('userCount').textContent = snapshot.size;
        });
        
        // Count programs
        db.collection('programs').get().then((snapshot) => {
            document.getElementById('programCount').textContent = snapshot.size;
        });
        
        // Count courses (if collection exists)
        db.collection('courses').get().then((snapshot) => {
            document.getElementById('courseCount').textContent = snapshot.size;
        }).catch(() => {
            // Collection might not exist yet
            document.getElementById('courseCount').textContent = '0';
        });
        
        // Count faculty users
        db.collection('users').where('role', '==', 'faculty').get().then((snapshot) => {
            document.getElementById('facultyCount').textContent = snapshot.size;
        });
    }
});
