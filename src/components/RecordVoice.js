import { useState } from "react"
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder"
import { BsFillTrashFill } from "react-icons/bs"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { Loader } from "./Loader/Loader"

export function RecordVoice({ formData, setFormData }) {
    const [loading, setLoading] = useState(false)

    const recorderControls = useAudioRecorder()

    const storage = getStorage()

    const addAudioElement = blob => {
        if (document.querySelector("#audio")) {
            document
                .querySelector(".voiceRecordContainer")
                .removeChild(document.querySelector("#audio"))
        }

        if (!formData.voice) {
            setLoading(true)
        }

        const url = URL.createObjectURL(blob)
        const audio = document.createElement("audio")
        audio.src = url
        audio.controls = true
        audio.id = "audio"
        document.querySelector(".voiceRecordContainer").appendChild(audio)
        document.querySelector(".voiceContainer").style.opacity = "1"

        const rand = (Math.random() * 100000000).toFixed()
        const voiceRef = ref(storage, `voice${rand}`)

        uploadBytes(voiceRef, blob).then(snapshot => {
            getDownloadURL(voiceRef)
                .then(url => {
                    setFormData(prev => ({ ...prev, voice: url }))
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    setLoading(false)
                })
        })
    }

    function deleteBlobHandler() {
        if (document.querySelector("#audio")) {
            document
                .querySelector(".voiceRecordContainer")
                .removeChild(document.querySelector("#audio"))
            setFormData(prev => ({ ...prev, voice: "" }))
            document.querySelector(".voiceContainer").style.opacity = "0"
        }
    }

    return (
        <section className="voice">
            <div className="voice__header">
                <h4 className="voice__title title">
                    Voice recording<span className="required">*</span>
                </h4>
                <p>
                    Please leave a voice clip introducing yourself and describe any
                    related work experience.
                </p>
            </div>

            {loading ? (
                <div className="voiceLoader">
                    <Loader />
                </div>
            ) : (
                <>
                    <div className="recordButtonContainer">
                        <AudioRecorder
                            onRecordingComplete={blob => addAudioElement(blob)}
                            recorderControls={recorderControls}
                            classes={{ AudioRecorderClass: "voiceRecorder" }}
                        />
                    </div>
                    <div className="voiceContainer">
                        <div className="voiceRecordContainer"></div>

                        <button
                            className="voice__discard__btn btn"
                            onClick={deleteBlobHandler}
                            type="button"
                        >
                            <BsFillTrashFill className="voice__delete__btn__icon" />
                            Delete
                        </button>
                    </div>
                </>
            )}
        </section>
    )
}
