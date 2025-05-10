 // EmailJs Configuration
 (function () {
    emailjs.init("6P2mfp2qhesQDd_hK"); 
})();



document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const btn = document.getElementById("button");
    btn.textContent = "Sending...";

    const serviceID = "default_service";
    const templateID = "template_bgbnxtc"; 
const name = document.getElementById("name").value.trim();  
const email = document.getElementById("email").value.trim();
const subject = document.getElementById("subject").value.trim();
const message = document.getElementById("message").value.trim();
    const formData = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message
    };
      // Simple validation
      if (!name || !email || !subject || !message) {
        alert('Please fill out all fields');
        return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    emailjs.send(serviceID, templateID, formData)
        .then(() => {
            btn.textContent = "Send Message";
            alert("Message sent successfully!");
            document.getElementById("contact-form").reset();
        }, (err) => {
            btn.textContent = "Send Message";
            alert("Failed to send message: " + JSON.stringify(err));
        });
});