import React from "react";
import img1 from "../Assets/hero3.jpg";
import img2 from "../Assets/hero.jpg";
import img3 from "../Assets/baby.jpg";
function Services() {
  return (
    <div className="text-center p-8" style={{ backgroundImage: "linear-gradient( #FF90BC, #F9F9E0)" }}>
      <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
        Why to choose US?
      </h2>

      <div className="flex flex-wrap items-center mt-20 text-left text-center">
        <div className="w-full md:w-3/5 lg:w-1/2 px-4">
          <img src={img1} alt="gem" className="inline-block shadow-lg" />
        </div>
        <div className="w-full md:w-2/5 lg:w-1/2 px-4 text-center md:text-left lg:pl-12">
          <h3 className="font-bold mt-8 text-xl md:mt-0 sm:text-2xl">
            Ensuring Your Baby's Happiness in Our Care
          </h3>
          <p className="sm:text-lg mt-6">
            signifies our unwavering dedication to providing a nurturing
            environment where your baby thrives. With experienced caregivers,
            responsive interactions, and enriching activities, we prioritize
            your baby's well-being and foster meaningful relationships with both
            you and your little one. From playtime to soothing routines, we're
            here to support your baby through every stage, ensuring their
            happiness and growth in our care.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center mt-20 text-left text-center">
        <div className="w-full md:w-3/5 lg:w-1/2 px-4">
          <img
            src={img2}
            alt="project members"
            className="inline-block rounded shadow-lg"
          />
        </div>
        <div className="w-full md:w-2/5 lg:w-1/2 px-4 md:order-first text-center md:text-left lg:pr-12">
          <h3 className="font-bold mt-8 text-xl md:mt-0 sm:text-2xl">
            Ensuring Your Baby's Safety with Us
          </h3>
          <p className="sm:text-lg mt-6">
            encapsulates our unwavering commitment to providing a safe
            environment for your little one. We prioritize your baby's
            well-being through meticulous supervision, stringent safety
            protocols, and trained caregivers dedicated to maintaining a secure
            atmosphere. From childproofing measures to continuous monitoring, we
            leave no stone unturned in safeguarding your baby's health and
            happiness. With us, you can rest assured knowing that your baby is
            in safe hands, allowing you to enjoy peace of mind while your little
            one thrives in our care.
          </p>
        </div>
      </div>

      {/* <div className="flex flex-wrap items-center mt-20 text-left  text-center">
        <div className="w-full md:w-3/5 lg:w-1/2 px-4">
          <img
            src={img3}
            alt="editor"
            className="inline-block rounded shadow-lg border border-merino-400"
          />
        </div>
        <div className="w-full md:w-2/5 lg:w-1/2 px-4 text-center md:text-left lg:pl-12">
          <h3 className="font-bold mt-8 text-xl md:mt-0 sm:text-2xl">
          Ensuring Your Baby's Happiness in Our Care
          </h3>
          <p className="sm:text-lg mt-6">
          signifies our unwavering dedication to providing a nurturing
            environment where your baby thrives. With experienced caregivers,
            responsive interactions, and enriching activities, we prioritize
            your baby's well-being and foster meaningful relationships with both
            you and your little one. From playtime to soothing routines, we're
            here to support your baby through every stage, ensuring their
            happiness and growth in our care.
          </p>
        </div>
      </div> */}

    </div>
  );
}

export default Services;
