export const chatFlow = {
  start: {
    message: "Hi there! Welcome to Legal24. How can I assist you today?",
    options: [
      { label: "I need legal advice", next: "advice_type" },
      { label: "I want to track my case", next: "track" },
      { label: "I am an advocate", next: "advocate" }
    ]
  },
  advice_type: {
    message: "I can help with that. What kind of legal problem are you facing?",
    options: [
      { label: "Civil Matter", next: "consult_type" },
      { label: "Criminal Matter", next: "consult_type" },
      { label: "Corporate / Business", next: "consult_type" },
      { label: "Go back", next: "start" }
    ]
  },
  consult_type: {
    message: "Got it. Are you looking for a quick expert consultation, or do you need to hire an advocate to represent you?",
    options: [
      { label: "I just want a consultation", next: "book_consultant" },
      { label: "I want to hire an advocate", next: "book_advocate" },
      { label: "Start over", next: "start" }
    ]
  },
  book_consultant: {
    message: "Excellent. You can instantly book a 1-on-1 video or chat consultation with our top-rated legal experts. Please login to book your slot.",
    options: [
      { label: "Login to Book Consult", action: "NAVIGATE_LOGIN" },
      { label: "Go back", next: "start" }
    ]
  },
  book_advocate: {
    message: "We have thousands of background-checked advocates ready to take your case. Please login to browse advocate profiles and securely share your details.",
    options: [
      { label: "Login to Find Advocates", action: "NAVIGATE_LOGIN" },
      { label: "Go back", next: "start" }
    ]
  },
  track: {
    message: "Our Smart Case Tracking feature allows you to monitor your case progress in real-time and get automated alerts. Please login to your dashboard to view your active cases.",
    options: [
      { label: "Go to Login", action: "NAVIGATE_LOGIN" },
      { label: "Go back", next: "start" }
    ]
  },
  advocate: {
    message: "Welcome, Advocate! Legal24 provides a powerful, secure dashboard to manage your clients, documents, and cases effortlessly. Please login to access your workspace.",
    options: [
      { label: "Login to Workspace", action: "NAVIGATE_LOGIN" },
      { label: "Go back", next: "start" }
    ]
  }
};
