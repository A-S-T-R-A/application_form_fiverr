import { useDropzone } from "react-dropzone"
import { UploadIcon } from "../assets/upload"

function UploadFile({ setFormData }) {
    const { acceptedFiles, fileRejections, getRootProps, getInputProps, isDragActive } =
        useDropzone({
            accept: {
                "application/pdf": [".pdf"],
                "application/msword": [".doc"],
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
                    ".docx",
                ],
            },
            maxSize: 5 * 1024 * 1024, // 5MB in bytes
            onDropAccepted: dropAcceptedHandler,
        })

    const files = acceptedFiles?.map(file => {
        return (
            <p className="resumeFile">
                {file.path} - {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
        )
    })

    let error = null

    if (fileRejections[0] && fileRejections[0].errors[0]) {
        switch (fileRejections[0].errors[0].code) {
            case "file-invalid-type":
                error = "Invalid file type"
                break
            case "file-too-large":
                error = "FIle too large"
                break
            default:
                error = "Unexpected error"
        }
    }

    function dropAcceptedHandler(files) {
        setFormData(prev => ({ ...prev, resumeFile: files[0] }))
    }

    return (
        <section className="resume">
            <h4 className="title">Resume uploading</h4>
            <div
                {...getRootProps({
                    className: `resumeContainer ${isDragActive ? "dropActive" : ""}`,
                })}
            >
                {files?.length ? (
                    <div className="resumeFileContainer">
                        {files}
                        <button className="resumeDeleteBtn btn">Delete</button>
                    </div>
                ) : (
                    <>
                        <input {...getInputProps()} />
                        <p className="resumeTitle">
                            Drag photos here or select them from your computer
                        </p>
                        <p className="resumeText">Upload PDF, DOC or DOCX files up to 5 MB each</p>
                        <button type="button" className="resumeBtn btn">
                            <UploadIcon className="btnIcon" />
                            Upload Resume
                        </button>
                    </>
                )}
                {!!error && <div className="resumeError">{error}</div>}
            </div>
        </section>
    )
}

export default UploadFile
