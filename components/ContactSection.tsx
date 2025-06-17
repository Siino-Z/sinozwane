'use client';
import styles from '../styles/ContactSection.module.scss';

export default function ContactSection() {
    return (
        <section id="contact" className={styles.contact}>
            <div className={styles.container}>
                <h2 className={styles.title}>Let’s Connect</h2>
                <p className={styles.subtext}>
                    I’m currently expanding my expertise and eager to work on impactful, forward-thinking projects.
                    I’m open to <span className={styles.boldLift}>exciting</span> opportunities and collaborations!
                </p>
                <a href="mailto:sinothaboz@gmail.com" className={styles.emailBtn}>
                    Email Me
                </a>
            </div>
        </section>
    );
}
