import { Button } from "../ui/button";

export const UniLayout = ({ college }: any) => {
  return (
    <div className="bg-blue-50">
      {/* Hero Section */}
      <div className="relative h-48 sm:h-56 md:h-64 lg:h-80 xl:h-96">
        <img
          src={
            college?.bg_url
              ? college?.bg_url.includes(
                  "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/collegebanner/"
                )
                ? `${college?.bg_url}`
                : `https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/collegebanner/${college?.bg_url}`
              : "/transfer.svg"
          }
          alt={college?.college_name || "college campus"}
          className="object-cover w-full h-full"
          fetchPriority="high"
        />

        {/* University Logo */}
        <div className="absolute inset-x-0 -bottom-12 z-10 flex justify-center xl:container xl:justify-start">
          <div className="flex items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-white shadow-lg sm:h-24 sm:w-24 md:h-32 md:w-32">
            <img
              src={
                college?.logo_url
                  ? college?.logo_url.includes(
                      "https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/collegelogo/"
                    )
                    ? `${college?.logo_url}`
                    : `https://pickmyuni-bucket.s3.ap-southeast-2.amazonaws.com/collegelogo/${college?.logo_url}`
                  : "/benefit3.svg"
              }
              alt="University Logo"
              width={120}
              height={120}
              className="object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* University Name and Address */}
      <div className="container mx-auto py-12 lg:max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          {/* University Info */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-brand-primary text-xl font-bold leading-tight sm:text-2xl md:text-3xl lg:text-4xl">
              {college?.college_name}
            </h1>
            <p className="mt-2 text-sm text-gray-600 sm:text-base md:text-lg">
              {college?.location}
            </p>
          </div>

          {/* Enquire Button */}
          <div className="flex justify-center sm:justify-end">
            <Button variant={"secondary"} className="flex items-center">
              <span>Enquire Now</span>
              <img
                src="/logo-button.svg"
                alt="Icon"
                width={50}
                height={50}
                className=""
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
