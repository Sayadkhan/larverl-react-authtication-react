import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
import { Parser } from "html-to-react";

const About = () => {
  const [footerData, setFooterData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_URL}/api-pages/${id}`);
        const data = await res.json();
        setFooterData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  const htmlParser = new Parser();

  return (
    <div>
      {footerData.map((data) => (
        <p className="container mx-auto">
          {htmlParser.parse(data.descriptions)}
        </p>
      ))}
    </div>
  );
};

export default About;
