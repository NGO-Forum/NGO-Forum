import React, { useEffect, useState } from "react";
import { api } from "../API/api";

export default function Project() {


  // FIXED ORDER ALWAYS
  const fixedOrder = ["RITI", "SACHAS", "PALI", "MACOR"];

  // Program titles + subtitles
  const programInfo = {
    RITI: {
      title: "Resilient, Innovative, and Transformative Institution ( RITI )",
      subtitle:
        "RITI aims are to transform the NGOF, NGOF’s members and their partners/communities (incl. ACs, CPA, CFi, and CF) so that they will become resilient, innovative, and transformative institution.",
    },
    SACHAS: {
      title:
        "Solidarity Actions for Community Harmonization and Sustainability ( SACHAS )",
      subtitle:
        "SACHAS aims at supporting NGOF’s members, partners and the communities to operationalize key laws and policies mentioned above into practices, and to support their local-led initiatives to transform their communities toward harmonious, prosperous, resilient and sustainable one.",
    },
    PALI: {
      title: "Policies and Legal Influences ( PALI )",
      subtitle:
        "ALI aims to engage and influence global, regional and national laws and policies effecting the poor, indigenous, marginalized, and vulnerable groups and people.",
    },
    MACOR: {
      title:
        "Management of Accounting, Competencies, Operations and Resources ( MACOR )",
      subtitle:
        "MACOR aims at supporting the NGOF to become a transparent, accountable, responsible and sustainable membership-based organization.",
    },
  };

  return (
    <section>
      {/* HERO IMAGE + TITLE */}
      <div className="relative w-full h-[100px] sm:h-[150px] lg:h-[180px]">
        <img
          src="/images/project/impact.PNG"
          alt="Project Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <h1
          className="absolute inset-0 flex justify-center items-center 
          text-white text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg"
        >
          OUR IMPACTS
        </h1>
      </div>

      {/* TOP INTRO SECTION */}
      <section className="w-full px-4 py-6 md:px-10 lg:py-12 lg:px-12 flex justify-center">
        <div className="max-w-8xl bg-green-700 rounded-3xl text-white p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center">

          {/* LEFT TEXT */}
          <div className="order-2 lg:order-1 space-y-3 md:space-y-6 leading-relaxed">
            <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold tracking-wide">
              OUR IMPACTS
            </h2>

            <p className="text-sm md:text-base">
              By 2030, NGO Forum on Cambodia (NGOF) will have contributed to a measurable shift in Cambodia’s development trajectory by strengthening the agency and influence of citizens and civil society organizations in policy and legal processes. The intended impact is that development policies, public financial management, and investment decisions increasingly reflect principles of fairness, environmental sustainability, and social inclusion, resulting in more climate‑smart and pro‑poor outcomes for diverse Cambodian communities.
            </p>

            <p className="text-sm md:text-base">
              Concurrently, NGOF will consolidate a resilient ecosystem of actors—communities, youth, member organizations, and partners—who are equipped to claim resource rights, engage in evidence‑based advocacy, and monitor the implementation of key laws and policies on land, water, forests, fisheries, mines, and energy. This will be underpinned by strengthened internal systems, MEALI, and organizational capacities, enabling NGOF to deliver more coherent, accountable, and scalable interventions. For illustrative evidence of these intended impacts in practice, please refer to the case studies presented in the following section.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="order-1 lg:order-2 flex justify-center">
            <img
              src="/images/project/impact.jpg"
              alt="Community Meeting"
              className="rounded-xl w-full h-64 md:h-[350px] lg:h-[400px] object-cover shadow-lg"
            />
          </div>

        </div>
      </section>
    </section>
  );
}
