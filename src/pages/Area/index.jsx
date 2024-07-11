import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { NavBar } from '../../components/NavBar';
import { Footer } from '../../components/Footer';

export const Area = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [university, setUniversity] = useState(null);
    const [area, setArea] = useState(null);
    const [courses, setCourses] = useState([]);
    const { uni_id, area_id } = params;

    const token = localStorage.getItem("token");

    useEffect(() => {
      const fetchAreas = async () => {
          try {
              const response = await axios.get(
                  'https://genial-academy-backend.onrender.com/areas/findAll',
                  {
                      headers: {
                        "Content-Type": "application/json",
                        "Authorization" : `Bearer ${token}`,
                      },
                  }
              );

              console.log(response.data[0]);
              let a = response.data.filter(areas => areas.codArea.toLowerCase().normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '').replace(/ /g, '') === area_id.toLowerCase())
              setArea(a[0]);
          } catch (error) {
              console.error("Error fetching areas data:", error);
          }
      };

      fetchAreas();
  }, []);
  
  useEffect(() => {
    const fetchUniversity = async () => {
        try {
            const response = await axios.get(  /**  /home/unmsm/ */
                `https://genial-academy-backend.onrender.com/universities/findAll`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            let uni = response.data.filter(university => university.acronym.toLowerCase() === uni_id.toLowerCase());
            setUniversity(uni[0]);
        } catch (error) {
            console.error("Error fetching university data:", error);
        }
    };

    fetchUniversity();
}, [uni_id]);

    useEffect(() => {
      const fetchCourses = async () => {
          try {
              const response = await axios.get(
                  `https://genial-academy-backend.onrender.com/courses/findAll`,
                  {
                      headers: {
                          Authorization: `Bearer ${token}`,
                      },
                  }
              );
              let courses = response.data;
              setCourses(courses);
          } catch (error) {
              console.error("Error fetching courses data:", error);
          }
      };

      fetchCourses();
    }, []);

    function courseCard(course) {
        return <Link to={course.name.toLowerCase().replace(/ /g, '-').replace(' ','-')} className='link'>
            <div className="circle-button">
                <img src={`/src/assets/images/${course.name.toLowerCase().replace(/ /g, '_')}.png`} alt={course.name} />
                <span>{course.name}</span>
            </div>
        </Link>
    }
 
    function generateGrid() {
        const html = [];
        courses.forEach(course => {
            html.push(
                courseCard(course)
            );
        });
        return html;
    }

    return (
        <div>
            <NavBar></NavBar>
            <section id="section1">
                <div id="contenedor1">
                    <div id="navigation">
                        <h4 id="btnunmsm">{university? university.acronym : uni_id} &gt; {area? area.codArea : area_id}</h4>
                        <button name="btnregresar" id="btnregresar" onClick={() => navigate(-1)}></button>
                    </div>
                    <p><img src='/src/assets/images/principal.png' alt="Imagen Principal" id="imgprincipal" /></p>
                </div>
                <div id="contenedor2">
                    <h1 id="titulo">BIENVENIDO AL<br /> {area? area.codArea : area_id}</h1> 
                    <div id="container">
                        <h3>En esta sección encontrarás material educativo para <br />ayudar a tu preparación referente al área de <br />{area? area.name : area_id}.</h3>
                    </div>
                </div>
            </section>

            <section id="section2">
                <h1 id="titulo2">Cursos</h1>
                <div className="button-container" id="button-container1">
                    {generateGrid()}
                </div>
            </section>
            <section id="section3">
  <h1 id="titulo3">Exámenes de admisión</h1>
  <div className="exam-container" id="exam-container1">
    <a href='https://drive.google.com/file/d/1c007AHsDKIN7fjuufideMhJ-WohJCDvf/view?usp=drive_link' target="_blank" rel="noopener noreferrer" className="exam-button">
      <img src='/src/assets/images/lista.png' alt="2020-I" />
      <span>2020-I</span>
    </a>
    <a href='https://drive.google.com/file/d/1L4Ov_9-spyRV8HsFL2WAilR5WW2GjpGV/view?usp=drive_link' target="_blank" rel="noopener noreferrer" className="exam-button">
      <img src='/src/assets/images/lista.png' alt="2020-II" />
      <span>2020-II</span>
    </a>
    <a href='https://drive.google.com/file/d/1IAHxvo1Luys2j2qwtImOjzw55A4cZxI9/view?usp=drive_link' target="_blank" rel="noopener noreferrer" className="exam-button">
      <img src='/src/assets/images/lista.png' alt="2021-I" />
      <span>2021-I</span>
    </a>
  </div>
  <div className="exam-container" id="exam-container2">
    <a href='https://drive.google.com/file/d/1DpLiGf0BcO-Ptpl6IFPwVaZlDOznDe1e/view?usp=drive_link' target="_blank" rel="noopener noreferrer" className="exam-button">
      <img src='/src/assets/images/lista.png' alt="2021-II" />
      <span>2021-II</span>
    </a>
    <a href='https://drive.google.com/file/d/1ohbIBtiUiuVJ1AdDGH8_3hCcd2IafOft/view?usp=drive_link' target="_blank" rel="noopener noreferrer" className="exam-button">
      <img src='/src/assets/images/lista.png' alt="2022-I" />
      <span>2022-I</span>
    </a>
    <a href='https://drive.google.com/file/d/1CDmkZrC6fO9mGvGwGZrQhBuT2HJ34ief/view?usp=drive_link' target="_blank" rel="noopener noreferrer" className="exam-button">
      <img src='/src/assets/images/lista.png' alt="2022-II" />
      <span>2022-II</span>
    </a>
  </div>
</section>
            <Footer></Footer>
        </div>
    );
}
