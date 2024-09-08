document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#resume-form') as HTMLFormElement;
    const nameDisplay = document.getElementById('name-display') as HTMLDivElement | null;
    const emailDisplay = document.getElementById('email-display') as HTMLDivElement | null;
    const educationDisplay = document.getElementById('education-display') as HTMLDivElement | null;
    const skillsDisplay = document.getElementById('skills-display') as HTMLDivElement | null;
    const experienceDisplay = document.getElementById('experience-display') as HTMLDivElement | null;
    const profilePictureDisplay = document.getElementById('profile-picture-display') as HTMLImageElement | null;
    const editButton = document.getElementById('edit-button') as HTMLButtonElement | null;

    // Load saved content from localStorage
    function loadContent() {
        if (nameDisplay) {
            nameDisplay.textContent = localStorage.getItem('resume-name') || 'Click to edit';
        }
        if (emailDisplay) {
            emailDisplay.textContent = localStorage.getItem('resume-email') || 'Click to edit';
        }
        if (educationDisplay) {
            educationDisplay.textContent = localStorage.getItem('resume-education') || 'Click to edit';
        }
        if (skillsDisplay) {
            skillsDisplay.textContent = localStorage.getItem('resume-skills') || 'Click to edit';
        }
        if (experienceDisplay) {
            experienceDisplay.textContent = localStorage.getItem('resume-experience') || 'Click to edit';
        }
        const profilePictureUrl = localStorage.getItem('resume-profile-picture');
        if (profilePictureDisplay && profilePictureUrl) {
            profilePictureDisplay.src = profilePictureUrl;
        }
    }

    // Save content to localStorage
    function saveContent() {
        if (nameDisplay) {
            localStorage.setItem('resume-name', nameDisplay.textContent || 'Click to edit');
        }
        if (emailDisplay) {
            localStorage.setItem('resume-email', emailDisplay.textContent || 'Click to edit');
        }
        if (educationDisplay) {
            localStorage.setItem('resume-education', educationDisplay.textContent || 'Click to edit');
        }
        if (skillsDisplay) {
            localStorage.setItem('resume-skills', skillsDisplay.textContent || 'Click to edit');
        }
        if (experienceDisplay) {
            localStorage.setItem('resume-experience', experienceDisplay.textContent || 'Click to edit');
        }
        if (profilePictureDisplay) {
            localStorage.setItem('resume-profile-picture', profilePictureDisplay.src);
        }
    }

    // Toggle contenteditable and button text
    function toggleEdit() {
        const isEditing = editButton?.textContent === 'Save Changes';

        if (nameDisplay) nameDisplay.contentEditable = isEditing ? 'false' : 'true';
        if (emailDisplay) emailDisplay.contentEditable = isEditing ? 'false' : 'true';
        if (educationDisplay) educationDisplay.contentEditable = isEditing ? 'false' : 'true';
        if (skillsDisplay) skillsDisplay.contentEditable = isEditing ? 'false' : 'true';
        if (experienceDisplay) experienceDisplay.contentEditable = isEditing ? 'false' : 'true';

        // Update button text
        if (editButton) {
            if (isEditing) {
                saveContent(); // Save changes on save click
                editButton.textContent = 'Edit Resume';
            } else {
                editButton.textContent = 'Save Changes';
            }
        }
    }

    // Handle form submission
    function handleFormSubmission(e: Event) {
        e.preventDefault(); // Prevent the default form submission behavior

        // Get form input values
        const nameInput = (document.getElementById('name') as HTMLInputElement).value;
        const emailInput = (document.getElementById('email') as HTMLInputElement).value;
        const educationInput = (document.getElementById('education') as HTMLInputElement).value;
        const skillsInput = (document.getElementById('skills') as HTMLInputElement).value;
        const experienceInput = (document.getElementById('experience') as HTMLInputElement).value;
        const profilePictureInput = (document.getElementById('profile-picture') as HTMLInputElement).files?.[0];

        // Store data in localStorage
        localStorage.setItem('resume-name', nameInput);
        localStorage.setItem('resume-email', emailInput);
        localStorage.setItem('resume-education', educationInput);
        localStorage.setItem('resume-skills', skillsInput);
        localStorage.setItem('resume-experience', experienceInput);

        if (profilePictureInput) {
            const reader = new FileReader();
            reader.onload = function(event) {
                localStorage.setItem('resume-profile-picture', event.target?.result as string);
                window.location.href = 'resume.html';
            };
            reader.readAsDataURL(profilePictureInput);
        } else {
            window.location.href = 'resume.html';
        }
    }

    // Event listeners
    if (form) form.addEventListener('submit', handleFormSubmission);
    if (editButton) editButton.addEventListener('click', toggleEdit);

    // Initialize content
    loadContent();
});




