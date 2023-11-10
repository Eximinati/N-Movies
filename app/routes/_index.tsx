import { useMemo, useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Spacer } from '@nextui-org/spacer';
import { Link as RemixLink, useLocation } from '@remix-run/react';
// Import FontAwesomeIcon and the specific icons you need
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faReddit,
  faTwitch,
  faDiscord,
  faLinkedin,
  faTwitter,
  faPinterest,
  faTelegram,
  faSnapchat,
  faTiktok,
  faWeibo,
  faWeixin,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import { faFilm  } from '@fortawesome/free-brands-svg-icons'

const HomePage = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    // Handle search logic here
    console.log('Searching for:', searchQuery);
  };

  interface ShareUrls {
    [key: string]: string;
  }

  const socialMediaIcons = {
    facebook: faFacebook,
    reddit: faReddit,
    whatsapp: faWhatsapp,
    discord: faDiscord,
    linkedin: faLinkedin,
    twitter: faTwitter,
    pinterest: faPinterest,
    telegram: faTelegram,
    snapchat: faSnapchat,
    tiktok: faTiktok,
    weibo: faWeibo,
    weixin: faWeixin,
  };


  const shareOnSocialMedia = (site: string) => {
    const siteUrl = encodeURIComponent(window.location.href);
    let shareUrl = '';

    if (site === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${siteUrl}`;
    } else if (site === 'reddit') {
      shareUrl = `https://www.reddit.com/submit?url=${siteUrl}&title=Check%20out%20this%20site`;
    } else if (site === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?url=${siteUrl}&text=Check%20out%20this%20site`;
    } else if (site === 'whatsapp') {
      shareUrl = `https://api.whatsapp.com/send?text=Check%20out%20my%20awesome%20website!&url=https%3A%2F%2F${siteUrl}`;
    } // Add more conditions for other platforms

    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };
  
  return (
    <><div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <div style={{ marginBottom: '1rem' }}>
        <img src="https://telegra.ph//file/ab2299501839bd668185e.png" alt="Logo" width={400} height={50} />
      </div>
      <Card shadow="lg" style={{ width: '100%', padding: '1rem', textAlign: 'center', maxWidth: '100%' }}>
        <CardHeader style={{ width: '100%' }}>
          <h1>Welcome to Nmovie</h1>
        </CardHeader>
        <CardBody>
          <p style={{ fontSize: '18px', color: '#808080', marginBottom: '1rem' }}>Discover and explore our amazing movie collection. Enter your search query below:</p>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Input
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for movies..."
              fullWidth
              style={{
                padding: '1rem',
                fontSize: '16px',
                border: '2px solid #ddd',
                borderRadius: '10px',
                flex: 1,
              }} />
            <Button
              variant="solid"
              color="primary"
              style={{
                marginLeft: '1rem',
                borderRadius: '10px',
                cursor: 'pointer',
              }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>

          <RemixLink to="/home">
            <Button
              variant="solid"
              color="primary"
              style={{
                width: '25%',
                display: 'block',
                margin: '2rem auto 0 auto',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'background-color 0.3s, color 0.3s',
                position: 'relative', // Enable relative positioning for the icon
              }}
            >
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                Go to Homepage
                <FontAwesomeIcon
                  icon={faFilm}
                  style={{
                    fontSize: '2rem',
                    cursor: 'pointer',
                    position: 'absolute',
                    right: '4%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }} />
              </span>
            </Button>
          </RemixLink>



        </CardBody>
      </Card>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <h6>Share Nmovie with your friends!</h6>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => shareOnSocialMedia('facebook')}>
            <FontAwesomeIcon
              icon={socialMediaIcons.facebook}
              style={{
                fontSize: '2rem',
                color: '#1877f2', // Change to Facebook blue color
              }} />
          </button>
          <button onClick={() => shareOnSocialMedia('reddit')}>
            <FontAwesomeIcon
              icon={socialMediaIcons.reddit}
              style={{
                fontSize: '2rem',
                color: '#FF4500', // Change to Reddit orange color
              }} />
          </button>
          <button onClick={() => shareOnSocialMedia('whatsapp')}>
            <FontAwesomeIcon
              icon={socialMediaIcons.whatsapp}
              style={{
                fontSize: '2rem',
                color: '#25d366', // Change to Facebook blue color
              }} />
          </button>
          <button onClick={() => shareOnSocialMedia('twitter')}>
            <FontAwesomeIcon
              icon={socialMediaIcons.twitter}
              style={{
                fontSize: '2rem',
                color: '#1da1f2', // Change to Facebook blue color
              }} />
          </button>

        </div>
      </div>
      <div style={{ margin: '4rem 0', textAlign: 'justify', width: '97%' }}>
        <p>
          <b style={{ fontSize: '24px' }}>NMovie - Watch Movies Online for FREE</b>
        </p>
        <br /> {/* Add a line break */}
        <p style={{ fontSize: '18px', color: '#808080' }}>
          NMovie - the ultimate online movie streaming website that brings the magic of cinema to your fingertips. With a vast and diverse database, as well as a multitude of exciting features, NMovie offers an unparalleled movie-watching experience for film enthusiasts worldwide.
        </p>
        <br />
        <p style={{ fontSize: '18px', color: '#808080' }}>
          At NMovie, we take pride in our extensive database that encompasses a wide range of movies from various genres, eras, and countries. From Hollywood blockbusters to independent gems, we have something for everyone. Our database is continuously updated with the latest releases, ensuring that you stay up-to-date with the hottest films in the industry.
        </p>
        <br />
        <p style={{ fontSize: '18px', color: '#808080' }}>
          One of the standout features of NMovie is our personalized recommendation system. Our sophisticated algorithms analyze your viewing history, preferences, and ratings to curate a customized list of movie recommendations tailored specifically to your tastes. Discover new films you'll love and embark on exciting cinematic adventures you never knew existed.
        </p>
        <br />
        <p style={{ fontSize: '18px', color: '#808080' }}>
          In addition to our large database and personalized recommendations, NMovie offers high-quality streaming for an immersive viewing experience. Enjoy movies in stunning high-definition resolution, accompanied by crisp audio, bringing the theater experience right to your home. Our adaptive streaming technology ensures smooth playback, adjusting to your internet connection for uninterrupted enjoyment.
        </p>
        <br />
        <p style={{ fontSize: '18px', color: '#808080' }}>
          NMovie also understands the importance of convenience and accessibility. Our platform is compatible with various devices, including laptops, tablets, and smartphones, allowing you to watch movies anytime, anywhere. Whether you're at home or on the go, NMovie keeps you connected to your favorite films.
        </p>
        <br />
        <p style={{ fontSize: '18px', color: '#808080' }}>
          Furthermore, NMovie fosters a vibrant community of movie enthusiasts. Engage in discussions, share reviews, and interact with fellow cinephiles through our dedicated forums and social features. Connect with like-minded individuals, exchange recommendations, and dive deeper into the world of cinema.
        </p>
        <br />
        <p style={{ fontSize: '18px', color: '#808080' }}>
          In summary, NMovie is the ultimate online movie streaming destination, offering a vast database, personalized recommendations, high-quality streaming, device compatibility, and an engaging community. Prepare to be captivated by the world of cinema as you embark on a cinematic journey like no other. Welcome to NMovie, where movies come to life.
        </p>
      </div>

    </div><footer style={{
      backgroundColor: '#333',
      color: 'white',
      padding: '2rem 0',
      textAlign: 'center',
      width: '100%',
    }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ marginBottom: '1rem' }}>NMovie</h4>
              <p style={{ fontSize: '1rem' }}>
                &copy; {new Date().getFullYear()} NMovie. All rights reserved.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '1rem' }}>Follow Us</h4>
              <div>
                {/* Add social media icons and links here */}
                {/* For example, Facebook, Twitter, LinkedIn, etc. */}
              </div>
            </div>
          </div>
        </div>
      </footer></>


  );
};

export default HomePage;