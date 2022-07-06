import axios from "axios"
import { FormEventHandler, useRef, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { PrimaryButton } from "../components/Button"

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    background-color: #00000058;
    backdrop-filter: blur(7px);
    width: 100%;
    height: 100vh;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ModalContent = styled.div`
    max-width: 90%;
    min-height: 200px;
    min-width: 400px;
    max-height: 90vh;
    padding: 20px;
    border-radius: 10px;
    background-color: white;
`
const CloseBtn = styled(Link)`
    width: 50px;
    height: 50px;
    background-color: white;
    position: absolute;
    top: 0;
    right: 10px;
`
const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
`
const Label = styled.label`
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
    padding: 5px;
    border-radius: 4px;
    outline: none;
`
const TextInput = styled(Input)`
    border:1px solid black;
`


const TextArea = styled.textarea`
    resize: none;
    padding: 5px;
    border-radius: 4px;
    outline:none;
`
const CreateVideo = () => {
    const navigate = useNavigate()
    const [progress, setProgress] = useState(0)
    const [src, setSrc] = useState<string>("")
    const titleRef = useRef<HTMLInputElement>(null)
    const fileRef = useRef<HTMLInputElement>(null)
    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        var formData = new FormData()
        console.log("submit")
        if(!titleRef.current || !fileRef.current || !fileRef.current.files )return
        console.log(fileRef.current.value)  
        formData.append('title', titleRef.current.value);
        formData.append('video', fileRef.current.files[0])
        console.log(formData.get('video'));

        axios.post("http://localhost:8080/api/video", formData, {
            onUploadProgress(progressEvent) {
                console.log(progressEvent);
                setProgress(Math.round(progressEvent.loaded*100/progressEvent.total))
            },
            headers: {
                'authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1cmF5ZXZtYW5zdXJiZWs2NjdAZ21haWwuY29tIiwiZmlyc3RuYW1lIjoiTWFuc3VyIiwibGFzdG5hbWUiOiJKbydyYXlldiIsInBob25lIjoiKzk5ODk5NjY3MjEwNiIsImlkIjozLCJpYXQiOjE2NTcwODU2MjZ9.wGAD1nw7L5dTjBOjgb7njDITa9_K-C61A6LgkQNe2NY'
            }
        })
            .then(res => {
                alert("File uploaded successfully")
                navigate("/my-videos", {
                    replace:true
                })
            console.log(res.data)
        })
            .catch(err => {
            console.log(err)
        })
        console.log(formData)
    }

    const returnRoute = '/my-videos'
    return (
        <Modal>
            <ModalContent>
                <CloseBtn to={returnRoute} replace={true} />
                <FormWrapper  method="post" encType="multipart/form-data" onSubmit={onSubmit}>
                    <Label>
                        title:
                        <TextInput ref={titleRef} name="title" type="text" />
                    </Label>
                    <Label>
                        description:
                        <TextArea name="description" cols={30} rows={10}></TextArea>
                    </Label>
                    
                    <Label>
                        Video:
                        <Input type="file" ref={fileRef} name="video" />
                    </Label>
                    
                    <PrimaryButton type="submit">Qo'shish <span>{ progress }</span> </PrimaryButton>
                </FormWrapper>
            </ModalContent>
        </Modal>
    )
}

export default CreateVideo