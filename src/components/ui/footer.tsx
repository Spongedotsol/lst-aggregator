import { Twitter } from "lucide-react";

// Footer Component
const Footer = () => (
    <footer className="mt-8 bg-gray-800 bg-opacity-50 p-4 rounded-lg text-white z-10">
        <div className="container mx-auto max-w-4xl flex justify-between items-center">
            <div>© Sponge 2024</div>
            <a href="https://x.com/spongedotsol" target="_blank" rel="noopener noreferrer" aria-label="Follow us on X (formerly Twitter)">
                <Twitter className="h-5 w-5" />
            </a>
        </div>
    </footer>
);

export default Footer;
