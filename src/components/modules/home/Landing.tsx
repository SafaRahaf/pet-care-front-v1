import Image from "next/image";

export default function Landing() {
  return (
    <div className="relative mb-6">
      <Image
        src="https://res.cloudinary.com/dvz9ssr9t/image/upload/v1693973527/samples/animals/three-dogs.jpg"
        alt="Dogs"
        width={1920}
        height={500}
        className="object-cover w-full h-[500px] md:h-[400px]"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 p-6">
        <h2 className="text-white text-4xl font-bold">Caring for Your Pets</h2>
        <p className="text-white text-lg mt-4 text-center max-w-lg">
          We understand that your pets are part of your family. Our mission is
          to provide the best care and services for your beloved companions,
          ensuring their happiness and well-being.
        </p>
        <button className="mt-6 px-4 py-2 border rounded-md hover:bg-gray-400 text-white transition duration-300">
          Learn More
        </button>
      </div>
    </div>
  );
}
