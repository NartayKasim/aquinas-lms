import React from 'react';
import { LOGIN } from '../dashboard/dashboardUtilities';
import NavigationLink from '../dashboard/dashboardUtilities';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as Telematic } from '../../assets/telematic.svg';
import { ReactComponent as Logic } from '../../assets/logic.svg';
import { ReactComponent as Old } from '../../assets/old.svg';
import { ReactComponent as Virtual } from '../../assets/virtual.svg';

export default function LandingHeader() {
    return (
        <div className="landing-page__header">
            <div className="landing-page__header__header">
                <div className="login-link">
                    <button className="button-default"><NavigationLink path={LOGIN} displayString="Login / Register" /></button>
                </div>
            </div>
            <div className="landing-page__header__left">
                <div className="landing-page__header__left__top-accent">
                    <div className="landing-page__header__left__top-accent__span">
                        Within his large body of work, Thomas treats most of the major sub-disciplines of philosophy, including logic, philosophy of nature, metaphysics, epistemology, philosophical psychology, philosophy of mind, philosophical theology, the philosophy of language, ethics, and political philosophy. As far as his philosophy is concerned, Thomas is perhaps most famous for his so-called five ways of attempting to demonstrate the existence of God. These five short arguments constitute only an introduction to a rigorous project in natural theology—theology that is properly philosophical and so does not make use of appeals to religious authority—that runs through thousands of tightly argued pages. Thomas also offer one of the earliest systematic discussions of the nature and kinds of law, including a famous treatment of natural law. Despite his interest in law, Thomas’ writings on ethical theory are actually virtue-centered and include extended discuslogical, intellectual, and cardinal virtues. Arguably, Thomas’ most influential contribution to theology and philosophy, however, is his model for the correct relationship between these two disciplines, a model which has it that neither theology nor philosophy is reduced one to the other, where each of these two disciplines is allowed its own proper scope, and each discipline is allowed to perfect the other, if not in content, then at least by inspiring those who practice that discipline to reach ever new intellectual heights.ology and philosophy, however, is his model for the correct relationship between these two disciplines, a model which has it that neither theology nor philosophy is reduced one to the other, where each of these two disciplines is allowed its own proper scope, and each discipline is allowed to perfect the other, if not in content, then at least by inspiring those who practice that discipline to reach ever new intellectual heights.
                    </div>
                </div>
                <div className="landing-page__header__left__logo">
                    <Logo className="logo-landing" />
                    <div className="lms">learning management</div>
                </div>
                <div className="landing-page__header__left__bottom-accent">
                    <div className="landing-page__header__left__bottom-accent__span">
                        In his lifetime, Thomas’ expert opinion on theological and philosophical topics was sought by many, including at different times a king, a pope, and a countess. It is fair to say that, as a theologian, Thomas is one of the most important in the history of Western civilization, given the extent of his influence on the development of Roman Catholic theology since the 14th century. However, it also seems right to say—if only from the sheer influence of his work on countless philosophers and intellectuals in every century since the 13th, as well as on persons in countries as culturally diverse as Argentina, Canada, England, France, Germany, India, Italy, Japan, Poland, Spain, and the United States—that, globally, Thomas is one of the 10 most influential philosophers in the Western philosophical tradition.

                        Within his large body of work, Thomas treats most of the major sub-disciplines of philosophy, including logic, philosophy of nature, metaphysics, epistemology, philosophical psychology, philosophy of mind, philosophical theology, the philosophy of language, ethics, and political philosophy. As far as his philosophy is concerned, Thomas is perhaps most famous for his so-called five ways of attempting to demonstrate the existence of God. These five short arguments constitute only an introduction to a rigorous project in natural theology—theology that is properly philosophical and so does not make use of appeals to religious authority—that runs through thousands of tightly argued pages. Thomas also offers one of the earliest systematic discussions of the nature and kinds of law, including a famous treatment of natural law. Despite his interest in law, Thomas’ writings on ethical theory are actually virtue-centered and include extended discussions of the relevance of happiness, pleasure, the passions, habit, and the faculty of will for the moral life, as well as detailed treatments of each one of the theological, intellectual, and cardinal virtues. Arguably, Thomas’ most influential contribution to theology and philosophy, however, is his model for the correct relationship between these two disciplines, a model which has it that neither theology nor philosophy is reduced one to the other, where each of these two disciplines is allowed its own proper scope, and each discipline is allowed to perfect the other, if not in content, then at least by inspiring those who practice that discipline to reach ever new intellectual heights.

                        In his lifetime, Thomas’ expert opinion on theological and philosophical topics was sought by many, including at different times a king, a pope, and a countess. It is fair to say that, as a theologian, Thomas is one of the most important in the history of Western civilization, given the extent of his influence on the development of Roman Catholic theology since the 14th century. However, it also seems right to say—if only from the sheer influence of his work on countless philosophers and intellectuals in every century since the 13th, as well as on persons in countries as culturally diverse as Argentina, Canada, England, France, Germany, India, Italy, Japan, Poland, Spain, and the United States—that, globally, Thomas is one of the 10 most influential philosophers in the Western philosophical tradition.
                        Within his large body of work, Thomas treats most of the major sub-disciplines of philosophy, including logic, philosophy of nature, metaphysics, epistemology, philosophical psychology, philosophy of mind, philosophical theology, the philosophy of language, ethics, and political philosophy. As far as his philosophy is concerned, Thomas is perhaps most famous for his so-called five ways of attempting to demonstrate the existence of God. These five short arguments constitute only an introduction to a rigorous project in natural theology—theology that is properly philosophical and so does not make use of appeals to religious authority—that runs through thousands of tightly argued pages. Thomas also offers one of the earliest systematic discussions of the nature and kinds of law, including a famous treatment of natural law. Despite his interest in law, Thomas’ writings on ethical theory are actually virtue-centered and include extended discussions of the relevance of happiness, pleasure, the passions, habit, and the faculty of will for the moral life, as well as detailed treatments of each one of the theological, intellectual, and cardinal virtues. Arguably, Thomas’ most influential contribution to theology and philosophy, however, is his model for the correct relationship between these two disciplines, a model which has it that neither theology nor philosophy is reduced one to the other, where each of these two disciplines is allowed its own proper scope, and each discipline is allowed to perfect the other,
                    </div>
                </div>
            </div>

            <div className="landing-page__header__right">
                <div className="landing-page__header__right__block">
                    <Telematic className="landing-assets" />
                    <div className="landing-page__header__right__block__content">
                        <h2>Telemeatic Structured Sharable Content Object Reference Model</h2>
                        <span>That's right, we have whatever that is.</span>
                    </div>

                </div>
                <div className="landing-page__header__right__block">
                    <Logic className="landing-assets" />
                    <div className="landing-page__header__right__block__content">
                        <h2>Programmed Logic for Automated Teaching Operations</h2>
                        <span>10+ programmed logics per student!</span>
                    </div>

                </div>
                <div className="landing-page__header__right__block">
                    <Old className="landing-assets" />
                    <div className="landing-page__header__right__block__content">
                        <h2>Over 120 Years of Online Learning Management Experience</h2>
                        <span>ONE HUNDRED AND TWENTY YEARS!</span>
                    </div>
                </div>

                <div className="landing-page__header__right__block">
                    <Virtual className="landing-assets" />
                    <div className="landing-page__header__right__block__content">
                        <h2>Virtual Learning Environment</h2>
                        <span>Powered by your own imagination.</span>
                    </div>
                </div>

            </div>





        </div >
    )
}


// 