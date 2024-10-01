import React from 'react';
import styles from "./introduce.module.css"
import headerAvatar from "./asset/image/headerAvatar.png";
export default function Introduce() {
    return (

        <header>
            <div className={styles["header-container"]}>
                <div className={styles["avatar-wrapper"]}>
                    <img
                        src={headerAvatar} // oke nhe o tu thay du lieu vao nhes ok o bip vccc import image @@ lan dau toi thay :v no phai the maf
                        alt="Nguyễn Việt Huy Avatar"
                        className={styles["avatar"]}
                    />
                </div>

                <div className={styles["introduction-content"]}>
                    <h1>I'm Lương Ngọc Yên</h1>
                    <h2>A J97 Fan!</h2>
                </div>

                <div className={styles["header-information"]}>
                    <ul>
                        <li className={styles["birth"]}>
                            <i className={styles["fa-solid fa-calendar-days"]}></i>
                            <div className={styles["text"]}>16-08-2003</div>
                        </li>
                        <li className={styles["phone-number"]}>
                            <i className={styles["fa-solid fa-phone"]}></i>
                            <div className={styles["text"]}>0339947150</div>
                        </li>
                        <li className={styles["email"]}>
                            <i className={styles["fa-solid fa-envelope"]}></i>
                            <div className={styles["text"]}>huynvfx22578@funix.edu.vn</div>
                        </li>
                        <li className={styles["github"]}>
                            <i className={styles["fa-brands fa-github"]}></i>
                            <a
                                href="https://github.com/huydayne168"
                                target="_blank"
                                rel="noreferrer"
                                className={styles["text"]}
                            >https://github.com/huydayne168</a
                            >
                        </li>
                        <li className={styles["address"]}>
                            <i className={styles["fa-solid fa-house"]}></i>
                            <div className={styles["text"]}>Sơn Đồng, Hoài Đức, Hà Nội</div>
                        </li>
                    </ul>
                </div>
            </div>
        </header>

    );
}