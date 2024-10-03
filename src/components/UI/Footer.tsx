import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-4">
      <div className="container mx-auto text-center">
        <p className="mb-2">
          © {new Date().getFullYear()} Pet Care. All rights reserved.
        </p>
        <div>
          <Link href="/privacy" className="text-gray-400 hover:underline">
            Privacy Policy
          </Link>
          <span className="mx-2">|</span>
          <Link href="/terms" className="text-gray-400 hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
