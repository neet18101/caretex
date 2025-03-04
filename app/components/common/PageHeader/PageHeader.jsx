const PageHeader = ({ title, backgroundImage, breadcrumbs }) => {
  return (
    <section className="relative w-full min-h-[300px] md:min-h-[400px] flex items-center">
      <div className="w-full">
        <div className="relative">
          {/* Dynamic background image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          ></div>

          {/* Overlay for better text visibility */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          <div className="container mx-auto relative z-10 flex justify-center items-center min-h-[300px] md:min-h-[400px]">
            <div className="text-center text-white px-4">
              {/* Title */}
              <h2 className="text-2xl md:text-4xl font-bold">{title}</h2>

              {/* Breadcrumbs */}
              <ul className="flex justify-center items-center space-x-2 text-sm md:text-base mt-4">
                {breadcrumbs.map((breadcrumb, index) => (
                  <li key={index} className="flex items-center">
                    {breadcrumb.icon && (
                      <span className="mr-2 text-gray-300">
                        <i className={breadcrumb.icon}></i>
                      </span>
                    )}
                    {breadcrumb.link ? (
                      <a href={breadcrumb.link} className="hover:underline">
                        {breadcrumb.label}{" "}
                      </a>
                    ) : (
                      <span className="text-gray-300">{breadcrumb.label} </span>
                    )}
                    {index < breadcrumbs.length - 1 && (
                      <>
                        {" "}
                        <span className="text-gray-400"> / </span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
