import { FilePond, registerPlugin } from "react-filepond"
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size"
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import "filepond/dist/filepond.min.css"

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

import { useEffect, useState } from "react"

function UploadFile({ setFormData }) {
    registerPlugin(FilePondPluginFileValidateSize, FilePondPluginFileValidateType)

    const [nfiles, setNfiles] = useState([])

    const storage = getStorage()

    useEffect(() => {
        if (!nfiles[0]?.files) return

        const file = nfiles[0].files
        const rand = (Math.random() * 100000000).toFixed()
        const mountainsRef = ref(storage, `resume${rand}`)

        uploadBytes(mountainsRef, file).then(snapshot => {
            getDownloadURL(mountainsRef)
                .then(url => {
                    setFormData(prev => ({ ...prev, resumeFile: url }))
                })
                .catch(error => {
                    console.log(error)
                })
        })
    }, [nfiles])

    return (
        <section className="resume">
            <h4 className="title">Resume uploading</h4>
            <FilePond
                files={nfiles}
                allowReorder={false}
                allowMultiple={false}
                onupdatefiles={setNfiles}
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                acceptedFileTypes={[
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    "application/pdf",
                ]}
                maxFileSize="5MB"
            />
        </section>
    )
}

export default UploadFile
