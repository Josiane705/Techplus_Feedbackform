// Load existing feedback from localStorage when the page loads
let allFeedback = JSON.parse(localStorage.getItem('techplusFeedback')) || [];

// Show export section if there's already data
if (allFeedback.length > 0) {
    document.getElementById('exportSection').classList.remove('hidden');
}

// Handle form submission
document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const feedbackData = {
        name: document.getElementById('name').value,
        contact: document.getElementById('contact').value,
        topic: document.getElementById('topic').value,
        rating: document.getElementById('rating').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toLocaleString()
    };

    // Add to array and save to localStorage
    allFeedback.push(feedbackData);
    localStorage.setItem('techplusFeedback', JSON.stringify(allFeedback));

    alert('Thank you, ' + feedbackData.name + '! Your feedback is important to us at Techplus.');
    this.reset();
    document.getElementById('exportSection').classList.remove('hidden');
});

// Export data as CSV
document.getElementById('downloadBtn').addEventListener('click', function() {
    if (allFeedback.length === 0) {
        alert('No data to export!');
        return;
    }

    let csvContent = "Name,Contact,Topic,Rating,Message,Timestamp\n";
    allFeedback.forEach(function(feedback) {
        csvContent += `"${feedback.name}","${feedback.contact}","${feedback.topic}","${feedback.rating}","${feedback.message}","${feedback.timestamp}"\n`;
    });

    const encodedUri = encodeURI('data:text/csv;charset=utf-8,' + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "techplus_feedback_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Clear stored data (optional utility)
function clearData() {
    if (confirm('Are you sure you want to clear all feedback data?')) {
        localStorage.removeItem('techplusFeedback');
        allFeedback = [];
        document.getElementById('exportSection').classList.add('hidden');
        alert('All feedback data has been cleared.');
    }
}