// milestone 5
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#resume-form') as HTMLFormElement;
    const nameDisplay = document.getElementById('name-display') as HTMLDivElement | null;
    const emailDisplay = document.getElementById('email-display') as HTMLDivElement | null;
    const educationDisplay = document.getElementById('education-display') as HTMLDivElement | null;
    const skillsDisplay = document.getElementById('skills-display') as HTMLDivElement | null;
    const experienceDisplay = document.getElementById('experience-display') as HTMLDivElement | null;
    const editButton = document.getElementById('edit-button') as HTMLButtonElement | null;

    function loadContent() {
        const urlParams = new URLSearchParams(window.location.search);
        const username = urlParams.get('username');

        if (username) {
            fetch(`http://localhost:5000/resume/${username}`)
                .then(response => response.json())
                .then(data => {
                    if (nameDisplay) nameDisplay.textContent = data.name || 'Click to edit';
                    if (emailDisplay) emailDisplay.textContent = data.email || 'Click to edit';
                    if (educationDisplay) educationDisplay.textContent = data.education || 'Click to edit';
                    if (skillsDisplay) skillsDisplay.textContent = data.skills || 'Click to edit';
                    if (experienceDisplay) experienceDisplay.textContent = data.experience || 'Click to edit';

                    // Set the unique URL
                    const uniqueUrl = `http://localhost:5000/resume/${username}`;
                    const resumeLink = document.getElementById('resume-link') as HTMLInputElement;
                    const copyLinkButton = document.getElementById('copy-link') as HTMLButtonElement;

                    if (resumeLink) resumeLink.value = uniqueUrl;
                    if (copyLinkButton) {
                        copyLinkButton.addEventListener('click', () => {
                            navigator.clipboard.writeText(uniqueUrl).then(() => {
                                alert('Link copied to clipboard!');
                            });
                        });
                    }
                });
        }
    }

    function handleFormSubmission(e: Event) {
        e.preventDefault(); // Prevent the default form submission behavior

        const nameInput = (document.getElementById('name') as HTMLInputElement).value;
        const emailInput = (document.getElementById('email') as HTMLInputElement).value;
        const educationInput = (document.getElementById('education') as HTMLInputElement).value;
        const skillsInput = (document.getElementById('skills') as HTMLInputElement).value;
        const experienceInput = (document.getElementById('experience') as HTMLInputElement).value;
        const usernameInput = (document.getElementById('username') as HTMLInputElement).value;

        const resumeData = {
            username: usernameInput,
            name: nameInput,
            email: emailInput,
            education: educationInput,
            skills: skillsInput,
            experience: experienceInput
        };

        fetch('http://localhost:5000/resume', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(resumeData)
        })
        .then(response => response.text())
        .then(() => {
            alert('Thank you for creating your resume!');
            window.location.href = `resume.html?username=${encodeURIComponent(usernameInput)}`;
        });
    }

    function toggleEdit() {
        const isEditing = editButton?.textContent === 'Save Changes';

        if (nameDisplay) nameDisplay.contentEditable = isEditing ? 'false' : 'true';
        if (emailDisplay) emailDisplay.contentEditable = isEditing ? 'false' : 'true';
        if (educationDisplay) educationDisplay.contentEditable = isEditing ? 'false' : 'true';
        if (skillsDisplay) skillsDisplay.contentEditable = isEditing ? 'false' : 'true';
        if (experienceDisplay) experienceDisplay.contentEditable = isEditing ? 'false' : 'true';

        if (editButton) {
            if (isEditing) {
                saveContent(); // Save changes on save click
                editButton.textContent = 'Edit Resume';
            } else {
                editButton.textContent = 'Save Changes';
            }
        }
    }

    function saveContent() {
        // Function to save the editable content back to localStorage or send to backend if needed
    }

    // Event listeners
    if (form) form.addEventListener('submit', handleFormSubmission);
    if (editButton) editButton.addEventListener('click', toggleEdit);

    // Initialize content
    loadContent();
});

document.getElementById('download-pdf')?.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.text(`Name: ${nameDisplay?.textContent || ''}`, 10, 10);
    doc.text(`Email: ${emailDisplay?.textContent || ''}`, 10, 20);
    doc.text(`Education: ${educationDisplay?.textContent || ''}`, 10, 30);
    doc.text(`Skills: ${skillsDisplay?.textContent || ''}`, 10, 40);
    doc.text(`Experience: ${experienceDisplay?.textContent || ''}`, 10, 50);

    doc.save('resume.pdf');
});
