import PageWrapper from "../components/wrapper/PageWrapper";

function About({ movieData, setMovieData }) {
  return (
    <PageWrapper>
      <div className="nine">
        <h1>
          About Us <span style={{ color: "white" }}>Est. 2022</span>{" "}
        </h1>
      </div>
    </PageWrapper>
  );
}

export default About;