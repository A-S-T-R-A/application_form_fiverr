import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder"

export function RecordVoice({ formData, setFormData }) {
    const recorderControls = useAudioRecorder()

    const addAudioElement = blob => {
        const url = URL.createObjectURL(blob)

        setFormData(prev => ({ ...prev, voice: url }))
    }
    console.log(formData.voice)

    return (
        <section className="voice">
            <h4 className="title">Voice recording</h4>
            {formData.voice ? (
                <>
                    <audio src={formData.voice} controls />
                    <button onClick={() => setFormData(prev => ({ ...prev, voice: "" }))}>
                        Delete
                    </button>
                </>
            ) : (
                <AudioRecorder
                    onRecordingComplete={blob => addAudioElement(blob)}
                    recorderControls={recorderControls}
                />
            )}
        </section>
    )
}

/*  <button onClick={recorderControls.stopRecording}>Stop recording</button> */

/* const recorderControls = useAudioRecorder()
    const addAudioElement = blob => {
        const url = URL.createObjectURL(blob)
        const audio = document.createElement("audio")
        audio.src = url
        audio.controls = true
        document.body.appendChild(audio)
    } */

/*  */
/* 
      Applies passed classes to audio recorder container
     
AudioRecorderClass?: string;

  Applies passed classes to audio recorder start/save option
 
AudioRecorderStartSaveClass?: string;

  Applies passed classes to audio recorder timer
 
AudioRecorderTimerClass?: string;

  Applies passed classes to audio recorder status option
 
AudioRecorderStatusClass?: string;

  Applies passed classes to audio recorder pause/resume option

AudioRecorderPauseResumeClass?: string;

  Applies passed classes to audio recorder discard option
 
AudioRecorderDiscardClass?: string; */
