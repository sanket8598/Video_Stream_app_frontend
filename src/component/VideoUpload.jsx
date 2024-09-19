import React, { useState } from "react";
import videoLogo from "../assets/play-video.png"
import { Alert, Button, Card, Label, Progress, Textarea, TextInput } from "flowbite-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const VideoUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [meta, setMeta] = useState({
        title: '',
        description: '',
    })

    function handleFileChange(event) {
        console.log(event);
        setSelectedFile(event.target.files[0]);
    }

function formFieldChange(event){
    setMeta({
        ...meta,
        [event.target.name]:event.target.value
    })
}

function resetForm(){
    setMeta({
        title: '',
        description: '', 
    })
    setSelectedFile(null);
    setUploading(false);
}

    function handleForm(formEvent) {
        formEvent.preventDefault();
        if(!selectedFile){
            alert("select file");
            return;
        }
        
         //submit the info to the server
        saveVideotoServer(selectedFile,meta);

    }
   
    async function saveVideotoServer(video,videometaData){
       setUploading(true);
     try{
      
        let formData=new FormData();
        formData.append("title",videometaData.title);
        formData.append("description",videometaData.description);
        formData.append("file",video)

      let response= await axios.post(`http://localhost:8080/api/v1/videos`,formData,{
        headers:{
            "Content-Type":'multipart/form-data'
        },
        onUploadProgress:(progressEvent)=>{
            const progress=Math.round((progressEvent.loaded*100)/progressEvent.total);
            setProgress(progress);
        }
       });
       console.log(response);
       setProgress(0);
       setMessage("File uploaded")
       toast.success("File uploaded successfully");
       setUploading(false);
       resetForm();
     }catch(error){
        console.error(error);
        setMessage("Error While File uploading")
        setUploading(false);
        toast.error("Error Occured While Uploading")
     }
    }

    return (
        <div className="text-white">
            <Card className="flext flex-col item-center justify-center">
                <h1>Upload Videos</h1>
                <div>
                    <form noValidate onSubmit={handleForm} className="space-y-5">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="file-upload" value="Video Title" />
                            </div>
                            <TextInput name="title" value={meta.title} onChange={formFieldChange} placeholder="Enter title" />
                        </div>
                        <div className="max-w-md">
                            <div className="mb-2 block">
                                <Label htmlFor="comment" value="Video Description" />
                            </div>
                            <Textarea name="description" value={meta.description} onChange={formFieldChange} id="comment" placeholder="Write video description..." required rows={4} />
                        </div>
                        <div className="flex items-center space-x-5 justify-center">
                            <div className="shrink-0">
                                <img className="h-12 w-12 object-cover" src={videoLogo} alt="Current profile photo" />
                            </div>
                            <label className="block">
                                <span className="sr-only">Choose video file</span>
                                <input name="file" type="file" onChange={handleFileChange} className="block w-full text-sm text-slate-500
                                     file:mr-4 file:py-2 file:px-4
                                     file:rounded-full file:border-0
                                     file:text-sm file:font-semibold
                                     file:bg-violet-50 file:text-violet-700
                                     hover:file:bg-violet-100
                                "/>
                            </label>
                        </div>
                        <div className="justify-center">
                         {
                            uploading && 
                            <Progress color={'green'} progress={progress} textLabel="Uploading.." size="lg" labelProgress labelText></Progress>
                         }   
                        </div>
                        <div className="">
                            { message &&
                                <Alert color={'success'} rounded withBorderAccent onDismiss={()=>{setMessage("");}}> </Alert>
                            }
                            
                        </div>
                        <div className="flex justify-center">
                            <Button disabled={uploading} type="submit">Upload</Button>
                        </div>
                    </form>
                </div>
                
            </Card>


        </div>
    )
}
export default VideoUpload