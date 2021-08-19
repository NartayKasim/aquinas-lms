import React from 'react';
import { useState } from 'react';

export default function RegisterBody(props) {
    const { setFirstName, setLastName, setEmail, setPassword, setVerifyPassword, setIsInstructor } = props;
    const [registerRole, setRegisterRole] = useState(null);
    const clicked = 'clicked';

    const onRegisterRoleClick = target => {
        if (target === "instructor" && registerRole === "instructor") {
            setRegisterRole(null)
            setIsInstructor(null)
        }
        else if (target === "student" && registerRole === "student") {
            setRegisterRole(null)
            setIsInstructor(null)
        }
        else if (target === "student") {
            setRegisterRole("student")
            setIsInstructor(false)
        }
        else if (target === "instructor") {
            setRegisterRole("instructor")
            setIsInstructor(true)
        }
    }

    return (
        <div className="login-page__content__body">
            <div className="input-form--long">
                <input onChange={e => setFirstName(e.target.value)} type="text" className="input-form--long__input" id="email" placeholder=" " />
                <label className="input-form--long__label" htmlFor="email">First Name</label>
            </div>
            <div className="input-form--long">
                <input onChange={e => setLastName(e.target.value)} type="text" className="input-form--long__input" id="email" placeholder=" " />
                <label className="input-form--long__label" htmlFor="email">Last Name</label>
            </div>
            <div className="input-form--long">
                <input onChange={e => setEmail(e.target.value)} type="text" className="input-form--long__input" id="email" placeholder=" " />
                <label className="input-form--long__label" htmlFor="email">Email</label>
            </div>

            <div className="input-form--long">
                <input onChange={e => setPassword(e.target.value)} type="password" className="input-form--long__input" id="password" placeholder=" " />
                <label className="input-form--long__label" htmlFor="password">Password</label>
            </div>
            <div className="input-form--long">
                <input onChange={e => setVerifyPassword(e.target.value)} type="password" className="input-form--long__input" id="password" placeholder=" " />
                <label className="input-form--long__label" htmlFor="password">Retype Password</label>
            </div>
            <div className="student-instructor">
                <span className="student-instructor__title">REGISTER AS</span>
                <div className="student-instructor__inner">
                    <div className="student-instructor__inner--wrapper">
                        {registerRole !== "instructor"
                            ?
                            <>
                                <div className="student-instructor__inner--box" onClick={() => onRegisterRoleClick("instructor")}></div>
                                <span className="student-instructor__instructor__label">INSTRUCTOR</span>
                            </>
                            :
                            <>
                                <div className={clicked} onClick={() => onRegisterRoleClick("instructor")}></div>
                                <span className="student-instructor__instructor__label">INSTRUCTOR</span>
                            </>
                        }

                    </div>
                    <div className="student-instructor__inner--wrapper">
                        {registerRole !== "student"
                            ?
                            <>
                                <div className="student-instructor__inner--box" onClick={() => onRegisterRoleClick("student")}></div>
                                <span className="student-instructor__instructor__label">STUDENT</span>
                            </>
                            :
                            <>
                                <div className={clicked} onClick={() => onRegisterRoleClick("student")}></div>
                                <span className="student-instructor__instructor__label">STUDENT</span>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
