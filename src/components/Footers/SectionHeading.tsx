import Heading from "../Heading";

const SectionHeading = ({ children }: any) => {
  return (
    <Heading level={2} className={`fs-5 wght-7`}>
      {children}
    </Heading>
  );
};

export default SectionHeading;
