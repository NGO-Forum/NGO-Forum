
export default function Membership() {

  return (
    <section>
      {/* HERO IMAGE + TITLE */}
      <div className="relative w-full h-[100px] sm:h-[150px] lg:h-[180px]">
        <img
          src="/images/GetInvolved/bg.jpg"
          alt="Volunteer Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <h1 className="absolute inset-0 flex justify-center items-center 
          text-white text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg">
          OUR PROJECTS
        </h1>
      </div>

    </section>
  );
}
