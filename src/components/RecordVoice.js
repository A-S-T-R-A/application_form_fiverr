import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder"
import { BsFillTrashFill } from "react-icons/bs"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

export function RecordVoice({ setFormData }) {
    const recorderControls = useAudioRecorder()

    const storage = getStorage()

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

        const rand = (Math.random() * 100000000).toFixed()
        const voiceRef = ref(storage, `voice${rand}`)

        uploadBytes(voiceRef, blob).then(snapshot => {
            getDownloadURL(voiceRef)
                .then(url => {
                    console.log(url)
                    setFormData(prev => ({ ...prev, voice: url }))
                })
                .catch(error => {
                    console.log(error)
                })
        })
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
