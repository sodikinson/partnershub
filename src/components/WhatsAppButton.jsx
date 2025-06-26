// filepath: /Users/arirudiana/Devs/partnershub/src/components/WhatsAppButton.jsx
import React from "react";

const WhatsAppButton = () => {
    const phoneNumber = "+6287873795212"; // Replace with your WhatsApp number
    const message = "Hello, I would like to know more about your services!";

    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
    )}`;

    return (
        <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all"
            aria-label="Chat on WhatsApp"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
            >
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.105 1.516 5.84L0 24l6.293-1.516A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm6.422 17.422c-.256.719-1.496 1.406-2.086 1.496-.553.082-1.215.119-3.719-.781-3.125-1.219-5.094-4.219-5.25-4.422-.156-.203-1.25-1.656-1.25-3.156s.781-2.219 1.094-2.531c.281-.281.625-.344.844-.344.219 0 .438.002.625.011.203.01.469-.076.719.547.256.625.875 2.156.938 2.313.063.156.094.344.031.547-.063.203-.094.344-.188.469-.094.125-.188.281-.281.406-.094.125-.188.219-.094.406.094.188.406.656.875 1.063.594.531 1.094.719 1.281.812.188.094.313.078.438-.047.125-.125.5-.563.625-.75.125-.188.25-.156.438-.094.188.063 1.188.563 1.406.656.219.094.375.156.438.25.063.094.063.531-.188 1.031z" />
            </svg>
        </a>
    );
};

export default WhatsAppButton;
