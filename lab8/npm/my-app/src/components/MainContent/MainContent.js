import React, { useState } from 'react';
import Tile from '../Tile/Tile';
import './MainContent.css';
import heroImage from '../../images/books.jpg';
import image1 from '../../images/image1.webp';
import image2 from '../../images/image2.jpg';
import image3 from '../../images/image3.jpg';
import image4 from '../../images/image4.png';
import image5 from '../../images/image5.png';
import image6 from '../../images/image6.png';

function MainContent() {
    const [visibleTiles, setVisibleTiles] = useState(3);

    const allTiles = [
        { title: "Bloodguard", image: image1, description: "One hundred years. Tens of thousands of gladiators. And today, only one will rise. Everything in the Kingdom of Arrow is a lie..." },
        { title: "Strange Beasts", image: image2, description: "In this fresh-yet-familiar gothic tale―part historical fantasy, part puzzle-box mystery―the worlds of Dracula and Sherlock Holmes collide..." },
        { title: "The Girl from the Sea", image: image3, description: "Fifteen-year-old Morgan has a secret: She can't wait to escape the perfect little island where she lives..." },
        { title: "Strike and Burn", image: image4, description: "A breathless romantic thriller that doesn’t just toe the line between danger and desire—it burns it to the ground." },
        { title: "The Queen of Nothing", image: image5, description: "Power is much easier to acquire than it is to hold onto. Jude learned this lesson when she released her control over the wicked king, Cardan, in exchange for immeasurable power." },
        { title: "Yours Truly", image: image6, description: "Dr. Briana Ortiz’s life is seriously flatlining. Her divorce is just about finalized, her brother’s running out of time to find a kidney donor, and that promotion she wants?" }
    ];

    const handleViewMore = () => {
        setVisibleTiles(prev => Math.min(prev + 3, allTiles.length)); // Додаємо ще три картки, але не більше загальної кількості
    };

    return (
        <main className="main-content">
            <div className="hero">
                <img src={heroImage} alt="Bookshelf" className="hero-image" />
                <div className="hero-content">
                    <h1>We are glad to see you in the bookstore!</h1>
                    <p>Our store was created for those who love to read and discover new things. Looking for inspiration? Here you will find literature for every mood and every reader.</p>
                </div>
            </div>
            <div className="tiles-container">
                <div className="tiles">
                    {allTiles.slice(0, visibleTiles).map((tile, index) => (
                        <Tile 
                            key={index}
                            title={tile.title}
                            image={tile.image}
                            description={tile.description}
                        />
                    ))}
                </div>
                {visibleTiles < allTiles.length && (
                    <button className="view-more" onClick={handleViewMore}>View more</button>
                )}
            </div>
        </main>
    );
}

export default MainContent;
