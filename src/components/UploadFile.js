import { FilePond, registerPlugin } from "react-filepond"
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size"
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import "filepond/dist/filepond.min.css"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

function UploadFile({ setFormData, nfiles, setNfiles }) {
    registerPlugin(FilePondPluginFileValidateSize, FilePondPluginFileValidateType)

    const storage = getStorage()

    function updateHandler(files) {
        if (files[0]?.file) {
            const file = files[0].file
            const rand = (Math.random() * 100000000).toFixed()
            const resumeRef = ref(storage, `resume${rand}`)

            uploadBytes(resumeRef, file).then(snapshot => {
                getDownloadURL(resumeRef)
                    .then(url => {
                        setFormData(prev => ({ ...prev, resumeFile: url }))
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
        }

        setNfiles(files)
    }

    return (
        <section className="resume">
            <h4 className="title">Resume uploading</h4>
            <FilePond
                files={nfiles}
                allowReorder={false}
                allowMultiple={false}
                onupdatefiles={updateHandler}
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
