import React from 'react'
import './CSS/About.css'

function About() {
    const cardsData = [
        {
            name: 'Harsh',
            description: 'The lorem text the section that contains header with having open functionality. Lorem dolor sit amet consectetur adipisicing elit.',
            imageUrl: 'https://res.cloudinary.com/dgarsqfvl/image/upload/v1717068316/healthmate-images/Harsh_77_photo_rqnsdl.jpg',
            LinkedIn: 'https://www.linkedin.com/in/harsh-34b5161a0/',
            Github: "https://github.com/harsh809"
        }
    ];
    return (
        <div>
            <div className='about'>
                <div className='app-about'>
                    <h3 className="about-heading">About</h3>
                    <p style={{ textAlign: "justify", fontSize: "18px" }}>
                        Our Notebook Website provides a centralized platform for storing and managing your important information securely. With easy-to-use authentication features, your data remains protected, ensuring confidentiality. Seamlessly update and delete notes as needed, maintaining a clutter-free workspace.
                        <div>
                            Enjoy access to your notes from any device, offering flexibility and convenience wherever you are. Experience efficient note-taking with peace of mind, knowing your information is safeguarded with our authentication measures.
                        </div>
                    </p>
                </div>
                <div >
                    <div className='app-about'>
                        {cardsData.map((data, id) => {
                            return <div className="card-about" key={id}>
                                <div className="image-content">
                                    <span className="overlay"></span>
                                    <div className="card-image">
                                        {data.imageUrl && <img src={data.imageUrl} alt={data.name} className="card-img" />}
                                    </div>
                                </div>
                                <div className="card-content">
                                    <h2 className="name">{data.name}</h2>
                                    <div className="social">
                                        <a href={data.LinkedIn} target='blank'><i className="fa-brands fa-linkedin-in"></i></a>
                                        <a href={data.Github} target='blank'><i className="fa-brands fa-github"></i></a>
                                    </div>
                                </div>
                            </div>
                        })

                        }
                    </div>
                </div>

            </div>
        </div>

    )
}

export default About
