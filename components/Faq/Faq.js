import { useState } from "react";
import Link from "next/link";
import styles from "./Faq.module.css";

export default function Faq() {
  const [activeQuestion, setActiveQuestion] = useState("");
  const handleSelectQuestion = (question) => {
    if (activeQuestion === question) {
      setActiveQuestion("");
      return;
    }
    setActiveQuestion(question);
  };
  return (
    <div className={styles.faq}>
      <div className={styles.faq__block}>
        <button
          className={
            activeQuestion === "What is Netflix?"
              ? styles.faq__question + " " + styles.activeQuestion
              : styles.faq__question
          }
          onClick={() => handleSelectQuestion("What is Netflix?")}
        >
          <p>What is Netflix?</p>
          <i className="fas fa-plus"></i>
        </button>
        <div
          className={
            activeQuestion === "What is Netflix?"
              ? styles.faq__answer + " " + styles.activeQuestion
              : styles.faq__answer
          }
        >
          Netflix is a streaming service that offers a wide variety of
          award-winning TV shows, movies, anime, documentaries, and more on
          thousands of internet-connected devices. You can watch as much as you
          want, whenever you want without a single commercial – all for one low
          monthly price. There's always something new to discover and new TV
          shows and movies are added every week!
        </div>
      </div>

      <div className={styles.faq__block}>
        <button
          className={
            activeQuestion === "How much does Netflix cost?"
              ? styles.faq__question + " " + styles.activeQuestion
              : styles.faq__question
          }
          onClick={() => handleSelectQuestion("How much does Netflix cost?")}
        >
          <p>How much does Netflix cost?</p>
          <i className="fas fa-plus"></i>
        </button>
        <div
          className={
            activeQuestion === "How much does Netflix cost?"
              ? styles.faq__answer + " " + styles.activeQuestion
              : styles.faq__answer
          }
        >
          Watch Netflix on your smartphone, tablet, Smart TV, laptop, or
          streaming device, all for one fixed monthly fee. Plans range from
          EUR7.99 to EUR11.99 a month. No extra costs, no contracts.
        </div>
      </div>

      <div className={styles.faq__block}>
        <button
          className={
            activeQuestion === "Where can i watch?"
              ? styles.faq__question + " " + styles.activeQuestion
              : styles.faq__question
          }
          onClick={() => handleSelectQuestion("Where can i watch?")}
        >
          <p>Where can i watch?</p>
          <i className="fas fa-plus"></i>
        </button>
        <div
          className={
            activeQuestion === "Where can i watch?"
              ? styles.faq__answer + " " + styles.activeQuestion
              : styles.faq__answer
          }
        >
          Watch anywhere, anytime. Sign in with your Netflix account to watch
          instantly on the web at netflix.com from your personal computer or on
          any internet-connected device that offers the Netflix app, including
          smart TVs, smartphones, tablets, streaming media players and game
          consoles. You can also download your favorite shows with the iOS,
          Android, or Windows 10 app. Use downloads to watch while you're on the
          go and without an internet connection. Take Netflix with you anywhere.
        </div>
      </div>

      <div className={styles.faq__block}>
        <button
          className={
            activeQuestion === "How do i cancel?"
              ? styles.faq__question + " " + styles.activeQuestion
              : styles.faq__question
          }
          onClick={() => handleSelectQuestion("How do i cancel?")}
        >
          <p>How do i cancel?</p>
          <i className="fas fa-plus"></i>
        </button>
        <div
          className={
            activeQuestion === "How do i cancel?"
              ? styles.faq__answer + " " + styles.activeQuestion
              : styles.faq__answer
          }
        >
          Netflix is flexible. There are no pesky contracts and no commitments.
          You can easily cancel your account online in two clicks. There are no
          cancellation fees – start or stop your account anytime.
        </div>
      </div>

      <div className={styles.faq__block}>
        <button
          className={
            activeQuestion === "What can i watch on Netflix?"
              ? styles.faq__question + " " + styles.activeQuestion
              : styles.faq__question
          }
          onClick={() => handleSelectQuestion("What can i watch on Netflix?")}
        >
          <p>What can i watch on Netflix?</p>
          <i className="fas fa-plus"></i>
        </button>
        <div
          className={
            activeQuestion === "What can i watch on Netflix?"
              ? styles.faq__answer + " " + styles.activeQuestion
              : styles.faq__answer
          }
        >
          Netflix has an extensive library of feature films, documentaries, TV
          shows, anime, award-winning Netflix originals, and more. Watch as much
          as you want, anytime you want.
        </div>
      </div>

      <div className={styles.faq__block}>
        <button
          className={
            activeQuestion === "Is Netflix good for kids?"
              ? styles.faq__question + " " + styles.activeQuestion
              : styles.faq__question
          }
          onClick={() => handleSelectQuestion("Is Netflix good for kids?")}
        >
          <p>Is Netflix good for kids?</p>
          <i className="fas fa-plus"></i>
        </button>
        <div
          className={
            activeQuestion === "Is Netflix good for kids?"
              ? styles.faq__answer + " " + styles.activeQuestion
              : styles.faq__answer
          }
        >
          The Netflix Kids experience is included in your membership to give
          parents control while kids enjoy family-friendly TV shows and movies
          in their own space. Kids profiles come with PIN-protected parental
          controls that let you restrict the maturity rating of content kids can
          watch and block specific titles you don’t want kids to see.
        </div>
      </div>

      <div className={styles.faq__ready}>
        <p>Ready to start ?</p>
        <Link href="/register">Get Started</Link>
      </div>
    </div>
  );
}
