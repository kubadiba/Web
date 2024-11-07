import React from 'react';
import Tile from '../Tile/Tile';
import './MainContent.css';
import heroImage from '../../images/books.jpg';
import image1 from '../../images/image1.webp';
import image2 from '../../images/image2.jpg';
import image3 from '../../images/image3.jpg';

function MainContent() {
    return (
        <main className="main-content">
            <div className="hero">
                <img src={heroImage} alt="Bookshelf" className="hero-image" />
                <div className="hero-content">
                    <h1>We are glad to see you in the bookstore!</h1>
                    <p>Our store was created for those who love to read and discover new things. Looking for inspiration? Here you will find literature for every mood and every reader.</p>
                </div>
            </div>
            <div className="tiles">
                <Tile 
                    title="Bloodguard" 
                    image={image1} 
                    description="One hundred years. Tens of thousands of gladiators. And today, only one will rise.Everything in the Kingdom of Arrow is a lie.Leith of Grey thought coming to this new land and volunteering to fight in the gladiator arena—vicious, bloodthirsty tournaments where only the strongest survive—would earn him enough gold to save his dying sister. He thought there was nothing left to lose."
                />
                <Tile 
                    title="Strange Beasts" 
                    image={image2} 
                    description="In this fresh-yet-familiar gothic tale―part historical fantasy, part puzzle-box mystery―the worlds of Dracula and Sherlock Holmes collide in a thrilling exploration of feminine power."
                />
                <Tile 
                    title="The Girl from the Sea" 
                    image={image3} 
                    description="Fifteen-year-old Morgan has a secret: She can't wait to escape the perfect little island where she lives. She's desperate to finish high school and escape her sad divorced mom, her volatile little brother, and worst of all, her great group of friends..."
                />
            </div>
            <button className="view-more">View more</button>
        </main>
    );
}

export default MainContent;
