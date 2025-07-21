document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    (function() {
        emailjs.init("a2B9FWccOsZZBbhJd");
    })();

    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const btnIcon = submitBtn.querySelector('.btn-icon');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-flex';
        btnIcon.style.display = 'none';
        submitBtn.disabled = true;

        // Get form data
        const formData = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            business_type: document.getElementById('businessType').value,
            message: document.getElementById('automationNeeds').value,
            to_email: 'info@spaceup.co.ke' // Your receiving email
        };

        // Send notification email to yourself first
        emailjs.send('service_s8r40cv', 'template_b0a9ocn', formData)
            .then(function(response) {
                console.log('Notification email sent!', response.status, response.text);
                
                // Then send auto-reply to the user
                const autoReplyData = {
                    to_email: formData.from_email,
                    to_name: formData.from_name,
                    business_type: formData.business_type,
                    message: formData.message
                };
                
                console.log('Sending auto-reply with data:', JSON.stringify(autoReplyData, null, 2));
                
                return emailjs.send('service_s8r40cv', 'template_omzzegq', autoReplyData)
                    .then(response => {
                        console.log('EmailJS response:', response);
                        return response;
                    });
            })
            .then(function(response) {
                console.log('Auto-reply sent!', response.status, response.text);
                // Show success message
                formSuccess.classList.add('show');
                
                // Clear form fields and hide success message after delay
                setTimeout(() => {
                    // Clear form fields individually
                    document.getElementById('name').value = '';
                    document.getElementById('email').value = '';
                    document.getElementById('businessType').selectedIndex = 0;
                    document.getElementById('automationNeeds').value = '';
                    
                    // Hide success message
                    formSuccess.classList.remove('show');
                }, 2000); // Hide after 2 seconds
            })
            .catch(function(error) {
                console.error('Error details:', {
                    status: error.status,
                    text: error.text,
                    fullError: error
                });
                
                // Show success message regardless of auto-reply status
                formSuccess.classList.add('show');
                
                // Clear form fields and hide success message after delay
                setTimeout(() => {
                    // Clear form fields individually
                    document.getElementById('name').value = '';
                    document.getElementById('email').value = '';
                    document.getElementById('businessType').selectedIndex = 0;
                    document.getElementById('automationNeeds').value = '';
                    
                    // Hide success message
                    formSuccess.classList.remove('show');
                }, 2000); // Hide after 2 seconds
                
                // Log the error details for debugging
                console.log('Auto-reply failed, but main message was sent. Error:', error);
            })
            .finally(function() {
                // Reset button state
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                btnIcon.style.display = 'inline-block';
                submitBtn.disabled = false;
            });
    });
});
