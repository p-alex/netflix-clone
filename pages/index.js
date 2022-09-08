import Image from 'next/image';
import Link from 'next/link';
import Faq from '../components/Faq/Faq';
import Footer from '../components/Footer/Footer';
import styles from '../styles/Index.module.css';
export default function index() {
  return (
    <>
      <nav className={styles.nav}>
        <Image
          src={'/images/logo/netplix-logo.png'}
          alt=""
          width="112"
          height="30" //30
        />
        <Link href="/login">Sign In</Link>
      </nav>
      <header
        className={styles.header}
        style={{ backgroundImage: 'url(/images/bg/bg.jpg)' }}
      >
        <div className={styles.header__container}>
          <h1>Unlimited movies, TV shows, and more.</h1>
          <h2>Watch anywhere. Cancel anytime.</h2>
          <h3>Ready to watch?</h3>
          <Link href="/register">Get Started</Link>
        </div>
      </header>
      <section className={styles.onTv + ' ' + styles.section}>
        <div className={styles.section__container}>
          <div className={styles.section__content}>
            <h1>Enjoy on your TV.</h1>
            <h2>
              Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray
              players, and more.
            </h2>
          </div>
          <div className={styles.onTv__animation}>
            <img src="/images/assets/tv.png" alt="tv" />
            <video width="469" height="327" loop autoPlay className={styles.onTv__video}>
              <source src="/videos/onTv.mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      <section className={styles.watch + ' ' + styles.section}>
        <div className={styles.section__container}>
          <div className={styles.watch__animation}>
            <img src="/images/assets/device-pile.png" alt="device pile" />
            <video loop autoPlay>
              <source src="videos/video-devices.mp4" />
            </video>
          </div>
          <div className={styles.section__content}>
            <h1>Watch everywhere.</h1>
            <h2>
              Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV
              without paying more.
            </h2>
          </div>
        </div>
      </section>

      <section className={styles.kids + ' ' + styles.section}>
        <div className={styles.section__container}>
          <div className={styles.section__content}>
            <h1>Create profiles for kids.</h1>
            <h2>
              Send kids on adventures with their favorite characters in a space made just
              for them—free with your membership.
            </h2>
          </div>
          <img src="/images/assets/kids.png" alt="" />
        </div>
      </section>

      <section className={styles.faq + ' ' + styles.section}>
        <h1>Frequently Asked Questions</h1>
        <Faq />
      </section>

      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  let url =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://netplix-inky-five.vercel.app/';
  const token = await context.req.cookies.token;
  if (token) {
    const result = await fetch(`${url}/api/verify-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const resultJSON = await result.json();
    if (resultJSON.ok) {
      return {
        redirect: {
          destination: '/browse',
          permanent: false,
        },
        props: {},
      };
    }
    return { props: {} };
  }
  return { props: {} };
}
