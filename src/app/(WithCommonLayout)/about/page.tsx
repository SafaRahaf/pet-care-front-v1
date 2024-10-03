import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center p-8 ">
      <h1 className="text-4xl font-bold mb-6 text-center ">About Us</h1>
      <p className="text-lg mb-4 text-center max-w-3xl ">
        At PetCare, we believe that pets are not just animals; they are family.
        Our mission is to provide the highest quality care and services for your
        furry friends. From grooming to training, and everything in between, we
        are here to support you and your pets.
      </p>

      <div className="flex flex-col md:flex-row items-center justify-around mt-8 max-w-5xl mx-auto">
        <div className="flex flex-col items-center mb-6 md:mb-0 p-4  rounded-lg shadow-md transition-transform transform hover:scale-105">
          <Image
            src="https://res.cloudinary.com/dvz9ssr9t/image/upload/v1727619282/pexels-klub-boks-1437055-15049238_u9nyw9.jpg"
            alt="Pet Grooming"
            width={350}
            height={230}
            className="rounded-lg mb-4"
          />
          <h2 className="text-2xl font-semibold ">Grooming</h2>
          <p className="text-center ">
            Our professional groomers will ensure your pet looks and feels their
            best!
          </p>
        </div>

        <div className="flex flex-col items-center mb-6 md:mb-0 p-4  rounded-lg shadow-md transition-transform transform hover:scale-105">
          <Image
            src="https://res.cloudinary.com/dvz9ssr9t/image/upload/v1727619319/pexels-optical-chemist-340351297-15575358_addffm.jpg"
            alt="Pet Training"
            width={350}
            height={230}
            className="rounded-lg mb-4"
          />
          <h2 className="text-2xl font-semibold ">Training</h2>
          <p className="text-center ">
            We offer personalized training programs to help your pet become a
            well-behaved member of the family.
          </p>
        </div>

        <div className="flex flex-col items-center p-4  rounded-lg shadow-md transition-transform transform hover:scale-105">
          <Image
            src="https://res.cloudinary.com/dvz9ssr9t/image/upload/v1727619295/pexels-fausto-gomez-288925126-14169665_hftead.jpg"
            alt="Pet Nutrition"
            width={350}
            height={230}
            className="rounded-lg mb-4"
          />
          <h2 className="text-2xl font-semibold ">Nutrition</h2>
          <p className="text-center ">
            Our experts can guide you in selecting the best food for your pet's
            health and happiness.
          </p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4 ">Why Choose Us?</h2>
        <p className="text-lg  mb-6 max-w-3xl mx-auto">
          At PetCare, our commitment to providing the best pet care services is
          unmatched. Our team is made up of passionate pet lovers who are
          dedicated to ensuring that your pets receive the utmost care. We
          offer:
        </p>
        <ul className="list-disc list-inside mb-4 max-w-3xl mx-auto text-center flex justify-between">
          <div className="w-1/2 text-start">
            <li>Experienced and caring staff</li>
            <li>State-of-the-art facilities</li>
            <li>Customizable care plans</li>
            <li>Affordable pricing</li>
          </div>
          <div className="w-1/2 text-start">
            <li>Expert veterinary care</li>
            <li>Flexible appointment scheduling</li>
            <li>Comprehensive wellness programs</li>
            <li>Grooming and daycare services</li>
          </div>
        </ul>
        <Image
          src="https://res.cloudinary.com/dvz9ssr9t/image/upload/v1727619290/pexels-jean-paul-montanaro-49563862-17839953_wp42pb.jpg"
          alt="Happy Pets"
          width={800}
          height={400}
          className="rounded-lg shadow-md mb-4"
        />
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4 ">What Our Clients Say</h2>
        <p className="text-lg mb-6 max-w-3xl mx-auto ">
          Don't just take our word for it! Here's what some of our happy clients
          have to say about us.
        </p>
        <div className="flex flex-col md:flex-row justify-around max-w-4xl mx-auto gap-4">
          <div className="border p-4 rounded-lg shadow-lg mb-6 md:mb-0 ">
            <p className="italic ">
              "PetCare has been a lifesaver for my fur baby! Their grooming
              service is top-notch!"
            </p>
            <p className="mt-2 font-semibold">- Sarah W.</p>
          </div>
          <div className="border p-4 rounded-lg shadow-lg mb-6 md:mb-0 ">
            <p className="italic ">
              "The training programs are fantastic! My dog has improved so
              much."
            </p>
            <p className="mt-2 font-semibold">- John D.</p>
          </div>
        </div>
      </div>
      <div className="mt-16 max-w-3xl w-full p-6 border rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4 text-center ">Contact Us</h2>
        <p className="text-lg mb-4 text-center ">
          We would love to hear from you! If you have any questions or would
          like to learn more about our services, please reach out to us.
        </p>
        <form className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="border rounded-lg p-2"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border rounded-lg p-2"
            required
          />
          <textarea
            placeholder="Your Message"
            className="border rounded-lg p-2"
            rows={4}
            required
          />
          <button className="rounded-lg p-2 transition bg-gray-800 text-white">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
