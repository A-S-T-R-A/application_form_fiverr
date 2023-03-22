import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder"

export default function App() {
    const recorderControls = useAudioRecorder()
    const addAudioElement = blob => {
        const url = URL.createObjectURL(blob)
        const audio = document.createElement("audio")
        audio.src = url
        audio.controls = true
        document.body.appendChild(audio)
    }

    return (
        <div>
            <AudioRecorder
                onRecordingComplete={blob => addAudioElement(blob)}
                recorderControls={recorderControls}
            />
            <br />
            <button onClick={recorderControls.stopRecording}>Stop recording</button>
            <br />
        </div>
    )
}

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
