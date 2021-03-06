import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./commercials.scss";

export default function Commercials() {
    const videoIndex = ["one", "two", "three", "four", "five", "six", "seven"];

    const [portfolioData, setPortfolioData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3001/commercials").then(response => response.json())
            .then(portfolioData => {
                setPortfolioData(portfolioData)
                // console.log(portfolioData);
            }).catch(error => {
                console.log(error.message)
            })
    }, []);

    return (
        <section id="commercial-container">
            <div id="grid-wrapper">
                {portfolioData.map((video, index) => {
                    return (
                        <div className={videoIndex[index]} key={index}>
                            <Link
                                to="/embeddedplayer"
                                state={{
                                    link: `${video.uri}`,
                                    title: `${video.name}`,
                                    description: `${video.description}`,
                                }}
                            >
                                <div
                                    style={{
                                        backgroundImage: `url(${video.pictures.sizes[5].link})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        height: "100%",
                                        width: "100%"
                                    }}>
                                    <span aria-hidden="true">{video.name}</span>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </section>
    );
}
