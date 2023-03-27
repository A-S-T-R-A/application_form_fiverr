import { useState } from "react"
import "./index.css"
import UploadFile from "./components/UploadFile.js"
import { RecordVoice } from "./components/RecordVoice.js"
import { firestore } from "./firebase"
import { addDoc, collection } from "@firebase/firestore"

const initialData = {
    position: "phoneRepresentative",
    name: "",
    age: "",
    gender: "male",
    email: "",
    phone: "",
    canReachByViber: false,
    fbLink: "",
    fbName: "",
    resumeFile: "",
    voice: "",
}

export default function App() {
    const [formData, setFormData] = useState(initialData)
    const [nfiles, setNfiles] = useState([])

    const ref = collection(firestore, "applications")

    async function submitHandler(e) {
        e.preventDefault()
        if (!formData.voice) {
            alert(
                "Voice clip is a mandatory field. You cannot apply if you do not send your voice clip"
            )
            return
        }

        const data = { ...formData, date: new Date() }

        try {
            addDoc(ref, data)
        } catch (err) {
            console.log(err)
        }

        if (document.querySelector("#audio")) {
            document.querySelector(".voiceContainer").removeChild(document.querySelector("#audio"))
        }
        setNfiles([])
        setFormData(initialData)
    }

    function inputChangeHandler(value, input) {
        setFormData(prev => ({ ...prev, [input]: value }))
    }

    const { name, age, gender, email, phone, canReachByViber, fbLink, fbName, position } = formData

    return (
        <div className="app">
            <div className="top-header">
                <div className="top-header-container">
                    <h1>JOB APPLICATION</h1>
                </div>
            </div>
            <div className="wrapper">
                <div className="container">
                    <header className="header">
                        <h1 className="header__title">Position applying for</h1>
                        <div className="toggleContainer">
                            <div
                                className={`toggle ${
                                    position === "phoneRepresentative" ? "active" : ""
                                }`}
                                onClick={() =>
                                    setFormData(prev => ({
                                        ...prev,
                                        position: "phoneRepresentative",
                                    }))
                                }
                            >
                                <h5 className="toggleTitle">Phone representative</h5>
                                <p className="toggleText">60k/month</p>
                            </div>
                            <div
                                className={`toggle ${
                                    position === "nonVoiceAssistant" ? "active" : ""
                                }`}
                                onClick={() =>
                                    setFormData(prev => ({
                                        ...prev,
                                        position: "nonVoiceAssistant",
                                    }))
                                }
                            >
                                <h5 className="toggleTitle">Non-voice assistant</h5>
                                <p className="toggleText">20k/month</p>
                            </div>
                        </div>
                    </header>
                    <main>
                        <form action="submit" className="form" onSubmit={submitHandler}>
                            <div className="formContainer">
                                <section className="formLeft">
                                    <h4 className="title">Enter your basic details</h4>
                                    <div className="inputContainer">
                                        <label htmlFor="name">Full Name</label>
                                        <input
                                            placeholder="Lohn Doe"
                                            id="name"
                                            value={name}
                                            onChange={e =>
                                                inputChangeHandler(e.target.value, "name")
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="inputContainer age">
                                        <label htmlFor="age">Age</label>
                                        <input
                                            placeholder="Your age"
                                            id="age"
                                            value={age}
                                            onChange={e =>
                                                inputChangeHandler(e.target.value, "age")
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="radios">
                                        <label className="label">Gender</label>
                                        <div className="radiosContainer">
                                            <div className="radioContainer">
                                                <input
                                                    value="male"
                                                    id="male"
                                                    type="radio"
                                                    checked={gender === "male"}
                                                    onChange={() =>
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            gender: "male",
                                                        }))
                                                    }
                                                />
                                                <label htmlFor="male">Male</label>
                                            </div>
                                            <div className="radioContainer">
                                                <input
                                                    value="female"
                                                    id="female"
                                                    type="radio"
                                                    checked={gender === "female"}
                                                    onChange={() =>
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            gender: "female",
                                                        }))
                                                    }
                                                />
                                                <label htmlFor="female">Female</label>
                                            </div>
                                            <div className="radioContainer">
                                                <input
                                                    value="trans"
                                                    id="trans"
                                                    type="radio"
                                                    checked={gender === "trans"}
                                                    onChange={() =>
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            gender: "trans",
                                                        }))
                                                    }
                                                />
                                                <label htmlFor="trans">Trans</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="inputContainer email">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            placeholder="Lohn Doe"
                                            id="email"
                                            value={email}
                                            onChange={e =>
                                                inputChangeHandler(e.target.value, "email")
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="inputContainer mobile">
                                        <label htmlFor="phone">Mobile</label>
                                        <input
                                            placeholder="Phone number"
                                            id="phone"
                                            value={phone}
                                            onChange={e =>
                                                inputChangeHandler(e.target.value, "phone")
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="checkboxContainer">
                                        <input
                                            type="checkbox"
                                            id="viber"
                                            checked={canReachByViber}
                                            onChange={() =>
                                                setFormData(prev => ({
                                                    ...prev,
                                                    canReachByViber: !prev.canReachByViber,
                                                }))
                                            }
                                        />
                                        <label htmlFor="viber">Can we reach you by Viber?</label>
                                    </div>

                                    <div className="inputContainer">
                                        <label htmlFor="fbName">Facebook profile name</label>
                                        <input
                                            placeholder="Mention facebook profile name here "
                                            id="fbName"
                                            value={fbName}
                                            onChange={e =>
                                                inputChangeHandler(e.target.value, "fbName")
                                            }
                                        />
                                    </div>

                                    <div className="inputContainer">
                                        <label htmlFor="fbLink">Facebook profile link</label>
                                        <input
                                            placeholder="Paste facebook profile link here"
                                            id="fbLink"
                                            value={fbLink}
                                            onChange={e =>
                                                inputChangeHandler(e.target.value, "fbLink")
                                            }
                                        />
                                    </div>
                                </section>

                                <div className="formRight">
                                    <RecordVoice formData={formData} setFormData={setFormData} />
                                    <UploadFile
                                        setFormData={setFormData}
                                        setNfiles={setNfiles}
                                        nfiles={nfiles}
                                    />

                                    <div className="btnContainer">
                                        <button className="btn">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    )
}
