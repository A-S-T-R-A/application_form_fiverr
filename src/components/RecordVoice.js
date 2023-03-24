import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder"
import { BsFillTrashFill } from "react-icons/bs"

export function RecordVoice({ setFormData }) {
    const recorderControls = useAudioRecorder()

    const addAudioElement = blob => {
        if (document.querySelector("#audio")) {
            document.querySelector(".voiceContainer").removeChild(document.querySelector("#audio"))
        }
        const url = URL.createObjectURL(blob)
        const audio = document.createElement("audio")
        audio.src = url
        audio.controls = true
        audio.id = "audio"
        document.querySelector(".voiceContainer").appendChild(audio)
        setFormData(prev => ({ ...prev, voice: url }))
    }

    function deleteBlobHandler() {
        document.querySelector(".voiceContainer").removeChild(document.querySelector("#audio"))
        setFormData(prev => ({ ...prev, voice: "" }))
    }

    return (
        <section className="voice">
            <h4 className="title">Voice recording</h4>
            <AudioRecorder
                onRecordingComplete={blob => addAudioElement(blob)}
                recorderControls={recorderControls}
            />
            <div className="voiceContainer">
                <button
                    className="voice__discard__btn btn"
                    onClick={deleteBlobHandler}
                    type="button"
                >
                    <BsFillTrashFill className="voice__delete__btn__icon" />
                    Delete
                </button>
            </div>
        </section>
    )
}
